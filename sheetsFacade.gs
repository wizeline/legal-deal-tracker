/**
 * Finds headers in a sheet
 * @param {Sheet} spreadsheet - Sheet to get the headers from
 * @returns {[String]} - Headers
 */
function findHeaders(spreadsheet) {
  return spreadsheet.getDataRange().getValues().shift();
}

/**
 * Appends rows to a sheet, given the rows
 * @param {Sheet} spreadsheet - To write to
 * @param {[[String]]} data - To be written
 */
function appendRows(spreadsheet, data) {
  let prevLastRow = spreadsheet.getLastRow();
  const range = spreadsheet.getRange(prevLastRow + 1, 1, data.length, data[0].length);
  range.setValues(data);
}

/**
 * Deletes rows that match a given condition
 * @param {Sheet} spreadsheet - To delete from
 * @param {number} index - Index where the condition should be checked
 * @param {any} condition - Condition to match
 */
function deleteRowsByCondition(spreadsheet, index, condition) {
  const rows = spreadsheet.getDataRange().getValues();

  for (let i = rows.length - 1; i >= 0; i--) {
    if (rows[i][index] == condition) {
      spreadsheet.deleteRow(i + 1);
    }
  }
}

/**
 * Get rows that were selected using a checkbox in the sheet
 * @param {Sheet} spreadsheet - Spreadsheet to retrieve rows from
 * @param {number} index - Index of the checkbox within the row
 */
function getSelectedRows(spreadsheet, index) {
  const rows = spreadsheet.getDataRange().getValues();
  return rows.filter(record => record[index] == true);
}

/**
 * Builds a data validation rule given the list of options to use
 * @param {[String]} list - list of options to use in the data validation
 * @returns {DataValidation}
 */
function createDataValidationRuleFromList(list) {
  return SpreadsheetApp.newDataValidation().requireValueInList(list).build();
}
