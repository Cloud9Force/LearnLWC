import { LightningElement } from 'lwc';

export default class EventDemoReference extends LightningElement {

    dispatch() {
        this.dispatchEvent(new CustomEvent('refer', {
            detail: { msg: 'Reference event fired' }
        }));
    }
}
