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

Available brands: `funnow`. `eatigo` and `niceday` are added when their Figma tokens exist.

## Source

`src/generated/{brand}/` is written by CI from Figma. **Do not edit it by hand.**
