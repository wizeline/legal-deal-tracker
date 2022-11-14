const env = PropertiesService.getScriptProperties().getProperty('env');
const LEGAL_DEAL_TRACKER = env == 'dev' ? 
  PropertiesService.getScriptProperties().getProperty('devLegalSheet') :
  PropertiesService.getScriptProperties().getProperty('LegalSheet');

const sfdcReqTab = 'SFDC requests';
const wipTab = 'Work in progress';
const lists = 'Listas'

// ######### Column locations #########
// Checkbox location, starting at 0
const requestSelectorIndex = 0;

// Legal owner list location, starting at 0. To use in data validation
const LEGAL_OWNERS_LIST_INDEX = 0;
// Legal owner data validation rule index.
const LEGAL_OWNERS_DROP_DOWN = 0;

// Legal status list location. To use in data validation
const STATUS_LIST_INDEX = 2;
// Legal status data validation rule index.
const STATUS_DROP_DOWN = 1;

// ####################################

const listsSheet = SpreadsheetApp.openById(LEGAL_DEAL_TRACKER).getSheetByName(lists);

// Define column names and order
const neededColumns = [
  'LCT_Type_of_Contract_requested__c',
  'LCT_Account__r.Name',
  'LCT_Business_Unit__r.Name',
  'LCT_Opportunity__r.Name',
  'LCT_Portfolio__r.Name',
  'LCT_Opportunity__r.Id',
];
