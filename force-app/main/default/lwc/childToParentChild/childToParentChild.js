import { LightningElement } from 'lwc';

export default class ChildToParentChild extends LightningElement {

    // =============================================================
    // EVENT DISPATCH
    // =============================================================

    notifyParent() {
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
                    message: 'Child says hello',
                    timestamp: new Date().toISOString()
                },
                bubbles: true, // ✔ ALWAYS do this for child → parent communication
                composed: true
            })
        );
    }
}
