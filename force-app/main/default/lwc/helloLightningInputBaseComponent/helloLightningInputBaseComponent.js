import { LightningElement } from 'lwc';

export default class HelloLightningInputBaseComponent extends LightningElement {
    emailValue = 'ceo@example.com';
    numberValue = 5;
    minNumber = 1;
    maxNumber = 10;
    allowedDomains = ['example.com', 'mycompany.com'];

    handleInputFocus(event) {
        // modify parent to properly highlight visually
        const classList = event.target.parentNode.classList;
        classList.add('lgc-highlight');
    }

    handleInputBlur(event) {
        // modify parent to properly remove highlight
        const classList = event.target.parentNode.classList;
        classList.remove('lgc-highlight');
    }

    handleEmailBlur(event) {
        try {
            const target = event && event.target ? event.target : null;
            if (!target) {
                return;
            }

            const value = target.value || '';
            if (!value) {
                target.setCustomValidity('');
                target.reportValidity();
                return;
            }

            const domain = value.split('@')[1];
            if (!domain || !this.allowedDomains.includes(domain)) {
                target.setCustomValidity(
                    `Email domain must be one of: ${this.allowedDomains.join(', ')}`
                );
            } else {
                target.setCustomValidity('');
            }
            target.reportValidity();
        } catch (error) {
            // Robust error handling to avoid UI crashes in Lightning runtime
            // eslint-disable-next-line no-console
            console.error('handleEmailBlur error', error);
        }
    }

    handleNumberChange(event) {
        this.numberValue = event.detail.value;
    }

    handleValidateClick() {
        const inputs = this.template.querySelectorAll('lightning-input[data-validate="true"]');
        inputs.forEach((input) => input.reportValidity());
    }
}