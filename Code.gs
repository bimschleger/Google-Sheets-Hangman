/*
 *
 * The event handler triggered when editing the spreadsheet.
 *
 * @param {Event} event The onEdit event.
 *
 */

function onEdit(event) {
  var activeSheet = event.source.getActiveSheet();
  
  if (activeSheet.getName() == "Game") { // Checks to see if the 'Game' sheet is the one that was edited.
    event.status = isUserGuessValid(event);
    if (event.status.valid == true) {
      /*
      - get the array of correct guesses
      - get the array of incorrect guesses
      - get the remaining guesses
      - determine if the user guess 
      */
    };
    
    updateSheetWithGuessMessage(event);
  };
};


/*
* 
* Determines if the user entered a valid guess
*
* @param {object} event - The onEdit event object, include a message field.
* @return {object} status - Status contains the validity of a guess, and the message to display to the user.
*
*/

function isUserGuessValid(event) {
  
  var editedRow = event.range.getRow();
  var editedColumn = event.range.getColumn();
  
  var status = {
    "message": null,
    "valid": null
  };
  
  if (editedRow == 2 && editedColumn == 2) {  // correct row and column
    if (event.value == null) { // For example, deleting the value in a cell.
      status.message = null;
      status.valid = false;
    } else {
      if (event.value.length == 1) {
        if (event.value.match(/[A-Za-z]/)) {
          status.message = "Nice guess!";
          status.valid = true;
        } else {
          status.message = "Try guessing a letter.";
          status.valid = false;
        }
      } else {
        status.message = "Try guessing only one letter.";
        status.validGuess = false;
      }
    }
  } else {
    status.message = "Try editing the cell in B2.";
    status.valid = false;
    setCellToOldValue(event);
  };
  
  Logger.log("Determined the following status: valid: " + status.valid + " and message: " + status.message);
  return status;
};


/*
*
* Sets the value of the message field that appears next to the guessing box.
*
* @param {object} event - The onEdit event
*
*/

function updateSheetWithGuessMessage(event) {
  
  var messageRow = 2;
  var messageColumn = 3;
  var message = event.status.message;
  var ss = event.source;
  var sheet = ss.getSheetByName("Game");
  var message_range = sheet.getRange(messageRow, messageColumn, 1, 1);
  
  message_range.setValue(message);
  Logger.log("Updated 'Game' sheet with the message: " + message);
};
  

/*
*
* Updates a cell to its previous value.
*
* @param {object} event - The onEdit event
*
*/

function setCellToOldValue(event) {
  
  var editedRow = event.range.getRow();
  var editedColumn = event.range.getColumn();
  var sheet = event.source.getSheets()[0];
  
  var oldCellRange = sheet.getRange(editedRow, editedColumn, 1, 1);
  oldCellRange.setValue(event.oldValue);
  
  Logger.log("Updated row " + editedRow + " / column " + editedColumn + " to its previous value: " + event.oldValue);
};



  
  
 

/* 

TODO:

- get the word for the game (filter by 'active' in sheet 'Secret')
- get correct guesses
- get incorrect guesses
- get remaining guesses
- determine if guess is in word
- if yes...
   - add guess to correct guesses array
   - sort array alpabetically
   - get 'game' sheet, 
   - make 'game' sheet active
   - get range for 'correct guesses'
   - set range for updated 'correct guesses'
   - get word progress
   - replace '?' with guess
   - get range for progress
   - set range for updates progress
   - Is the word complete?
      - If yes...
         - Get congratulatory message
         - set congratulatory message to message cell
- if no...
   - add guess to incorrect guesses array
   - sort array alpabetically
   - get 'game' sheet, 
   - make 'game' sheet active
   - get range for 'incorrect guesses'
   - set range for updated 'incorrect guesses'
   - get 'remaining guesses'
   - decrement 'remaining guesses' by 1
      - if 'remaining guesses' is now 0...
         - Get 'you lost. Your word was "XXXXX". Click 'New game' in the top-tight to play again' message
         - Set message to 'you lost' message
      - if 'remaining guesses' is now >0...
         - Set remaining guesses to updated 'remaining guesses' value
- New game
   - Create UI menu
   - option in UI menu
   - call newGame() when clicked
   - get sheet 'Game'
   - get range (2, 2, 5, 1) which is the game range
   - clear contents of the range
   - get 'guesses remaining' range
   - set 'guesses remaining' range to 5
   - get 'difficulty' range
   - set 'difficulty' range to 'Easy'
   - get the range for 'active' words
   - clear the contents
   - get all the words
   - randomly select one
   - set 'active' state to 1 for the selected word
   - Convert word into ????? progress
   - get ???? progress range
   - set progress range to ?????
         

  
/* 

valuable for checking range values: https://stackoverflow.com/questions/12583187/google-spreadsheet-script-check-if-edited-cell-is-in-a-specific-range

event structure that sheets returns onEdit(): https://developers.google.com/apps-script/guides/triggers/events

- editedRange = e.range.Get the range of the cell that was edited
- check to see if it was only a single cell
   - if no, post an instructional message, and reset all other fields to the pre-edit state
   - if yes, check to see if the cell was within the specific column
       - if no, post an instructional message, and reset all other fields to the pre-edit state
       - if yes, check to see if the guess was a letter
           - if no, post an instructional message, and reset all other fields to the pre-edit state
           - if yes, check to see if the guess was previously guessed
               - if yes, post an instructional message, and reset all other fields to the pre-edit state
               - if no, check to see if the letter is in the hidden word
                   - If no, add the letter to 'missed letters'
                   - if yes, add the letter to correct guesses
                   
                   
                   
*/