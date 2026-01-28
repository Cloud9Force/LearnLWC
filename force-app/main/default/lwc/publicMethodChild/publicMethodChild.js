import { LightningElement, api } from 'lwc';

export default class PublicMethodChild extends LightningElement {

    // Internal state owned by the child
    counter = 0;

    /**
     * ============================================================
     * PUBLIC METHOD – NO PARAMETERS
     * ============================================================
     *
     * TEACHING POINT:
     * - Parent can call child behavior imperatively
     * - No data is passed in
     */
    @api
    incrementCounter() {
        this.counter += 1;
    }

    /**
     * ============================================================
     * PUBLIC METHOD – WITH PARAMETERS
     * ============================================================
     *
     * TEACHING POINT:
     * - Parent can pass values into a child method
     * - Method parameters are plain JavaScript arguments
     */
    @api
    addToCounter(value) {
        this.counter += value;
    }

    /**
     * ============================================================
     * PUBLIC METHOD – RETURN VALUE
     * ============================================================
     *
     * TEACHING POINT:
     * - Child can return data back to the parent
     * - Return values are synchronous
     */
    @api
    getCurrentCounter() {
        return this.counter;
    }

    /**
     * ============================================================
     * PUBLIC METHOD – RESET
     * ============================================================
     */
    @api
    resetCounter() {
        this.counter = 0;
    }
    /**
     * ============================================================
     * ASYNC PUBLIC METHOD
     * ============================================================
     *
     * TEACHING POINT:
     * - @api methods CAN be async
     * - Parent must await the Promise
     * - Useful for async work (timeouts, Apex calls, calculations)
     */
    @api
    async incrementAfterDelay(delayMs) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
        this.counter += 1;
        return this.counter;
    }
}
