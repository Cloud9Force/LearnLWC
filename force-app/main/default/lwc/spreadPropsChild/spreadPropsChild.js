import { LightningElement, api } from 'lwc';

export default class SpreadPropsChild extends LightningElement {

    // Expect an object of properties
    //lwc:spread makes it easier to work with large config or objects. You can dynamically pass multiple attributes or properties. However, it only spreads top-level properties. Nested objects won't be automatically spread.
    @api inputProps = {};//when a object is passed from parent to child, it is passed as a single property and this Object contains the properties of the parent component (eg this will auto contain heading and message)
    @api heading;//When passed onject using lwc:spread directive, the properties are passed as individual properties
    @api message;//When passed onject using lwc:spread directive, the properties are passed as individual properties

    connectedCallback() {
        // Teach: spread properties let you assign many props at once
        // eslint-disable-next-line no-console
        console.log('inputProps.heading', this.inputProps?.heading);
        // eslint-disable-next-line no-console
        console.log('inputProps.message', this.inputProps?.message);
        // eslint-disable-next-line no-console
        console.log('heading', this.heading);
        // eslint-disable-next-line no-console
        console.log('message', this.message);
    }
}