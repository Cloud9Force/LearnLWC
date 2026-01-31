import { LightningElement, api } from 'lwc';

export default class ImmutabilityDemoChild extends LightningElement {

    _originalObject;
    _originalArray;
    originalObjectSnapshot = null;
    originalArraySnapshot = [];
    localObject = {};
    localArray = [];
    showUpdated = false;

    @api
    set originalObject(value) {
        this._originalObject = value;
        this.originalObjectSnapshot = value ? JSON.parse(JSON.stringify(value)) : null;
        this.localObject = value ? { ...value } : {};
        // Explanation logs: reference vs shallow copy vs deep copy
        // eslint-disable-next-line no-console
        console.log('originalObject (reference):', this._originalObject);
        // eslint-disable-next-line no-console
        console.log('originalObjectSnapshot (deep copy):', this.originalObjectSnapshot);
        // eslint-disable-next-line no-console
        console.log('localObject (shallow copy):', this.localObject);
    }

    get originalObject() {
        return this._originalObject;
    }

    @api
    set originalArray(value) {
        this._originalArray = value;
        this.originalArraySnapshot = Array.isArray(value)
            ? value.map((item) => ({ ...item }))
            : [];
        this.localArray = Array.isArray(value) ? [...value] : [];
    }

    get originalArray() {
        return this._originalArray;
    }

    handleUpdate() {
        this.localObject = {
            ...this.localObject,
            name: 'Updated with Shallow Copy',
            updatedAt: new Date().toISOString()
        };
        this.localArray = [
            ...this.localArray,
            { id: `new-${Date.now()}`, label: 'Added in child' }
        ];
        this.showUpdated = true;
    }

    handleReset() {
        this.localObject = this.originalObjectSnapshot
            ? { ...this.originalObjectSnapshot }
            : {};
        this.localArray = Array.isArray(this.originalArraySnapshot)
            ? [...this.originalArraySnapshot]
            : [];
        this.showUpdated = false;
    }

    demoCopyDifferences() {
        const sample = { name: 'Ava', address: { city: 'NY' } };
        const reference = sample;
        const shallow = { ...sample };
        const deep = JSON.parse(JSON.stringify(sample));

        // Top-level change
        reference.name = 'Ref Top';
        shallow.name = 'Shallow Top';
        deep.name = 'Deep Top';

        // Nested change
        reference.address.city = 'Ref City';
        shallow.address.city = 'Shallow City';
        deep.address.city = 'Deep City';

        // eslint-disable-next-line no-console
        console.log('Demo - original sample:', sample);
        // eslint-disable-next-line no-console
        console.log('Demo - reference:', reference);
        // eslint-disable-next-line no-console
        console.log('Demo - shallow:', shallow);
        // eslint-disable-next-line no-console
        console.log('Demo - deep:', deep);
    }

    get originalObjectJson() {
        return JSON.stringify(this.originalObjectSnapshot, null, 2);
    }

    get originalArrayJson() {
        return JSON.stringify(this.originalArraySnapshot, null, 2);
    }

    get currentObjectJson() {
        return JSON.stringify(this.localObject, null, 2);
    }

    get currentArrayJson() {
        return JSON.stringify(this.localArray, null, 2);
    }
}