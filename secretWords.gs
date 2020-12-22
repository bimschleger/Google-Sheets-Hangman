function getCurrentSecretWord() {
  
  // Create secretWord object
  var secretWord = secretWordObject();
  
  // Set inactive secret words
  var activeSecretWords = getSecretWordsByActiveState(true);
  var word = activeSecretWords[0];
  
  // Assign the active secret word to the secret word object
  secretWord.id = word[0];
  secretWord.word = word[1];
  secretWord.difficulty = word[2];
  secretWord.active = word[3];
  
  Logger.log("Got the secret word: " + secretWord.word.toUpperCase() + ".");
  return secretWord;
};


/*
 *
 * Defines a reusable secret word object
 *
 * @return (object) secretWord - The core secretWord object
 *
 */

function secretWordObject() {
  
  secretWord = {
    "id": null,
    "word": null,
    "difficulty": null,
    "active": null
  };
  
  return secretWord;
};


/*
 *
 * Gets a new, random secret word.
 * 
 * @return {object} randomSecretWord - A new secret word, chosen at random.
 *
 */

function getNewSecretWord() {
  
  // Set inactive secret words
  var inactiveSecretWords = getSecretWordsByActiveState(false);
  
  // Select a random inactive word
  var randomIndex = Math.floor(Math.random() * inactiveSecretWords.length);
  var newRandomWord = inactiveSecretWords[randomIndex];
  
  // Create new secret word object
  var newSecretWord = secretWordObject();
  
  // Assign the random word to the secretWord object
  newSecretWord.id = newRandomWord[0];
  newSecretWord.word = newRandomWord[1];
  newSecretWord.difficulty = newRandomWord[2];
  newSecretWord.active = newRandomWord[3];
  Logger.log("Selected a new random word: " + newSecretWord.word.toUpperCase() +".");
  
  return newSecretWord;
};


/*
 *
 * Filters the list of all secret words and returns an array of secret words for an active state.
 *
 * @param {array} secretWords - A two-dimersional array that contains all active and inactive secretWord.
 * @return {array} SecretWordsByState = An array that contains the secret words for the state defined in the parameter.
 *
 */

function getSecretWordsByActiveState(activeState) {
  
  // Get secret word data
  var secretWordsData = getSecretWordsData();
  var secretWords = secretWordsData.values;
  
  var SecretWordsByState = [];
  
  // Loop to identify the secret words by state
  secretWords.forEach(function(word) {
    if (word[3] == activeState) {  // word[3] is the 'active' value
      SecretWordsByState.push(word)
      Logger.log("Added to the 'active = " + activeState + "' secret words array: " + word + ".");
    }
  });
  Logger.log("Found " + SecretWordsByState.length + " 'active = " + activeState + "' secret words.");
  
  return SecretWordsByState;

};
  

/* 
 *
 * Deactivates the current secret word and activates the new secret word.
 *
 * @param {object} currentWord - The current secret word object, containing ID, word, difficulty, and active.
 * @param {object} newWord - The new secret word object, containing ID, word, difficulty, and active.
 *
 */

function updateSecretWords(currentWord, newWord) {
  
  // Get secret word data
  var secretWordsData = getSecretWordsData();
  var secretWords = secretWordsData.values;
  
  // Deactivate the current secret word and activate the new secret word
  secretWords.forEach(function(secretWord) {
    if (secretWord[0] == currentWord.id) {
      secretWord[3] = false;
    } else if (secretWord[0] == newWord.id) {
      secretWord[3] = true;
    }
  });
  
  // Update the range in the sheet with the modified active and inactive words
  secretWordsData.range.setValues(secretWords);
  Logger.log("Updated " + currentWord.word.toUpperCase() + " to 'active = false'.");
  Logger.log("Updated " + newWord.word.toUpperCase() + " to 'active = true'.");
};


/* 
 *
 * A helper function to test if updateSecretWords() works as expected.
 *
 */

function demo() {
  var currentWord = getCurrentSecretWord();
  var newWord = getNewSecretWord();
  updateSecretWords(currentWord, newWord);
}


/* 
 *
 * Returns an object that contains the sheet, range, and values for all of the secret words.
 *
 * @return {object} secretWordsData - Contains the sheet, range, and values for all of the secret words.
 *
 */

function getSecretWordsData() {
  // Get the Secrets sheet
  var spreadsheetId = "1w2nzUBTjH-UGYAY0mfrq_xWnRjg1IBrQ8oYCCNzOSBI";
  var ss = SpreadsheetApp.openById(spreadsheetId);
  var sheetName = "Secret";
  var sheet = ss.getSheetByName(sheetName);
  
  // Sheet variables
  var firstRow = 2;
  var numRows = sheet.getLastRow() - 1;
  var firstColumn = 1;
  var numColumns = sheet.getLastColumn();
  
  // Get secret words
  var secretWordsRange = sheet.getRange(firstRow, firstColumn, numRows, numColumns);
  var secretWords = secretWordsRange.getValues();
  
  // Create an object that contains all of the secre words data
  var secretWordsData = {
    "spreadsheet": ss,
    "sheet": sheet,
    "range": secretWordsRange,
    "values": secretWords
  };
  
  return secretWordsData;
}
  

/*

todo

- on edit...
   x get the secret word (sheet)
- on new game...
   x get the sheet(sheet)
   x get the curent secret word
   x get a random new secret word / return (sheet, word {id, name, difficulty, active})
   x update the new secret word to be active (sheet, id, 
   - Update the guess word to be ????
   - update the previous secret word to be inactive
   
   */