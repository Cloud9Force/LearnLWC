import { LightningElement, track } from 'lwc';

export default class EventsHandlingPlayground extends LightningElement {

    @track declerativeSingleMsg = '';
    @track multi1Msg = '';
    @track multi2Msg = '';
    
    
    
    
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

    @track currentMode = 'light';
    @track statusMessage = 'Waiting...';

    // Dynamic handlers object - changes trigger listener updates
    get dynamicHandlers() {
        if (this.currentMode === 'light') {
            return {
                lightclick: this.handleLightClick,
                lightchange: this.handleLightChange
            };
        } else {
            return {
                darkhover: this.handleDarkHover,
                darkclick: this.handleDarkClick
            };
        }
    }

    get lightModeButtonClass() {
        return this.currentMode === 'light' ? 'slds-button_brand' : '';
    }

    get darkModeButtonClass() {
        return this.currentMode === 'dark' ? 'slds-button_brand' : '';
    }

    setLightMode() {
        this.currentMode = 'light';
        this.statusMessage = 'Switched to light mode listeners';
    }

    setDarkMode() {
        this.currentMode = 'dark';
        this.statusMessage = 'Switched to dark mode listeners';
    }

    // Light mode handlers
    handleLightClick(event) {
        this.statusMessage = `Light clicked: ${event.detail.action}`;
    }

    handleLightChange(event) {
        this.statusMessage = `Light changed: ${event.detail.value}`;
    }

    // Dark mode handlers
    handleDarkHover(event) {
        this.statusMessage = `Dark hovered: ${event.detail.target}`;
    }

    handleDarkClick(event) {
        this.statusMessage = `Dark clicked: ${event.detail.action}`;
    }

    //3)Dynamic Event
    customEventDetail = "";
    eventHandlers = {
        customEvent: this.handleCustomEvent,
    };

    handleCustomEvent(event) {
        this.customEventDetail = `${event.detail}`;
    }

    switchEventListener() {
        this.eventHandlers = this.eventHandlers.customEvent
        ? { anotherCustomEvent: this.handleCustomEvent }
        : { customEvent: this.handleCustomEvent };
    }


    // 4) Dynamic
    @track useDynamic = false;
    @track dynamicMsg = '';
    toggleDynamic() {
        this.useDynamic = !this.useDynamic;
    }
    handleDynamic(event) {
        this.dynamicMsg = event.detail.msg;
    }

    // 5) Imperative
    @track imperativeMsg = '';
    handleImperative(msg) {
        this.imperativeMsg = msg;
    }
    constructor() {
        super();
        this.template.addEventListener("notification", this.handleNotification);
      }
      handleNotification = () => {};

    // 5) Reference to dispatching component
    @track dispatchedFrom = '';
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