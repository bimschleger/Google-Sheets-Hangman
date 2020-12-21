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
  secretWordsRange.forEach(function(word) {
    if (word[3] == true) {
      secretWord.id = word[0];
      secretWord.word = word[1];
      secretWord.difficulty = word[2];
      secretWord.active = word[3];
    }
  });
  
  return secretWord;
};

/*
 *
 * Get a particular sheet
 * 
 * @param {string} sheetName - The name of the sheet that you want
 * @param {object} sheet - The sheet that you requested
 *
 */

function getSheetByName(sheetName) {
  
  // Setup access to spreadsheet
  var ss = SpreadsheetApp.openById("1w2nzUBTjH-UGYAY0mfrq_xWnRjg1IBrQ8oYCCNzOSBI/");
  var sheet = ss.getSheetByName(sheetName);
  
  Logger.log("Got the sheet '" + sheetName + "'.");
  return sheet;
}


/*
 *
 * Get the values for all secret words
 * 
 * @return {array} secretWords - A two-dimensional array of secret words and their properties.
 *
 */

function getAllSecretWords() {
  
  var sheet = getSheetByName("Secret");
  
  // Get the range of secret words
  var firstRow = 2;
  var numRows = sheet.getLastRow() - 1;
  var firstColumn = 1;
  var numColumns = sheet.getLastColumn();
  
  var secretWordsRange = sheet.getRange(firstRow, firstColumn, numRows, numColumns);
  var secretWords = secretWordsRange.getValues(); // [[ID, Word, Difficulty, Active ], [...] ]
  
  Logger.log("Got all " + secretWords.length + " secret words.");
  
  var data = {
    "range": secretWordsRange,
    "secretWords": secretWords
  };
  
  return data;
}


/*
 *
 * Update the 'active' value for a particular secret word.
 * 
 * @param {integer} secretWordID - The ID of the secret word to update.
 * @param {boolean} active - The desired active value for the secret word ID.
 *
 */

function updateSecretWord(secretWordID, active) {
  
  // Setup access to spreadsheet
  var sheet = getSheetByName("Secret");
  
  // Get the range of secret words
  var secretWordsData = getAllSecretWords();
  
  // Find the row that contains the secret word, and update the 'active' value.
  secretWordsData.secretWords.forEach(function(word) {
    if (word[0] == secretWordID) {
      word[3] = active;
    };
  });
  
  // Take the updated list and re-insert
  secretWordsRange.setValues(secretWords);
}


/* 
 *
 * Get the ID of a new secret word
 *
 * @return {id} newSecretWordID - The ID of the new secret word.
 *
 */

function getRandomSecretWordID() {
  // Setup access to spreadsheet
  var sheet = getSheetByName("Secret");
  
  // Get the range of secret words
  var secretWords = getAllSecretWords();
  
  // Get all inactive secret words
  var inactiveSecretWords = [];
  
  secretWords.forEach(function(word) {
    if (word[3] == false) {
      inactiveSecretWords.pop(word);
    };
  });
  
  // Get a random secret word
  var randomIndex = Math.floor(Math.random() * inactiveSecretWords.length);
  var newSecretWord = inactiveSecretWords[randonIndex];
  var newSecretWordID = newSecretWord[0];
  
  return newSecretWordID;
}