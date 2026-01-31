import { DYNAMIC_COMPONENT_REGISTRY } from './dynamicComponentRegistry';

/**
 * ============================================================
 * SAFE DYNAMIC COMPONENT FACTORY
 * ============================================================
 *
 * PURPOSE:
 * - Validate requested dynamic component type
 * - Fail fast with clear errors
 * - Return a SAFE, PRE-VALIDATED config
 *
 * IMPORTANT:
 * - This file does NOT call createElement()
 * - DOM creation is the responsibility of LWC host components
 */
export function getDynamicComponentConfig(type) {

    const config = DYNAMIC_COMPONENT_REGISTRY[type];

    if (!config) {
        throw new Error(
            `Dynamic component type "${type}" is not registered.
             Allowed types: ${Object.keys(DYNAMIC_COMPONENT_REGISTRY).join(', ')}`
        );
    }

    return config;
}