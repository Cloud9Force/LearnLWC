import { LightningElement, track } from 'lwc';
import {
    registerRefreshHandler,
    unregisterRefreshHandler
} from 'lightning/refresh';
/**
 registerRefreshHandler registers your component’s refresh callback with the Lightning Refresh system.
So when a global refresh happens (e.g. another component dispatches RefreshEvent), the framework will call your handler (handleRefresh) so you can reload data or update UI.
In short: it subscribes your component to global refresh events.
 */

export default class RefreshAwareWidget extends LightningElement {

    // ============================
    // REFRESH STATE (UI-CONTROLLING)
    // ============================
    @track refreshCount = 0;
    @track lastRefreshed = 'Never';
    @track isRefreshing = false;

    refreshHandler;

    // ============================
    // REGISTER FOR GLOBAL REFRESH
    // ============================
    connectedCallback() {
        this.refreshHandler = this.handleRefresh.bind(this);///t’s the bound version of handleRefresh.
        registerRefreshHandler(this, this.refreshHandler);//cannot pass handleRefresh directly as (this) inside it will not refer to the component instance here and must bind it to the component.
    }

    disconnectedCallback() {
        unregisterRefreshHandler(this, this.refreshHandler);
    }

    // ============================
    // REFRESH IMPLEMENTATION
    // ============================
    async handleRefresh() {
        this.isRefreshing = true;

        // Simulate async data reload - await pauses the async function until the promise resolves.
        await new Promise(resolve => setTimeout(resolve, 1000));//line creates a 1‑second delay

        this.refreshCount += 1;
        this.lastRefreshed = new Date().toLocaleTimeString();

        this.isRefreshing = false;
    }
}