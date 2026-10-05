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

### HkImg

An image with a `<picture>` webp source, a placeholder, an error state, a gradient and overlay content. It needs `@myfunnow/hakka-core/style.css` (no brand CSS). Props, slots and events follow Vuetify's `v-img`, so a call site can swap one for the other.

```vue
<script setup lang="ts">
import { HkImg } from '@myfunnow/hakka-core'
</script>

<template>
  <hk-img src="/images/hero.png" alt="Hero" aspect-ratio="16/9" cover gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4)">
    <template #placeholder><div class="skeleton" /></template>
    <template #error>Image unavailable</template>
    <p>Overlay content</p>
  </hk-img>
</template>
```

| Prop / slot / event                                            | Type               | Description                                                                                  |
| -------------------------------------------------------------- | ------------------ | -------------------------------------------------------------------------------------------- |
| `src`                                                          | `string`           | Required                                                                                     |
| `alt`                                                          | `string`           | Goes on the `<img>` only, the root gets no `role` or `aria-label`                            |
| `cover`                                                        | `boolean`          | `object-fit: cover`, default is `contain`                                                    |
| `eager`                                                        | `boolean`          | `loading="eager"`, default is `lazy`                                                         |
| `aspectRatio`                                                  | `string \| number` | CSS `aspect-ratio` of the root, otherwise the natural ratio once the image has loaded        |
| `width` `height` `maxWidth` `maxHeight` `minWidth` `minHeight` | `string \| number` | A bare number gets `px`, any other string goes to CSS as is                                  |
| `position`                                                     | `string`           | `object-position` of the image                                                               |
| `gradient`                                                     | `string`           | The inside of a `linear-gradient()`, for example `to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4)` |
| `#placeholder`                                                 |                    | Shown until the image has loaded                                                             |
| `#error`                                                       |                    | Replaces the image when it fails to load                                                     |
| default slot                                                   |                    | Overlay content                                                                              |
| `load`, `error`                                                | `(src: string)`    | Image events. An image that finished before hydration is detected on mount                   |

`class` and listeners such as `@click` land on the root element. `rounded`, `transition`, `lazy-src`, `srcset`, `sizes`, `crossorigin`, `referrerpolicy` and `draggable` are not supported.

#### webp

In a production build the component adds `<source type="image/webp">` for a `.png`, `.jpg` or `.jpeg` that the app deployed itself, and never for other images such as the funnow CDN. A file counts as the app's own when its URL

- starts with `/` (but not `//`), or
- starts with Nuxt's `__publicAssetsURL()` (`NUXT_APP_CDN_URL`, or `baseURL` when there is no CDN), which covers `public/` files and built `/_nuxt/` assets.

There is no runtime fallback: a 404 on the webp source does not fall back to the `<img>`. The app build must generate a webp next to every raster image (`@myfunnow/web-core-optimize-images` does this for the whole Nuxt public output). The rule mirrors that package by hand, because hakka-ui cannot depend on a private package. A URL with a query string is left alone. Development (`NODE_ENV` other than `production`) never gets a webp source.

`__publicAssetsURL` is a global that Nuxt registers on the server and the client. Outside Nuxt (Storybook, tests) it is absent and only the `/` rule applies.
