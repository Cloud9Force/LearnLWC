import { LightningElement } from 'lwc';

export default class SlotContainerAdvanced extends LightningElement {

    handleDefaultAction() {
        alert('Default footer action fired');
    }

    renderedCallback() {
        // ADVANCED: Access slotted elements (read-only)
        const slottedContent = this.template.querySelector('slot');
        const assigned = slottedContent?.assignedElements();

        // Teaching proof (do not mutate!)
        if (assigned && assigned.length > 0) {
            console.log('Slotted elements detected:', assigned);
        }
    }
}