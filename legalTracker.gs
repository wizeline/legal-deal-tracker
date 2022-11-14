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
 * Deletes rows with a ticked checkbox at a given index
 * @param {number} index - Index where the checkbox is located
 */
function deleteSelectedRows(spreadsheet, index) {
  const rows = spreadsheet.getDataRange().getValues();
  //rows.shift();

  for (let i = rows.length - 1; i >= 0; i--) {
    if (rows[i][index] == true) {
      console.log(i);
      spreadsheet.deleteRow(i + 1);
    }
  }
}

/**
 * Appends rows to a sheet, given the rows
 * @param {Sheet} spreadsheet - To write to
 * @param {[[String]]} data - To be written
 * @returns {number} prevLastRow
 * @returns {number} newLastRow
 */
function appendRows(spreadsheet, data) {
  const prevLastRow = spreadsheet.getLastRow();
  const range = spreadsheet.getRange(prevLastRow + 1, 1, data.length, data[0].length);

  range.setValues(data);

  return [prevLastRow, spreadsheet.getLastRow()];
}

/**
 * Adapts the SFDC requests to the format that we need to insert
 * @param {[[String]]} requests - Selected rows from SFDC Requests
 * @param {[number]} order - index order needed
 */
function adaptRequests(requests, order) {
  const adapted = []

  requests.forEach(request => {
    // first to columns to null since they will hold data validations
    const row = ['', ''];
    order.forEach(index => {
      row.push(request[index]);
    });

    adapted.push(row);
  });

  return adapted;
}

/**
 * Finds headers in a sheet
 * @param {Sheet} spreadsheet - Sheet to get the headers from
 * @returns {[String]} - Headers
 */
function findHeaders(spreadsheet) {
  return spreadsheet.getDataRange().getValues().shift();
}

/**
 * Finds the indexes of the columns that we need, following the given order
 * @param {[String]} headers
 * @returns {[number]}
 */
function getIndexOrder(headers) {
  indexes = [];
  neededColumns.forEach(column => {
    indexes.push(headers.findIndex((header) => header == column));
  });

  return indexes;
}

/**
 * Generates all of the data validations needed in the tool
 * @param {number} prevLastRow - Last row before inserting new rows to WIP tab.
 * @param {number} newLastRow - Last row after appending rows to WIP tab.
 * @param {Sheet} spreadsheet - To use the rules in
 * @param {[number]} indexes - List indexes of the list of values for each data validation rule.
 */
function setLegalValidations(prevLastRow, newLastRow, spreadsheet, indexes) {
  const lists = listsSheet.getDataRange().getValues();

  let legalOwnersRule = createDataValidationRule(lists, LEGAL_OWNERS_LIST_INDEX);
  let statusRule = createDataValidationRule(lists, STATUS_LIST_INDEX);

  let rowsCount = newLastRow - prevLastRow;

  let ownersRange = spreadsheet.getRange(prevLastRow + 1, indexes[0] + 1, rowsCount);
  ownersRange.setDataValidation(legalOwnersRule);

  let statusRange = spreadsheet.getRange(prevLastRow + 1, indexes[1] + 1, rowsCount);
  statusRange.setDataValidation(statusRule);
}

/**
 * Builds a data validation rule given a matrix of lists and the index of the one needed.
 * @params {[[String]]} lists - Matrix of available lists
 * @params {number} index - Index of the column of the needed list
 * @returns {DataValidation}
 */
function createDataValidationRule(lists, index) {
  const options = lists.map(row => {
    return row[index] ? row[index] : null
  }).filter(row => row != null);
  options.shift();

  console.log(options)

  return SpreadsheetApp.newDataValidation().requireValueInList(options).build();
}
