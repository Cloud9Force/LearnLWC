import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class EventWithData extends LightningElement {
    selectedContact;

    @wire(getContactList) contacts;

    handleSelect(event) {
        const contactId = event.detail;
        const contactList = this.contacts?.data || [];
        this.selectedContact = contactList.find(
            (contact) => contact.Id === contactId
        );
    }
}