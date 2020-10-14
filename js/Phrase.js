class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }
  
  // method to add letter placeholders
  addPhraseToDisplay() {
    let placeHolderHTML = ``;
    // for each character in phrase, check if it's empty space or letter & append either space or letter li element to placeHolderHTML
    [...this.phrase].forEach(char => placeHolderHTML += (char === ' '? `<li class="space"> </li>` : `<li class="hide letter ${char}">${char}</li>`));
    
    // get the dom reference of phrase div ul & set the li elements
    const phraseUL = document.querySelector('#phrase ul');
    phraseUL.innerHTML = placeHolderHTML;
  }

  // method to check if letter selected is present in phrase
  checkLetter(letter) {
    return this.phrase.includes(letter);
  }
  
  // method to reveal letter(s) on the board that matches players selection
  showMatchedLetter(letter) {
    // get dom reference of phrase ul li elements
    const phrasesLI = document.querySelectorAll('.letter');
    // loop through and check if matches letter, if set the classname from hide to show
    phrasesLI.forEach(li => li.classList.contains(letter) ? li.classList.replace('hide', 'show') : '');
  }
}