const fs = require('fs');
const path = require('path');

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
  // returns boolean value
  search(keyword) {
    if (this.dictionary[keyword.toLowerCase()]) return true;
    return false;
  }
}

const spellChecker = new SpellChecker();
// full word
console.log(spellChecker.search('crab'));
console.log(spellChecker.search('water'));

// partial
console.log(spellChecker.search('suitcase'));
console.log(spellChecker.search('suitcase'));

// does not exist
console.log(spellChecker.search('pqr'));
console.log(spellChecker.search('xyz'));