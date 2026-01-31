import { LightningElement } from 'lwc';

export default class EventGrandparent extends LightningElement {

    fromTarget = 'Not available';
    fromDetail = 'Not available';
    sameShadowMessageFromDetail = 'Not available';
    sameShadowMessageFromTarget = 'Not available';
    handleSameEvent(event) {
        this.sameShadowMessageFromDetail = event.detail?.message || 'No detail as shadow DOM changed and detail not passed by event.';
        this.sameShadowMessageFromTarget = event.target?.message || 'No target as shadow DOM changed.';
    }

    handleDifferentEvent(event) {
        /*
         * At this point, the event has crossed
         * MULTIPLE shadow boundaries.
         *
         * Salesforce RETARGETS the event.
         */

        // ❌ This will NOT work reliably
        this.fromTarget = event.target?.message || 'undefined (retargeted) as shadow DOM changed.';

        // ✅ This ALWAYS works
        this.fromDetail = event.detail.message;
    }
}