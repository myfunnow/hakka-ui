Create the test in packages/core/tests/Hk{{pascalCase name}}.test.ts and export the component from packages/core/src/index.ts.

Export the types too, so apps can build on them: `export type { Hk{{pascalCase name}}Props } from './components/Hk{{pascalCase name}}/types'`. Name them `Hk<Name>Props`, `Hk<Name>Emits` and `Hk<Name>Slots`, and keep them in `types.ts` next to the component.
