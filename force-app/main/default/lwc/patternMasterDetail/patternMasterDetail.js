import { LightningElement, track } from 'lwc';

export default class MasterDetailPattern extends LightningElement {

    @track selectedItem = null;

    treeItems = [
        {
            label: 'Accounts',
            name: 'Accounts',
            items: [
                { label: 'Burlington Textiles Corp of America', name: 'Burlington Textiles Corp of America', id: '001fj00000YcCODAA3' },
                { label: 'Dickenson plc Media', name: 'Dickenson plc', id: '001fj00000YcCOFAA3' }
            ]
        }
    ];

    handleSelect(event) {
        const selectedName = event.detail.name;
        this.selectedItem =
            this.treeItems[0].items.find(
                (item) => item.name === selectedName
            ) || null;
    }
}
