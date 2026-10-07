# @myfunnow/hakka-tokens

Design tokens for FunNow Group, generated from Figma by the token-transformer in
[funnow-group-figma](https://github.com/myfunnow/funnow-group-figma).

## Install

```bash
pnpm add @myfunnow/hakka-tokens
```

Installing from GitHub Packages needs a PAT with `read:packages`. See the repo root README.

## Usage

Each brand is a subpath:

```ts
import { colors } from '@myfunnow/hakka-tokens/funnow'

colors.orange[50] // '#ff5537'
```

### Semantic colors (interim)

```ts
import { semanticColors } from '@myfunnow/hakka-tokens/funnow'
import '@myfunnow/hakka-tokens/funnow.css' // defines --hk-color-* on :root
```

`semanticColors` is hand-written in `src/semantic/` until the token-transformer emits
semantic tokens. Names follow Figma `gl-color` / `fn-color` paths.

### Using the colors in an app

**Step 1, required: load the brand CSS once.** The hakka components read `--hk-color-*`, so without it they have no colors. This step alone is enough.

```ts
// nuxt.config.ts
css: ['@myfunnow/hakka-tokens/funnow.css']
```

**Step 2, optional: add the short classes.** Do it only if you want to write `bg-hk-primary` and set an opacity on it. Without it you can still write `bg-[color:var(--hk-color-primary)]`, but then there is no opacity.

The brand CSS defines two variables for every semantic color: `--hk-color-primary: #ff5537` (hakka components read it) and `--hk-color-primary-rgb: 255 85 55` (the channels, so a class can add an opacity). Put the colors in the `theme.colors` of the app's utility-class engine under the name `hk`. The class name is the variable name without `--hk-color-`.

The two engines read colors differently, so there are two helpers. Both take the semantic colors of the brand and only use the names.

```ts
// UnoCSS: uno.config.ts
import { semanticColors } from '@myfunnow/hakka-tokens/funnow'
import { toThemeColors } from '@myfunnow/hakka-tokens/theme'

export default defineConfig({
  theme: {
    colors: {
      ...colors, // the palette the app already has
      hk: toThemeColors(semanticColors),
    },
  },
})
```

```ts
// windicss: windi.config.ts
import { semanticColors } from '@myfunnow/hakka-tokens/funnow'
import { toThemeColorFunctions } from '@myfunnow/hakka-tokens/theme'

export default defineConfig({
  theme: { extend: { colors: { hk: toThemeColorFunctions(semanticColors) } } },
})
```

Do not use `toThemeColors` with windicss: it prints the text `<alpha-value>` into the CSS.

What it changes in a template:

```html
<!-- Step 1 only: long, and no opacity -->
<div class="bg-[color:var(--hk-color-primary)]">
  <!-- Step 1 and 2: short, and the opacity works -->
  <div class="bg-hk-primary">
    <div class="bg-hk-primary/50">
      <div class="bg-hk-primary bg-opacity-40">
        <p class="text-hk-text-default"></p>
      </div>
    </div>
  </div>
</div>
```

### Size of the brand CSS

Every page loads the brand CSS before the first paint, with all semantic colors in it, used or not. Today it is 813 bytes (272 bytes gzip) for 10 colors, each with a hex and an `-rgb` variable. A test (`tests/cssSize.test.ts`) fails when the gzip size goes over 3 KB, which is roughly 150 colors. When that happens, do not raise the number: split the CSS by token group (hakka components need one group, an app adds the rest if it wants them) and move the `-rgb` variables into an extra file.

Available brands: `funnow`. `eatigo` and `niceday` are added when their Figma tokens exist.

## Source

`src/generated/{brand}/` is written by CI from Figma. **Do not edit it by hand.**
