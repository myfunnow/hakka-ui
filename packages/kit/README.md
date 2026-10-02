# @myfunnow/hakka-kit

Vue 3 components for FunNow Group built on the UI library that ETG and ND share. The library and its supported versions are in `peerDependencies` (currently `naive-ui`).

## Install

```bash
pnpm add @myfunnow/hakka-kit
```

Installing from GitHub Packages needs a PAT with `read:packages`. See the repo root README.

## Theming

Components render the UI library's own components, so they follow the app's theme overrides (for naive-ui, `themeOverrides` on `n-config-provider`). Nothing extra needs to be imported.

### HkCheckbox

```vue
<script setup lang="ts">
import { ref } from 'vue'

import { HkCheckbox } from '@myfunnow/hakka-kit'

const isAdult = ref(false)
</script>

<template>
  <hk-checkbox v-model:checked="isAdult">我已滿 18 歲</hk-checkbox>
</template>
```

| Prop / slot / method | Type         | Default | Description                                         |
| -------------------- | ------------ | ------- | --------------------------------------------------- |
| `v-model:checked`    | `boolean`    | `false` | Checked state                                       |
| other attributes     |              |         | Passed to the library checkbox (`disabled`, `size`) |
| default slot         |              |         | Label                                               |
| `focus()`, `blur()`  | `() => void` |         | Move focus to or away from the checkbox             |
