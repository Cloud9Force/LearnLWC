import { LightningElement, track } from 'lwc';

export default class AttributeContractDemo extends LightningElement {

    @track textValue = '';
    @track isDisabled = true;

    handleChange(event) {
        this.textValue = event.target.value;
    }

    toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }
}
