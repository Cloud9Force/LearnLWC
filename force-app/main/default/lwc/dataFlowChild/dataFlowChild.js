import { LightningElement, api } from 'lwc';

export default class DataFlowChild extends LightningElement {

    /* ============================================================
       READ-ONLY INPUT FROM PARENT
       ============================================================ */

    @api profile;

    /**
     * ❌ ANTI-PATTERN (DO NOT DO THIS)
     *
     * this.profile.role = 'Senior Developer';
     * This would throw a runtime error.
     */

    /**
     * ✅ Request promotion
     */
    requestPromotion() {
        this.dispatchEvent(
            new CustomEvent('updaterequested', {
                detail: { role: 'Senior Developer' },
                bubbles: true,
                composed: true
            })
        );
    }

    /**
     * ✅ Request role reset (second update path)
     *
     * TEACHING POINT:
     * - Child can request DIFFERENT updates
     * - Parent still controls final state
     */
    requestReset() {
        this.dispatchEvent(
            new CustomEvent('updaterequested', {
                detail: { role: 'Developer' },
                bubbles: true,
                composed: true
            })
        );
    }
}
