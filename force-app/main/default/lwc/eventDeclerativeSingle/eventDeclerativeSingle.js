import { LightningElement } from 'lwc';

export default class EventDemoSimple extends LightningElement {

    dispatch() {
        this.dispatchEvent(new CustomEvent('event', {
            detail: { msg: 'Declarative Single Event fired!' }
        }));
    }
}