// state.js

// ─────────────────────────────────────────────────────────────────────────────
// STATE & ASSETS
// ─────────────────────────────────────────────────────────────────────────────

// Assets
let bg;
let pokemonList = [];
let gameboyFont;

// Current battle info
let frontSprite, backSprite;
let frontName, backName;
let hpFront, hpBack;
let frontPokemonData, backPokemonData;

// Battle state
let currentTurn = 0;
let lastTurnTime = 0;
let battleActive = false;
let winner = null;
let lastWinnerPosition = null;
let winnerDisplayTime = 0;
let winnerHpFillStart = 0;
let processingBattleEnd = false;
let battleEndedTimestamp = 0;
let turnLock = false;

// Animation state
let isAnimatingAttack = false;
let attackAnimationStartTime = 0;
let attackingPokemon = null;
let hitAnimationTriggered = false;

let isAnimatingHit = false;
let hitAnimationStartTime = 0;
let defendingPokemon = null;

// Sprite transition state
let frontCurrentY = 0;
let frontTransitionPhase = 'idle';
let frontTransitionStartTime = 0;

let backCurrentX = 0;
let backTransitionPhase = 'idle';
let backTransitionStartTime = 0;

// Screen Management
let currentScreen = 'battle';
let showTime = true;
let isFlashingWinnerText = false;
