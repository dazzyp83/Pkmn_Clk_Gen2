// battle.js

// ─────────────────────────────────────────────────────────────────────────────
// BATTLE LOGIC
// ─────────────────────────────────────────────────────────────────────────────

function startNewBattle() {
  if (pokemonList.length === 0) return;

  let nextFrontPokemon, nextBackPokemon;
  let shouldFrontAnimateExit = false;
  let shouldBackAnimateExit = false;

  if (winner) {
    if (lastWinnerPosition === 'front') {
      nextFrontPokemon = winner;
      shouldBackAnimateExit = true;
      let newBackPIndex;
      do {
        newBackPIndex = floor(random(pokemonList.length));
      } while (pokemonList[newBackPIndex].name === nextFrontPokemon.name);
      nextBackPokemon = pokemonList[newBackPIndex];
    } else {
      nextBackPokemon = winner;
      shouldFrontAnimateExit = true;
      let newFrontPIndex;
      do {
        newFrontPIndex = floor(random(pokemonList.length));
      } while (pokemonList[newFrontPIndex].name === nextBackPokemon.name);
      nextFrontPokemon = pokemonList[newFrontPIndex];
    }
    winner = null;
    lastWinnerPosition = null;
  } else {
    shouldFrontAnimateExit = true;
    shouldBackAnimateExit = true;
    let i = floor(random(pokemonList.length)),
      j;
    do {
      j = floor(random(pokemonList.length));
    } while (j === i);
    nextFrontPokemon = pokemonList[i];
    nextBackPokemon = pokemonList[j];
  }

  frontPokemonData = nextFrontPokemon;
  backPokemonData = nextBackPokemon;

  frontName = frontPokemonData.name;
  hpFront = 1;
  backName = backPokemonData.name;
  hpBack = 1;

  battleActive = true;
  processingBattleEnd = false;
  currentTurn = floor(random(2));
  lastTurnTime = millis();
  isAnimatingAttack = false;
  attackingPokemon = null;
  hitAnimationTriggered = false;
  isAnimatingHit = false;
  defendingPokemon = null;
  battleEndedTimestamp = 0;
  turnLock = false;

  if (shouldBackAnimateExit) {
    backTransitionPhase = 'exiting';
    backTransitionStartTime = millis();
    setTimeout(() => {
      loadImage(`back/${backPokemonData.file}`, img => {
        backSprite = img;
        backTransitionPhase = 'entering';
        backTransitionStartTime = millis();
      });
    }, BACK_TRANSITION_DURATION);
  } else {
    loadImage(`back/${backPokemonData.file}`, img => {
      backSprite = img;
    });
  }

  if (shouldFrontAnimateExit) {
    frontTransitionPhase = 'exiting';
    frontTransitionStartTime = millis();
    setTimeout(() => {
      loadImage(`front/${frontPokemonData.file}`, img => {
        frontSprite = img;
        frontTransitionPhase = 'entering';
        frontTransitionStartTime = millis();
      });
    }, FRONT_TRANSITION_DURATION);
  } else {
    loadImage(`front/${frontPokemonData.file}`, img => {
      frontSprite = img;
    });
  }
}

function takeTurn() {
  if (turnLock) return;
  turnLock = true;

  if (!battleActive || processingBattleEnd) {
    turnLock = false;
    return;
  }

  isAnimatingAttack = true;
  attackAnimationStartTime = millis();
  hitAnimationTriggered = false;

  let damageAmount = random(0.1, 0.3);

  if (currentTurn === 0) {
    attackingPokemon = 'front';
    defendingPokemon = 'back';
    hpBack = constrain(hpBack - damageAmount, 0, 1);
  } else {
    attackingPokemon = 'back';
    defendingPokemon = 'front';
    hpFront = constrain(hpFront - damageAmount, 0, 1);
  }

  if (hpFront <= 0 || hpBack <= 0) {
    battleActive = false;
    processingBattleEnd = true;
    winnerDisplayTime = millis();
    battleEndedTimestamp = millis();
    isFlashingWinnerText = true;

    if (hpFront <= 0) {
      winner = backPokemonData;
      lastWinnerPosition = 'back';
      winnerHpFillStart = hpBack;
    } else {
      winner = frontPokemonData;
      lastWinnerPosition = 'front';
      winnerHpFillStart = hpFront;
    }
    setTimeout(startNewBattle, 3000);
  } else {
    currentTurn = 1 - currentTurn;
    turnLock = false;
  }
}
