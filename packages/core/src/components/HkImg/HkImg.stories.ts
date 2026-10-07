import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { exampleCode } from '@myfunnow/hakka-storybook'

import HkImg from './HkImg.vue'

// Vite serves these files and turns each URL into an asset address, so the stories need no network. `.href` is an
// absolute URL on purpose: a root-relative `.jpg` would make HkImg look for a `.webp` twin that Storybook does not build.
const PHOTO_SRC = new URL('./corgi.jpg', import.meta.url).href
// A copy of the hakka `star` icon: one color (`currentColor`) and no fixed colors, which is what `inherit-color` is for
const ICON_SRC = new URL('./star.svg', import.meta.url).href

// Dark enough at the bottom for white text to stay readable on the white fur of the photo
const GRADIENT = 'to bottom, rgba(0,0,0,0) 40%, rgba(0,0,175,0.75)'

// The "Show code" panel is built from the story's args, so it would print the asset address of this dev server
const shortenAssetUrl = (code: string) => code.replace(/src="[^"]*\/corgi[^"]*\.jpg"/g, 'src="/images/corgi.jpg"')

const meta: Meta<typeof HkImg> = {
  title: 'Core/HkImg',
  component: HkImg,
  args: { src: PHOTO_SRC, alt: 'A surprised corgi', aspectRatio: 1, width: 320 },
  parameters: { docs: { source: { transform: shortenAssetUrl } } },
}

export default meta

type Story = StoryObj<typeof HkImg>

export const Default: Story = {}

export const Cover: Story = { args: { cover: true, aspectRatio: '16/9', width: 320 } }

export const GradientWithContent: Story = {
  args: { cover: true, gradient: GRADIENT },
  render: args => ({
    components: { HkImg },
    setup: () => ({ args }),
    template: '<hk-img v-bind="args"><p class="absolute bottom-2 left-3 m-0 text-white">Sold out</p></hk-img>',
  }),
  parameters: exampleCode(`<hk-img
  src="/images/corgi.jpg"
  alt="A surprised corgi"
  :aspect-ratio="1"
  :width="320"
  cover
  gradient="${GRADIENT}"
>
  <p class="absolute bottom-2 left-3 m-0 text-white">Sold out</p>
</hk-img>`),
}

// The story uses an empty src so the image never loads and the placeholder stays visible; the example shows a real src
export const Placeholder: Story = {
  args: { src: '' },
  render: args => ({
    components: { HkImg },
    setup: () => ({ args }),
    template: '<hk-img v-bind="args"><template #placeholder><div class="w-full h-full bg-gray-200" /></template></hk-img>',
  }),
  parameters: exampleCode(`<hk-img src="/images/corgi.jpg" alt="A surprised corgi" :aspect-ratio="1" :width="320">
  <template #placeholder>
    <div class="w-full h-full bg-gray-200" />
  </template>
</hk-img>`),
}

// Without a src there is no natural ratio, so the box would collapse; the fallback ratio keeps its height
export const FallbackAspectRatio: Story = {
  args: { src: '', aspectRatio: undefined, fallbackAspectRatio: 1.8 },
  render: args => ({
    components: { HkImg },
    setup: () => ({ args }),
    template: '<hk-img v-bind="args"><template #placeholder><div class="w-full h-full bg-gray-200" /></template></hk-img>',
  }),
  parameters: exampleCode(`<hk-img :src="product.cover" alt="A surprised corgi" :width="320" :fallback-aspect-ratio="1.8">
  <template #placeholder>
    <div class="w-full h-full bg-gray-200" />
  </template>
</hk-img>`),
}

// Reload the story to see it: the image is transparent until it has loaded, then fades in over 0.3s
export const FadeIn: Story = { args: { fadeIn: true } }

export const ErrorFallback: Story = {
  args: { src: '/this-image-does-not-exist.png' },
  render: args => ({
    components: { HkImg },
    setup: () => ({ args }),
    template:
      '<hk-img v-bind="args"><template #error><div class="grid place-items-center w-full h-full bg-gray-200">Image unavailable</div></template></hk-img>',
  }),
  parameters: exampleCode(`<hk-img src="/images/missing.png" alt="A surprised corgi" :aspect-ratio="1" :width="320">
  <template #error>
    <div class="grid place-items-center w-full h-full bg-gray-200">Image unavailable</div>
  </template>
</hk-img>`),
}

// The shape of the icon takes the text color, here the brand color from the tokens CSS
export const InheritColor: Story = {
  args: { src: ICON_SRC, alt: 'Star', inheritColor: true, aspectRatio: 1, width: 96 },
  render: args => ({
    components: { HkImg },
    setup: () => ({ args }),
    template: '<hk-img v-bind="args" class="text-pink" />',
  }),
  parameters: exampleCode(`<hk-img src="/icons/star.svg" alt="Star" inherit-color :aspect-ratio="1" :width="96" class="text-pink" />`),
}

// With no color of its own, the icon takes the text color of the element around it
export const InheritsTextColor: Story = {
  args: { src: ICON_SRC, alt: 'Star', inheritColor: true, aspectRatio: 1, width: 96 },
  render: args => ({
    components: { HkImg },
    setup: () => ({ args }),
    template: '<div class="p-6 bg-neutral-800 text-white"><hk-img v-bind="args" /></div>',
  }),
  parameters: exampleCode(`<div class="p-6 bg-neutral-800 text-white">
  <hk-img src="/icons/star.svg" alt="Star" inherit-color :aspect-ratio="1" :width="96" />
</div>`),
}
