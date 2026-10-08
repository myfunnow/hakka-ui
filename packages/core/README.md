# @myfunnow/hakka-core

Vue 3 components for FunNow Group with no UI library dependency.

## Install

```bash
pnpm add @myfunnow/hakka-core @myfunnow/hakka-tokens
```

Installing from GitHub Packages needs a PAT with `read:packages`. See the repo root README.

## Setup

The components are styled with utility classes and read colors from `--hk-color-*` CSS variables. Your app provides both.

### 1. Brand CSS

Load one brand's CSS variables once, for example in a Nuxt plugin or `app.vue`:

```ts
import '@myfunnow/hakka-tokens/funnow.css'
```

Without it the focus ring falls back to the text color, but the current page and disabled states lose their colors.

### 2. UnoCSS generates the classes

`dist/index.js` starts with `/* @unocss-include */`, so your app's UnoCSS scans it with no `content` config, as long as Vite processes the file:

- **Production build:** nothing to add.
- **`nuxt dev`:** add the package to `build.transpile`. Otherwise Vite pre-bundles it, UnoCSS never sees it, and the components render unstyled.

```ts
export default defineNuxtConfig({ build: { transpile: ['@myfunnow/hakka-core'] } })
```

Only `presetWind` utilities (Tailwind v3 names) and arbitrary values such as `min-w-[24px]` are used.

### 3. Apps without UnoCSS

funnow.web.nuxt uses windicss with the `wd-` prefix, whose class names do not match. Run a second UnoCSS that only serves hakka, with `@unocss/nuxt` and this `uno.config.ts`:

```ts
import { defineConfig, presetWind } from 'unocss'

export default defineConfig({
  presets: [presetWind()],
  // A pattern that never matches. An empty `include` array means "include everything".
  content: { pipeline: { include: [/(?!)/] } },
})
```

Only files carrying `@unocss-include` are scanned, so the app's own classes produce nothing. A few hakka class names (`overflow-hidden`, `top-0`, `left-0`, `justify-center`) already exist in Vuetify's CSS with the same declarations plus `!important`.

### Overriding classes

Pass utility classes through `class`. Where a component merges them (the root of `HkImg`), tailwind-merge lets yours replace the default: `overflow-visible` replaces `overflow-hidden`. The class you pass must exist in your own CSS, so your UnoCSS has to scan the file that uses it.

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

An image with a `<picture>` webp source, a placeholder, an error state, a gradient and overlay content. It needs the UnoCSS setup above and no brand CSS. Props, slots and events follow Vuetify's `v-img`, so a call site can swap one for the other.

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
| `fallbackAspectRatio`                                          | `string \| number` | Ratio of the box while there is no `src` or the image failed (see below)                     |
| `fadeIn`                                                       | `boolean`          | Fade the image in once it has loaded, default `true` (see below)                             |
| `inheritColor`                                                 | `boolean`          | Single-color svg: paint its shape with the text color (see below)                            |
| `#placeholder`                                                 |                    | Shown until the image has loaded                                                             |
| `#error`                                                       |                    | Replaces the image when it fails to load                                                     |
| default slot                                                   |                    | Overlay content                                                                              |
| `load`, `error`                                                | `(src: string)`    | Image events. An image that finished before hydration is detected on mount                   |

`class`, `style` and listeners such as `@click` land on the root element. `rounded`, `transition` and `lazy-src` are not supported (`fadeIn` is the fade of `v-img`).

#### Types

The props, events and slots of each component are exported, so a wrapper can build on them:

```ts
import type { HkImgEmits, HkImgProps, HkImgSlots } from '@myfunnow/hakka-core'

interface Props extends HkImgProps {
  placeholderClass?: string
}
```

`HkPagination` has `HkPaginationProps`, `HkPaginationEmits` and `HkPaginationSlots`. A `v-model` is both a prop and an event, so `page` is in `HkPaginationProps` and `update:page` in `HkPaginationEmits`. The length and ratio types come from `@myfunnow/hakka-shared`, which is installed with this package.

Moving an app from `v-img` or from an app-level wrapper (`EtgImg`, `NdImg`, `FnImg`)? Read [`MIGRATION.md`](src/components/HkImg/MIGRATION.md) first.

#### Attributes of the `<img>`

`fetchpriority`, `loading`, `srcset`, `sizes`, `decoding`, `crossorigin`, `referrerpolicy` and `draggable` go to the `<img>` itself, not to the root. The name can be written `fetchpriority`, `fetchPriority` or `fetch-priority`.

```vue
<hk-img src="/images/hero.png" alt="Hero" fetchpriority="high" :loading="isAboveTheFold ? 'eager' : 'lazy'" />
```

- `loading` wins over `eager` when both are set.
- With a `srcset` there is no webp `<source>`: the browser would pick the webp source and ignore the `<img>`'s own candidates.
- For a `inherit-color` svg the hidden `<img>` always keeps `crossorigin="anonymous"`.

#### Aspect ratio

The box is sized in one of two ways.

**The box is sized by something you gave it.** This is when there is an `aspectRatio` prop, an `aspect-*` class, or a `height`. The image fills the box as a layer, and the root takes `aspect-ratio` in this order:

