import { LightningElement, track } from 'lwc';

export default class EventsHandlingPlayground extends LightningElement {

    @track declerativeSingleMsg = '';
    @track multi1Msg = '';
    @track multi2Msg = '';
    @track useDynamic = false;
    @track dynamicMsg = '';
    @track imperativeMsg = '';
    @track dispatchedFrom = '';
    @track retargetMsg = '';
    @track inputValue = '';

    // 1) Declarative
    handleDeclerativeSingleEvent(event) {
        this.declerativeSingleMsg = event.detail.msg;
    }

    // 2) Multiple Declarative
    handleMulti1(event) {
        this.multi1Msg = event.detail.msg;
    }
    handleMulti2(event) {
        this.multi2Msg = event.detail.msg;
    }

    // 3) Dynamic
    toggleDynamic() {
        this.useDynamic = !this.useDynamic;
    }
    handleDynamic(event) {
        this.dynamicMsg = event.detail.msg;
    }

    // 4) Imperative
    handleImperative(msg) {
        this.imperativeMsg = msg;
    }

    // 5) Reference to dispatching component
    handleReference(event) {
        // event.target is the component instance that dispatched
        this.dispatchedFrom = event.target.localName;
    }

    // 6) Event Retargeting
    handleCrossRetarget(event) {
        this.retargetMsg = event.detail.crossMessage;
    }

    // 7) Input change
    handleInputChange(event) {
        this.inputValue = event.detail.value;
    }
}