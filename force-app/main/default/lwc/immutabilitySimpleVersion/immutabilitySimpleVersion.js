import { LightningElement, api } from 'lwc';

export default class ImmutabilitySimpleVersion extends LightningElement {
    @api originalObject;
    @api originalArray;

    updatedObject = null;
    updatedArray = [];
    showUpdated = false;

    handleUpdate() {
        this.updatedObject = {
            ...(this.originalObject || {}),
            name: 'Updated in child',
            updatedAt: new Date().toISOString()
        };

        this.updatedArray = Array.isArray(this.originalArray)
            ? [...this.originalArray, { id: `new-${Date.now()}`, label: 'Added to copy of Original Array in child' }]
            : [];

        this.showUpdated = true;
    }

    handleReset() {
        this.updatedObject = null;
        this.updatedArray = [];
        this.showUpdated = false;
    }

    get originalObjectJson() {
        return JSON.stringify(this.originalObject, null, 2);
    }

    get originalArrayJson() {
        return JSON.stringify(this.originalArray, null, 2);
    }

    get updatedObjectJson() {
        return JSON.stringify(this.updatedObject, null, 2);
    }

    get updatedArrayJson() {
        return JSON.stringify(this.updatedArray, null, 2);
    }
}