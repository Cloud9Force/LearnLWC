import { LightningElement } from 'lwc';

export default class EventDemoParent extends LightningElement {

    sameShadowMessage = '';
    differentShadowMessage = '';

    // SAME SHADOW TREE HANDLER
    handleSameEvent(event) {
        /*
         * Because the event did NOT cross a shadow boundary,
         * event.target still points to the child component.
         * So we can read properties directly.
         */
        this.sameShadowMessage = event.target.message;
    }

    // DIFFERENT SHADOW TREE HANDLER
    handleDifferentEvent(event) {
        /*
         * This handler will receive data via event.detail,
         * because event.target has been retargeted.
         */
        this.differentShadowMessage = event.detail.message;
    }
}