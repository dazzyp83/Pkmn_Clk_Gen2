// config.js

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────

// Canvas dimensions: Updated to the new 320x288 resolution (160x144 scaled by 2x).
const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 288;

// The zoom factor is no longer needed since scaling is removed.
// const DISPLAY_ZOOM_FACTOR = 3;

// Name-box coordinates (scaled by 2x)
const BACK_NAME_END_X    = 298; // 149 * 2
const BACK_NAME_Y        = 144; // 72 * 2
const FRONT_NAME_START_X = 22;  // 11 * 2
const FRONT_NAME_END_X   = 170; // 80 * 2
const FRONT_NAME_Y       = 14;  // 7 * 2

// Sprite dimensions and base positions (scaled by 2x)
// Note: Your sprite images should be pre-resized to these new dimensions.
const BACK_SPRITE_W = 160;  // 80 * 2
const BACK_SPRITE_H = 160;  // 80 * 2
const BACK_SPRITE_BASE_X = 0;
const BACK_SPRITE_BASE_Y = 70;  // 35 * 2

const FRONT_SPRITE_W = 180;  // 90 * 2
const FRONT_SPRITE_H = 180;  // 90 * 2
const FRONT_SPRITE_BASE_X = 154; // 77 * 2
const FRONT_SPRITE_BASE_Y = -30; // -15 * 2

// HP Bar dimensions and positions (scaled by 2x)
const HP_LABEL_TEXT_SIZE = 12; // 6 * 2
const FRONT_HP_BAR_X = 60;     // 30 * 2
const FRONT_HP_BAR_Y = 34;     // 17 * 2
const BACK_HP_BAR_X = 186;     // 93 * 2
const BACK_HP_BAR_Y = 167;     // 83.5 * 2
const HP_BAR_W = 100;          // 50 * 2
const HP_BAR_H = 10;           // 5 * 2
const HP_BAR_RADIUS = 5;       // 2.5 * 2

// Clock position and text size (scaled by 2x)
const CLOCK_TEXT_SIZE = 48; // 24 * 2
const CLOCK_X_POS = 164;    // 82 * 2
const CLOCK_Y_POS = 234;    // 117 * 2

// Winner text position and size (scaled by 2x)
const WINNER_TEXT_SIZE = 20; // 10 * 2
const WINNER_TEXT_X = 164;   // 82 * 2
const WINNER_TEXT_Y = CLOCK_Y_POS - (WINNER_TEXT_SIZE / 2); // 234 - (20 / 2) = 224
const WINNER_TEXT_LINE_HEIGHT = WINNER_TEXT_SIZE + 2; // 20 + 2 = 22

// Day Screen Box (scaled by 2x)
const DAY_BOX_WIDTH = 240;   // 120 * 2
const DAY_BOX_HEIGHT = 60;   // 30 * 2
const DAY_BOX_X = (320 - 240) / 2; // (160 - 120) * 2
const DAY_BOX_Y = ((288 - 60) / 2) - 20; // ((144 - 30) / 2 - 10) * 2
const DAY_TEXT_SIZE_LABEL = 16;  // 8 * 2
const DAY_TEXT_SIZE_DAY = 28;    // 14 * 2

// Animation timings - These are not scaled as they are time-based
const ATTACK_LUNGE_OFFSET = 20; // 10 * 2
const ATTACK_ANIMATION_DURATION = 300;
const HIT_ANIMATION_DURATION = 400;
const FLASH_INTERVAL = 100;
const FRONT_TRANSITION_DURATION = 500;
const BACK_TRANSITION_DURATION = 500;
const WINNER_DISPLAY_DURATION = 2000;
const WINNER_FLASH_INTERVAL = 300;
const TURN_INTERVAL = 5 * 60 * 1000;