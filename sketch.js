// sketch.js

// ─────────────────────────────────────────────────────────────────────────────
// MAIN P5.JS FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

function preload() {
  bg = loadImage('bg.png');
  gameboyFont = loadFont('pokemon-gsc-font.ttf');
  pokemonList = loadJSON('pokemonList.json');
}

function setup() {
  pixelDensity(1);
  // Set the canvas directly to the desired resolution
  createCanvas(320, 288);
  noSmooth();
  textFont(gameboyFont);
  textAlign(CENTER, CENTER);
  
  if (!Array.isArray(pokemonList)) {
    pokemonList = Object.values(pokemonList);
  }
  
  startNewBattle();
}

function draw() {
  background(0);

  // The scaling function is removed, so the canvas is drawn at its full size.
  // The push() and pop() are no longer needed.
  drawBattleScreen();

  // Check if it's time for an automatic turn
  if (battleActive && !processingBattleEnd && !turnLock && millis() - lastTurnTime > TURN_INTERVAL) {
    takeTurn();
    lastTurnTime = millis();
  }
}

function mouseClicked() {
  // A click anywhere will now only attempt to trigger the next turn in the battle
  if (battleActive && !processingBattleEnd && !turnLock) {
    takeTurn();
    lastTurnTime = millis();
  }
}