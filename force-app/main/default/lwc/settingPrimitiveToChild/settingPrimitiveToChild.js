import { LightningElement, api } from 'lwc';

export default class PrimitiveChild extends LightningElement {
    // Public property to receive a PRIMITIVE value (string)
    // Primitive values are safe to read and change locally
    @api message;
}