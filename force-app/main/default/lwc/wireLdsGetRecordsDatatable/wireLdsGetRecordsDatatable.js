import { LightningElement, wire } from 'lwc';
import { getRecords } from 'lightning/uiRecordApi';

/**
 * LEARNING PURPOSE ONLY
 * --------------------
 * In real apps, IDs come from Apex, list views, or parent components.
 */
const RECORD_IDS = [
    '001fj00000YcCODAA3',
    '001fj00000YcCOFAA3',
    '001fj00000YcCOCAA3'
];

const FIELDS = [
    'Account.Name',
    'Account.Industry',
    'Account.Phone'
];

/**
 * DATATABLE COLUMN CONFIG
 * ----------------------
 * This is UI metadata, not data.
 */
const COLUMNS = [
    { label: 'Name', fieldName: 'name', type: 'text' },
    { label: 'Industry', fieldName: 'industry', type: 'text' },
    { label: 'Phone', fieldName: 'phone', type: 'phone' }
];

export default class WireLdsGetRecordsDatatable extends LightningElement {

    columns = COLUMNS;

    @wire(getRecords, {
        records: RECORD_IDS.map(id => ({
            recordIds: [id],
            fields: FIELDS
        }))
    })
    wiredRecords;

    /**
     * TRANSFORM LDS RESPONSE → DATATABLE ROWS
     */
    get tableData() {
        if (!this.wiredRecords?.data) {
            return [];
        }

        return this.wiredRecords.data.results.map(result => {
            const record = result.result;

            return {
                id: record.id,
                name: record.fields.Name.value,
                industry: record.fields.Industry?.value ?? 'N/A',
                phone: record.fields.Phone?.value ?? '—'
            };
        });
    }
}
