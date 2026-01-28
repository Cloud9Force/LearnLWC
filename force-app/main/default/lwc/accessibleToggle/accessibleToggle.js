import { LightningElement, api } from 'lwc';
//ARIA attributes communicate state, not visuals.
//Visually, you can see a toggle is on/off.
//A screen reader user cannot unless you expose state.
export default class AccessibleToggle extends LightningElement {

    @api label = 'Play';
    pressed = false;

    get pressedText() {
        return this.pressed ? 'ON' : 'OFF';
    }

    handleToggle() {
        this.pressed = !this.pressed;

        this.dispatchEvent(
            new CustomEvent('toggle', {
                detail: { pressed: this.pressed }
            })
        );
    }
}
