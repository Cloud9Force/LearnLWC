import { LightningElement, api } from 'lwc';
/*
No @wire -Data handled internally
No getters- UI managed by Salesforce
1.8 Data Manipulation: What You CANNOT Do Here
    ❌ Cannot access record fields in JS
    ❌ Cannot transform data
    ❌ Cannot aggregate
    ❌ Cannot reshape
    ❌ Cannot reuse data logic
When This Component Is the Right Choice
        - Admin pages
        - Quick CRUD
        - Standard layouts
        - Zero logic
        - Maximum security
You move on when:
        - You want to read fields in JS
        - You want to format values (dates, numbers, currency)
        - You want to reuse data (building tables or charts)
        - You want to build custom validation logic
*/
export default class WireBaseRecordForm extends LightningElement {
    @api recordId;
}
