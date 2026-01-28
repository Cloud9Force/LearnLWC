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

10. Data Flow Rules — One-Way Parent → Child
Data Flow Concept

In Lightning Web Components, data should always flow in one direction: from a parent component down to its children.

Passing public (@api) properties from parent to child is how data flows downward.
Once the child receives data from the parent:

The child must treat it as read-only

The child cannot mutate a parent-owned object or array directly

Attempting to do so results in a runtime error (invalid mutation)

To update such values, the child must notify the parent (via a CustomEvent), and the parent performs the mutation and passes the new value again.
10.1 Example: One-Way Data Flow with Object Update

Below is a simple demo showing:

a parent holding an object

a child trying (and failing) to update it

the child dispatching an event

the parent updating correctly via a shallow copy

Parent Component — dataFlowParent.js
import { LightningElement } from 'lwc';

export default class DataFlowParent extends LightningElement {
    userProfile = {
        name: 'Jane Doe',
        role: 'Developer'
    };

    handleUpdateRequested(event) {
        // Child requested an update — perform shallow copy here
        const updatedProfile = {
            ...this.userProfile,
            role: event.detail.role
        };
        this.userProfile = updatedProfile;
    }
}
Parent Template — dataFlowParent.html
<template>
    <c-data-flow-child
        profile={userProfile}
        onupdaterequested={handleUpdateRequested}>
    </c-data-flow-child>
</template>
Child Component — dataFlowChild.js
import { LightningElement, api } from 'lwc';

export default class DataFlowChild extends LightningElement {
    @api profile;

    requestRoleChange() {
        // Send a CustomEvent upward
        this.dispatchEvent(new CustomEvent('updaterequested', {
            detail: { role: 'Senior Developer' },
            bubbles: true,
            composed: true
        }));
    }
}
Child Template — dataFlowChild.html
<template>
    <p>User: {profile.name}</p>
    <p>Role: {profile.role}</p>

    <lightning-button
        label="Promote to Senior"
        onclick={requestRoleChange}>
    </lightning-button>
</template>
Explanation

Parent holds the source of truth — userProfile

The parent passes it to the child using profile={userProfile}

The child renders the values, but does not mutate them directly

The child dispatches a CustomEvent when it wants something changed

The parent’s handler (handleUpdateRequested) performs a shallow copy update and reassigns a new object

LWC reactivity picks up the new reference and updates the UI accordingly

This pattern ensures one-way downward data flow and controlled mutation via parent logic.

10.2 What Happens if You Try to Mutate the Parent Data Directly

In LWC, objects and arrays passed from a parent are wrapped in a proxy.
Direct mutation in the child like:
this.profile.role = 'Senior Developer';
will throw:
Uncaught Error: Invalid mutation: Cannot set "role" on "[object Object]".
This prevents untracked state changes and enforces predictable data flow.
10.3 Best Practice Summary (for Data Flow)

Always treat parent data as read-only in children

To update any data owned by the parent:

the child should emit an event

the parent should perform the mutation using a shallow copy

This pattern guarantees:

one-way data flow

predictable UI updates

no mutation side-effects
10.4 Bonus Tip (Lean Design)

When possible, prefer passing primitive values instead of objects/arrays, because:

primitives are simpler to track

shape changes to objects/arrays may break consumers

standard HTML attributes only accept primitives

This is recommended by the LWC team to reduce complexity.
11. Calling JavaScript Methods on Child Components

Lightning Web Components allow a parent component to call public JavaScript methods defined in a child component.

This is useful when the parent needs to:

trigger behavior

reset internal state

perform an action that is not data-driven

11.1 Exposing a Public Method in a Child
Child Component (JavaScript)
import { LightningElement, api } from 'lwc';

export default class PublicMethodChild extends LightningElement {
    counter = 0;

    @api
    incrementCounter() {
        this.counter += 1;
    }

    @api
    resetCounter() {
        this.counter = 0;
    }
}
Child Template (HTML)
<p>Internal Counter: {counter}</p>
Explanation

The @api decorator can be applied to methods, not just properties.

When applied to a method:

it becomes publicly accessible

parent components can call it imperatively

This exposes behavior, not data.

11.2 Calling a Child Method from the Parent
Parent Template (HTML)
<lightning-button
    label="Increment Child Counter"
    onclick={handleIncrement}>
</lightning-button>

<c-public-method-child></c-public-method-child>
Parent Component (JavaScript)
handleIncrement() {
    const child = this.template.querySelector('c-public-method-child');
    child.incrementCounter();
}
Explanation

The parent:

Locates the child using this.template.querySelector

Calls the public method directly on the child instance

This is an imperative call, not reactive data binding.

11.3 Why and When to Use Public Methods

Public methods should be used when:

the parent needs to trigger an action

the action is not tied to data changes

the child manages its own internal state

Examples include:

resetting a form

starting or stopping an animation

refreshing internal calculations

11.4 Important Rules and Anti-Patterns
❌ Anti-Pattern: Mutating Child State Directly
child.counter = 10;
This bypasses encapsulation and should never be done.

❌ Anti-Pattern: Calling Non-@api Methods

Only methods explicitly marked with @api are accessible.

11.5 Relationship to One-Way Data Flow

Calling a public method:

does NOT break one-way data flow

