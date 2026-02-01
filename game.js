// NOTE: Do NOT add setup() or draw() in this file
// drawGame() is called by main.js

// --------------------------------------------------
// Story state
// --------------------------------------------------
let storyBlocks = [];
let choices = [];
let scrollY = 0;

let lifeState = {
  education: null, // "university" | "college" | "none"
  career: null, // "professional" | "creative" | "labor" | "business"
  relationship: null, // "single" | "married" | "divorced"
  housing: null, // "house" | "apartment" | "unstable"
  children: false,
};

const lifeEndings = [
  {
    id: "fulfilled_success",
    condition: () =>
      lifeState.career === "professional" &&
      lifeState.relationship === "married" &&
      player.stats.confidence >= 6,
    title: "A Life Well Lived",
    text: `
You built a life many admire.

Your career brought purpose, your relationships brought warmth,
and you faced challenges without losing yourself.

At the end, you are surrounded by people who truly knew you.
    `,
  },

  {
    id: "lonely_success",
    condition: () =>
      lifeState.career === "professional" &&
      lifeState.relationship === "single",
    title: "Success, at a Distance",
    text: `
You achieved more than most ever will.

Yet success often came at the cost of connection.
Your life was impressive — but quiet.

You leave behind a legacy, but few memories shared.
    `,
  },

  {
    id: "creative_legacy",
    condition: () =>
      lifeState.career === "creative" && player.stats.creativity >= 6,
    title: "The Creative Soul",
    text: `
You never chased certainty — only meaning.

Your work inspired people you never met.
Long after you are gone, pieces of you remain.

Not in wealth — but in influence.
    `,
  },

  {
    id: "family_centered",
    condition: () => lifeState.children && lifeState.relationship === "married",
    title: "A Life of Love",
    text: `
Your greatest achievement was not your career,
but the lives you helped shape.

Your legacy lives on through your children,
and the values you passed down.
    `,
  },

  {
    id: "unstable_survivor",
    condition: () =>
      lifeState.housing === "unstable" && player.stats.optimistic >= 5,
    title: "The Survivor",
    text: `
Life was never kind to you.

Yet you endured.
You adapted.
You survived.

Not every life is about winning —
some are about refusing to give up.
    `,
  },

  {
    id: "forgotten",
    condition: () => true, // fallback
    title: "An Ordinary Life",
    text: `
You lived quietly.

You made choices, felt joy, felt regret —
like countless others before you.

Your life mattered, even if the world never noticed.
    `,
  },
];

const LINE_HEIGHT = 28;
const MARGIN_X = 80;
const MAX_WIDTH = 640;

// --------------------------------------------------
// INIT STORY (called from customize screen)
// --------------------------------------------------
function initGameStory() {
  storyBlocks = [];
  choices = [];
  scrollY = 0;

  addStory(`You are born.`);
  addStory(`You are born into a ${selectedFamily} family.`);
  addStory(`Your parents named you ${player.name}.`);

  nextPhaseCareer();
}

// --------------------------------------------------
// DRAW GAME (SCROLLABLE)
// --------------------------------------------------
function drawGame() {
  background(250, 248, 245);
  fill(40);
  textAlign(LEFT, TOP);
  textSize(18);

  push();
  translate(0, -scrollY);

  let y = 80;
  for (let line of storyBlocks) {
    const h = textHeightWrapped(line);
    textWrapped(line, MARGIN_X, y);
    y += h + 12;
  }

  y += 40;

  for (let c of choices) {
    drawChoice(c, y);
    y += 60;
  }

  pop();
}

// --------------------------------------------------
// SCROLL
// --------------------------------------------------
function mouseWheel(e) {
  scrollY = max(0, scrollY + e.delta);
}

// --------------------------------------------------
// STORY HELPERS
// --------------------------------------------------
function addStory(text) {
  storyBlocks.push(text);
}

function setChoices(newChoices) {
  choices = newChoices;
}

// --------------------------------------------------
// TEXT WRAP HELPERS
// --------------------------------------------------
function textWrapped(str, x, y) {
  textLeading(LINE_HEIGHT);
  text(str, x, y, MAX_WIDTH);
}

function textHeightWrapped(str) {
  textLeading(LINE_HEIGHT);

  // Estimate number of wrapped lines
  const words = str.split(" ");
  let line = "";
  let lines = 1;

  for (let word of words) {
    const testLine = line + word + " ";
    if (textWidth(testLine) > MAX_WIDTH) {
      lines++;
      line = word + " ";
    } else {
      line = testLine;
    }
  }

  return lines * LINE_HEIGHT;
}

// --------------------------------------------------
// CHOICE DRAWING
// --------------------------------------------------
function drawChoice(choice, y) {
  const w = 520;
  const h = 44;
  const x = width / 2 - w / 2;

  const meetsReq = checkReq(choice.req);
  const hover =
    mouseX > x &&
    mouseX < x + w &&
    mouseY + scrollY > y &&
    mouseY + scrollY < y + h;

  noStroke();

  // BUTTON BACKGROUND
  if (!meetsReq) {
    fill(220);
  } else if (hover) {
    fill(255, 210, 170);
  } else {
    fill(235);
  }

  rect(x, y, w, h, 10);

  // BUTTON TEXT
  fill(meetsReq ? 40 : 150);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(choice.label, x + w / 2, y + h / 2 - (meetsReq ? 0 : 6));

  // REQUIREMENT TEXT (if locked)
  if (!meetsReq && choice.req) {
    textSize(12);
    fill(150, 80, 80);
    text(requirementText(choice.req), x + w / 2, y + h / 2 + 12);
  }

  // CLICK
  if (hover && meetsReq && mouseIsPressed) {
    mouseIsPressed = false;
    choice.action();
  }
}

