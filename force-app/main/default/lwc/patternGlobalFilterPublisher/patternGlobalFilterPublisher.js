import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import GLOBAL_FILTER_CHANNEL from '@salesforce/messageChannel/GlobalFilterChannel__c';

export default class GlobalFilterPublisher extends LightningElement {

    department = '';

    options = [
        { label: 'All', value: '' },
        { label: 'Engineering', value: 'Engineering' },
        { label: 'Sales', value: 'Sales' }
    ];

    @wire(MessageContext)
    messageContext;

    handleChange(event) {
        this.department = event.target.value;

        publish(this.messageContext, GLOBAL_FILTER_CHANNEL, {
            department: this.department
        });
    }
}