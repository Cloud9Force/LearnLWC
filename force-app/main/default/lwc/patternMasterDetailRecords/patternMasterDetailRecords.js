import { LightningElement, track } from 'lwc';

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
                    { label: 'Full Edit', name: 'fullEdit' }
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

    handleSave() {
        // After save, return to view mode
        this.mode = 'view';
    }
}
