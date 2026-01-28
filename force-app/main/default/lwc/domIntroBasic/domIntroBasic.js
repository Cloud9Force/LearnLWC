import { LightningElement } from 'lwc';

export default class DomIntroBasic extends LightningElement {

    status = 'Waiting for Button click to change the text';

    handleDomUpdate() {
        /**
         * CORRECT:
         * Access only elements this component owns
         * ❌ Anti-patterns (teach explicitly)
         * document.querySelector('.box'); // ❌ NEVER DO THIS
         * window.querySelector('.box');   // ❌ NEVER DO THIS   
         * 
         * ✅ Correct approach:
         * this.template.querySelector('.box'); // ✅ ALWAYS USE THIS
         * 
         
         */
        const box = this.template.querySelector('.box');
        box.textContent = 'Updated using DOM API';
        

        this.status = 'DOM updated safely using DOM API in JS file';
    }
}
