import { LightningElement, track } from 'lwc';

export default class SlotsChild extends LightningElement {

    // Track slot info for UI rendering
    @track slotNodeCount = 0;
    @track slotNodeNames = [];
    // NEW: slotted element inspection
    @track slottedElementInfo = [];

    _slotProcessed = false;

    /**
     * Called when slot content changes AFTER initial render
     */
    handleSlotChange(event) {
        this.processSlotElements(event.target);
    }

    /**
     * Called after component is rendered
     * Ensures initial slot content is captured
     */
    renderedCallback() {
        if (this._slotProcessed) {
            return;
        }

        const slot = this.template.querySelector('slot');
        if (slot) {
            this.processSlotElements(slot);
            this._slotProcessed = true;
        }
    }

    /**
     * Centralized slot processing logic
     */
    processSlotElements(slot) {
        const assignedElements = slot.assignedElements({ flatten: true });

        this.slotNodeCount = assignedElements.length;
        this.slotNodeNames = assignedElements.map(el => el.tagName);

        this.slottedElementInfo = assignedElements.map(el => ({
            tag: el.tagName,
            text: el.textContent?.trim()
        }));

        console.log('Assigned slot elements:', assignedElements);
    }
        
}