import { LightningElement } from 'lwc';

export default class ClassBindingPlayground extends LightningElement {

   
       /* =====================================================
       ARCHITECT RULES FOR CLASS IN LWC
       ===================================================== */
       /*
       Always compute classes in JavaScript
        Return strings or arrays of strings
        Let API v62.0 clean invalid values
        Prefer getters over inline logic
        Treat class as semantic state, not styling hacks
        In LWC, class reflects component state.
        If state changes, classes change.
        You never touch the DOM.
        ❌ DOM manipulation
        this.template.querySelector('div').classList.add('active'); ❌
        ❌ Inline logic in template
        <div class={isActive && 'active'}> ❌
       */

        
     /* =====================================================
       STATE VARIABLES
       
       ===================================================== */

    isActive = false;
    hasError = false;
    statusIndex = 0;

    statuses = ['loading', 'success', 'error'];

    /* =====================================================
       EXAMPLE 2: SIMPLE DYNAMIC CLASS
       ===================================================== */

    get simpleClass() {
        // Always return a STRING
        return this.isActive ? 'box active' : 'box';
    }

    toggleActive() {
        this.isActive = !this.isActive;
    }

    /* =====================================================
       EXAMPLE 3: MULTIPLE CONDITIONAL CLASSES
       ===================================================== */

    get multiClass() {
        return [
            'box',
            this.isActive ? 'active' : '',
            this.hasError ? 'error' : ''
        ].join(' ');
    }

    toggleError() {
        this.hasError = !this.hasError;
    }

    /* =====================================================
       EXAMPLE 4: API v62.0 NORMALIZATION
       ===================================================== */

    get normalizedClass() {
        return [
            'box',
            this.isActive && 'active',
            false,
            null,
            0,
            this.toggleActive
        ];
        // In API v62.0+, falsy values, numbers and functions
        // are automatically removed from the class list.
    }

    /* =====================================================
       EXAMPLE 5: STATUS-DRIVEN CLASS
       ===================================================== */

    get status() {
        return this.statuses[this.statusIndex];
    }

    get statusClass() {
        return [
            'box',
            'status',
            this.status === 'loading' && 'loading',
            this.status === 'success' && 'success',
            this.status === 'error' && 'error'
        ];
    }

    nextStatus() {
        this.statusIndex = (this.statusIndex + 1) % this.statuses.length;
    }
}