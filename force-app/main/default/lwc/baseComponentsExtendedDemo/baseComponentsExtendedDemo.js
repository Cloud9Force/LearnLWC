import { LightningElement, track } from 'lwc';

export default class BaseComponentsExtendedDemo extends LightningElement {

    // =============================
    // STATE PROPERTIES
    // =============================
    @track name = '';
    @track description = '';
    @track country = '';
    @track skills = [];
    @track employmentType = '';
    @track roles = [];
    @track isLoading = false;
    @track nameFocusStatus = 'Name input not focused yet';

    // =============================
    // OPTIONS
    // =============================
    countryOptions = [
        { label: 'UK', value: 'uk' },
        { label: 'USA', value: 'us' },
        { label: 'India', value: 'in' }
    ];

    skillOptions = [
        { label: 'Salesforce', value: 'salesforce' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'Apex', value: 'apex' }
    ];

    employmentOptions = [
        { label: 'Full Time', value: 'fulltime' },
        { label: 'Contract', value: 'contract' }
    ];

    roleOptions = [
        { label: 'Admin', value: 'admin' },
        { label: 'Developer', value: 'developer' },
        { label: 'Architect', value: 'architect' }
    ];

    // =============================
    // BUTTON EVENTS
    // =============================

    /**
     * Fired when a lightning-button is clicked.
     * Use onclick for actions (submit, save, navigate).
     */
    handleButtonClick() {
        this.isLoading = true;

        // Simulate async action
        setTimeout(() => {
            this.isLoading = false;
        }, 1000);
    }

    /**
     * Fired when lightning-button-icon is clicked.
     * Use alternative-text for accessibility.
     */
    handleIconClick() {
        alert('Settings clicked');
    }

    // =============================
    // INPUT EVENTS
    // =============================

    /**
     * onchange fires when input value changes AND loses focus.
     * Use this for data updates.
     * Rule of thumb: use event.target.value for simple inputs.
     */
    handleNameChange(event) {
        this.name = event.target.value;
    }

    /**
     * onfocus fires when user enters the input.
     * Useful for UX hints or analytics.
     */
    handleNameFocus() {
        this.nameFocusStatus = 'Name input focused';
    }

    /**
     * onblur fires when input loses focus.
     * Useful for validation or formatting.
     */
    handleNameBlur() {
        this.nameFocusStatus = 'Name input blurred';
    }

    // =============================
    // TEXTAREA
    // =============================

    handleDescriptionChange(event) {
        this.description = event.target.value;
    }

    // =============================
    // SELECT / COMBOBOX
    // =============================

    /**
     * For select & combobox:
     * - value is available on event.target.value
     */
    handleCountryChange(event) {
        this.country = event.target.value;
    }

    // =============================
    // CHECKBOX GROUP
    // =============================

    /**
     * Checkbox group returns an ARRAY.
     * Value comes from event.detail.value.
     * Rule of thumb: use event.detail.value for base components
     * that emit structured payloads (arrays/objects).
     */
    handleSkillsChange(event) {
        this.skills = event.detail.value;
    }

    // =============================
    // RADIO GROUP
    // =============================

    /**
     * Radio group allows only ONE selection.
     * Value is in event.detail.value.
     */
    handleEmploymentChange(event) {
        this.employmentType = event.detail.value;
    }

    // =============================
    // DUAL LISTBOX
    // =============================

    /**
     * Dual listbox fires onchange when items move.
     * Value is an array of selected values.
     */
    handleRolesChange(event) {
        this.roles = event.detail.value;
    }
    register(event) {
        const selectCmp = this.template.querySelector('country-select');
        if (this.country === '') {
            selectCmp.setCustomValidity('You have not selected an option');
        } else {
            selectCmp.setCustomValidity('');
        }
        // Display the error without user interaction
        selectCmp.reportValidity();
    }
}