import { LightningElement, api } from 'lwc';

export default class PrimitiveChild extends LightningElement {

    // =============================================================
    // PUBLIC API (Primitive Values)
    // =============================================================

    // TEACHING POINT:
    // - @api exposes property to parent
    // - Primitive values are safe and immutable by nature
    @api heading;

    @api message;
}