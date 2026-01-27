import { LightningElement, api } from 'lwc';

export default class PublicMethodChild extends LightningElement {

    /**
     * Internal state owned by the child
     */
    counter = 0;

    /**
     * PUBLIC METHOD
     *
     * TEACHING POINT:
     * - @api on a METHOD exposes behavior, not data
     * - Parent can call this method imperatively
     */
    @api
    incrementCounter() {
        this.counter += 1;
    }

    /**
     * SECOND PUBLIC METHOD
     *
     * Demonstrates multiple exposed behaviors
     */
    @api
    resetCounter() {
        this.counter = 0;
    }
}
