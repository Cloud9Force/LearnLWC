import { LightningElement } from 'lwc';

export default class BubblingDemoChild extends LightningElement {
    fireEvent({ bubbles, composed }) {
        this.dispatchEvent(
            new CustomEvent('bubbledemo', {
                detail: {
                    message: 'Hello from Child',
                    bubbles,
                    composed,
                    timestamp: new Date().toISOString()
                },
                bubbles,
                composed
            })
        );
    }

    handleNoBubbleNoComposed() {
        this.fireEvent({ bubbles: false, composed: false });
    }

    handleBubbleOnly() {
        this.fireEvent({ bubbles: true, composed: false });
    }

    handleBubbleAndComposed() {
        this.fireEvent({ bubbles: true, composed: true });
    }
}
