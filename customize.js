// NOTE: Do NOT add setup() or draw() in this file

// ------------------------------------------------------------
// Local state
// ------------------------------------------------------------
let transitionAlpha = 255;
let nameBoxActive = false;

let selectedFamily = null;

let confirmBtn = null;
let regretBtn = null;

let statButtons = [];
let familyButtons = [];
let randomStatBtn = null;
let resetStatBtn = null;
let randomFamilyBtn = null;

// ------------------------------------------------------------
// Stat configuration
// ------------------------------------------------------------
const statKeys = [
  "appearance","intelligence","strength","charisma","luck",
  "memory","creativity","confidence","optimistic","popularity",
];

// Player-added points ONLY
let allocatedStats = {};
for (let s of statKeys) allocatedStats[s] = 0;

// ------------------------------------------------------------
// Family backgrounds
// ------------------------------------------------------------
const families = {
  wealthy: { desc: "Born into privilege. Connections and confidence come naturally.", bonus: { popularity: 2, confidence: 2 } },
  poor: { desc: "Struggle shaped you. Life taught resilience early.", bonus: { strength: 2, optimistic: 1 } },
  scholars: { desc: "A household of knowledge. Curiosity was encouraged.", bonus: { intelligence: 3, memory: 1 } },
  athletes: { desc: "Discipline through movement. Competition was routine.", bonus: { strength: 2, confidence: 1 } },
  homeless: { desc: "Survival came first. Adaptability kept you alive.", bonus: { luck: 2, strength: 1 } },
  orphan: { desc: "Raised alone. Independence became your strength.", bonus: { creativity: 2, confidence: 1 } },
  artists: { desc: "Expression mattered more than rules. Creativity was freedom.", bonus: { creativity: 2, charisma: 1 } },
  entrepreneurs: { desc: "Risk was normal. Ambition filled the household.", bonus: { confidence: 2, luck: 1 } },
  immigrants: { desc: "Adapting was survival. Perseverance was essential.", bonus: { optimistic: 2, memory: 1 } },
  military: { desc: "Structure and discipline defined daily life.", bonus: { confidence: 1, strength: 1, memory: 1 } },
};

// ------------------------------------------------------------
// Recompute final stats
// ------------------------------------------------------------
function recomputeStats() {
  for (let stat of statKeys) {
    player.stats[stat] = allocatedStats[stat];
  }

  if (selectedFamily) {
    const bonus = families[selectedFamily].bonus;
    for (let stat in bonus) {
      player.stats[stat] += bonus[stat];
    }
  }
}

// ------------------------------------------------------------
// Main draw
// ------------------------------------------------------------
function drawCustomize() {
  background(245, 240, 235);
  transitionAlpha = max(0, transitionAlpha - 8);

  fill(40, 60, 80);
  textAlign(CENTER, CENTER);
  textSize(40);
  text("Create Your Life", width / 2, 60);

  drawNameInput();
  drawStats();
  drawFamilies();
  drawDescription();
  drawConfirm();
  drawRegret();

  if (transitionAlpha > 0) {
    rectMode(CORNER);
    fill(245, 240, 235, transitionAlpha);
    rect(0, 0, width, height);
    rectMode(CENTER);
  }
}

// ------------------------------------------------------------
// Name input (FIXED)
// ------------------------------------------------------------
function drawNameInput() {
  const box = { x: width / 2, y: 145, w: 300, h: 40 };
  const hover = isHover(box);

  fill(60);
  textSize(18);
  text("Your Name", width / 2, 110);

  rectMode(CENTER);
  noStroke();

  if (hover || nameBoxActive) {
    fill(255, 210, 170);
    drawingContext.shadowBlur = 12;
    drawingContext.shadowColor = color(255, 190, 140);
  } else {
    fill(255);
  }

  rect(box.x, box.y, box.w, box.h, 8);
  drawingContext.shadowBlur = 0;

  fill(player.name ? 0 : 150);
  textSize(16);

  if (!nameBoxActive && !player.name) {
    text("Type your name...", box.x, box.y);
  } else {
    text(player.name, box.x, box.y);
  }

  cursor(hover ? TEXT : ARROW);
}

// ------------------------------------------------------------
// Stats
// ------------------------------------------------------------
function drawStats() {
  const labelX = 200, valueX = 260, plusX = 300, minusX = 330;
  let startY = 220, rowH = 26;

  statButtons = [];
  textAlign(RIGHT, CENTER);
  textSize(14);

  for (let i = 0; i < statKeys.length; i++) {
    const stat = statKeys[i];
    const y = startY + i * rowH;

// LABEL
textAlign(RIGHT, CENTER);
fill(40);
text(stat.toUpperCase(), labelX, y);

// VALUE
textAlign(CENTER, CENTER);
text(player.stats[stat], valueX, y);

// BUTTONS
drawStatButton("+", plusX, y, stat, 1);
drawStatButton("-", minusX, y, stat, -1);
  }

  fill(80);
  text(`Points Left: ${player.pointsLeft}`, labelX, startY + statKeys.length * rowH + 20);

  randomStatBtn = { x: 170, y: startY + statKeys.length * rowH + 55, w: 140, h: 36 };
  resetStatBtn = { x: 330, y: startY + statKeys.length * rowH + 55, w: 140, h: 36 };

  drawSoftButton(randomStatBtn, "RANDOM STATS");
  drawSoftButton(resetStatBtn, "RESET STATS");
}

