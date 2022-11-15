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

  deleteSelectedRows(sfdcRequests, REQS_SELECTOR_INDEX)
}