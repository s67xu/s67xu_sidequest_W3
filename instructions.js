// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines:
// 1) drawInstr() → what the instructions screen looks like
// 2) input handlers → how the player returns to the start screen
// 3) helper functions specific to this screen

// ------------------------------
// Main draw function for instructions screen
// ------------------------------
function drawInstr() {
  background(245, 245, 250);

  fill(40, 60, 80);
  textAlign(CENTER, TOP);

  // ---- Title ----
  textSize(38);
  text("How This Life Works", width / 2, 60);

  // ---- Instruction text ----
  textSize(16);
  textAlign(LEFT, TOP);

  const instructions = `
This is a life simulation game.

You will not “win” or “lose” immediately.
Instead, you will make choices and live with them.

–––––––––––––––––––––––––––

CHARACTER CREATION

• Choose your name
• Allocate 30 stat points
• Select a family background

Your family background grants bonus stats.
Your allocated stats represent your personal strengths.

–––––––––––––––––––––––––––

STATS & CHOICES

Stats affect which choices are available.

Some choices are locked.
When a choice is locked, the game tells you why:
(for example: “Requires Intelligence ≥ 6”)

Higher stats unlock more opportunities,
but no life path is perfect.

–––––––––––––––––––––––––––

THE STORY

The game is told like a web novel.

• Read from top to bottom
• Scroll to continue
• Choose how your life unfolds

Your decisions shape:
• Education
• Career
• Relationships
• Family
• Lifestyle

–––––––––––––––––––––––––––

ENDINGS

There are many possible endings.

Your ending depends on:
• Your choices
• Your stats
• Your relationships
• Your resilience

Even an ordinary life still matters.

–––––––––––––––––––––––––––

CONTROLS

• Click buttons to make choices
• Scroll to read more
• Press R at the end to live again

Take your time.
Every life is different.
`;

  text(
    instructions,
    100,
    130,
    width - 200
  );

  // ---- Back button ----
  const backBtn = {
    x: width / 2,
    y: height - 80,
    w: 240,
    h: 60,
    label: "BACK TO START",
  };

  drawInstrButton(backBtn);
  cursor(isHover(backBtn) ? HAND : ARROW);
}

// ------------------------------
// Mouse input
// ------------------------------
function instrMousePressed() {
  const backBtn = { x: width / 2, y: height - 80, w: 240, h: 60 };
  if (isHover(backBtn)) {
    currentScreen = "start";
  }
}

// ------------------------------
// Keyboard input
// ------------------------------
function instrKeyPressed() {
  if (keyCode === ESCAPE) {
    currentScreen = "start";
  }
  if (key === "b" || key === "B") {
    currentScreen = "start";
  }
}

// ------------------------------
// Button drawing helper
// ------------------------------
function drawInstrButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  const hover = isHover({ x, y, w, h });

  noStroke();

  if (hover) {
    fill(255, 210, 170);
    drawingContext.shadowBlur = 14;
    drawingContext.shadowColor = color(255, 190, 140);
  } else {
    fill(235);
    drawingContext.shadowBlur = 6;
    drawingContext.shadowColor = color(200, 210, 220);
  }

  rect(x, y, w, h, 14);
  drawingContext.shadowBlur = 0;

  fill(50, 70, 90);
  textSize(22);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}
