import { LightningElement, track } from 'lwc';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class PatternMasterDetailRecords extends LightningElement {

    /* =====================================================
       STATE OWNED BY PARENT
       ===================================================== */

    @track selectedRecordId = null;
    @track mode = 'view'; // view | quickEdit | fullEdit

    /* =====================================================
       MASTER DATA (SIMULATED)
       ===================================================== */

    records = [
        { Id: '001fj00000YcCODAA3', Name: 'Burlington Textiles Corp of America', Industry: 'Apparel' },
        { Id: '001fj00000YcCOCAA3', Name: 'Edge Communications', Industry: 'Electronics' }
    ];

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Industry', fieldName: 'Industry' },
        {
            type: 'action',
            typeAttributes: {
                rowActions: [
                    { label: 'View', name: 'view' },
                    { label: 'Quick Edit', name: 'quickEdit' },
                    { label: 'Full Edit', name: 'fullEdit' },
                    { label: 'Create', name: 'create' }
                ]
            }
        }
    ];

    /* =====================================================
       MODE GETTERS (DECLARATIVE UI)
       ===================================================== */

    get isViewMode() {
        return this.mode === 'view';
    }

    get isQuickEditMode() {
        return this.mode === 'quickEdit';
    }

    get isFullEditMode() {
        return this.mode === 'fullEdit';
    }
    get isCreateMode() {
        return this.mode === 'create';
    }

    fields = [NAME_FIELD, REVENUE_FIELD, INDUSTRY_FIELD];


    /* =====================================================
       EVENT HANDLERS
       ===================================================== */

    handleRowAction(event) {
        const { name } = event.detail.action;
        const row = event.detail.row;
        console.log('Event', event);
        console.log('Event Target', event.target);
        console.log('Event Detail', event.detail);
        this.selectedRecordId = row.Id;
        this.mode = name;
    }

    handleRecordFormSuccess() {
        // After save, return to view mode
        this.mode = 'view';
    }

    handleEditFormSubmit(event) {
        // onsubmit fires before save; prevent default to control submission
        event.preventDefault();
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    handleEditFormSuccess() {
        this.mode = 'view';
    }

    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: 'Account created',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }
}
