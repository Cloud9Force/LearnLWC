import { LightningElement } from 'lwc';

/* ============================================================
   MOCK DATA — EXACT SHAPES AS RETURNED BY SALESFORCE WIRES
   ============================================================ */

/* getRecord */
const WIRED_GET_RECORD = {
    data: {
        id: '001AAA',
        apiName: 'Account',
        fields: {
            Name: { value: 'Acme Corporation' },
            Industry: { value: 'Technology' },
            Phone: { value: '123-456' }
        }
    },
    error: undefined
};

/* getRecords */
const WIRED_GET_RECORDS = {
    data: {
        results: [
            {
                result: {
                    id: '001AAA',
                    fields: {
                        Name: { value: 'Acme' },
                        Industry: { value: 'Tech' },
                        Phone: { value: '123-456' }
                    }
                }
            },
            {
                result: {
                    id: '001BBB',
                    fields: {
                        Name: { value: 'Global Corp' },
                        Industry: { value: 'Finance' },
                        Phone: { value: '123-456' }
                    }
                }
            }
        ]
    },
    error: undefined
};

/* getObjectInfo */
const WIRED_GET_OBJECT_INFO = {
    data: {
        apiName: 'Account',
        label: 'Account',
        fields: {
            Name: {
                apiName: 'Name',
                label: 'Account Name',
                createable: true
            },
            Industry: {
                apiName: 'Industry',
                label: 'Industry',
                createable: false
            },
            Phone: {
                apiName: 'Phone',
                label: 'Phone',
                createable: false
            },
            Title: {
                apiName: 'Title',
                label: 'Title',
                createable: false
            }
        }
    },
    error: undefined
};

/* getRelatedListRecords (Parent = Account, Child = Contact) */
const WIRED_RELATED_LIST = {
    data: {
        records: [
            {
                id: '001AAA',
                fields: {
                    Name: { value: 'Acme' },
                    Industry: { value: 'Technology' },
                    Phone: { value: '555-0100' }
                },
                childRecords: {
                    records: [
                        {
                            id: '003A',
                            fields: {
                                Name: { value: 'John' },
                                Phone: { value: '123-456' },
                                Title: { value: 'VP Sales' }
                            }
                        },
                        {
                            id: '003B',
                            fields: {
                                Name: { value: 'Mary' },
                                Phone: { value: '789-012' },
                                Title: { value: 'Manager' }
                            }
                        }
                    ]
                }
            },
        {
            id: '001BBB',
            fields: {
                Name: { value: 'Acme1' },
                Industry: { value: 'Technology' },
                Phone: { value: '555-0100' }
            },
            childRecords: {
                records: [
                    {
                        id: '003AA',
                        fields: {
                            Name: { value: 'Johnny' },
                            Phone: { value: '123-456' },
                            Title: { value: 'VP Sales North' }
                        }
                    },
                    {
                        id: '003B',
                        fields: {
                            Name: { value: 'Marrry' },
                            Phone: { value: '789-012' },
                            Title: { value: 'Asst Manager' }
                        }
                    }
                ]
            }
        }
        ]
    },
    error: undefined
};

export default class WireSalesforceDataShapeResolver extends LightningElement {

    /* ============================================================
       DATATABLE COLUMN CONFIG
       ============================================================ */

    recordColumns = [
        { label: 'ID', fieldName: 'id' },
        { label: 'Name', fieldName: 'name' },
        { label: 'Industry', fieldName: 'industry' },
        { label: 'Phone', fieldName: 'phone' }
    ];

    metadataColumns = [
        { label: 'API Name', fieldName: 'apiName' },
        { label: 'Label', fieldName: 'label' },
        { label: 'Createable', fieldName: 'createable' }
    ];

    treeColumns = [
        { label: 'Name', fieldName: 'label' },
        { label: 'Industry', fieldName: 'industry' },
        { label: 'Phone', fieldName: 'phone' },
        { label: 'Title', fieldName: 'title' }
    ];

    /* ============================================================
       DATA SHAPING — REAL SALESFORCE → UI
       ============================================================ */

    /* getRecord → Datatable (single row) */
    get getRecordTableData() {
        const d = WIRED_GET_RECORD.data;
        if (!d?.fields) return [];
        const f = d.fields;
        return [
            {
                id: d.id,
                name: f.Name?.value ?? '',
                industry: f.Industry?.value ?? '',
                phone: f.Phone?.value ?? ''
            }
        ];
    }

    /* getRecords → Datatable (map over results) */
    get getRecordsTableData() {
        const results = WIRED_GET_RECORDS.data?.results;
        if (!results) return [];
        return results.map(wrapper => {
            const record = wrapper.result;
            const f = record?.fields ?? {};
            return {
                id: record?.id ?? '',
                name: f.Name?.value ?? '',
                industry: f.Industry?.value ?? '',
                phone: f.Phone?.value ?? ''
            };
        });
    }

    /* getObjectInfo → Datatable (Object → Array) */
    get objectInfoTableData() {
        const fields = WIRED_GET_OBJECT_INFO.data?.fields;
        if (!fields) return [];
        return Object.values(fields).map(field => ({
            apiName: field?.apiName ?? '',
            label: field?.label ?? '',
            createable: field?.createable ? 'Yes' : 'No'
        }));
    }

    /**
     * Related List → Tree Grid (Account parent + Contact children)
     *
     * SHAPE:
     *   API: data.records[] = Account records; each has childRecords.records[] = Contact records.
     *   Tree: each parent row has _children = array of child rows. lightning-tree-grid needs id + _children.
     *
     * STEPS:
     *   1. For each Account (parent), build one row (id, label, industry, phone, title).
     *   2. That row’s _children = each Contact (child) turned into a row with the same column fields.
     *   3. One helper turns any “record with fields” into that flat row so we don’t repeat the same logic.
     */
    get treeGridData() {
        const records = WIRED_RELATED_LIST.data?.records;
        if (!records) return [];
        return records.map(parent => {
            const pf = parent?.fields ?? {};
            const childRecords = parent?.childRecords?.records ?? [];
            return {
                id: parent?.id ?? '',
                label: pf.Name?.value ?? '',
                industry: pf.Industry?.value ?? '',
                phone: pf.Phone?.value ?? '',
                title: '',
                _children: childRecords.map(child => {
                    const cf = child?.fields ?? {};
                    return {
                        id: child?.id ?? '',
                        label: cf.Name?.value ?? '',
                        industry: cf.Industry?.value ?? '',
                        phone: cf.Phone?.value ?? '',
                        title: cf.Title?.value ?? ''
                    };
                })
            };
        });
    }
}
