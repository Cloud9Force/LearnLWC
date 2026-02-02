import { LightningElement, wire } from 'lwc';
import { getRecords } from 'lightning/uiRecordApi';

/**
 * RECORD IDS
 * ----------
 * In real apps, these come from:
 * - parent components
 * - Apex
 * - UI selection
 * Here, they are hardcoded for learning.
 */
const RECORD_IDS = [
    '001fj00000YcCODAA3',
    '001fj00000YcCOFAA3',
    '001fj00000YcCOCAA3'
];

/**
 * FIELD DEFINITIONS
 * -----------------
 * Fields must include object name.
 */
const FIELDS = [
    'Account.Id',
    'Account.Name',
    'Account.Industry',
    'Account.Phone',
    'Account.Website'
];

function buildRecordRequest(id) {
    return {
        recordIds: [id],
        fields: FIELDS
    };
}

export default class WireLdsGetRecords extends LightningElement {

    /**
     * WIRED RESULT
     * ------------
     * getRecords returns an array-like structure
     * where each entry contains { recordId, record }
     * The Most Important JS Skill Here : array.map(item => newItem)
            -Used to:
           - Convert API data → UI data
           - Rename fields
           - Provide defaults
           - Remove nesting.This pattern appears everywhere in LWC.
           map() creates a new array from calling a function for every array element.
           - map() does not execute the function for empty elements.
           - map() does not change the original array.
     */
    @wire(getRecords, {
        records: RECORD_IDS.map(id => ({
            recordIds: [id],
            fields: FIELDS
        }))
    })
    wiredRecords;//records will be new array with each element of array as an object with recordIds and fields.
    /*
    * @wire: PROPERTY vs FUNCTION
     * --------------------------
     * PROPERTY (current): @wire(adapter, config) wiredRecords;
     *   → Wire assigns { data, error } to this.wiredRecords. Use in getters/template.
     *
     * FUNCTION (alternative): @wire(adapter, config) wiredRecords(result) { ... }
     *   → Wire calls your function with { data, error }. Use when you need:
     *     - Side effects (store in your own properties, log, analytics)
     *     - Conditional logic on data/error before template sees it
     *     - One place to handle both data and error
     *
     * When to use PROPERTY: Simple read-only UI; getters derive everything from wired property.
     * When to use FUNCTION: You need to process or store the result, or run code when data/error arrives.
     *
     * Same wire with FUNCTION would look like:
     *   wiredRecordsData;
     *   wiredRecordsError;
     *   @wire(getRecords, { records: ... })
     *   wiredRecords(result) {
     *     const { data, error } = result;
     *     if (data) {
     *       this.wiredRecordsData = data;
     *       this.wiredRecordsError = undefined;
     *     } else if (error) {
     *       this.wiredRecordsError = error;
     *       this.wiredRecordsData = undefined;
     *     }
     *   }
     *
     *   get accounts() for FUNCTION usage (use wiredRecordsData instead of wiredRecords.data):
     *   get accounts() {
     *     if (!this.wiredRecordsData?.results) return null;
     *     return this.wiredRecordsData.results.map(record => {
     *       const rec = record.result;
     *       return {
     *         id: rec.id,
     *         statusCode: record.statusCode,
     *         name: rec.fields.Name.value,
     *         industry: rec.fields.Industry?.value ?? 'N/A',
     *         phone: rec.fields.Phone?.value ?? 'N/A',
     *         website: rec.fields.Website?.value ?? 'N/A'
     *       };
     *     });
     *   }
     *
     *   get errorMessage() for FUNCTION: return this.wiredRecordsError ? 'Unable to load records.' : null;
     */
    renderedCallback() {
        if (!this.wiredRecords?.data) {
            return;
        }
        console.log('getRecords data', JSON.stringify(this.wiredRecords.data, null, 2));
        console.log('getRecords results', JSON.stringify(this.wiredRecords.data.results, null, 2));
    }

    /**
     * TRANSFORM RAW LDS DATA → CLEAN UI DATA
     * So this is the same idea—just at a different level:
     * Single record → getters per field
     * Multiple records → getter returns a list of transformed objects (each object already has the fields)
     */
    get accounts() {
        if (!this.wiredRecords?.data) {
            return null;
        }

        /**
         * map()
         * -----
         * Converts LDS response into a UI-friendly array
         * What Is NOT Standard: The Shape of data
         * What confuses most developers is that data is not the same structure everywhere.
         * Why We NEVER Rename data or error - They are part of the wire contract.wiredAccount.data,wiredAccount.error
         * “In LWC, data and error are standard wire service properties, but the internal structure of data depends       on the adapter or Apex method being used.”
data
 └── results [ {result: {id: '001fj00000YcCODAA3', fields: {Name: {value: 'Acme'}, Industry : {value: 'Technology'}}}}       ]
      └── result
           ├── id
           └── fields
                └── FieldName.value                       
         */
        return this.wiredRecords.data.results.map(record => {
            const rec = record.result;

            return {
                id: rec.id,
                statusCode: record.statusCode,
                name: rec.fields.Name.value,
                industry: rec.fields.Industry?.value ?? 'N/A',
                phone: rec.fields.Phone?.value ?? 'N/A',
                website: rec.fields.Website?.value ?? 'N/A'
            };
        });
    }

    /**
     * ERROR NORMALIZATION - Your ldsUtils.reduceErrors is already aligned with that standard error data shape.
     */
    get errorMessage() {
        return this.wiredRecords.error
            ? 'Unable to load records.'
            : null;
    }
}
