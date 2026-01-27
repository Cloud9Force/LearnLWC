import { LightningElement } from 'lwc';

export default class DataCompositionRecipes extends LightningElement {

    dynamicMessage = 'Hello from Parent (dynamic)';

    accountObject = {
        id: '001X0000009xyz',
        name: 'Acme Corporation',
        industry: 'Technology'
    };

    itemList = [
        { id: 'a', label: 'Item A' },
        { id: 'b', label: 'Item B' },
        { id: 'c', label: 'Item C' }
    ];

    handleChildNotification(event) {
        console.log('Event received from child:', event.detail);
    }

     /* ============================================================
       DATA FLOW DEMO – SOURCE OF TRUTH (PARENT)
       ============================================================ */

    // Parent owns the data (single source of truth)
    userProfile = {
        name: 'Jane Doe',
        role: 'Developer'
    };

    /**
     * COMPUTED GETTER (REACTIVITY DEMO)
     *
     * TEACHING POINT:
     * - Getters automatically re-evaluate when referenced data changes
     * - This proves reactivity is working when a new object reference is assigned
     */
    get formattedProfileSummary() {
        return `${this.userProfile.name} — ${this.userProfile.role}`;
    }

    /**
     * Handles update requests from child
     * Child NEVER mutates data directly
     */
    handleProfileUpdateRequest(event) {
        const { role } = event.detail;

        // ✅ Correct pattern: shallow copy (new reference)
        this.userProfile = {
            ...this.userProfile,
            role
        };
    }
     /* ============================================================
       CALLING CHILD PUBLIC METHODS
       ============================================================ */

       handleIncrement() {
        const child = this.template.querySelector('c-public-method-child');

        // TEACHING POINT:
        // - querySelector gives access to child instance
        // - parent can now call @api methods
        child.incrementCounter();
    }

    handleReset() {
        const child = this.template.querySelector('c-public-method-child');
        child.resetCounter();
    }
}
