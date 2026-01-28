import { LightningElement, track } from 'lwc';

export default class BaseComponentEventsDemo extends LightningElement {

    // =============================
    // UI EVENT STATE
    // =============================
    buttonClicked = false;

    handleButtonClick() {
        // Simple UI interaction event
        this.buttonClicked = true;
    }

    // =============================
    // event.target vs event.detail
    // =============================
    // event.target:
    // - The DOM element that fired the event (input, select, etc.)
    // - Use when the value lives on the element itself
    // - Example: lightning-input, lightning-textarea -> event.target.value
    //
    // event.detail:
    // - Structured payload sent by the component
    // - Use when the component emits custom data (arrays, objects, ids)
    // - Example: checkbox-group -> event.detail.value (array)
    // - Example: record-picker -> event.detail.recordId
    name = '';

    handleInputChange(event) {
        // lightning-input uses event.target.value
        this.name = event.target.value;
    }

    // =============================
    // event.detail.value (ARRAY)
    // =============================
    skills = [];

    skillOptions = [
        { label: 'Apex', value: 'apex' },
        { label: 'LWC', value: 'lwc' },
        { label: 'JavaScript', value: 'js' }
    ];

    handleSkillsChange(event) {
        // checkbox-group returns value in event.detail.value
        this.skills = event.detail.value;
    }

    // =============================
    // SEMANTIC EVENT (MEANINGFUL PAYLOAD)
    // =============================
    // "Semantic event" means the event carries data that already has
    // business meaning (e.g., recordId, selected items) so the handler
    // doesn't need to read raw DOM values. This keeps handlers cleaner
    // and more reusable.
    recordId = '';

    handleRecordChange(event) {
        // record-picker emits semantic data
        this.recordId = event.detail.recordId;
    }

    // =============================
    // SYSTEM EVENTS
    // =============================
    formStatus = 'Not Submitted';

    handleFormSuccess(event) {
        // fired automatically by Salesforce
        this.formStatus = `Saved Record Id: ${event.detail.id}`;
    }

    handleFormError() {
        this.formStatus = 'Error saving record';
    }
}
