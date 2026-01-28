import { LightningElement, track, api  } from 'lwc';

export default class ContainerBaseDemo extends LightningElement {

    @track activeTab = 'home';
    @track lastAccordionSection = '';
    @track lastMenuAction = '';
    @track isDVisible = false;
    @track activeSectionsMessage = '';
    @track isVerticalTabs = false;
    @api horizontalAlign = 'space';
    selectedItemValue;
    lastMenuAction;
    @track buttonGroupMessage = 'No button group action yet';

    // Called when an accordion section opens or closes
    handleAccordionToggle(event) {
        // event.detail.openSections is an array of open section names
        const openSections = event.detail.openSections;
        this.lastAccordionSection = Array.isArray(openSections)
            ? openSections.join(', ')
            : openSections;

        

        if (openSections.length === 0) {
            this.activeSectionsMessage = 'All sections are closed';
        } else {
            this.activeSectionsMessage =
                'Open sections: ' + openSections.join(', ');
        }
    }
    handleSetActiveSectionC() {
        const accordion = this.template.querySelector('.example-accordion');

        accordion.activeSectionName = 'C';
    }
    
    handleToggleSectionD() {
        this.isDVisible = !this.isDVisible;
        const accordion = this.template.querySelector('.example-accordion');
        if (accordion) {
            accordion.activeSectionName = this.isDVisible ? 'D' : 'B';
        }
    }
    
    // Called when a tab is changed
    handleTabChange(event) {
        // event.detail.value gives the active tab value
        this.activeTab = event.detail.value;
    }

    get tabsetVariant() {
        return this.isVerticalTabs ? 'vertical' : undefined;
    }

    showTabFour;

    toggleOptionalTab() {
        this.showTabFour = !this.showTabFour;
    }

    handleToggleTabOrientation() {
        this.isVerticalTabs = !this.isVerticalTabs;
    }
    activeValueMessage = '';
    handleActive(event) {
        this.activeValueMessage = `Tab with value ${event.target.value} is now active`;
    }

    // Called when a menu item is selected
    handleMenuSelect(event) {
        // event.target.value on menu items returns the selected item value
        this.lastMenuAction = event.target.value;
        
    }
    handleButtonMenuSelect(event) {
        this.selectedItemValue = event.detail.value;
        this.lastMenuAction = event.detail.label;
    }

    handleButtonGroupClick(event) {
        const label = event.target.label || 'Button';
        this.buttonGroupMessage = `${label} clicked`;
    }

    handleButtonGroupMenuSelect(event) {
        this.buttonGroupMessage = `Menu item selected: ${event.detail.value}`;
    }
}
