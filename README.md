# hakka-ui

Shared UI packages for FunNow Group (FunNow, Eatigo, Niceday).

[Storybook 👀](https://myfunnow.github.io/hakka-ui/)

## Packages

| Package                                     | Description                                                                |
| ------------------------------------------- | -------------------------------------------------------------------------- |
| [`@myfunnow/hakka-tokens`](packages/tokens) | Design tokens from Figma, one subpath per brand                            |
| [`@myfunnow/hakka-icons`](packages/icons)   | Icons as Vue components (`HkIcon`)                                         |
| [`@myfunnow/hakka-core`](packages/core)     | Vue components without a UI library (`HkPagination`)                       |
| [`@myfunnow/hakka-kit`](packages/kit)       | Vue components built on the UI library shared by ETG and ND (`HkCheckbox`) |

`tokens`, `icons` and `core` do not depend on any UI library, so every product can use them.
`kit` wraps the UI library listed in its `peerDependencies`. Package names never contain a UI library name,
so switching libraries ships as a major version of `kit` instead of a new package.

## Install

Packages are published to GitHub Packages. Add this to the app's `.npmrc` and set `NODE_AUTH_TOKEN`
to a GitHub PAT with `read:packages`:

```
@myfunnow:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

## Development

Requirements: Node.js >= 22.18 (tsdown loads the TypeScript config files natively), pnpm >= 10.

`packages/` holds only published packages. Repo-internal workspace packages live in `internal/` and are never published:
`@myfunnow/hakka-config` shares the tsdown and Vitest config, so each package's `tsdown.config.ts` and
`vitest.config.ts` only states what differs.

| Script           | Description                          |
| ---------------- | ------------------------------------ |
| `pnpm install`   | Install dependencies                 |
| `pnpm storybook` | Start Storybook for every package    |
| `pnpm build:all` | Build every package into its `dist/` |
| `pnpm test`      | Run Vitest for every package         |
| `pnpm typecheck` | Type check every package             |
| `pnpm lint`      | ESLint and oxfmt check               |
| `pnpm lint:fix`  | ESLint fix and oxfmt write           |

### Create a component

Use the [Blueprint](https://marketplace.visualstudio.com/items?itemName=teamchilla.blueprint) extension:

1. Right click `packages/core/src/components` (or `packages/kit/src/components` when the component wraps the UI library) and select `New File from Template`
2. Select `New Component` and enter the name (for example `Button` creates `HkButton`)
3. Add the test in that package's `tests/` and export the component from its `src/index.ts`

Source and tests import through `@/` (for example `@/components/HkButton/HkButton.vue`), which is the package's own `src/`. It comes from `tsconfig.package.json`, so tsdown, Vite and Vitest all read the same rule. ESLint rejects parent-relative imports (`../`) inside `src/`.

## Release

1. `pnpm bump` and pick the new version (all packages share one version).
2. Merge the version bump to `main`.
3. Publish a GitHub release whose tag is `v<version>`. CI publishes every package.
