import { LightningElement, api } from 'lwc';

/**
 * ============================================================
 * DYNAMIC CHILD COMPONENT
 * ============================================================
 *
 * This component is intentionally SIMPLE.
 *
 * TEACHING GOAL:
 * - It proves that a component can be created at runtime
 * - It contains no props, no events, no logic
 * - All complexity will live in the parent
 */
/**
 * ============================================================
 * DYNAMIC CHILD (PHASE 2)
 * ============================================================
 *
 * TEACHING GOALS:
 * - Accept a property set imperatively by the parent
 * - Emit an event the parent must listen to manually
 */
export default class DynamicSimpleChild extends LightningElement {
    /**
     * This property will be set AFTER creation.
     * There is NO template binding here.
     */
    @api message;
    @api titlemessage = 'I was created dynamically using JavaScript.';
    /**
     * Emit a CustomEvent.
     * Parent must use addEventListener().
     */
    handleNotifyParent() {
        this.dispatchEvent(
            new CustomEvent('notify', {
                detail: {
                    info: 'Hello from dynamic child custom Event'
                }
            })
        );
    }
}
