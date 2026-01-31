import { LightningElement, track } from 'lwc';

export default class LifecycleParentDemo extends LightningElement {
    isVisible = false;
    lastHookMessage = 'No disconnectedCallback hook message yet';
    lastDisconnectedMessage = 'No disconnectedCallback hook message yet';

    toggle() {
        this.isVisible = !this.isVisible;
        if (this.isVisible) {
            this.lastHookMessage = this.lastDisconnectedMessage;
        }
    }

    handleHookLog(event) {
        this.lastHookMessage = event.detail.message;
        
    }
}