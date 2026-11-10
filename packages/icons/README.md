# @myfunnow/hakka-icons

FunNow Group icons as Vue 3 components. Each icon is a separate chunk that loads only when used.

## Install

```bash
pnpm add @myfunnow/hakka-icons
```

`vue` is a peer dependency. Installing from GitHub Packages needs a PAT with `read:packages`. See the repo root README.

## Usage

```vue
<script setup lang="ts">
import { HkIcon } from '@myfunnow/hakka-icons'
</script>

<template>
  <HkIcon name="stroke_arrow_left" size="24" />
</template>
```

| Prop           | Type               | Default  | Description                             |
| -------------- | ------------------ | -------- | --------------------------------------- |
| `name`         | `IconName`         | required | File name of the SVG in `src/svg/`      |
| `size`         | `string \| number` |          | Sets both width and height              |
| `width`        | `string \| number` | `'100%'` | Ignored when `size` is set              |
| `height`       | `string \| number` | `'100%'` | Ignored when `size` is set              |
| `svgComponent` | `Component`        |          | Render this component instead of `name` |

Icons use `currentColor`, so set `color` on a parent to change it.

## Layout and overriding classes

The root `div` has `flex-none flex items-center justify-center` by default, so a flex parent does not squeeze the icon. Pass utility classes through `class`. A conflicting utility replaces the default (`inline-block` replaces `flex`, `flex-1` replaces `flex-none`), whatever the order of rules in your CSS. Classes that do not conflict are added (`size-3`, `text-yellow-50`).

The default classes need CSS from your app's UnoCSS. `dist/index.js` starts with `/* @unocss-include */`, so UnoCSS scans it when Vite processes the file. In `nuxt dev`, add the package to `build.transpile`, otherwise Vite pre-bundles it and the default classes get no CSS:

```ts
export default defineNuxtConfig({ build: { transpile: ['@myfunnow/hakka-icons'] } })
```

## Adding icons

SVGs in `src/svg/` come from Figma. After adding or removing files, run:

```bash
pnpm --filter @myfunnow/hakka-icons generate
```

`iconMap.test.ts` fails if you forget.

## Naming

A name is the Figma icon name with its component group as a prefix, so it stays unique across groups. Names use lowercase letters, digits and underscores only.

| Figma                     | `name`              |
| ------------------------- | ------------------- |
| `stroke icon／arrow_down` | `stroke_arrow_down` |
| `filled icon／feeds`      | `filled_feeds`      |

See the "Icon naming" page in the Figma design system for the full rules.
