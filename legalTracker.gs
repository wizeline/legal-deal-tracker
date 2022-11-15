/**
 * Adapts the SFDC requests to the format that we need to insert
 * @param {[[String]]} requests - Selected rows from SFDC Requests
 * @param {[number]} order - index order needed
 */
function adaptRequestsToWIP(requests, order) {
  const adapted = []

  requests.forEach(request => {
    const row = [];
    order.forEach(index => {
      row.push(request[index]);
    });

    adapted.push(row);
  });
  
  const dataValidationIndexes = [STATUS_DROP_DOWN, LEGAL_OWNERS_DROP_DOWN].sort();
  const preparedRows = prepareRowsForDataValidations(adapted, dataValidationIndexes);
  
  return preparedRows;
}

/**
 * Finds the indexes of the columns that we need, following the given order in constants
 * @param {[String]} headers
 * @returns {[number]}
 */
function getIndexOrder(headers) {
  indexes = [];
  neededColumnsForWIP.forEach(column => {
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
function setWIPLegalValidations(prevLastRow, newLastRow, spreadsheet, indexes) {
  const lists = LISTS_SHEET.getDataRange().getValues();

  const legalOwnersoptions = getListFromLists(lists, LEGAL_OWNERS_LIST_INDEX);
  const statusOptions = getListFromLists(lists, STATUS_LIST_INDEX);

  let legalOwnersRule = createDataValidationRuleFromList(legalOwnersoptions);
  let statusRule = createDataValidationRuleFromList(statusOptions);

  let rowsCount = newLastRow - prevLastRow;

  let ownersRange = spreadsheet.getRange(prevLastRow + 1, indexes[0] + 1, rowsCount);
  ownersRange.setDataValidation(legalOwnersRule);

  let statusRange = spreadsheet.getRange(prevLastRow + 1, indexes[1] + 1, rowsCount);
  statusRange.setDataValidation(statusRule);
}

/**
 * Retrieves one specific list of values from a Sheet with several lists given the index
 * @param {[[String]]} lists - Matrix of available lists
 * @returns {[String]} needed list
 */
function getListFromLists(lists, index) {
  const list = lists.map(row => {
    return row[index] ? row[index] : null
  }).filter(row => row != null);

  list.shift();
  return list;
}

/**
 * Prepares rows to store Data validations using known indexes.
 * @param {[[String]]} data - Data containing rows to prepare
 * @param {[number]} dataValidationIndexes - Indexes where Data Validations will be on
 * @returns {[[String]]}
 */
function prepareRowsForDataValidations(data, dataValidationIndexes) {
  const preparedRows = []
  data.forEach(row => {
    dataValidationIndexes.forEach(index => row.splice(index, 0, ''));
    preparedRows.push(row);
  });

  return preparedRows;
}
