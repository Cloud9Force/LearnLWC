import { LightningElement, api, track } from 'lwc';

export default class AttributeDomChild extends LightningElement {

    /**
     * ============================================================
     * PUBLIC PROPERTY (@api)
     * ============================================================
     * This is the JavaScript property set by the parent.
     */
    @api message;

    /**
     * UI STATE (for teaching)
     */
    @track domAttributeValue;
    @track apiPropertyValue;
    @track lastAction = 'Initial render';

    /**
     * Read values after component is attached to DOM
     */
    connectedCallback() {
        this.readValues('Initial render');
    }

    /**
     * Reads BOTH:
     * - DOM attribute
     * - JS property
     */
    readValues(actionLabel) {
        this.domAttributeValue = this.getAttribute('message');
        this.apiPropertyValue = this.message;
        this.lastAction = actionLabel;
    }

    /**
     * Demonstrates setAttribute()
     * IMPORTANT:
     * - Updates DOM attribute ONLY
     * - Does NOT update @api property
     */
    handleSetAttribute() {
        this.setAttribute('message', 'Updated via setAttribute()');
        this.readValues('After setAttribute()');
    }
}
