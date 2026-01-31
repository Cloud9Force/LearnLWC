import { LightningElement, api } from 'lwc';

export default class PropsVsAttributesChild extends LightningElement {

    /**
     * ============================================================
     * PUBLIC PROPERTIES (@api)
     * ============================================================
     *
     * These properties can be set by the parent component.
     * They can be set either:
     *  - as HTML attributes (static)
     *  - as JavaScript properties (dynamic)
     */

    // String property
    @api message;

    // Boolean property
    @api isActive = false;

    /**
     * This lifecycle hook runs after values are set by the parent.
     * We use it ONLY for learning/debugging here.
     */
    connectedCallback() {
        console.log('message:', this.message, typeof this.message);
        console.log('isActive:', this.isActive, typeof this.isActive);
    }
}