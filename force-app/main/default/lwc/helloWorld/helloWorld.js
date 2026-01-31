import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    textValue = '';
    maxLength = 50;
    isDisabled = false;
    lastUpdated = null;

    handleInputChange(event) {
        this.textValue = event.detail.value;
        this.lastUpdated = new Date().toLocaleTimeString();
    }

    handleToggleDisable(event) {
        this.isDisabled = event.detail.checked;
    }

    handleClear() {
        this.textValue = '';
        this.lastUpdated = new Date().toLocaleTimeString();
    }

    get remainingChars() {
        return this.maxLength - this.textValue.length;
    }

    get isOverLimit() {
        return this.textValue.length > this.maxLength;
    }

    get uppercasePreview() {
        return this.textValue.toUpperCase();
    }
}