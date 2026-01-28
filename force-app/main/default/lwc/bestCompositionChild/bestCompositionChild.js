import { LightningElement, api } from 'lwc';

export default class BestCompositionChild extends LightningElement {

    /**
     * INPUTS (read-only)
     * Child does NOT own this data
     */
    @api title;
    @api description;
    @api status;

    /**
     * OUTPUT (intent only)
     * Child does NOT change data directly
     */
    handleActionClick() {
        this.dispatchEvent(
            new CustomEvent('actionrequested', {
                detail: {
                    action: 'toggleStatus'
                },
                bubbles: true,
                composed: true
            })
        );
    }
}
