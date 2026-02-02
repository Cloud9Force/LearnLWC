import { LightningElement } from 'lwc';

export default class EventDemoInput extends LightningElement {

    handleChange(event) {
        this.dispatchEvent(new CustomEvent('changefield', {
            detail: { value: event.target.value }
        }));
    }
}
