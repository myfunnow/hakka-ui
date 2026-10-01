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
  <HkIcon name="arrow-left" size="24" />
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

## Adding icons

SVGs in `src/svg/` come from Figma. After adding or removing files, run:

```bash
pnpm --filter @myfunnow/hakka-icons generate
```

`iconMap.test.ts` fails if you forget.
