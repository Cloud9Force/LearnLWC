import DynamicSimpleChild from 'c/dynamicSimpleChild';

/**
 * ============================================================
 * DYNAMIC COMPONENT REGISTRY
 * ============================================================
 *
 * PURPOSE:
 * - Centralize all allowed dynamic components
 * - Prevent arbitrary or unsafe dynamic creation
 * - Make intent explicit and reviewable
 *
 * PHASE-4 RULE:
 * Dynamic components must ONLY be created from this registry.
 */
export const DYNAMIC_COMPONENT_REGISTRY = {
    simple: DynamicSimpleChild
};
