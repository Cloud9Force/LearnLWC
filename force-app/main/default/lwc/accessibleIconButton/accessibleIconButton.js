import { LightningElement, api } from 'lwc';

export default class AccessibleIconButton extends LightningElement {

    /**
     * Public accessibility label.
     * Maps to aria-label on the button.
     */
    @api label = 'Search';

    handleClick() {
        this.dispatchEvent(new CustomEvent('action'));
    }
}