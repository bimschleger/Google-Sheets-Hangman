/*
 *
 * The event handler triggered when editing the spreadsheet.
 *
 * @param {Event} event The onEdit event.
 *
 */

function onEdit(event) {
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


/*
* 
* Determines if the user entered a valid guess
*
* @param {object} event - The onEdit event object, include a message field.
* @return {object} event - The onEdit even, populated with the bool for validit
*
*/

function isUserGuessValid(event) {
  Logger.log("Started isUserGuessValid.");
  var editedRow = event.range.getRow();
  var editedColumn = event.range.getColumn();
  
  var status = {
    "message": null,
    "valid": null
  };
  
  if (editedRow == 2 && editedColumn == 2) {  // correct row and column
    if (event.value == null) { // updated value back to zero
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
  
  Logger.log(status.message);
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
  Logger.log("started updateSheetWithGuessMessage.");
  
  var messageRow = 2;
  var messageColumn = 3;
  var message = event.status.message;
  var ss = event.source;
  var sheet = ss.getSheetByName("Game");
  var message_range = sheet.getRange(messageRow, messageColumn, 1, 1);
  
  message_range.setValue(message);
};
  

/*
*
* Updates a cell to its previous value.
*
* @param {object} event - The onEdit event
*
*/

function setCellToOldValue(event) {
  Logger.log("Starting setCellToOldValue().");
  
  var editedRow = event.range.getRow();
  var editedColumn = event.range.getColumn();
  var sheet = event.source.getSheets()[0];
  
  var oldCellRange = sheet.getRange(editedRow, editedColumn, 1, 1);
  oldCellRange.setValue(event.oldValue);
};

  
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