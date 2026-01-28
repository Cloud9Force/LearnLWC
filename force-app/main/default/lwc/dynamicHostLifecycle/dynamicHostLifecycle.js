import { LightningElement } from 'lwc';
import { createElement } from 'lwc';
import { getDynamicComponentConfig } from 'c/ldsUtils';

export default class DynamicHostLifecycle extends LightningElement {

    /**
     * ============================================================
     * STATE FOR TEACHING
     * ============================================================
     */
    dynamicChild;        // holds reference to dynamic component
    showDeclarative = false; // used for if:true comparison
    statusMessage = 'Nothing created yet';
    lastEventMessage = 'No event from child received yet';
    /**
     * ============================================================
     * CREATE DYNAMIC COMPONENT
     * ============================================================
     */
    handleCreateDynamic() {

        // Prevent multiple creations (common mistake)
        if (this.dynamicChild) {
            this.statusMessage = 'Dynamic child already exists';
            return;
        }

       /* const element = createElement(
            'c-dynamic-simple-child',
            { is: DynamicSimpleChild }
        );
*/
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
        element.message = 'I am a dynamic component';
        element.titlemessage = 'I was created dynamically using JavaScript.';

        // Store reference for cleanup later
        this.dynamicChild = element;
        element.addEventListener(
            'notify',
            (event) => {
                this.lastEventMessage = event.detail.info;
            }
        );
        this.template
            .querySelector('.dynamic-container')
            .appendChild(element);

        this.statusMessage = 'Dynamic child created';
    }

    /**
     * ============================================================
     * REMOVE / DESTROY DYNAMIC COMPONENT
     * ============================================================
     *
     * TEACHING POINT:
     * - LWC does NOT auto-destroy dynamic components
     * - You MUST remove them manually
     * - Forgetting this causes memory leaks
     */
    handleRemoveDynamic() {

        if (!this.dynamicChild) {
            this.statusMessage = 'No dynamic child to remove';
            return;
        }

        const container =
            this.template.querySelector('.dynamic-container');

        container.removeChild(this.dynamicChild);

        // Clear reference to allow garbage collection
        this.dynamicChild = null;

        this.statusMessage = 'Dynamic child removed';
        this.lastEventMessage = 'No event from child received yet';
    }

    /**
     * ============================================================
     * DECLARATIVE COMPARISON
     * ============================================================
     *
     * This toggles a child using if:true.
     * LWC handles creation & destruction automatically.
     */
    handleToggleDeclarative() {
        this.showDeclarative = !this.showDeclarative;
        if (!this.showDeclarative) {
            this.statusMessage = 'Declarative child removed';
            this.lastEventMessage = 'No event from child received yet';
        
        }
    }
    /**
 * ============================================================
 * DECLARATIVE EVENT HANDLER
 * ============================================================
 *
 * This is how CustomEvents are handled in declarative LWC.
 * No addEventListener() is needed.
 */
    handleDeclarativeNotifyEvent(event) {
    this.statusMessage =
        'Declarative child says: ' + event.detail.info;
    this.lastEventMessage = event.detail.info;
    
}
}
