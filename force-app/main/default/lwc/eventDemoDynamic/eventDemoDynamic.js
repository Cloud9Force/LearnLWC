import { LightningElement } from 'lwc';

export default class EventDemoDynamic extends LightningElement {

    dispatch() {
        this.dispatchEvent(new CustomEvent('dynamic', {
            detail: { msg: 'Demo Dynamic event fired' }
        }));
    }
}
