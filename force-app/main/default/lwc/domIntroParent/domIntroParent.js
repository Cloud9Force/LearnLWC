import { LightningElement } from 'lwc';

export default class DomIntroParent extends LightningElement {

    result = 'Not tried to see child DOM yet';

    tryAccessChildDom() {
        try {
            // ❌ This will NOT find the child's DOM
            const el = this.template.querySelector('.child-box');

            this.result = el
                ? 'Found child DOM (unexpected)'
                : 'Parent cannot see child DOM';
        } catch (e) {
            this.result = 'Error accessing DOM';
        }
    }
}