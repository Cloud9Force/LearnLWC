import { LightningElement, api } from 'lwc';

export default class ArrayIterationChild extends LightningElement {
    // Receive non-primitive array reference
    @api items;

    // ❌ ANTI-PATTERN:
    // Do NOT push / mutate items directly:
    // this.items.push({}); // ❌ bad

    handleMutateDirect() {
        // ❌ This will not trigger reactivity and is not recommended
        this.items.push({ id: 'z', label: 'Mutated Direct' });
    }
}
