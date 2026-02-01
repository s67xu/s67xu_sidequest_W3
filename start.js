// NOTE: Do NOT add setup() or draw() in this file

let hasAwakened = false;
let fade = 0;

function drawStart() {
  rectMode(CORNER);
  textAlign(CENTER, CENTER);
  textSize(16);
  noStroke();
  drawingContext.shadowBlur = 0;
  cursor(ARROW);

  background(210, 235, 255);

  if (hasAwakened) fade = min(fade + 6, 255);

  fill(30, 40, 60, hasAwakened ? fade : 255);
  textSize(48);
  text("A Life Begins", width / 2, 200);

  textSize(18);
  fill(70, 90, 110, hasAwakened ? fade : 180);
  text("Every choice shapes who you become.", width / 2, 255);

  textSize(14);
  fill(90, 110, 130, hasAwakened ? 140 : 200);
  text(
    hasAwakened
      ? "You cannot restart a life.\n(…or can you?)"
      : "Click anywhere to wake up",
    width / 2,
    305
  );

  if (hasAwakened) {
    const startBtn = { x: width / 2, y: 420, w: 300, h: 70, label: "START LIFE" };
    const instrBtn = { x: width / 2, y: 510, w: 300, h: 70, label: "HOW IT WORKS" };

    drawStartButton(startBtn);
    drawStartButton(instrBtn);

    cursor(isHover(startBtn) || isHover(instrBtn) ? HAND : ARROW);
  }
}

function startMousePressed() {
  if (!hasAwakened) {
    hasAwakened = true;
    return;
  }

  if (isHover({ x: width / 2, y: 420, w: 300, h: 70 })) {
    currentScreen = "customize";
  } else if (isHover({ x: width / 2, y: 510, w: 300, h: 70 })) {
    currentScreen = "instr";
  }
}

function startKeyPressed() {
  if (!hasAwakened && keyCode === ENTER) {
    hasAwakened = true;
    return;
  }

  if (hasAwakened && keyCode === ENTER) currentScreen = "customize";
  if (hasAwakened && (key === "i" || key === "I")) currentScreen = "instr";
}

function drawStartButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  const hover = isHover({ x, y, w, h });

  noStroke();
  if (hover) {
    fill(255, 220, 180);
    drawingContext.shadowBlur = 18;
    drawingContext.shadowColor = color(255, 190, 140);
  } else {
    fill(255, 245, 225);
    drawingContext.shadowBlur = 8;
    drawingContext.shadowColor = color(200, 210, 220);
  }

  rect(x, y, w, h, 16);
  drawingContext.shadowBlur = 0;

  fill(50, 70, 90);
  textSize(24);
  text(label, x, y);
}
