import { LightningElement, api } from 'lwc';

export default class DynamicEventChild extends LightningElement {
    @api name;
    @api age;

    connectedCallback() {
        // Dispatch an event on initial load with current props
        this.dispatchEvent(
            new CustomEvent('childinitialized', {
                detail: {
                    name: this.name,
                    age: this.age
                },
                bubbles: true,
                composed: true
            })
        );
    }

    handleUpdateClick() {
        // Dispatch an event on button click with new values
        this.dispatchEvent(
            new CustomEvent('childupdated', {
                detail: {
                    name: 'LWC Component',
                    age: 8
                },
                bubbles: true,
                composed: true
            })
        );
    }
}
