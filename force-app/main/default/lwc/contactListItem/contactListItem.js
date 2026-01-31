import { LightningElement, api } from 'lwc';

export default class ContactListItem extends LightningElement {
    @api contact;

    get ariaLabel() {
        return `Select ${this.contact?.Name || 'contact'}`;
    }

    handleClick(event) {
        // Read about event best practices at http://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.events_best_practices
        const selectEvent = new CustomEvent('select', {
            detail: this.contact.Id
        });
        // Fire the custom event
        this.dispatchEvent(selectEvent);
    }
}