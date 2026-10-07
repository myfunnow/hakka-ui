/**
 * The "Show code" panel is built from the args of a story. It knows nothing about the `render` template, so `v-model`
 * and slot content would be missing. A story with a `render` gives the code it wants shown through this helper:
 * `parameters: exampleCode('<hk-checkbox v-model:checked="checked">Label</hk-checkbox>')`.
 */
export const exampleCode = (code: string) => ({ docs: { source: { code } } })
