// drawing.js

// ─────────────────────────────────────────────────────────────────────────────
// DRAWING FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

function drawBattleScreen() {
  image(bg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  let currentFrontSpriteDrawX = FRONT_SPRITE_BASE_X;
  let currentBackSpriteDrawX = BACK_SPRITE_BASE_X;

  if (isAnimatingAttack) {
    let elapsedTime = millis() - attackAnimationStartTime;
    if (elapsedTime < ATTACK_ANIMATION_DURATION) {
      let progress = elapsedTime / ATTACK_ANIMATION_DURATION;
      let offset = sin(progress * PI) * ATTACK_LUNGE_OFFSET;

      if (attackingPokemon === 'front') {
        currentFrontSpriteDrawX -= offset;
      } else if (attackingPokemon === 'back') {
        currentBackSpriteDrawX += offset;
      }

      if (!hitAnimationTriggered && progress >= 0.4 && progress <= 0.6) {
        isAnimatingHit = true;
        hitAnimationStartTime = millis();
        hitAnimationTriggered = true;
      }
    } else {
      isAnimatingAttack = false;
      attackingPokemon = null;
      hitAnimationTriggered = false;
    }
  }

  // Handle sprite transitions and drawing
  updateAndDrawSprites(currentFrontSpriteDrawX, currentBackSpriteDrawX);

  drawNames();
  drawHp();

  if (showTime) {
    drawClock();
  }

  if (winner && millis() - winnerDisplayTime < WINNER_DISPLAY_DURATION) {
    let elapsedTime = millis() - winnerDisplayTime;
    let flashOn = (elapsedTime % (2 * WINNER_FLASH_INTERVAL)) < WINNER_FLASH_INTERVAL;
    if (flashOn) {
      drawWinnerText();
    }
    animateWinnerHp();
    showTime = false;
  } else {
    showTime = true;
  }
}

function updateAndDrawSprites(currentFrontSpriteDrawX, currentBackSpriteDrawX) {
    // Front sprite slide animation logic
    if (frontTransitionPhase === 'exiting') {
        let elapsedTime = millis() - frontTransitionStartTime;
        let progress = constrain(elapsedTime / FRONT_TRANSITION_DURATION, 0, 1);
        frontCurrentY = lerp(FRONT_SPRITE_BASE_Y, -FRONT_SPRITE_H, progress);
    } else if (frontTransitionPhase === 'entering') {
        let elapsedTime = millis() - frontTransitionStartTime;
        let progress = constrain(elapsedTime / FRONT_TRANSITION_DURATION, 0, 1);
        frontCurrentY = lerp(-FRONT_SPRITE_H, FRONT_SPRITE_BASE_Y, progress);
        if (progress === 1) frontTransitionPhase = 'idle';
    }

    // Back sprite slide animation logic
    if (backTransitionPhase === 'exiting') {
        let elapsedTime = millis() - backTransitionStartTime;
        let progress = constrain(elapsedTime / BACK_TRANSITION_DURATION, 0, 1);
        backCurrentX = lerp(BACK_SPRITE_BASE_X, -BACK_SPRITE_W, progress);
    } else if (backTransitionPhase === 'entering') {
        let elapsedTime = millis() - backTransitionStartTime;
        let progress = constrain(elapsedTime / BACK_TRANSITION_DURATION, 0, 1);
        backCurrentX = lerp(-BACK_SPRITE_W, BACK_SPRITE_BASE_X, progress); // Corrected variable name
        if (progress === 1) backTransitionPhase = 'idle';
    }

    let drawFront = true;
    let drawBack = true;

    if (isAnimatingHit) {
        let hitElapsedTime = millis() - hitAnimationStartTime;
        if (hitElapsedTime < HIT_ANIMATION_DURATION) {
            if (floor(hitElapsedTime / FLASH_INTERVAL) % 2 === 1) {
                if (defendingPokemon === 'front') drawFront = false;
                else drawBack = false;
            }
        } else {
            isAnimatingHit = false;
        }
    }

    blendMode(BLEND);
    if (backSprite && drawBack) {
        image(backSprite, backCurrentX + (currentBackSpriteDrawX - BACK_SPRITE_BASE_X), BACK_SPRITE_BASE_Y, BACK_SPRITE_W, BACK_SPRITE_H);
    }
    if (frontSprite && drawFront) {
        image(frontSprite, currentFrontSpriteDrawX, frontCurrentY, FRONT_SPRITE_W, FRONT_SPRITE_H);
    }
}

function drawNames() {
  textSize(HP_LABEL_TEXT_SIZE);
  fill(0);
  noStroke();

  textAlign(LEFT, TOP);
  let s = frontName || '';
  const maxW = (FRONT_NAME_END_X - FRONT_NAME_START_X);
  while (textWidth(s) > maxW && s.length) {
    s = s.slice(0, -1);
  }
  text(s, FRONT_NAME_START_X, FRONT_NAME_Y);

  textAlign(RIGHT, TOP);
  text(backName || '', BACK_NAME_END_X, BACK_NAME_Y);
}

function drawHp() {
  drawHpBar(FRONT_HP_BAR_X, FRONT_HP_BAR_Y, HP_BAR_W, HP_BAR_H, hpFront);
  drawHpBar(BACK_HP_BAR_X, BACK_HP_BAR_Y, HP_BAR_W, HP_BAR_H, hpBack);
}

function drawHpBar(x, y, w, h, pct) {
  pct = constrain(pct, 0, 1);
  noStroke();
  fill(100);
  rect(x, y, pct * w, h, HP_BAR_RADIUS);
  noFill();
  stroke(0);
  strokeWeight(1);
  rect(x, y, w, h, HP_BAR_RADIUS);
}

function drawClock() {
  textSize(CLOCK_TEXT_SIZE);
  textAlign(CENTER, CENTER);
  fill(0);
  const hrs = nf(hour(), 2);
  const mins = nf(minute(), 2);
  text(`${hrs}:${mins}`, CLOCK_X_POS, CLOCK_Y_POS);
}

function drawWinnerText() {
  if (!winner) return;

  textSize(WINNER_TEXT_SIZE);
  textAlign(CENTER, CENTER);
  fill(0);
  noStroke();

  text(winner.name.toUpperCase(), WINNER_TEXT_X, WINNER_TEXT_Y);
  text("WINS!", WINNER_TEXT_X, WINNER_TEXT_Y + WINNER_TEXT_LINE_HEIGHT);
}

function animateWinnerHp() {
  let elapsedTime = millis() - winnerDisplayTime;
  let fillPercentage = map(elapsedTime, 0, WINNER_DISPLAY_DURATION, winnerHpFillStart, 1);
  fillPercentage = constrain(fillPercentage, 0, 1);

  if (lastWinnerPosition === 'front') {
    hpFront = fillPercentage;
  } else if (lastWinnerPosition === 'back') {
    hpBack = fillPercentage;
  }
}
