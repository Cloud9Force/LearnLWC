import { LightningElement } from 'lwc';

export default class SpreadPlayground extends LightningElement {
    baseObject = { name: 'Ava', role: 'Dev' };
    mergeObject = { role: 'Lead' };
    nestedObject = { name: 'Ava', address: { city: 'NY', zip: '10001' } };
    baseArray = ['A', 'B', 'C'];
    baseString = 'Hi';

    get objectMerge() {
        return { ...this.baseObject, ...this.mergeObject };
    }

    get addNewKey() {
        return { ...this.baseObject, level: 'L2' };
    }

    get nestedUpdate() {
        return {
            ...this.nestedObject,
            address: {
                ...this.nestedObject.address,
                city: 'San Francisco'
            }
        };
    }

    get arrayAppend() {
        return [...this.baseArray, 'D'];
    }

    get arrayPrepend() {
        return ['Z', ...this.baseArray];
    }

    get stringSpread() {
        return [...this.baseString];
    }

    get objectMergeText() {
        return JSON.stringify(this.objectMerge, null, 2);
    }

    get addNewKeyText() {
        return JSON.stringify(this.addNewKey, null, 2);
    }

    get nestedUpdateText() {
        return JSON.stringify(this.nestedUpdate, null, 2);
    }

    get arrayAppendText() {
        return this.arrayAppend.join(',');
    }

    get arrayPrependText() {
        return this.arrayPrepend.join(',');
    }

    get stringSpreadText() {
        return this.stringSpread.join(',');
    }
}
