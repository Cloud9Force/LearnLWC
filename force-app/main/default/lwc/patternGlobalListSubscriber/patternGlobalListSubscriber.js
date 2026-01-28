import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import GLOBAL_FILTER_CHANNEL
    from '@salesforce/messageChannel/GlobalFilterChannel__c';

export default class GlobalListSubscriber extends LightningElement {

    department = 'All';

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        subscribe(
            this.messageContext,
            GLOBAL_FILTER_CHANNEL,
            (message) => {
                this.department = message.department || 'All';
            }
        );
    }
}
