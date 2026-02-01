// ------------------------------------------------------------
// main.js = the “router” (traffic controller) for the whole game
// ------------------------------------------------------------

// ------------------------------
// Global game state
// ------------------------------
let currentScreen = "start";
// "start" | "customize" | "instr" | "game" | "win" | "lose"

let player = {
  name: "",
  gender: "",
  stats: {
    appearance: 0,
    intelligence: 0,
    strength: 0,
    charisma: 0,
    luck: 0,
    memory: 0,
    creativity: 0,
    confidence: 0,
    optimistic: 0,
    popularity: 0,
  },
  pointsLeft: 30,
  family: null,
};

// ------------------------------
// setup() runs ONCE
// ------------------------------
function setup() {
  const c = createCanvas(800, 800);
  c.parent("canvas-container"); // ✅ critical for layout

  textFont("sans-serif");
}

// ------------------------------
// draw() runs every frame
// ------------------------------
function draw() {
  // 🔒 GLOBAL DRAW STATE RESET (ABSOLUTELY REQUIRED)
  rectMode(CORNER);
  textAlign(LEFT, BASELINE);
  textSize(16);
  strokeWeight(1);
  noStroke();
  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = "transparent";
  cursor(ARROW);

  // --------------------------
  // Screen routing
  // --------------------------
  if (currentScreen === "start") drawStart();
  else if (currentScreen === "customize") drawCustomize();
  else if (currentScreen === "instr") drawInstr();
  else if (currentScreen === "game") drawGame();
  else if (currentScreen === "win") drawWin();
  else if (currentScreen === "lose") drawLose();
}

// ------------------------------
// mousePressed()
// ------------------------------
function mousePressed() {
  if (currentScreen === "start") startMousePressed();
  else if (currentScreen === "customize") customizeMousePressed();
  else if (currentScreen === "instr") instrMousePressed();
  else if (currentScreen === "game") gameMousePressed?.();
  else if (currentScreen === "win") winMousePressed?.();
  else if (currentScreen === "lose") loseMousePressed?.();
}

// ------------------------------
// keyPressed()
// ------------------------------
function keyPressed() {
  if (currentScreen === "start") startKeyPressed();
  else if (currentScreen === "customize") customizeKeyPressed?.();
  else if (currentScreen === "instr") instrKeyPressed();
  else if (currentScreen === "game") gameKeyPressed?.();
  else if (currentScreen === "win") winKeyPressed?.();
  else if (currentScreen === "lose") loseKeyPressed?.();
}

// ------------------------------------------------------------
// Shared helper: isHover()
// ------------------------------------------------------------
function isHover({ x, y, w, h }) {
  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
}
