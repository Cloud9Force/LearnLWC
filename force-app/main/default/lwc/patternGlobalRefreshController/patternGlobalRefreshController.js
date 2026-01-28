import { LightningElement } from 'lwc';
import { RefreshEvent } from 'lightning/refresh';

export default class GlobalRefreshController extends LightningElement {

    refreshAll() {
        this.dispatchEvent(new RefreshEvent());
    }
}
