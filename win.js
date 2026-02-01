// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js

// ------------------------------------------------------------
// Main draw function for win screen
// ------------------------------------------------------------
function drawWin() {
  background(245, 250, 245); // soft, calm ending tone

  fill(40, 60, 80);
  textAlign(CENTER, TOP);

  // ---- Title ----
  textSize(42);
  text("Your Life Comes to an End", width / 2, 80);

  // ---- Life Summary ----
  textSize(18);
  let y = 160;
  const lineGap = 34;

  text(`Name: ${player.name}`, width / 2, y);
  y += lineGap;

  text(
    `Career: ${formatCareer(lifeState.career)}`,
    width / 2,
    y
  );
  y += lineGap;

  text(
    `Relationship: ${formatRelationship(lifeState.relationship)}`,
    width / 2,
    y
  );
  y += lineGap;

  text(
    `Housing: ${formatHousing(lifeState.housing)}`,
    width / 2,
    y
  );
  y += lineGap;

  text(
    `Children: ${lifeState.children ? "Yes" : "No"}`,
    width / 2,
    y
  );

  // ---- Divider ----
  y += 50;
  stroke(180);
  line(width / 2 - 200, y, width / 2 + 200, y);
  noStroke();

  // ---- Achievement Highlights ----
  y += 40;
  textSize(22);
  text("You Were Known For", width / 2, y);

  y += 36;
  textSize(16);

  const highlights = getTopStats(3);
  for (let stat of highlights) {
    text(`• ${capitalize(stat)} (${player.stats[stat]})`, width / 2, y);
    y += 26;
  }

  // ---- Restart Hint ----
  y += 60;
  fill(90, 110, 130);
  textSize(16);
  text("Click anywhere or press R to live again.", width / 2, y);
}

// ------------------------------------------------------------
// Mouse input
// ------------------------------------------------------------
function winMousePressed() {
  restartLife();
}

// ------------------------------------------------------------
// Keyboard input
// ------------------------------------------------------------
function winKeyPressed() {
  if (key === "r" || key === "R") {
    restartLife();
  }
}

// ------------------------------------------------------------
// Restart helper
// ------------------------------------------------------------
function restartLife() {
  // Reset core game state
  storyBlocks = [];
  choices = [];
  scrollY = 0;

  lifeState = {
    education: null,
    career: null,
    relationship: null,
    housing: null,
    children: false,
  };

  currentScreen = "start";
}

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------
function getTopStats(n) {
  return Object.keys(player.stats)
    .sort((a, b) => player.stats[b] - player.stats[a])
    .slice(0, n);
}

function formatCareer(c) {
  if (!c) return "Uncertain";
  if (c === "professional") return "Professional";
  if (c === "creative") return "Creative";
  if (c === "labor") return "Working Class";
  if (c === "business") return "Entrepreneur";
  return capitalize(c);
}

function formatRelationship(r) {
  if (!r) return "Undefined";
  if (r === "single") return "Single";
  if (r === "married") return "Married";
  if (r === "divorced") return "Divorced";
  return capitalize(r);
}

function formatHousing(h) {
  if (!h) return "Unstable";
  if (h === "house") return "House Owner";
  if (h === "apartment") return "Apartment Living";
  return capitalize(h);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
