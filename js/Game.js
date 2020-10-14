class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;
    this.isRunning = false;
  }

  startGame() {
    // hide the start screen overlay
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    // set isRunning game to true
    this.isRunning = true;
    // get random phrase
    this.activePhrase = this.getRandomPhrase();
    // display phrase on board
    this.activePhrase.addPhraseToDisplay();
  }

  // method to reset the game 
  resetGame() {
    // remove all li elements from ul
    const phraseUL = document.querySelector('#phrase ul');
    phraseUL.innerHTML = '';

    // enable all of onscreen keyboard buttons
    const allKeys = document.querySelectorAll('.key');
    allKeys.forEach(key => {
      key.disabled = false;
      key.classList.remove('chosen', 'wrong');
    });

    // reset all lifes left images
    const scoreboard = document.querySelectorAll('#scoreboard img');
    scoreboard.forEach(heart => heart.setAttribute('src', 'images/liveSmiley.png'));
  }

  // method to randomly retrieve one of phrases
  getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[randomIndex];
  }

  // method to hande player game interaction
  handleInteraction(selectedLetter) {
    // check if letter already had been selected 
    let letterAlreadySelected;
    const disabledKeys = document.querySelectorAll('button[disabled]');
    disabledKeys.forEach(key => key.textContent === selectedLetter ? letterAlreadySelected = true : '');
    // if it has been already selected return from the method
    if(letterAlreadySelected) return; 
    
    // get reference to all keys
    const allKeys = document.querySelectorAll('.key');
    // if key match selected letter, disable it and store its index 
    let selectedKeyIndex;
    allKeys.forEach( (key,index) => {
      if(key.textContent === selectedLetter) {
        key.disabled = true;
        selectedKeyIndex = index;
      }
    });

    //check if phrase contains letter
    const phraseContainsLetter = this.activePhrase.checkLetter(selectedLetter);
    if(!phraseContainsLetter) {
      // doesn't contain => add wrong css class to selected letter keyboard and remove life
      allKeys[selectedKeyIndex].classList.add('wrong');
      this.removeLife();
    } else {
      // contains => add chosen css class to selected letter keyboard
      allKeys[selectedKeyIndex].classList.add('chosen');
      this.activePhrase.showMatchedLetter(selectedLetter);

      // check if game won and call gameOver
      if(this.checkForWin()) {
        this.gameOver();
      }
    }
  }

  // method to remove life from scoreboard
  removeLife() {
    // get a reference to the scoreboard imgs
    const scoreboard = document.querySelectorAll('#scoreboard img');
    // reversed it so lifes are removed from right to left
    const indexReversed = (scoreboard.length - 1) - this.missed;
    // replace the live with lost smiley and increment missed variable
    scoreboard[indexReversed].setAttribute('src', 'images/lostSmiley.png');
    this.missed++;
    if(this.missed === 5) this.gameOver();
  }

  // method to check if player revealed all letters in active phrase
  checkForWin() {
    // get reference to phrase li letter elements && check if all have 'show' class
    const phrasesLI = document.querySelectorAll('.letter');
    return [...phrasesLI].every(li => li.classList.contains('show'));
  }

  // method to display win/lose screen
  gameOver(){
    // set isRunning game to false
    this.isRunning = false;
    // get reference to overlay div
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';
    // get reference to gameover message h1
    const gameOverMessageRef = document.getElementById('game-over-message');
    if(this.missed < 5) {
      // won message and screen
      gameOverMessageRef.textContent = "You rocked this, congratz ^_^! Click start game to play again";
      overlay.classList.replace('start', 'win');
    }else{
      // lost message and screen
      gameOverMessageRef.textContent = "Oh no all smileys are dead x_x! Click start game to play again";
      overlay.classList.replace('start', 'lose');
    }
    this.resetGame();
  }

  createPhrases(){
    const phrasesArray = [
      new Phrase('Go the extra mile'),
      new Phrase('Snug as a bug in a rug'), 
      new Phrase('FIsh out of water'), 
      new Phrase('Tip of the iceberg'), 
      new Phrase('Once in a blue moon')
    ];
    return phrasesArray;    
  }
}