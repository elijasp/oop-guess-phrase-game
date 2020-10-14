let game = null;

// start button reference
const startButton = document.getElementById('btn__reset');
// click event event listener on button to start game
startButton.addEventListener('click', e => {
  game = new Game();
  game.startGame()
});

// click event listener for all key buttons
const keyboard = document.getElementById('qwerty');
keyboard.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON'){
    game.handleInteraction(e.target.textContent);
  }
});

// keyup listener so keyboard can be used
document.addEventListener('keyup', e => {
  const letter = e.key.toLowerCase();
  // verify game started 
  if(game !== null && game.isRunning) {
    // verify user input matches available keys
    const allKeys = document.querySelectorAll('.key');
    allKeys.forEach(key => key.textContent === letter ? game.handleInteraction(letter) : '');
  } 
});