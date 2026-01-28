import { LightningElement } from 'lwc';

export default class GetterSetterParent extends LightningElement {

    /**
     * Dynamic JavaScript value
     */
    dynamicCount = 5;
    // Simulates JavaScript binding
    dynamicActive = true;

    // Simulates user-entered App Builder text
    dynamicLabel = '   hello from app builder   ';

    rawConfig = {
        title: 'My Custom Title',
        count: 10,
        isActive: true
    };
}
