const fs = require("fs");
const nspell = require("nspell");

const getSpellCheck = () => {
  const aff = fs.readFileSync("./dicts/es.aff", { encoding: "utf-8" });
  const dic = fs.readFileSync("./dicts/es.dic", { encoding: "utf-8" });
  const spellChecker = new nspell(aff, dic);
  return spellChecker;
};

/**
 *
 * @param {string[]} a
 * @param {string} key
 * @param {boolean[]} used
 * @param {Set<string>} subSets
 */
function nextLetter(characters, key, used, subSets) {
  if (key.length == characters.length) {
    return;
  }
  for (var i = 0; i < characters.length; i++) {
    if (!used[i]) {
      subSets.add(key + characters[i]);
      used[i] = true;
      nextLetter(characters, key + characters[i], used, subSets);
      used[i] = false;
    }
  }
}

/**
 *
 * @param {string[]} characters
 * @returns {string[]}
 */
const combinations = (characters) => {
  var subSets = new Set();
  const used = Array(characters.length).fill(false);
  for (var i = 0; i < characters.length; i++) {
    subSets.add(characters[i]);
    used[i] = true;
    nextLetter(characters, characters[i], used, subSets);
    used[i] = false;
  }
  return [...subSets];
};

module.exports = (req, res) => {
  const spellCheck = getSpellCheck();
  console.log("nspell started")
  let arrayOfLetter = [...req.query.letterInputs] || [];
  
  console.log('request queries', req.query);
  console.log('query letterInputs', req.query.letterInputs);
  console.log('array of letter', arrayOfLetter);
  

  let response = [];

  const combinationList = combinations(arrayOfLetter);

  console.log("combination calculated")

  combinationList.forEach((combination) => {
    if (spellCheck.correct(combination)) response = [...response, combination];
  });

  let result = {};
  console.log('words', response);
  response.forEach((word) => {
    const obj = result[word.length];
    if (!obj) {
      result[word.length] = { length: word.length, words: [word] };
    } else {
      obj.words.push(word);
    }
  });
  

  result = Object.keys(result)
    .sort()
    .map((k) => result[k]);

  console.log('result', result);
  res.send(result);
};
