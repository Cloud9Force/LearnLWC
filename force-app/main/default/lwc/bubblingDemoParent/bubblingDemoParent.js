import { LightningElement } from 'lwc';

export default class BubblingDemoParent extends LightningElement {
    lastParentEvent = '';

    handleChildEvent(event) {
        this.lastParentEvent = JSON.stringify(event.detail, null, 2);
    }
}
