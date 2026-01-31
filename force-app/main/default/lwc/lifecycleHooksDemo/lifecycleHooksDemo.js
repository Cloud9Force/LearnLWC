import { LightningElement, track } from 'lwc';

export default class LifecycleHooksDemo extends LightningElement {

    @track hookLogs = [];

    // Internal flag to avoid infinite updates
    renderedOnce = false;
    handlerAttached = false;
    clickCount = 0;

    /**
     * =============================================================
     * constructor
     * Fires when the component instance is created
     * DOM is not yet available
     */
    constructor() {
        super();
        this.logHook('constructor: component instance created');
    }

    /**
     * =============================================================
     * connectedCallback
     * Fires when component is inserted into the DOM
     */
    connectedCallback() {
        const message =
            `connectedCallback: component added to DOM ` +
            `(isConnected: ${this.isConnected})`;
        this.logHook(message);
        this.dispatchEvent(
            new CustomEvent('hooklog', {
                detail: { message }
            })
        );
    }

    /**
     * =============================================================
     * renderedCallback
     * Fires after every render
     * Must guard repeated updates
     */
    renderedCallback() {
        if (this.renderedOnce) {
            return;
        }
        this.renderedOnce = true;
        this.logHook('renderedCallback: UI rendered');

        const box = this.template.querySelector('.hook-box');
        if (box) {
            box.textContent = 'renderedCallback updated this text';
        }

        if (this.handlerAttached) {
            return;
        }
        const button = this.template.querySelector(
            '.programmatic-listener'
        );
        if (button) {
            button.addEventListener(
                'click',
                this.handleProgrammaticClick.bind(this)
            );
            this.handlerAttached = true;
        }
    }

    /**
     * =============================================================
     * disconnectedCallback
     * Fires when component is removed from DOM
     */
    disconnectedCallback() {
        const message =
            `disconnectedCallback: component removed from DOM ` +
            `(isConnected: ${this.isConnected})`;
        this.logHook(message);
        this.dispatchEvent(
            new CustomEvent('hooklog', {
                detail: { message }
            })
        );
    }

    /**
     * Helper method for logging
     */
    logHook(message) {
        // Add new log entry at the top
        this.hookLogs = [message, ...this.hookLogs];
    }

    handleProgrammaticClick() {
        this.clickCount += 1;
        this.logHook(
            `Programmatic listener fired: ${this.clickCount}`
        );
    }
}