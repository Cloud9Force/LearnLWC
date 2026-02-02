import { LightningElement } from 'lwc';

export default class EventChildRetarget extends LightningElement {

    dispatch() {
        this.dispatchEvent(new CustomEvent('cross', {
            detail: { crossMessage: 'Cross shadow retarget' },
            bubbles: true,
            composed: true
        }));
    }
}
