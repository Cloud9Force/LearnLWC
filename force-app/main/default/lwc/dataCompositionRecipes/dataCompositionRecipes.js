import { LightningElement } from 'lwc';

export default class DataCompositionRecipes extends LightningElement {

    dynamicMessage = 'Hello from Parent to Child api property (dynamic)';

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
    //lwc:spread makes it easier to work with large config or objects. You can dynamically pass multiple attributes or properties. However, it only spreads top-level properties. Nested objects won't be automatically spread.
    spreadExample = {
        heading: 'Spread Props Demo',
        message: 'This message came through a grouped props object'
    };
    

    // Track event results
   
    lastChildNotification = '';
    lastBubblingDemo = '';



    lastDynamicEvent = '';
    dynamicChildName = 'James Smith';
    dynamicChildAge = 40;
    handleChildInitialized(event) {
        const { name, age } = event.detail;
        this.dynamicChildName = name;
        this.dynamicChildAge = age;
        this.lastDynamicEvent = `Initialized: ${name}, ${age}`;
    }

    handleChildUpdated(event) {
        const { name, age } = event.detail;
        this.dynamicChildName = name;
        this.dynamicChildAge = age;
        this.lastDynamicEvent = `Updated: ${name}, ${age}`;
    }

    

     
    /* ============================================================
       DATA FLOW DEMO – SOURCE OF TRUTH (PARENT)
       ============================================================ */

    // Parent owns the data (single source of truth)
    userProfile = {
        name: 'Jane Doe',
        role: 'Developer',
        address: {
            city: 'New York'
        }
    };

    userProfileDeep = {
        name: 'Alex Deep',
        role: 'Developer Deep',
        address: {
            city: 'Chicago'
        }
    };

    /**
     * COMPUTED GETTER (REACTIVITY DEMO)
     *
     * TEACHING POINT:
     * - Getters automatically re-evaluate when referenced data changes
     * - This proves reactivity is working when a new object reference is assigned
     */
    get formattedProfileSummary() {
        return `${this.userProfile.name} — ${this.userProfile.role} — ${this.userProfile.address.city}`;
    }

    get formattedProfileSummaryDeep() {
        return `${this.userProfileDeep.name} — ${this.userProfileDeep.role} — ${this.userProfileDeep.address.city}`;
    }

    /**
     * Handles update requests from child
     * Child NEVER mutates data directly
     */
    handleProfileUpdateRequest(event) {
        const {
            role: newRole,
            name: newName,
            address: newAddress,
            target
        } = event.detail;

        if (target === 'deep') {
            const deepCopy = JSON.parse(JSON.stringify(this.userProfileDeep));//snapshot of the deep object
            this.userProfileDeep = {
                ...deepCopy,
                ...(newRole ? { role: newRole } : {}),//update the role if it is provided
                ...(newName ? { name: newName } : {}),//update the name if it is provided
                address: newAddress//update the address if it is provided
                    ? { ...(deepCopy.address || {}), ...newAddress }
                    : deepCopy.address//if the address is not provided, use the snapshot address
            };
            return;
        }

        // ✅ Correct pattern: shallow copy (new reference)
        this.userProfile = {
            ...this.userProfile,
            ...(newRole ? { role: newRole } : {}),
            ...(newName ? { name: newName } : {}),
            address: newAddress
                ? { ...(this.userProfile.address || {}), ...newAddress }
                : this.userProfile.address
        };
    }


    /* ============================================================
    CALLING CHILD PUBLIC METHODS
    ============================================================ */

    lastReadCounter;

    /**
    * Increment without parameters
    */
    handleIncrement() {
        const child = this.template.querySelector('c-public-method-child');
        child.incrementCounter();
    }

    /**
    * Pass a parameter into the child method
    */
    handleAddFive() {
        const child = this.template.querySelector('c-public-method-child');
        child.addToCounter(5);
    }

    /**
    * Read a return value from the child
    */
    handleReadCounter() {
        const child = this.template.querySelector('c-public-method-child');

        // TEACHING POINT:
        // - Return values are synchronous
        // - Parent can store and render them
        this.lastReadCounter = child.getCurrentCounter();
    }
    /**
     * ============================================================
     * ASYNC CALL FROM PARENT
     * ============================================================
     */
    async handleAsyncIncrement() {
        const child = this.template.querySelector('c-public-method-child');

        // TEACHING POINT:
        // - Async @api methods return Promises
        // - Parent must await the result
        const newValue = await child.incrementAfterDelay(2000);

        this.lastReadCounter = newValue;
    }
    //lwc:spread makes it easier to work with large config or objects. You can dynamically pass multiple attributes or properties. However, it only spreads top-level properties. Nested objects won't be automatically spread.
    props = {
        firstName: 'Amy',
        lastName: 'Taylor'
    };
    handleChangeSpread(event) {
        const field = event.target.name;
        if (field === 'firstName') {
            this.props = {
                firstName: event.target.value,
                lastName: this.props.lastName
            };
        } else if (field === 'lastName') {
            this.props = {
                firstName: this.props.firstName,
                lastName: event.target.value
            };
        }
    }

    /* ============================================================
       SPREAD PROPERTIES – ADVANCED RULES
       ============================================================ */

    spreadDisabled = false;
    spreadOnlyMessage = 'No event yet (custom handler via spread does not bind)';
    spreadDomMessage = 'No event yet (onclick via spread not triggered)';

    // Object used for lwc:spread
    get spreadProps() {
        return {
            title: 'Passed via lwc:spread',
            disabled: this.spreadDisabled,
            // This will NOT bind as an event handler via lwc:spread
            onchildclicked: this.handleSpreadChildClick.bind(this),
            // This WILL bind as a DOM event handler on the host element
            onclick: this.handleSpreadDomClick.bind(this)
        };
    }
    //lwc:spread supports HTML attributes, including standard DOM event handlers, such as:onclick, onchange, oninput, onkeydown, onkeyup, onfocus, onblur, etc.
    // Track child events
    spreadEventMessage = 'No event yet';

    handleSpreadChildClick() {
        // 🔥 Visible UI proof
        this.spreadEventMessage = '✅ Child click event handled via lwc:spread';
        // OPTIONAL: demonstrate reactivity + attribute reflection
        this.spreadDisabled = true;
    }

    handleSpreadDomClick() {
        this.spreadDomMessage = '✅ click handled via onclick in lwc:spread';
    }


    handleChildNotification(event) {
        console.log('Event received from child:', event.detail);
        this.lastChildNotification = JSON.stringify(
            {
                ...event.detail,
                receivedAt: new Date().toISOString()
            },
            null,
            2
        );
    }

    handleBubblingDemo(event) {
        this.lastBubblingDemo = JSON.stringify(event.detail, null, 2);
    }


    /* ============================================================
       BEST COMPOSITION – PARENT OWNS STATE
       ============================================================ */

       compositionState = {
        status: 'Inactive'
    };

    get compositionStatus() {
        return this.compositionState.status;
    }

    handleCompositionAction(event) {
        if (event.detail.action === 'toggleStatus') {
            // Parent decides how to change state
            this.compositionState = {
                ...this.compositionState,
                status:
                    this.compositionState.status === 'Active'
                        ? 'Inactive'
                        : 'Active'
            };
        }
    }
}
