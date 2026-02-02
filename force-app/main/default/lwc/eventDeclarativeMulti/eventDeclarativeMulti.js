import { LightningElement } from 'lwc';

export default class EventDemoMulti extends LightningElement {
    eventMessage = 'No events yet';
    clickCount = 0;
    hoverCount = 0;

    dispatchBoth() {
        this.dispatchEvent(new CustomEvent('multi1', {
            detail: { msg: 'multi1 fired' }
        }));
        this.dispatchEvent(new CustomEvent('multi2', {
            detail: { msg: 'multi2 fired' }
        }));
    }
    lastEvent = 'None';

    /*
     * This object maps DOM event names
     * to handler functions.
     *
     * IMPORTANT:
     * - keys must be valid DOM events
     * - values must be function references
     */
    eventHandlers = {
        click: this.handleClick.bind(this),
        mouseover: this.handleMouseOver.bind(this),
        focus: this.handleFocus.bind(this)
    };

    handleClick(event) {
        this.lastEvent = 'click';
    }

    handleMouseOver(event) {
        this.lastEvent = 'mouseover';
    }

    handleFocus(event) {
        this.lastEvent = 'focus';
    }
    dispatchClick() {
        // Dispatch based on expected mode (in real app, could detect parent mode)
        this.dispatchEvent(new CustomEvent('lightclick', {
            detail: { action: 'Button clicked!' },
            bubbles: true, composed: true
        }));
        this.dispatchEvent(new CustomEvent('darkclick', {
            detail: { action: 'Dark button clicked!' },
            bubbles: true, composed: true
        }));
    }

    dispatchChange(event) {
        this.dispatchEvent(new CustomEvent('lightchange', {
            detail: { value: event.target.value },
            bubbles: true, composed: true
        }));
    }
}
