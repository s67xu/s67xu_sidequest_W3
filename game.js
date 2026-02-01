// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js

// ------------------------------------------------------------
// Scroll state
// ------------------------------------------------------------
let scrollY = 0;
let maxScroll = 0;

// ------------------------------------------------------------
// Story state
// ------------------------------------------------------------
let storyBlocks = [];
let choices = [];

// ------------------------------------------------------------
// Initialize story ONCE when entering game
// ------------------------------------------------------------
function initGameStory() {
  scrollY = 0;
  storyBlocks = [];
  choices = [];

  // --- INTRO ---
  storyBlocks.push(`You are born...`);
  storyBlocks.push(
    `You are born into a ${selectedFamily.toUpperCase()} family.`,
  );
  storyBlocks.push(
    `Your parents name you ${player.name}.`,
  );

  // --- FLAVOR BASED ON STATS ---
  if (player.stats.appearance >= 6) {
    storyBlocks.push(
      `As you grow older, people often notice you. You attract attention without trying.`,
    );
  }

  if (player.stats.intelligence >= 6) {
    storyBlocks.push(
      `Teachers quickly realize you learn faster than most children your age.`,
    );
  }

  if (player.stats.confidence <= 2) {
    storyBlocks.push(
      `You tend to stay quiet, observing others from a distance.`,
    );
  }

  storyBlocks.push(`Time passes. A new chapter of life begins.`);

  // --- FIRST MAJOR CHOICE ---
  buildEducationChoices();
}

// ------------------------------------------------------------
// Build education choices (STAT GATED)
// ------------------------------------------------------------
function buildEducationChoices() {
  choices = [];

  // University (INT gated)
  choices.push({
    label: "Apply to University",
    requirements: { intelligence: 6 },
    onSelect: () => {
      storyBlocks.push(
        `You are accepted into university. Late nights and ambition shape your future.`,
      );
      afterEducation();
    },
  });

  // College (always allowed)
  choices.push({
    label: "Go to College",
    requirements: {},
    onSelect: () => {
      storyBlocks.push(
        `You choose college. Practical skills prepare you for the real world.`,
      );
      afterEducation();
    },
  });

  // Work early (family-based flavor)
  choices.push({
    label: "Start Working Immediately",
    requirements: {},
    onSelect: () => {
      storyBlocks.push(
        `You enter the workforce early, learning life the hard way.`,
      );
      afterEducation();
    },
  });
}

// ------------------------------------------------------------
// After education branch
// ------------------------------------------------------------
function afterEducation() {
  choices = [];

  if (player.stats.charisma >= 5) {
    storyBlocks.push(
      `People enjoy being around you. Opportunities come through connections.`,
    );
  }

  if (player.stats.strength >= 6) {
    storyBlocks.push(
      `Physical work never scares you. Your body becomes your advantage.`,
    );
  }

  choices.push({
    label: "Pursue Career",
    requirements: {},
    onSelect: () => {
      storyBlocks.push(`Your career begins...`);
    },
  });

  choices.push({
    label: "Take Risks",
    requirements: { luck: 5 },
    onSelect: () => {
      storyBlocks.push(
        `You gamble on uncertain opportunities. The future is unclear.`,
      );
    },
  });
}

// ------------------------------------------------------------
// Main draw
// ------------------------------------------------------------
function drawGame() {
  background(250);

  push();
  translate(0, -scrollY);

  let y = 80;

  textAlign(LEFT, TOP);
  fill(30);
  textSize(20);

  // --- STORY ---
  for (let block of storyBlocks) {
    text(block, 80, y, width - 160);
    y += textSize() * 2.2;
  }

  y += 30;

  // --- CHOICES ---
  textSize(18);

  for (let choice of choices) {
    const meetsReq = meetsRequirements(choice.requirements);

    const btn = {
      x: width / 2,
      y: y + 20,
      w: 420,
      h: 50,
    };

    drawChoiceButton(btn, choice.label, meetsReq);

    if (meetsReq && isHover(btn)) {
      cursor(HAND);
    }

    if (!meetsReq) {
      fill(140);
      textSize(14);
      text(
        requirementText(choice.requirements),
        btn.x - btn.w / 2,
        btn.y + 35,
      );
    }

    y += 90;
  }

  maxScroll = max(0, y - height + 80);

  pop();
}

// ------------------------------------------------------------
// Choice button
// ------------------------------------------------------------
function drawChoiceButton({ x, y, w, h }, label, enabled) {
  rectMode(CENTER);
  noStroke();

  if (!enabled) {
    fill(220);
  } else if (isHover({ x, y, w, h })) {
    fill(255, 210, 170);
  } else {
    fill(245);
  }

  rect(x, y, w, h, 14);

  fill(enabled ? 30 : 150);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

// ------------------------------------------------------------
// Input
// ------------------------------------------------------------
function gameMousePressed() {
  let y = 80 + storyBlocks.length * 45 + 30;

  for (let choice of choices) {
    const btn = {
      x: width / 2,
      y: y + 20,
      w: 420,
      h: 50,
    };

    if (
      meetsRequirements(choice.requirements) &&
      isHover(btn)
    ) {
      choice.onSelect();
      break;
    }

    y += 90;
  }
}

// ------------------------------------------------------------
// Scroll
// ------------------------------------------------------------
function mouseWheel(event) {
  scrollY += event.delta;
  scrollY = constrain(scrollY, 0, maxScroll);
}

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------
function meetsRequirements(req = {}) {
  for (let stat in req) {
    if (player.stats[stat] < req[stat]) return false;
  }
  return true;
}

function requirementText(req) {
  return `Requires: ${Object.entries(req)
    .map(([s, v]) => `${s} ≥ ${v}`)
    .join(", ")}`;
}
