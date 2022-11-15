/**
 * Function to render a custom menu to the spreadsheet.
 */
function renderMenu() {
  SpreadsheetApp.getUi()
      .createMenu('Utils')
      .addItem('Trim WIP', 'cleanWIP')
      //.addSeparator()
      .addToUi();
}