import { LightningElement, track } from 'lwc';

export default class AdvancedContainersDemo extends LightningElement {

    @track carouselIndex = 0;
    @track showQuickActionPanel = false;
    @track isModalOpen = false;

    /**
     * Carousel index change event
     * Fires as user navigates between slides
     */
    handleCarouselChange(event) {
        this.carouselIndex = event.detail.value;
    }

    /**
     * Open the modal dialog using the LWC modal API
     */
    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    /**
     * Show quick action panel
     * Quick Action Panel is a modal styled container
     */
    showQuickAction() {
        this.showQuickActionPanel = true;
    }

    /**
     * Hide quick action panel
     */
    closeQuickActionPanel() {
        this.showQuickActionPanel = false;
    }
}
