# @myfunnow/hakka-core

Vue 3 components for FunNow Group with no UI library dependency.

## Install

```bash
pnpm add @myfunnow/hakka-core @myfunnow/hakka-tokens
```

Installing from GitHub Packages needs a PAT with `read:packages`. See the repo root README.

## Usage

Load one brand's CSS variables and the component styles once, for example in a Nuxt plugin or `app.vue`:

```ts
import '@myfunnow/hakka-tokens/funnow.css'
import '@myfunnow/hakka-core/style.css'
```

A brand CSS is required. Without it the focus ring falls back to the text color, but the current page and disabled states lose their colors.

### HkPagination

```vue
<script setup lang="ts">
import { ref } from 'vue'

import { HkPagination } from '@myfunnow/hakka-core'

const page = ref(1)
</script>

<template>
  <hk-pagination v-model:page="page" :total-count="128" />
</template>
```

| Prop / slot    | Type                     | Default                    | Description                      |
| -------------- | ------------------------ | -------------------------- | -------------------------------- |
| `v-model:page` | `number`                 | `1`                        | Current page                     |
| `totalCount`   | `number`                 | required                   | Total number of results          |
| `pageSize`     | `number`                 | `10`                       | Results per page                 |
| `visible`      | `number`                 | `7`                        | Maximum page buttons (minimum 5) |
| `ariaLabels`   | `{ nav?, prev?, next? }` | `分頁`, `上一頁`, `下一頁` | Accessible labels                |
| `#text`        | `{ start, end, total }`  | `第 x - y，共 n 筆結果`    | Replaces the summary             |
