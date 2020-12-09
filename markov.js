/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i++) {
      const currWord = this.words[i];
      const nextWord = this.words[i + 1];

      if (chains.has(currWord)) {
        chains.get(currWord).push(nextWord);
      } else {
        chains.set(currWord, [nextWord]);
      }
    }

    this.chains = chains;
    return this.chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    const content = [];
    for (let i = 0; i < numWords; i++) {
      const randomKeyIndex = Math.floor(Math.random() * Array.from(this.chains.keys()).length);
      const randomKey = Array.from(this.chains.keys())[randomKeyIndex];
      const keyValue = this.chains.get(randomKey)[Math.floor(Math.random() * this.chains.get(randomKey).length)];



      content.push(randomKey);
      if (keyValue) content.push(keyValue);


    }
    const finalPassage = content.slice(0, numWords).join(" ")
    console.log(finalPassage);
    return finalPassage;
  }
}

module.exports = { MarkovMachine }