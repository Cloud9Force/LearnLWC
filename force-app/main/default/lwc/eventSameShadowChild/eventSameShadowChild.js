import { LightningElement, api } from 'lwc';

export default class EventSameShadowChild extends LightningElement {

    // This property lives on the component instance
    @api message = 'Hello from SAME shadow tree using .target';

    fireEvent() {
        /*
         * IMPORTANT:
         * We are NOT using event.detail here.
         * Because the parent is in the SAME shadow tree,
         * it can safely read event.target.message.
         */
        this.dispatchEvent(
            new CustomEvent('sameevent', {
                bubbles: true,
                composed: true
            })
        );
    }
}