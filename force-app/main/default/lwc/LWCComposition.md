# LWCComposition — Data Passing & Immutability Recipes

## Overview

This project collects professional Lightning Web Component (LWC) recipes that illustrate how to:

- Pass data from parent to child using primitives and non-primitives
- Iterate arrays in templates (CompositionIteration pattern) :contentReference[oaicite:2]{index=2}
- Demonstrate immutability anti-patterns and the correct shallow-copy approach
- Communicate from child to parent using events
- Include properties from App Builder context (string/number/picklist) :contentReference[oaicite:3]{index=3}

---# LWC Composition – Parent and Child Communication (With Code)

This document is designed for NotebookLM to **display Lightning Web Component code**
and **explain how parent and child components communicate**.

The examples progress from **simple to complex**:
- Primitive data
- Dynamic data
- Objects and arrays
- Immutability
- Child-to-parent events

---

## 1. Parent to Child Communication Using Primitive Data

### Parent Component (JavaScript)

```js
import { LightningElement } from 'lwc';

export default class DataCompositionRecipes extends LightningElement {
    greetingMessage = 'Hello from Parent';
}
Parent Template (HTML)
<c-primitive-child message={greetingMessage}></c-primitive-child>
Child Component (JavaScript)
import { LightningElement, api } from 'lwc';

export default class PrimitiveChild extends LightningElement {
    @api message;
}
Child Template (HTML)
<p>{message}</p>
Explanation

The parent component owns the value greetingMessage.
This value is a primitive string.

The parent passes this value to the child using an HTML attribute.
The child exposes a public property using the @api decorator.

Primitive values are passed by value, not by reference.
This means the child receives a copy and cannot accidentally modify the parent’s data.

Key concept:
Primitive values are the safest and simplest way to pass data between components.
2. Parent to Child Communication Using Dynamic Primitive Data
Parent Component (JavaScript)
export default class DataCompositionRecipes extends LightningElement {
    dynamicMessage = 'This value can change';
}
Parent Template (HTML)
<c-primitive-child message={dynamicMessage}></c-primitive-child>
Explanation

Instead of a hard-coded value, the parent passes a JavaScript property.

If the parent updates dynamicMessage, Lightning Web Components automatically
re-renders the child component.

No manual DOM manipulation is required.

Key concept:
Lightning Web Components use reactive one-way data flow.
3. Parent to Child Communication Using Non-Primitive Objects
Parent Component (JavaScript)
export default class DataCompositionRecipes extends LightningElement {
    accountRecord = {
        name: 'Acme Corporation',
        industry: 'Technology'
    };
}
Parent Template (HTML)
<c-non-primitive-object-child record={accountRecord}></c-non-primitive-object-child>
Child Component (JavaScript)
import { LightningElement, api } from 'lwc';

export default class NonPrimitiveObjectChild extends LightningElement {
    @api record;
}
Explanation

Objects are non-primitive values.
They are passed by reference, not by value.

This means the child receives a reference to the parent’s object.
If the child mutates the object, the parent’s data changes immediately.

For this reason, Salesforce enforces a strict rule:

A child component must treat parent-owned objects as read-only.

Key concept:
Children may read objects, but must never mutate them directly.

4. Parent to Child Communication Using Arrays and Iteration
Parent Component (JavaScript)
export default class DataCompositionRecipes extends LightningElement {
    items = [
        { id: '1', label: 'Item One' },
        { id: '2', label: 'Item Two' },
        { id: '3', label: 'Item Three' }
    ];
}
Parent Template (HTML)
<c-array-iteration-child items={items}></c-array-iteration-child>
Child Template (HTML)
<template>
    <ul>
        <template for:each={items} for:item="item">
            <li key={item.id}>{item.label}</li>
        </template>
    </ul>
</template>
xplanation

Arrays behave the same way as objects in Lightning Web Components.
They are passed by reference.

Iterating over an array using template for:each is safe.
However, mutating the array inside the child is not allowed.

Anti-pattern:
Pushing or splicing the array directly in the child.

Key concept:
Children may display arrays, but must not modify them.
5. Immutability and Shallow Copy Patterns
❌ Anti-Pattern: Direct Mutation
this.record.name = 'Mutated Directly';
This directly changes parent data.
It may not trigger reactivity and leads to unpredictable bugs.
✅ Correct Pattern: Shallow Copy (Object)
const updatedRecord = {
    ...this.record,
    name: 'Updated Safely'
};

this.record = updatedRecord;
✅ Correct Pattern: Shallow Copy (Array)
const updatedItems = [
    ...this.items,
    { id: '4', label: 'New Item' }
];

this.items = updatedItems;
Explanation

Lightning Web Components track object references, not deep changes.

By creating a shallow copy, a new reference is created.
This allows the framework to detect the change and re-render correctly.

Key concept:
Reactivity depends on reference changes, not internal mutations.
6. Child to Parent Communication Using Events
Child Component (JavaScript)
this.dispatchEvent(
    new CustomEvent('notifyparent', {
        detail: {
            message: 'Child is requesting an update'
        },
        bubbles: true,
        composed: true
    })
);
Parent Template (HTML)
<c-child-to-parent-child
    onnotifyparent={handleChildNotification}>
</c-child-to-parent-child>
Parent Component (JavaScript)
handleChildNotification(event) {
    console.log(event.detail.message);
}
xplanation

Lightning Web Components enforce one-way data flow.

Children cannot directly modify parent data.
Instead, children communicate intent using events.

The bubbles and composed options allow the event to:

escape the child’s shadow DOM

reach the parent component

Key concept:
Parents own data.
Children request changes using events.
7. Complete Mental Model

The parent owns all data

The child receives data as input

The child emits events to request changes

The parent decides how state is updated

This model ensures predictable, scalable applications.

8. Common Anti-Patterns (What Not to Do)

Mutating parent objects in child components

Mutating parent arrays in child components

Passing functions as properties

Expecting two-way data binding

9. Final Summary

Lightning Web Components use one-way data flow.

Primitive values are simple and safe.
Objects and arrays must be treated as read-only.
Events are the only correct way for children to communicate upward.
