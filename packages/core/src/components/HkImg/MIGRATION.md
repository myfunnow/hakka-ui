# Migrating to HkImg

Notes for whoever (human or agent) moves a downstream app to `HkImg`. Written 2026-10-07. Facts below were read from the code on that date; anything not checked says so. Downstream repos (funnow.web.nuxt, eatigo.web, niceday.web) are read-only for hakka-ui work: do not edit them from here.

## Decisions already made (by the maintainer)

- Downstream is **not migrated yet**. hakka-ui still has unfinished work.
- `EtgImg`, `NdImg` and `FnImg` are **not deleted**. Later their insides are swapped for `HkImg` with fixed props, so call sites do not change.
- Icons go through `HkIcon`. An svg that is an image (illustration, logo, loading) goes through `HkImg`; a single-color one uses `inherit-color` (colored by `text-*`, no color prop, no per-color files, no app-local logo wrapper).
- `fade-in` is an opt-in prop. The parent passes the condition (for example `!isHydrating`), because `HkImg` cannot know about hydration.
- A default placeholder in `HkImg` is acceptable.
- Open question, no answer yet: how `src` resolution is injected (the app-specific part: `fn:` prefix, CDN base, `~/assets/` strip). Recommendation so far: inject only a `resolveSrc`, keep webp built into `HkImg`. Not built, there is no `provide` or `inject` in `HkImg`.

## From Vuetify `v-img` (funnow.web.nuxt)

Audit of 89 `<v-img>` tags in 69 `.vue` files (multi-line tags included). Every prop and slot used exists in `HkImg`: `src`, `cover`, `max-width`, `height`, `gradient`, `aspect-ratio`, `width`, `position`, `min-*`, `alt`, `class`, `style`, `@click`, `#placeholder` (9 tags), `#error` (2 tags). `@click` and other listeners land on the root, as on `v-img`.

Things to handle before swapping:

1. **Static asset paths.** 34 tags use a static `src="@/assets/..."` (almost all `.svg?url`, one `.png`). The Vue compiler rewrites that string only for tags listed in `transformAssetUrls`. `nuxt.config.ts` builds the list from `vite-plugin-vuetify` (which covers `v-img`) plus `FnImg` and `fn-img`. Add `HkImg` and `hk-img` (`['src']`) or those 34 images break. This is app config, hakka-ui cannot do it.
2. **Tests that name `v-img`.** Seven spec files mention it: `branch-booking`, `brand-swiper`, `google-login`, `branch-intro`, `BranchImageListModal`, `fn-img`, `form-field` (under `test/specs/`). Stubs and `findAllComponents({ name: 'v-img' })` need the new name. `branch-booking.spec.ts` also asserts classes and style on the rendered element.
3. **CSS that targets Vuetify internals.** `components/funki/FunkiFeedback.vue:103` (`.v-img`) and `pages/booking/ipay88/banks.vue:176` (`:deep(.v-img__img)`). `HkImg` has the root class `hk-img` and no `v-img__img`. Only `*.vue`, `*.scss`, `*.css`, `*.ts` were searched for `.v-img`, `v-img__` and `v-responsive`.
4. **Default fade.** `v-img` fades every image in (`transition` defaults to `fade-transition`, 0.3s, `cubic-bezier(0.4, 0, 0.2, 1)`, read from vuetify 3.7.12 `VImg.mjs`). `HkImg` fades only with `fade-in`.
5. **SSR differs.** A non-`eager` `v-img` starts in state `idle` and renders no `<img>` on the server. `HkImg` always renders the `<img>` (native `loading="lazy"`), so server HTML contains the image.
6. **Unsupported props.** `rounded`, `transition`, `lazy-src` do not exist on `HkImg`. None of them appeared in the 89 tags audited (attributes counted: `src`, `class`, `cover`, `max-width`, `height`, `gradient`, `max-height`, `aspect-ratio`, `@click`, `v-if`, `alt`, `width`, `v-else`, `position`, `min-height`, `min-width`, `style`).

Not checked: the content of the 54 dynamic `:src` bindings, and how `v-img`'s own box sizing differs visually from `HkImg`. Compare in a browser before claiming equal layout.

`components/common/FnImg.vue` is the predecessor of `HkImg` (same API as `v-img`, rendering on windicss `wd-` classes). It is imported by `SmartBannerDesktop.vue` and `SmartBannerMobile.vue`; the maintainer said they switched those over themselves.

## From `EtgImg` (eatigo.web, `src/components/global/etg-img.vue`)

What the wrapper does, and where it goes:

| Wrapper behavior                                                                                                                                              | With `HkImg`                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fn:` prefix becomes `funnowCdnBaseUrl`, filename `encodeURIComponent`, `~/` or `@/` `assets/` prefix stripped, public path joined with `__publicAssetsURL()` | App specific. Stays in the wrapper (or a future injected `resolveSrc`)                                                                                   |
| webp `<source>`, `loading` default `lazy`, `onerror`, SSR `complete` check                                                                                    | Built into `HkImg`                                                                                                                                       |
| `.svg` under `/assets` rendered as inline `<svg>` through `useAsset`                                                                                          | Icon: `HkIcon`. Image: `HkImg` with `inherit-color` when it is single color                                                                              |
| `placeholder-class` (default `aspect-1.8`): a gray `div` with an aspect ratio, only when there is no `src` or the image failed                                | `fallback-aspect-ratio` plus `#placeholder` and `#error` slots. A plain `aspect-*` class on the root is wrong here: it would also stretch a loaded image |
| `fade-in` class once loaded and not hydrating                                                                                                                 | `fade-in` prop, wrapper passes `!isHydrating`                                                                                                            |
| `error` event without arguments                                                                                                                               | `HkImg` emits `error` with `src`                                                                                                                         |

Usage found in eatigo.web: one `@error` (`src/pages/orders/[oid]/no-show-confirm/attend.vue:20`, handler ignores arguments) and three `placeholder-class` call sites, all `aspect-1` (`src/components/product/product-detail/product-section-gallery.vue`). niceday.web had no `@error` on `nd-img`.

Not checked: `nd-img.vue` internals, any difference in how ND resolves `src`.

## Where the supporting behavior lives

- Props, slots, aspect ratio order, `inherit-color`, `fade-in`, webp rule: `packages/core/README.md`.
- Why `inherit-color` is a CSS mask and what it needs from the image host (CORS): same README, section "Single-color svg".
- Stories: `HkImg.stories.ts`.
