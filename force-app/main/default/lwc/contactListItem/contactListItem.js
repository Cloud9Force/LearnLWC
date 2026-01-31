import { LightningElement, api } from 'lwc';

export default class ContactListItem extends LightningElement {
    @api contact;

    get ariaLabel() {
        return `Select ${this.contact?.Name || 'contact'}`;
    }

    handleClick(event) {
        // Read about event best practices at http://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.events_best_practices
        const contactId = this.contact?.Id;
        if (!contactId) {
            return;
        }
        const selectEvent = new CustomEvent('select', {
            detail: contactId
        });
        // Fire the custom event
        this.dispatchEvent(selectEvent);
    }
}