does NOT mutate parent data

allows controlled interaction with child behavior

Key distinction:

Properties pass data downward

Events request changes upward

Public methods invoke child behavior

11.6 Final Mental Model

Use @api properties to pass data

Use CustomEvent to communicate upward

Use @api methods to invoke child behavior

Each mechanism has a distinct purpose and should not be mixed.
## 12. Spread Properties — Passing Multiple Props Efficiently

In Lightning Web Components, you can group multiple related values into a single object
and pass them as a single property to a child component.

This pattern is called “spread properties”. While LWC templates do not support
JavaScript object spread syntax (`{...object}`) directly in HTML,
you can still achieve the same effect by organizing related properties in an object
and passing them together.

---

### 12.1 Example: Grouped Props from Parent

### Parent Component (JavaScript)

```js
spreadExample = {
    heading: 'Spread Props Demo',
    message: 'This message came through a grouped props object'
};
Parent Template (HTML)
<c-spread-props-child input-props={spreadExample}></c-spread-props-child>
Explanation

Here the parent groups two values — heading and message — into a single object
called spreadExample.

This object is passed to the child component through one @api property,
which simplifies the interface and reduces template verbosity.

12.2 Child Component Receiving Grouped Props
Child Component (JavaScript)
import { LightningElement, api } from 'lwc';

export default class SpreadPropsChild extends LightningElement {
    @api inputProps = {};
}
Child Template (HTML)
<c-primitive-child
    message={inputProps.message}
    heading={inputProps.heading}>
</c-primitive-child>
Explanation

Once the grouped object arrives in the child, it can be “spread”
by assigning its properties to the specific attributes of a deeper child.

This makes code cleaner when many related properties exist,
and it preserves the one-way data flow pattern.

12.3 When to Use This Pattern

Use grouped prop objects when:

You have many related values to pass to the same child

You want to reduce clutter in parent HTML

You want to create a higher-level API surface for a child

Always remember:

You still must treat non-primitive values as read-only in children

You should not mutate objects passed from parents

12.4 Anti-Patterns

❌ Passing an unstructured object and then mutating it downstream:
this.inputProps.message = 'Bad mutation';
This breaks one-way data flow.

❌ Relying on template support for object spreading ({...obj})

LWC templates do not support this syntax.

12.5 Summary

Spread properties help you encapsulate multiple related values into a single object
for easier and cleaner parent-to-child binding.

This pattern helps maintain structured component APIs and is especially helpful
when child components need many prop values.
## 13. Dynamic Event Listeners Using `lwc:on`

This section demonstrates how a parent component can **dynamically listen** to events dispatched by a child component using the `lwc:on` directive.

This pattern allows you to declaratively attach event listeners in the template **without writing imperative event-listener code in JavaScript**, improving readability.

---

### 13.1 Example: Child Dispatches Multiple Events

### Child Component (JavaScript)

```js
import { LightningElement, api } from 'lwc';

export default class DynamicEventChild extends LightningElement {
    @api name;
    @api age;

    connectedCallback() {
        this.dispatchEvent(
            new CustomEvent('childinitialized', {
                detail: { name: this.name, age: this.age },
                bubbles: true,
                composed: true
            })
        );
    }

    handleUpdateClick() {
        this.dispatchEvent(
            new CustomEvent('childupdated', {
                detail: { name: 'LWC', age: 8 },
                bubbles: true,
                composed: true
            })
        );
    }
}

Child Template (HTML)
<p>Name: {name}</p>
<p>Age: {age}</p>

<lightning-button
    label="Update Child Data"
    onclick={handleUpdateClick}>
</lightning-button>

Explanation

The child component dispatches two distinct events:

childinitialized when it is inserted into the DOM

childupdated when the user clicks a button

Each event carries a detail payload with updated property values.

13.2 Parent Listening Using lwc:on
Parent Template (HTML)
<c-dynamic-event-child
    name={dynamicChildName}
    age={dynamicChildAge}
    lwc:onchildinitialized={handleChildInitialized}
    lwc:onchildupdated={handleChildUpdated}>
</c-dynamic-event-child>

Parent JavaScript
handleChildInitialized(event) {
    const { name, age } = event.detail;
    this.lastDynamicEvent = `Initialized: ${name}, ${age}`;
}

handleChildUpdated(event) {
    const { name, age } = event.detail;
    this.lastDynamicEvent = `Updated: ${name}, ${age}`;
}

xplanation

Using the lwc:on directive in the parent template:

attaches event listeners directly in the markup

avoids adding listeners imperatively in JavaScript

works even for events dispatched in lifecycle callbacks

This makes templates cleaner and event wiring more declarative.

13.3 Why Use lwc:on

Use this directive when:

you want to listen to multiple child events declaratively

you want to keep event wiring close to where the child is rendered

you want to avoid addEventListener in connectedCallback

It improves maintainability and makes templates more readable.

13.4 How This Relates to One-Way Data Flow

This pattern does not violate one-way data flow:

child still dispatches events upward

parent still owns data and updates state

events only signal intent or payloads

It’s a declarative event binding, not a data mutation channel.

13.5 Summary

lwc:on[event] lets you bind event handlers in the template

child events can be dispatched in lifecycle callbacks or user actions

parent handles them in JavaScript handlers