1. The `aspectRatio` prop.
2. An `aspect-*` class on the component (`aspect-square`, `md:aspect-video`, `sm:(aspect-unset h-300px)`): it is left alone, so a responsive ratio works.
3. With only a `height`: the natural ratio of the image, once it has loaded.
4. The `fallbackAspectRatio` prop, only while there is no `src` or the image has failed.

**Nothing sizes the box** (no ratio, no `aspect-*` class, no `height`). The `<img>` stays in the normal flow and the box wraps it like it wraps a plain `<img>`: the picture keeps its own size, and is only made smaller when it is wider than its parent. A `width` makes the picture that wide, with the height that follows from it. This works in server-rendered HTML before any script runs, so the picture shows at once. Like a plain `<img>`, the box is 0 high until the browser knows the size of the picture, so the page can move when it arrives. Give the box an `aspectRatio` (for example from the width and height your API returns) to stop that.

In this mode:

- The box is as wide as the picture, not the parent. To fill the parent, give the box a ratio or a height.
- `cover` has nothing to crop. Use an `aspectRatio` or a `height` to crop the picture.
- Overlay content (the default slot) covers the picture.
- A `maxHeight` prop is also given to the `<img>`, so the picture shrinks with its box. A `max-h-*` class on the component is not, so use the prop.
- A height set by a class (`class="h-300px"`) keeps the shape of the picture inside that height, and the box becomes as wide as the picture. It is not cropped. Use the `height` prop to crop.

When both `width` and `height` are numbers the box is already sized, so no ratio is derived from them (CSS ignores `aspect-ratio` when both sizes are set).

#### Without a src, or when the image fails

With no `src` the `#placeholder` slot is shown; when the image fails the `#error` slot replaces it. Both fill the box, so give the box a size and style the slots:

```vue
<hk-img :src="product.cover" alt="" :aspect-ratio="1.8" class="w-full">
  <template #placeholder><div class="size-full bg-gray-200" /></template>
  <template #error><div class="size-full bg-gray-200" /></template>
</hk-img>
```

`fallbackAspectRatio` keeps the layout from collapsing while there is nothing to show. A loading image does not use it: the `<img>` sizes the box once the browser knows the picture. A loaded image never uses it, so a ratio that suits the placeholder cannot distort the picture.

#### Fade in (`fade-in`)

Like `v-img`, `HkImg` fades every image in by default: the image stays transparent until it has loaded, then `transition-opacity duration-300` (the same 0.3s and easing as `v-img`) brings it to full opacity. Turn it off with `:fade-in="false"`.

The fade only starts once the component is mounted in the browser. Server-rendered HTML has no `opacity-0` on the image, so a visitor never sees a hidden image while waiting for JavaScript. An image that has already loaded when the page hydrates does not animate, and a new `src` fades in again.

#### Single-color svg (`inherit-color`)

An svg inside an `<img>` cannot read the page's color, so `class="text-yellow-50"` does not recolor it. With `inherit-color`, `HkImg` paints the svg's shape with the text color instead, by using it as a CSS mask:

```vue
<hk-img src="/images/logo.svg" alt="Logo" inherit-color class="w-30 text-yellow-50" />
```

- It is for svg files whose paint is `currentColor`. The mask only keeps the svg's shape and transparency, so an svg with fixed colors becomes one flat shape in the text color (a white detail inside a colored shape disappears). Use the plain `HkImg` for those, and `HkIcon` for icons.
- The real `<img>` stays in the DOM, hidden, for the `alt` text, the `load` and `error` events and the natural ratio. It is requested with `crossorigin="anonymous"`, and the mask is always fetched with CORS, so an svg on another origin (such as the CDN) must send `Access-Control-Allow-Origin`. Without it the image fails and the `#error` slot is shown. Checked: `cdn.myfunnow.com` sends `access-control-allow-origin: *`.
- `cover` sizes the mask with `cover` instead of `contain`, `position` positions it. There is no webp `<source>` in this mode.
- Safari before 15.4 needs the `-webkit-` form of `mask`, which is included.

#### webp

In a production build the component adds `<source type="image/webp">` for a `.png`, `.jpg` or `.jpeg` that the app deployed itself, and never for other images such as the funnow CDN. A file counts as the app's own when its URL

- starts with `/` (but not `//`), or
- starts with Nuxt's `__publicAssetsURL()` (`NUXT_APP_CDN_URL`, or `baseURL` when there is no CDN), which covers `public/` files and built `/_nuxt/` assets.

There is no runtime fallback: a 404 on the webp source does not fall back to the `<img>`. The app build must generate a webp next to every raster image (`@myfunnow/web-core-optimize-images` does this for the whole Nuxt public output). The rule mirrors that package by hand, because hakka-ui cannot depend on a private package. A URL with a query string is left alone. Development (`NODE_ENV` other than `production`) never gets a webp source.

`__publicAssetsURL` is a global that Nuxt registers on the server and the client. Outside Nuxt (Storybook, tests) it is absent and only the `/` rule applies.
