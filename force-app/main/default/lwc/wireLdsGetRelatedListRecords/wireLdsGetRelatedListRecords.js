import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

/**
 * We fetch Contacts related to an Account
 */
const CONTACT_FIELDS = [
    'Contact.Name',
    'Contact.Email',
    'Contact.Phone'
];

export default class WireLdsGetRelatedListRecords extends LightningElement {

    @api recordId = '001fj00000YcCODAA3'; // Account Id

    /**
     * REAL LDS WIRE
     * -------------
     * Salesforce returns a NESTED structure.
     */
    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'Contacts',
        fields: CONTACT_FIELDS
    })
    wiredContacts;

    /**
     * RAW DATA RETURNED FROM SALESFORCE (getRelatedListRecords)
     * ----------------------------------------------------------
     * this.wiredContacts.data looks like:
     *
     * {
     *   records: [
     *     {
     *       id: '003xxxxxxxxxxxx',
     *       apiName: 'Contact',
     *       fields: {
     *         Name:    { value: 'John Doe' },
     *         Email:   { value: 'john@example.com' },
     *         Phone:   { value: '555-0100' }
     *       }
     *     },
     *     { id: '...', apiName: 'Contact', fields: { Name: { value: 'Jane' }, ... } }
     *   ]
     * }
     *
     * Each record has id and fields; each field is { value: ... }. Use record.fields.FieldName.value.
     */
    /**
     * TREE GRID DATA SHAPING
     * ---------------------
     * Parent → children
     */
    get treeData() {
        if (!this.wiredContacts?.data) {
            return [];
        }

        return [
            {
                id: this.recordId,
                label: 'Account',
                _children: this.wiredContacts.data.records.map(contact => {
                    return {
                        id: contact.id,
                        label: contact.fields.Name.value,
                        email: contact.fields.Email?.value ?? '—'
                    };
                })
            }
        ];
    }

    /**
     * Tree Grid Columns
     */
    columns = [
        { label: 'Name', fieldName: 'label' },
        { label: 'Email', fieldName: 'email' }
    ];
}