// ------------------------------------------------------------
// Families
// ------------------------------------------------------------
function drawFamilies() {
  textAlign(CENTER, CENTER);
  textSize(18);
  fill(40);
  text("Family Background", 560, 220);

  familyButtons = [];
  let x = 460, y = 260;

  for (let key in families) {
    drawSoftButton(
      { x, y, w: 120, h: 36 },
      key.toUpperCase(),
      { base: selectedFamily === key ? 255 : 235 }
    );
    familyButtons.push({ x, y, w: 120, h: 36, key });

    x += 140;
    if (x > 700) { x = 460; y += 48; }
  }

  randomFamilyBtn = { x: 560, y: y + 20, w: 160, h: 36 };
  drawSoftButton(randomFamilyBtn, "RANDOM FAMILY");
}

// ------------------------------------------------------------
// Description
// ------------------------------------------------------------
function drawDescription() {
  if (!selectedFamily) return;
  fill(80);
  textSize(14);
  textAlign(CENTER, CENTER);
  text(families[selectedFamily].desc, width / 2, 580);
}

// ------------------------------------------------------------
// Confirm & Regret
// ------------------------------------------------------------
function drawConfirm() {
  const ready = player.name && player.pointsLeft === 0 && selectedFamily;
  confirmBtn = { x: width / 2, y: height - 70, w: 280, h: 60 };

  ready
    ? drawSoftButton(confirmBtn, "BEGIN LIFE", { textSize: 22 })
    : (fill(200), rect(confirmBtn.x, confirmBtn.y, confirmBtn.w, confirmBtn.h, 14),
       fill(120), text("BEGIN LIFE", confirmBtn.x, confirmBtn.y));
}

function drawRegret() {
  regretBtn = { x: width / 2, y: height - 130, w: 200, h: 36 };
  drawSoftButton(regretBtn, "REGRET LIFE");
}

// ------------------------------------------------------------
// Buttons (START PAGE STYLE)
// ------------------------------------------------------------
function drawStatButton(label, x, y, stat, delta) {
  const btn = { x, y, w: 22, h: 22, stat, delta };

  if (isHover(btn)) {
    fill(255, 210, 170);
    drawingContext.shadowBlur = 8;
    drawingContext.shadowColor = color(255, 190, 140);
    cursor(HAND);
  } else {
    fill(225);
  }

  rect(x, y, btn.w, btn.h, 4);
  drawingContext.shadowBlur = 0;

  fill(40);
  text(label, x, y);
  statButtons.push(btn);
}

function drawSoftButton(btn, label, opt = {}) {
  if (isHover(btn)) {
    fill(255, 210, 170);
    drawingContext.shadowBlur = 14;
    drawingContext.shadowColor = color(255, 190, 140);
    cursor(HAND);
  } else {
    fill(opt.base || 235);
    drawingContext.shadowBlur = 6;
    drawingContext.shadowColor = color(200, 210, 220);
  }

  rect(btn.x, btn.y, btn.w, btn.h, 10);
  drawingContext.shadowBlur = 0;

  fill(50, 70, 90);
  textSize(opt.textSize || 12);
  text(label, btn.x, btn.y);
}

// ------------------------------------------------------------
// Input
// ------------------------------------------------------------
function customizeMousePressed() {
  nameBoxActive = isHover({ x: width / 2, y: 145, w: 300, h: 40 });

  if (regretBtn && isHover(regretBtn)) {
    currentScreen = "start";
    return;
  }

  if (randomStatBtn && isHover(randomStatBtn)) randomizeStats();
  if (resetStatBtn && isHover(resetStatBtn)) resetStats();
  if (randomFamilyBtn && isHover(randomFamilyBtn)) randomizeFamily();

  for (let btn of statButtons) {
    if (isHover(btn)) {
      if (btn.delta === 1 && player.pointsLeft > 0) {
        allocatedStats[btn.stat]++;
        player.pointsLeft--;
      }
      if (btn.delta === -1 && allocatedStats[btn.stat] > 0) {
        allocatedStats[btn.stat]--;
        player.pointsLeft++;
      }
      recomputeStats();
    }
  }

  for (let btn of familyButtons) {
    if (isHover(btn)) {
      selectedFamily = btn.key;
      recomputeStats();
    }
  }

  if (confirmBtn && isHover(confirmBtn) && player.pointsLeft === 0 && selectedFamily) {
    initGameStory();
    currentScreen = "game";
  }
}

function customizeKeyPressed() {
  if (!nameBoxActive) return;
  if (keyCode === BACKSPACE) player.name = player.name.slice(0, -1);
  else if (key.length === 1 && player.name.length < 16) player.name += key;
}

// ------------------------------------------------------------
// Logic helpers
// ------------------------------------------------------------
function resetStats() {
  for (let stat of statKeys) allocatedStats[stat] = 0;
  player.pointsLeft = 30;
  recomputeStats();
}

function randomizeStats() {
  resetStats();
  let p = 30;
  while (p--) allocatedStats[random(statKeys)]++;
  player.pointsLeft = 0;
  recomputeStats();
}

function randomizeFamily() {
  selectedFamily = random(Object.keys(families));
  recomputeStats();
}
