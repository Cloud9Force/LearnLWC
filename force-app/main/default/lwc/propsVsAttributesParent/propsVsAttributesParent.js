import { LightningElement } from 'lwc';

export default class PropsVsAttributesParent extends LightningElement {

    /**
     * ============================================================
     * JAVASCRIPT PROPERTIES
     * ============================================================
     *
     * These values are passed dynamically using {}
     */

    dynamicMessage = 'Passed as JavaScript property';
    dynamicActive = true;
}
