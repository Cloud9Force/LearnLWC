import { LightningElement } from 'lwc';
//Use aria-live for dynamic updates users must hear.
//If text changes dynamically, screen readers won’t announce it unless told to.
export default class AccessibleStatus extends LightningElement {

    message = 'Ready';

    updateStatus() {
        this.message = 'Saved successfully';
    }
}
