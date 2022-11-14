function startProgress() {
  // Getting work sheets
  const sfdcRequests = SpreadsheetApp.openById(LEGAL_DEAL_TRACKER).getSheetByName(sfdcReqTab);
  const wip = SpreadsheetApp.openById(LEGAL_DEAL_TRACKER).getSheetByName(wipTab);

  // Getting data from sfdc requests tab
  const selected = getSelectedRows(sfdcRequests, requestSelectorIndex);
  const requestsHeaders = findHeaders(sfdcRequests);
  const requestsIndexOrder = getIndexOrder(requestsHeaders);

  // Arranging columns in each row of our data
  const adaptedRequests = adaptRequests(selected, requestsIndexOrder);

  const [prevLastRow, lastRow] = appendRows(wip, adaptedRequests);
  setLegalValidations(prevLastRow, lastRow, wip, [LEGAL_OWNERS_DROP_DOWN,STATUS_DROP_DOWN]);

  deleteSelectedRows(sfdcRequests, requestSelectorIndex)
}