function requirementText(req) {
  let parts = [];
  for (let stat in req) {
    parts.push(
      `${capitalize(stat)} ≥ ${req[stat]} (You have ${player.stats[stat]})`,
    );
  }
  return "Requires: " + parts.join(", ");
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// --------------------------------------------------
// REQUIREMENT CHECK
// --------------------------------------------------
function checkReq(req) {
  if (!req) return true;
  for (let stat in req) {
    if (player.stats[stat] < req[stat]) return false;
  }
  return true;
}

// --------------------------------------------------
// PHASES
// --------------------------------------------------

function determineEnding() {
  for (let ending of lifeEndings) {
    if (ending.condition()) return ending;
  }
}

// ===== CAREER =====
function nextPhaseCareer() {
  addStory(
    "As you grow older, the question of your future becomes unavoidable.",
  );

  setChoices([
    {
      label: "Go to university",
      req: { intelligence: 6 },
      action: () => {
        addStory("You attend university and expand your worldview.");
        lifeState.education = "university";
        lifeState.career = "professional";
        player.stats.intelligence += 1;
        player.stats.confidence += 1;
        nextPhaseRelationship();
      },
    },
    {
      label: "Go to college",
      action: () => {
        addStory("You attend college and learn practical skills.");
        lifeState.education = "college";
        lifeState.career = "labor";
        player.stats.confidence += 1;
        nextPhaseRelationship();
      },
    },
    {
      label: "Start working immediately",
      action: () => {
        addStory("You enter the workforce early and learn through experience.");
        lifeState.education = "none";
        lifeState.career = "labor";
        player.stats.strength += 1;
        nextPhaseRelationship();
      },
    },
  ]);
}

// ===== RELATIONSHIP =====
function nextPhaseRelationship() {
  addStory("As life continues, relationships begin to shape your world.");

  setChoices([
    {
      label: "Pursue romantic relationships",
      req: { charisma: 4 },
      action: () => {
        lifeState.relationship = "dating";

        addStory(
          player.stats.appearance >= 6
            ? "Many people develop crushes on you."
            : "Romance does not come easily, but you try.",
        );

        player.stats.popularity += player.stats.appearance >= 6 ? 1 : 0;
        nextPhaseCommitment();
      },
    },
    {
      label: "Stay single and focus on yourself",
      action: () => {
        lifeState.relationship = "single";
        addStory("You choose independence over romance.");
        player.stats.confidence += 1;
        nextPhaseHousing(false);
      },
    },
  ]);
}

// ===== COMMITMENT =====
function nextPhaseCommitment() {
  setChoices([
    {
      label: "Get married",
      req: { confidence: 5 },
      action: () => {
        lifeState.relationship = "married";
        addStory("You get married and build a shared life.");
        player.stats.optimistic += 1;
        nextPhaseHousing(true);
      },
    },
    {
      label: "Break up",
      action: () => {
        lifeState.relationship = "divorced";
        addStory("The relationship ends, leaving lasting lessons.");
        player.stats.memory += 1;
        nextPhaseHousing(false);
      },
    },
  ]);
}

// ===== HOUSING =====
function nextPhaseHousing(partnered = false) {
  addStory("You consider where and how you want to live.");

  setChoices([
    {
      label: "Buy a house",
      req: { confidence: 6 },
      action: () => {
        lifeState.housing = "house";
        addStory("You settle into a house that feels like home.");
        player.stats.confidence += 1;
        nextPhaseChildren(partnered);
      },
    },
    {
      label: "Rent an apartment",
      action: () => {
        lifeState.housing = "apartment";
        addStory("You live in an apartment, adapting with time.");
        nextPhaseChildren(partnered);
      },
    },
  ]);
}

// ===== CHILDREN =====
function nextPhaseChildren(partnered) {
  if (!partnered) {
    addStory("You live life on your own terms.");
    lifeState.children = false;
    return nextPhaseEnd();
  }

  setChoices([
    {
      label: "Have children",
      req: { optimistic: 4 },
      action: () => {
        lifeState.children = true;
        addStory("You raise children, shaping the next generation.");
        player.stats.optimistic += 1;
        nextPhaseEnd();
      },
    },
    {
      label: "Do not have children",
      action: () => {
        lifeState.children = false;
        addStory("You focus on your own journey.");
        nextPhaseEnd();
      },
    },
  ]);
}

// ===== END =====
function nextPhaseEnd() {
  addStory("Time moves forward, faster than you expect.");

  const ending = determineEnding();

  // ⬇️ spacing before ending
  addStory("");
  addStory(`— ${ending.title} —`);
  addStory("");
  addStory(ending.text.trim());
  addStory("");

  addStory("Eventually, your life comes to an end.");

  setChoices([
    {
      label: "Reflect on your life",
      action: () => {
        currentScreen = "win";
      },
    },
  ]);
}
