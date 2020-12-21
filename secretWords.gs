function getCurentSecretWord() {
  
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
  
  var secretWord = secretWordObject();
  
  // Filter to find the active secret word
  secretWords.forEach(function(word) {
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