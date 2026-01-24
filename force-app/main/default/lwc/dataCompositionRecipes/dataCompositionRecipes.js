import { LightningElement } from 'lwc';

export default class DataCompositionRecipes extends LightningElement {

    dynamicMessage = 'Hello from Parent (dynamic)';

    accountObject = {
        id: '001X0000009xyz',
        name: 'Acme Corporation',
        industry: 'Technology'
    };

    itemList = [
        { id: 'a', label: 'Item A' },
        { id: 'b', label: 'Item B' },
        { id: 'c', label: 'Item C' }
    ];

    handleChildNotification(event) {
        console.log('Event received from child:', event.detail);
    }
}
