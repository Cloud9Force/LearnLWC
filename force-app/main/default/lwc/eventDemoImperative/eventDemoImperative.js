import { LightningElement } from 'lwc';

export default class EventDemoImperative extends LightningElement {

    connectedCallback() {
        /*
         * Imperative event listener added in JS
         * Usually done inside parent, but
         * demonstration here shows usage
         */
        this.template.addEventListener('imperative', this.handleImperative);
    }

    handleImperative = () => {
        this.dispatchEvent(new CustomEvent('imperative', {
            detail: { msg: 'Imperative event fired from LWC eventDemoImperative' }
        }));
    }
}
