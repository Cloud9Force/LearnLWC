import { LightningElement } from 'lwc';
import { createElement } from 'lwc';
import { getDynamicComponentConfig } from 'c/ldsUtils';
// LWC only exposes the bundle root module. dynamicComponentFactory.js is not directly importable.
export default class DynamicHostBasics extends LightningElement {
    dynamicChild;
    statusMessage = 'Nothing created yet';

    /**
     * ============================================================
     * STEP 1–4: CREATE & INSERT A DYNAMIC COMPONENT
     * ============================================================
     *
     * This method demonstrates:
     * 1. What a dynamic component is
     * 2. How to import it
     * 3. How to create it using createElement()
     * 4. How to insert it into the DOM
     */
    handleCreateDynamicComponent() {
        if (this.dynamicChild) {
            this.statusMessage = 'Dynamic child already exists';
            return;
        }

        let element;
        try {
            const { tagName, ctor } = getDynamicComponentConfig('simple');
            element = createElement(
                tagName,
                { is: ctor }
            );
        } catch (error) {
            this.statusMessage =
                error?.message ?? 'Failed to create dynamic child';
            return;
        }

        /**
         * STEP 2: Find a container in the template
         *
         * - Dynamic components must be attached manually
         * - LWC will NOT auto-render them
         */
        const container =
            this.template.querySelector('.dynamic-container');
        if (!container) {
            this.statusMessage = 'Dynamic container not found';
            return;
        }

        /**
         * STEP 3: Insert the component into the DOM
         *
         * - appendChild() makes the component visible
         * - Lifecycle hooks of the child now run
         */
        container.appendChild(element);
        this.dynamicChild = element;
        this.statusMessage = 'Dynamic child created';

        /**
         * IMPORTANT TEACHING NOTES:
         *
         * - This component was NOT declared in HTML
         * - The template had NO <c-dynamic-simple-child> tag
         * - JavaScript decided WHAT to render and WHEN
         *
         * This is the core idea of dynamic components.
         */
    }
}
