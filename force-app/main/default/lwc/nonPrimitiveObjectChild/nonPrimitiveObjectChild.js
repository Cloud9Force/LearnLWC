import { LightningElement, api } from 'lwc';

export default class NonPrimitiveObjectChild extends LightningElement {

    // =============================================================
    // PUBLIC API (Object)
    // =============================================================

    // TEACHING POINT:
    // - Objects are passed by reference
    // - Child must treat them as READ-ONLY
    @api record;

    get formattedRecord() {
        // Safe, non-mutating transformation
        return JSON.stringify(this.record, null, 2);
    }
}
