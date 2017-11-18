const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Prompt: write a program that implements a fast spell checker. Given a word, it should calculate if the word is correctly spelled in constant time (with tune-able accuracy).

// Strategy: Use external word bank to create a dictionary object. Searching operation in object is constant time

// Assumptions: Spell checker does not need auto-correct functionality.

// Run: Create new SpellChecker object.
// Then, call its search method with the spelled word.

// Pass in english dictionary as a string
let engWords = String(fs.readFileSync(path.join(__dirname, './dictionary.js')));

class SpellChecker {
  constructor() {
    this.dictionary = {};
    // load words into dictionary
    this.create(engWords);
  }
  // creates dictionary object
  create(wordBank) {
    let wordArray = wordBank.toLowerCase().match(/[a-z]+/g);
    wordArray.forEach(word => {
      if (!this.dictionary[word]) this.dictionary[word] = 1;
    });
  }
  // search keyword in dictionary object
  // returns correct / not found
  search(keyword) {
    if (this.dictionary[keyword.toLowerCase()]) return 'correctly';
    return 'incorrectly';
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const spellChecker = new SpellChecker();

const checkWord = () => {
  rl.question('What word would you like to check? ', function (answer) {
    if (answer == 'exit')
      return rl.close();
    console.log('Got it! This word is spelled', spellChecker.search(answer) + '.');
    checkWord();
  });
};

checkWord();