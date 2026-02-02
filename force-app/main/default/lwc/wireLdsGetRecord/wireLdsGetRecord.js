import { LightningElement, api, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { getRecord, getRecordNotifyChange } from 'lightning/uiRecordApi';
/**
 * CONSTANTS
 * ----------
 * Always define fields as constants:
 * - Easier to maintain
 * - Avoids typos
 * - Improves readability
 */

const FIELDS = ['Account.Id', 'Account.Name', 'Account.Industry', 'Account.Phone', 'Account.Website'];
/* ================================================
   LDS - Single Record
   ================================================
   This single LWC already teaches:

    - Reactive params ($recordId)
    - Optional chaining
    - Getter-based UI binding
    - No logic in template
   - getRecord() returns a Promise
   - wire adapter automatically unwraps the Promise and data is available in the template
   - data is reactive
   - data is cached
   - data is debounced
   This component demonstrates:

   - How to fetch a single Salesforce record
   - How reactivity works with @wire
   - How to safely read deeply nested data
   - How to transform data using JavaScript getters
   - Why no logic belongs in the template
   - This is the foundation component for all LDS learning.
   */
export default class WireLdsGetRecord extends LightningElement {
    /**
     * recordId
     * --------
     * Automatically injected when placed on a record page
     * Must be reactive → used with '$recordId' -Without $, it won’t refetch when recordId changes.
     * Reactive params ≠ automatic refresh for same ID changes. So change in other fields has to force refresh lwc
     */
    @api recordId = '001fj00000YcCODAA3';
    wiredAccountMethodData;
    wiredAccountMethodError;
    wiredAccountMethodResult;
    refreshMessage = 'Not refreshed yet';
    
    /**
     * wiredAccount
     * ------------
     * @wire creates a reactive data stream.
     * Salesforce automatically:
     * - fetches data
     * - caches it
     * - refreshes it
     * - enforces FLS + sharing
     * @wire is NOT a function call
     * @wire means:
        - You are subscribing to data
        - Salesforce controls when data arrives
        - Your component re-renders automatically
        - Think of @wire as a data pipe, not a method.
     */

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredAccount;//propert used here.Methods can also be used
    
    //That property holds { data, error } so you can read this.wiredAccountMethodData or check this.wiredAccountMethodError.
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredAccountMethod(result) {
        this.wiredAccountMethodResult = result;
        const { data, error } = result;
        if (data) {
            // handle data
            this.wiredAccountMethodData = data;
            console.log('data', this.wiredAccountMethodData)
            this.wiredAccountMethodError = undefined;
        } else if (error) {
            // handle error
            this.wiredAccountMethodError = error;
            console.log('error', this.wiredAccountMethodError)
            this.wiredAccountMethodData = undefined;
        }
    }
    
    /**
     * Why $recordId (and not recordId)
     * $ makes it reactive
         - If recordId changes → data refetches
        - Without $ → static value (buggy)
     */
     /**
     * DATA EXTRACTION USING GETTERS
     * -----------------------------
     * These getters:
     * - transform raw LDS response into meaningful values
     * - shield the template from null errors
     * - centralize data access for the template
     * Why Getters Are the Right Pattern
     * Benefits:
     *  - Computed on demand
        - Cached by framework
        - Clean templates
        - Testable logic
        - Easy refactoring
     */

     /** Wired Account looks like this : {data: {fields: {Name: {value: 'Acme'}, Industry: {value: 'Technology'}}, error: undefined}}
      */
    get accountName() {
        return this.wiredAccount.data?.fields?.Name?.value;
        //return this.wiredAccountMethodData?.fields?.Name?.value; //method can also be used
    }
    get industry() {
        return this.wiredAccount.data?.fields?.Industry?.value;
        //return this.wiredAccountMethodData?.fields?.Industry?.value; //method can also be used
    }
    /**
     * Why Optional Chaining (?.) is MANDATORY - Because:
        - Wire runs before data arrives
        - data is initially undefined
        - Without ?. → runtime crash
        Every wire-based data access must be defensive.
     */
    get phone() {
        return this.wiredAccount.data?.fields?.Phone?.value;
        //return this.wiredAccountMethodData?.fields?.Phone?.value; //method can also be used
    }

    /**
     * ERROR HANDLING
     * --------------
     * LDS errors are structured objects, not strings.
     * Always normalize before exposing to UI.
     */
    get errorMessage() {
        return this.wiredAccount.error
            ? 'Unable to load account data.'
            : null;
        //return this.wiredAccountMethodError
        //    ? 'Unable to load account data.'
        //    : null; //method can also be used
    }

    async handleRefresh() {
        this.refreshMessage = 'Refreshing...';
        try {
            // If using method wire, store the wire result and pass that to refreshApex.
            await refreshApex(this.wiredAccount);
            // await refreshApex(this.wiredAccountMethodResult);
            this.refreshMessage = `Refreshed at ${new Date().toLocaleTimeString()}`;
        } catch (error) {
            console.error('Refresh failed', error);
            this.refreshMessage = 'Refresh failed. Check console for details.';
        }
    }

    handleNotifyChange() {
        this.refreshMessage = 'Notifying LDS cache...';
        // Use notify when data changes outside this component; use refreshApex to pull new data now.
        getRecordNotifyChange([{ recordId: this.recordId }]);
        this.refreshMessage = `Notified at ${new Date().toLocaleTimeString()}`;
    }
    /**
     * Why We Do NOT Mutate LDS Data
     * ❌ Never do this:this.wiredAccount.data.fields.Name.value = 'Test';
     * Because:
        - LDS data is read-only 
        - Mutations are ignored
        - Causes inconsistent UI
        - LDS = read-only snapshot, not mutable state.

     */
}
