import { LightningElement } from 'lwc';

export default class CompositionParent extends LightningElement {
    contact = {
        Name: 'Amy Taylor',
        Title: 'VP of Engineering',
        Phone: '6172559632',
        Picture__c:
            'https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/people/amy_taylor.jpg'
    };
    myItem;
    hasRendered = false;

    renderedCallback() {
        if (this.hasRendered) {
            return;
        }
        this.hasRendered = true;
        const tile = this.template.querySelector('c-contact-tile');
        this.myItem = tile?.contact;
    }

    get titleText() {
        return this.myItem?.Title ?? 'No title';
    }

    get phoneText() {
        return this.myItem?.Phone ?? 'No phone';
    }

    get pictureText() {
        return this.myItem?.Picture__c ?? 'No picture';
    }

}