/**
 * Function to orchestrate transition from SFDC requests to Work in Progress.
 * It moves selected rows from one tab to the other.
 */
function startProgress() {
  // Getting work sheets
  const sfdcRequests = SpreadsheetApp.openById(LEGAL_DEAL_TRACKER).getSheetByName(SFDC_REQ_TAB);
  const wip = SpreadsheetApp.openById(LEGAL_DEAL_TRACKER).getSheetByName(WIP_TAB);

  // Getting data from sfdc requests tab
  const selected = getSelectedRows(sfdcRequests, REQS_SELECTOR_INDEX);
  const requestsHeaders = findHeaders(sfdcRequests);
  const requestsIndexOrder = getIndexOrder(requestsHeaders);

  // Arranging columns in each row of our data
  const adaptedRequests = adaptRequestsToWIP(selected, requestsIndexOrder);

  let prevLastRow = wip.getLastRow();
  appendRows(wip, adaptedRequests);
  let lastRow = wip.getLastRow();
  setWIPLegalValidations(prevLastRow, lastRow, wip, [LEGAL_OWNERS_DROP_DOWN,STATUS_DROP_DOWN]);

  //deleteSelectedRows(sfdcRequests, REQS_SELECTOR_INDEX)
  deleteRowsByCondition(sfdcRequests, REQS_SELECTOR_INDEX, true);
}

/**
 * Function to clen up the Work In Progress tab.
 * It moves from WIP to closed or cancelled depending on the status from a record.
 */
function cleanWIP() {
  // Getting work sheets
  const wip = SpreadsheetApp.openById(LEGAL_DEAL_TRACKER).getSheetByName(WIP_TAB);
  const cancelledSheet = SpreadsheetApp.openById(LEGAL_DEAL_TRACKER).getSheetByName(CANCELLED_TAB);
  const closedSheet = SpreadsheetApp.openById(LEGAL_DEAL_TRACKER).getSheetByName(CLOSED_TAB);

  // Getting all needed data
  const data = wip.getDataRange().getValues();
  const cancelledDeals = data.filter(row => row[STATUS_DROP_DOWN] == 'Cancelled');
  const closedDeals = data.filter(row => row[STATUS_DROP_DOWN] == 'Closed');

  // Moving closed deals to the closed tab
  appendRows(closedSheet, closedDeals);
  deleteRowsByCondition(wip, STATUS_DROP_DOWN, 'Closed');
  
  // Moving cancelled deals to the cancelled tab
  appendRows(cancelledSheet, cancelledDeals);
  deleteRowsByCondition(wip, STATUS_DROP_DOWN, 'Cancelled');
}
