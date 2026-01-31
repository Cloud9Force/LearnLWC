import { LightningElement } from 'lwc';

export default class ChildToParentChild extends LightningElement {
    clickCount = 0;

    // =============================================================
    // EVENT DISPATCH
    // =============================================================

    notifyParent() {
        this.clickCount += 1;
        // TEACHING POINT:
        // - CustomEvent is the ONLY supported child→parent mechanism
        // - Naming convention: lowercase event name
        /**
         * TEACHING POINT:
         * - CustomEvent does NOT bubble by default
         * - composed:true allows the event to cross shadow DOM
         * - bubbles:true allows parent to listen using on[event]
         */
        this.dispatchEvent(
            new CustomEvent('notifyparent', {
                detail: {
                    message: 'Child says hello to Parent Using Custom Event',
                    timestamp: new Date().toISOString(),
                    clickCount: this.clickCount
                },
                bubbles: false, // ✔ ALWAYS do this for child → parent communication
                composed: false
            })
        );
    }
}