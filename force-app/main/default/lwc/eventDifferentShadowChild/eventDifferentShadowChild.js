import { LightningElement } from 'lwc';

export default class EventDifferentShadowChild extends LightningElement {

    fireEvent() {
        /*
         * IMPORTANT:
         * This event is meant to be handled OUTSIDE
         * the component's shadow tree.
         *
         * Therefore, we MUST use event.detail.
         * event.target will be retargeted and
         * the original component will not be visible.
         */
        this.dispatchEvent(
            new CustomEvent('differentevent', {
                detail: {
                    message: 'Hello from DIFFERENT shadow tree using .detail'
                },
                bubbles: true,
                composed: true
            })
        );
    }
}