import { LightningElement, api, track } from 'lwc';

export default class ImmutabilityDemoChild extends LightningElement {

    @api originalObject;
    @api originalArray;

    // Demonstrate anti-pattern
    mutateDirect() {
        this.originalObject.name = 'Bad Mutation'; // ❌ anti-pattern
    }

    // Correct shallow copy
    shallowCopyObject() {
        const updated = { ...this.originalObject, name: 'Updated with Shallow Copy' };
        this.originalObject = updated;
    }

    shallowCopyArray() {
        const newArr = [...this.originalArray, { id: 'd', label: 'New via Shallow Copy'}];
        this.originalArray = newArr;
    }
}
