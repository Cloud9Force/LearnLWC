/**
 * ============================================================
 * DYNAMIC COMPONENT REGISTRY
 * ============================================================
 *
 * PURPOSE:
 * - Single source of truth for ALL allowed dynamic components
 * - Prevents arbitrary or unsafe dynamic creation
 * - Makes dynamic usage reviewable and intentional
 *
 * ARCHITECTURE RULE:
 * - This file defines WHAT components are allowed
 * - It must NOT import from 'lwc'
 * - It must NOT create DOM elements
 */

import DynamicSimpleChild from 'c/dynamicSimpleChild';
// 👉 Future dynamic components are added HERE

export const DYNAMIC_COMPONENT_REGISTRY = Object.freeze({
    simple: {
        tagName: 'c-dynamic-simple-child',
        ctor: DynamicSimpleChild
    }

    // EXAMPLE (future):
    // advanced: {
    //     tagName: 'c-dynamic-advanced-child',
    //     ctor: DynamicAdvancedChild
    // }
});