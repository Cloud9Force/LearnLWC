import { LightningElement } from 'lwc';
import { createElement } from 'lwc';
import { getDynamicComponentConfig } from 'c/ldsUtils';

export default class DynamicHostInteraction extends LightningElement {

    /**
     * Store reference to the dynamically created component.
     * This is IMPORTANT for later updates and cleanup.
     */
    dynamicChild;

    /**
     * UI state for teaching
     */
    lastEventMessage = 'No event from child received yet';

    /**
     * ============================================================
     * CREATE + INTERACT WITH DYNAMIC COMPONENT
     * ============================================================
     */
    handleCreateAndInteract() {
        if (this.dynamicChild) {
            this.lastEventMessage = 'Dynamic child already exists';
            return;
        }

        /**
         * STEP 1: Create the component
         */
        let element;
        try {
            const { tagName, ctor } = getDynamicComponentConfig('simple');
            element = createElement(
                tagName,
                { is: ctor }
            );
        } catch (error) {
            this.lastEventMessage =
                error?.message ?? 'Failed to create dynamic child';
            return;
        }
        /**
         * STEP 2: Set properties IMPERATIVELY
         *
         * IMPORTANT:
         * - This bypasses template binding
         * - This is NOT reactive
         * - If you want to update it later, you must do it again
         */
        element.message = 'Set imperatively by parent when dynamic component is created';

        /**
         * STEP 3: Listen to events IMPERATIVELY
         *
         * IMPORTANT:
         * - lwc:on DOES NOT WORK
         * - You MUST use addEventListener
         */
        element.addEventListener(
            'notify',
            (event) => {
                this.lastEventMessage = event.detail.info;
            }
        );

        /**
         * STEP 4: Insert into the DOM
         */
        this.template
            .querySelector('.dynamic-container')
            .appendChild(element);

        /**
         * Save reference for later phases (updates / cleanup)
         */
        this.dynamicChild = element;
    }
}
