## Project Title

GBDA302 Week 3 Side Quest: A Life Begins

---

## Authors

Example Code created Karen Cochrane and David Han

Redesigned by: 
Full Name: [Sofia Xu]
WATID: [s67xu]
Student #: [21082052]

---

## Description

A Life Begins is an interactive life-simulation game presented as a scrollable narrative, inspired by web novels and choice-based storytelling.

Players begin by creating a character through name input, stat allocation, and family background selection. These early decisions influence which opportunities, life paths, and endings become available later in the game.

The core mechanic revolves around choice gating:

Certain options are unlocked or locked based on player stats

Locked options clearly explain why they are unavailable

No life path is strictly “correct” — each leads to a different outcome

The game progresses through major life phases such as education, career, relationships, housing, family, and death, ultimately leading to one of several endings that reflect the player’s accumulated decisions and personal attributes.

The experience emphasizes reflection over winning, encouraging players to consider how small advantages, limitations, and choices shape an entire life.

---

##  Interaction Instructions: 
### How to Play

#### Start Screen

- Click anywhere to wake up

- Choose to Start Your Life or read Instructions

#### Character Customization

- Type your name

- Allocate 30 stat points

- Choose a family background (each grants bonus stats)

- Use:

    - Use + / – buttons to adjust stats

    - Random Stats or Reset Stats

    - Random Family option

- All buttons provide hover feedback

- You must spend all points before continuing

#### Life Story (Game Screen)

- Read the story like a scrollable web novel

- Scroll with the mouse wheel

- Make choices at the bottom of the page

- Some choices may be locked based on stats

- Locked choices display required stats (e.g. Intelligence ≥ 6)

#### End of Life

- Your ending is determined by:

    - Career

    - Relationships

    - Family

    - Housing

    - Core stats

- Press R or click to restart your life

---

## Iteration Notes
#### Post-Playtest: Three Changes Made
1. Clearer Locked Choices

    - Added explicit explanations to disabled options (e.g. stat requirements)

    - Reduced player confusion during decision-making

2. Separated Base Stats and Player Allocation

    - Fixed a bug where choosing a family reset player stats

    - Stats now correctly stack: family bonus + player choices

3. Scrollable Narrative Layout

    - Replaced single-screen text with a vertically scrolling story

    - Improved readability and pacing, especially in later life stages

#### Post-Showcase: Planned Improvements
1. More Branching Mid-Life Events

    - Add unexpected life events (illness, opportunity, relocation)

    - Increase replayability and emotional variance

2. Expanded Ending Summary Screen

    - Show a breakdown of:

        - Final stats

        - Major decisions

        - Missed opportunities

    - Help players better reflect on their life path

---

## Learning Goals

- Understand how to manage multiple game states using a shared currentScreen variable
- Practice separating code across multiple files for readability and maintenance
- Implement clickable and keyboard-accessible UI buttons
- Learn how to route draw(), mousePressed(), and keyPressed() logic based on the active screen
- Build a basic instructions screen with a functional back button

---

## Assets

N/A

---

## GenAI

The original example code structure for this project was written by Dr. Karen Cochrane as part of the course materials. GenAI tools were used by Dr. Cochrane to assist in generating explanatory comments within the example code.

Building on this foundation, the game was redesigned, extended, and restructured by Sofia using GenAI as a collaborative design and debugging tool. GenAI was used to:

- Refactor and reorganize code across multiple game states

- Design and implement new gameplay systems (life simulation, stat-gated choices, endings)

- Debug logical errors and UI issues

- Iteratively redesign interaction flows, narrative structure, and visual feedback
- Assist in writing, revising, and refining project instructions and process documentation

All creative decisions, game mechanics, narrative direction, and final implementation choices were made by Sofia. GenAI functioned as a support tool rather than an autonomous author.

---
