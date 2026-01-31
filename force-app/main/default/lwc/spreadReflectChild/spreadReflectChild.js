import { LightningElement, api } from 'lwc';

export default class SpreadReflectChild extends LightningElement {

    /* ============================================================
       REFLECTED HTML ATTRIBUTES
       ============================================================ */

    // These public properties reflect HTML attributes
    @api title;
    @api disabled = false;

    handleClick() {
        // Emit an event so parent can listen
        this.dispatchEvent(
            new CustomEvent('childclicked', {
                bubbles: true,
                composed: true
            })
        );
    }
}