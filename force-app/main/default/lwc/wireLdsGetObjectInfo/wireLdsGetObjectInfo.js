import { LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class WireLdsGetObjectInfo extends LightningElement {

    /**
     * OBJECT INFO WIRE
     * ----------------
     * Fetches metadata for the Account object
     */
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    wiredObjectInfo;

    /**
     * SAME WIRE, FUNCTION FORM — JUST TO LOG
     * ---------------------------------------
     * You can use the same adapter + config twice: one property (for template) and one function (e.g. to log).
     * Wire service deduplicates by (adapter + config), so there is still ONE request; both receive the same result.
     */
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    wiredObjectInfoLogger(result) {
        const { data, error } = result;
        if (data) {
            console.log('getObjectInfo data', data);
        }
        if (error) {
            console.log('getObjectInfo error', error);
        }
    }

    /**
     * BASIC METADATA ACCESS
     *
     * If using FUNCTION form (wiredObjectInfoData / wiredObjectInfoError from wire callback):
     *   You don't have to define them: this.wiredObjectInfoData = data in the wire callback creates the property.
     *   Optional but recommended: wiredObjectInfoData; wiredObjectInfoError; (clarity, default undefined, lint).
     *   get objectLabel() { return this.wiredObjectInfoData?.label; }
     *   get objectApiName() { return this.wiredObjectInfoData?.apiName; }
     *   get isCreateable() { return this.wiredObjectInfoData?.createable ? 'Yes' : 'No'; }
     */
    get objectLabel() {
        return this.wiredObjectInfo.data?.label;
    }

    get objectApiName() {
        return this.wiredObjectInfo.data?.apiName;
    }

    get isCreateable() {
        return this.wiredObjectInfo.data?.createable ? 'Yes' : 'No';
    }

    /**
     * FIELD METADATA TRANSFORMATION
     * ------------------------------
     * Converts fields object into array for UI rendering
     *
     * FUNCTION form equivalent:
     *   get fieldList() {
     *     const fields = this.wiredObjectInfoData?.fields;
     *     if (!fields) return null;
     *     return Object.values(fields).map(field => ({ apiName: field.apiName, label: field.label }));
     *   }
     */
    get fieldList() {
        const fields = this.wiredObjectInfo.data?.fields;
        if (!fields) {
            return null;
        }

        /**
         * Object.values() is critical here:
         * - fields is an object keyed by API name
         * - UI rendering requires arrays
         */
        return Object.values(fields)
            .slice(0, 5)
            .map(field => ({
                apiName: field.apiName,
                label: field.label
            }));
    }

    /**
     * TREE VIEW (lightning-tree)
     * --------------------------
     * Tree is a good fit when data is hierarchical (nested). getObjectInfo returns nested data (object → fields → field).
     * For flat data (e.g. getRecords = list of records), use lightning-datatable or a list; tree adds little value.
     * lightning-tree expects items: [{ label, name, items?: [], metatext?, expanded? }].
     */
    get objectInfoTreeItems() {
        const d = this.wiredObjectInfo?.data;
        if (!d) return null;
        const fields = d.fields ? Object.values(d.fields) : [];
        return [
            {
                label: d.label || d.apiName || 'Object',
                name: 'root',
                expanded: true,
                metatext: d.apiName,
                items: [
                    { label: 'API Name', name: 'apiName', metatext: d.apiName },
                    { label: 'Createable', name: 'createable', metatext: d.createable ? 'Yes' : 'No' },
                    {
                        label: 'Fields',
                        name: 'fields',
                        expanded: false,
                        items: fields.slice(0, 20).map((f) => ({
                            label: f.label || f.apiName,
                            name: f.apiName,
                            metatext: f.apiName
                        }))
                    }
                ]
            }
        ];
    }

    /**
     * ERROR HANDLING
     *
     * FUNCTION form equivalent:
     *   get errorMessage() { return this.wiredObjectInfoError ? 'Unable to load object metadata.' : null; }
     */
    get errorMessage() {
        return this.wiredObjectInfo.error
            ? 'Unable to load object metadata.'
            : null;
    }
}
