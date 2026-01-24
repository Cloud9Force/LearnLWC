# LWCComposition — Data Passing & Immutability Recipes

## Overview

This project collects professional Lightning Web Component (LWC) recipes that illustrate how to:

- Pass data from parent to child using primitives and non-primitives
- Iterate arrays in templates (CompositionIteration pattern) :contentReference[oaicite:2]{index=2}
- Demonstrate immutability anti-patterns and the correct shallow-copy approach
- Communicate from child to parent using events
- Include properties from App Builder context (string/number/picklist) :contentReference[oaicite:3]{index=3}

---

## Recipes Included

### 1. Static Primitive

- Pass a hard-coded primitive string/number
- Child uses `@api` to receive it

### 2. Dynamic Primitive

- Pass a JS property via `{}` binding

### 3. Non-Primitive Object

- Pass an object reference
- Child treats it as read-only

### 4. Array Iteration

- Pass an array
- Use `<template for:each>` for iteration

### 5. Immutability / Shallow Copy Demo

- Anti-pattern: direct mutation
- Correct pattern: using shallow copies

### 6. Child → Parent Communication

- Dispatch `CustomEvent`
- Parent handles via `on[eventname]`

---

## Anti-Patterns (❌ do NOT do this)

- Mutating parent objects/arrays directly in child
- Passing functions as props
- Relying on two-way binding (LWC enforces one-way data flow)

---

## Immutability Best Practices

✔ Always treat parent non-primitive data as read-only  
✔ To update, create shallow copies (`...object`, `[...array]`)  
✔ Let parent decide how to update its own state

---

## How to Use

1. Clone repo
2. Deploy to a scratch org or Playground
3. Explore each child recipe visually
4. Use this markdown for NotebookLM to generate narration

### Child → Parent Events (Important)

In LWC, CustomEvent does not bubble by default.

To allow a parent component to receive an event from a child:

- bubbles must be true
- composed must be true

Failure to do this will result in the parent never receiving the event,
even if the event name and handler are correct.
