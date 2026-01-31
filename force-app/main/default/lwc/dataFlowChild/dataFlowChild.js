import { LightningElement, api } from 'lwc';

export default class DataFlowChild extends LightningElement {

    /* ============================================================
       READ-ONLY INPUT FROM PARENT
       ============================================================ */

    @api profileShallow;
    @api profileDeep;

    /**
     * ❌ ANTI-PATTERN (DO NOT DO THIS)
     *
     * this.profile.role = 'Senior Developer';
     * This would throw a runtime error.
     */

    /**
     * ✅ Request promotion
     */
    // Helper: send "what to update" + "which target"
    fireUpdate(target, detail) {
        this.dispatchEvent(
            new CustomEvent('updaterequested', {
                detail: { target, ...detail },
                bubbles: true,
                composed: true
            })
        );
    }

    // Shallow: updates name + role (top-level)
    requestPromotionShallow() {
        this.fireUpdate('shallow', {
            role: 'Senior Developer',
            name: 'Jane Doe (Promoted)'
        });
    }

    // Shallow: reset name + role (top-level)
    requestResetShallow() {
        this.fireUpdate('shallow', {
            role: 'Developer Shallow',
            name: 'Jane Doe'
        });
    }

    // Shallow: updates nested field address.city
    requestCityUpdateShallow() {
        this.fireUpdate('shallow', { address: { city: 'San Francisco' } });
    }

    // Shallow: resets nested field address.city
    requestCityResetShallow() {
        this.fireUpdate('shallow', { address: { city: 'New York' } });
    }

    // Deep: updates name + role (top-level)
    requestPromotionDeep() {
        this.fireUpdate('deep', {
            role: 'Senior Developer Deep',
            name: 'Alex Deep (Promoted)'
        });
    }

    // Deep: reset name + role (top-level)
    requestResetDeep() {
        this.fireUpdate('deep', {
            role: 'Developer Deep',
            name: 'Alex Deep'
        });
    }

    // Deep: updates nested field address.city
    requestCityUpdateDeep() {
        this.fireUpdate('deep', { address: { city: 'San Francisco' } });
    }

    // Deep: resets nested field address.city
    requestCityResetDeep() {
        this.fireUpdate('deep', { address: { city: 'Chicago' } });
    }
}