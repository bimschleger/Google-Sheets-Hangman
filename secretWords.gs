function getSecretWord() {
  
  var sheet = getSheetByName("Secret");
  
  var secretWordsRange = getAllSecretWords();
  var secretWord = {
    "id": null,
    "word": null,
    "difficulty": null,
    "active": null
  };
  
  // Filter to find the active secret word
  secretWordsRange.range.forEach(function(word) {
    if (word[3] == true) {
      secretWord.id = word[0];
      secretWord.word = word[1];
      secretWord.difficulty = word[2];
      secretWord.active = word[3];
    }
  });
  Logger.log("Got the secret word: " + secretWord.word.toUpperCase() + ".");
  return secretWord;
};

/*

todo

- on edit...
   - get the secret word (sheet)
- on new game...
   - get the sheet(sheet)
   - get the curent secret word
   - get a random new secret word / return (sheet, word {id, name, difficulty, active})
   - update the new secret word to be active (sheet, id, 
   - Update the guess word to be ????
   - update the previous secret word to be inactive
   
   */