import { LightningElement, api } from 'lwc';

export default class NonPrimitiveArrayChild extends LightningElement {

    // =============================================================
    // PUBLIC API (Array)
    // =============================================================

    // TEACHING POINT:
    // - Arrays are reference types
    // - Iterate freely
    // - Do NOT mutate parent array
    @api items;
}