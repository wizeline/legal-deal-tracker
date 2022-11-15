const env = PropertiesService.getScriptProperties().getProperty('env');
const LEGAL_DEAL_TRACKER = env == 'dev' ? 
  PropertiesService.getScriptProperties().getProperty('devLegalSheet') :
  PropertiesService.getScriptProperties().getProperty('LegalSheet');

const SFDC_REQ_TAB = 'SFDC requests';
const WIP_TAB = 'Work in progress';
const LISTS_TAB = 'Listas';
const CLOSED_TAB = 'Closed deals';
const CANCELLED_TAB = 'Closed deals';

// ######### Column locations #########
// Checkbox location, starting at 0
const REQS_SELECTOR_INDEX = 0;

// Legal owner list location, starting at 0. To use in data validation
const LEGAL_OWNERS_LIST_INDEX = 0;
// Legal owner data validation rule index.
const LEGAL_OWNERS_DROP_DOWN = 0;

// Legal status list location. To use in data validation
const STATUS_LIST_INDEX = 2;
// Legal status data validation rule index.
const STATUS_DROP_DOWN = 5;

// ####################################

const LISTS_SHEET = SpreadsheetApp.openById(LEGAL_DEAL_TRACKER).getSheetByName(LISTS_TAB);

// Define column names and order
const neededColumnsForWIP = [
  'LCT_Business_Unit__r.Name',
  'LCT_Portfolio__r.Name',
  'LCT_Account__r.Name',
  'LCT_Type_of_Contract_requested__c',
  'LCT_Opportunity__r.Opportunity_Total_Revenue_Estimate__c',
  'LCT_Opportunity__r.Contract_Start_Date__c',
  'LCT_Opportunity__r.Name',
  'LCT_Opportunity__r.Id',
];
