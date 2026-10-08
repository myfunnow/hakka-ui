import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { storyDocs } from '@myfunnow/hakka-storybook'

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

// The docs generator cannot read the `CssLength` alias (`string | number`) and falls back to an object control that starts
// as `{}`. A text control takes `320` or `50%`: a bare number or numeric string means px, any other string goes to CSS.
const cssSizeArgType = { control: 'text', table: { type: { summary: 'string | number' } } } as const
const CSS_SIZE_PROPS = ['aspectRatio', 'fallbackAspectRatio', 'width', 'height', 'maxWidth', 'maxHeight', 'minWidth', 'minHeight'] as const

const meta: Meta<typeof HkImg> = {
  title: 'Core/HkImg',
  component: HkImg,
  args: { src: PHOTO_SRC, alt: 'A surprised corgi', aspectRatio: '1', width: '320' },
  argTypes: Object.fromEntries(CSS_SIZE_PROPS.map(name => [name, cssSizeArgType])),
  parameters: {
    docs: {
      description: {
        component:
          'Shows a picture inside a box. The box can have a fixed shape, a color layer on top, a gray block while the picture loads, and a message when it fails. Change a value in the Controls table and the picture updates. In the Controls table a number such as 320 means pixels, and text such as 50% is used as it is.',
      },
      source: { transform: shortenAssetUrl },
    },
  },
}

export default meta

type Story = StoryObj<typeof HkImg>

export const Default: Story = {
  parameters: storyDocs({ description: 'A square picture, 320 pixels wide. Change aspectRatio or width in the Controls table to resize it.' }),
}

export const Cover: Story = {
  args: { cover: true, aspectRatio: '16/9', width: '320' },
  parameters: storyDocs({
    description: 'A wide box (16/9) that the picture fills. What does not fit is cut off. Turn cover off to see the whole picture.',
  }),
}

export const GradientWithContent: Story = {
  args: { cover: true, gradient: GRADIENT },
  render: args => ({
    components: { HkImg },
    setup: () => ({ args }),
    template: '<hk-img v-bind="args"><p class="absolute bottom-2 left-3 m-0 text-white">Sold out</p></hk-img>',
  }),
  parameters: storyDocs({
    description:
      'A dark color layer lies over the bottom of the picture, with the text "Sold out" on top. Change gradient to change the color layer.',
    code: `<hk-img
  src="/images/corgi.jpg"
  alt="A surprised corgi"
  :aspect-ratio="1"
  :width="320"
  cover
  gradient="${GRADIENT}"
>
  <p class="absolute bottom-2 left-3 m-0 text-white">Sold out</p>
</hk-img>`,
  }),
}

// The story uses an empty src so the image never loads and the placeholder stays visible; the example shows a real src
export const Placeholder: Story = {
  args: { src: '' },
  render: args => ({
    components: { HkImg },
    setup: () => ({ args }),
    template: '<hk-img v-bind="args"><template #placeholder><div class="w-full h-full bg-gray-200" /></template></hk-img>',
  }),
  parameters: storyDocs({
    description: 'The picture has no address, so a gray block shows in its place. People see this block while a picture is still loading.',
    code: `<hk-img src="/images/corgi.jpg" alt="A surprised corgi" :aspect-ratio="1" :width="320">
  <template #placeholder>
    <div class="w-full h-full bg-gray-200" />
  </template>
</hk-img>`,
  }),
}

// Without a src there is no picture to size the box, so it would collapse; the fallback ratio keeps its height
export const FallbackAspectRatio: Story = {
  args: { src: '', aspectRatio: undefined, fallbackAspectRatio: '1.8' },
  render: args => ({
    components: { HkImg },
    setup: () => ({ args }),
    template: '<hk-img v-bind="args"><template #placeholder><div class="w-full h-full bg-gray-200" /></template></hk-img>',
  }),
  parameters: storyDocs({
    description: 'No picture and no size are given, so the box would have no height. fallbackAspectRatio keeps its shape (here 1.8 wide to 1 tall).',
    code: `<hk-img :src="product.cover" alt="A surprised corgi" :width="320" :fallback-aspect-ratio="1.8">
  <template #placeholder>
    <div class="w-full h-full bg-gray-200" />
  </template>
</hk-img>`,
  }),
}

// Reload the story to see it: the image is transparent until it has loaded, then fades in over 0.3s
export const FadeIn: Story = {
  parameters: storyDocs({
    description:
      'The picture fades in after it has loaded. This is on by default; set fadeIn to false to turn it off. Reload this page to see it again.',
  }),
}

export const ErrorFallback: Story = {
  args: { src: '/this-image-does-not-exist.png' },
  render: args => ({
    components: { HkImg },
    setup: () => ({ args }),
    template:
      '<hk-img v-bind="args"><template #error><div class="grid place-items-center w-full h-full bg-gray-200">Image unavailable</div></template></hk-img>',
  }),
  parameters: storyDocs({
    description: 'The picture address is wrong, so the picture cannot load. A message shows in its place.',
    code: `<hk-img src="/images/missing.png" alt="A surprised corgi" :aspect-ratio="1" :width="320">
  <template #error>
    <div class="grid place-items-center w-full h-full bg-gray-200">Image unavailable</div>
  </template>
</hk-img>`,
  }),
}

// The shape of the icon takes the text color, here the brand color from the tokens CSS
export const InheritColor: Story = {
  args: { src: ICON_SRC, alt: 'Star', inheritColor: true, aspectRatio: '1', width: '96' },
  render: args => ({
    components: { HkImg },
    setup: () => ({ args }),
    template: '<hk-img v-bind="args" class="text-pink" />',
  }),
  parameters: storyDocs({
    description: 'An svg icon painted with the text color of its box. Here the color is pink. Use it for icons that have only one color.',
    code: `<hk-img src="/icons/star.svg" alt="Star" inherit-color :aspect-ratio="1" :width="96" class="text-pink" />`,
  }),
}

// With no color of its own, the icon takes the text color of the element around it
export const InheritsTextColor: Story = {
  args: { src: ICON_SRC, alt: 'Star', inheritColor: true, aspectRatio: '1', width: '96' },
  render: args => ({
    components: { HkImg },
    setup: () => ({ args }),
    template: '<div class="p-6 bg-neutral-800 text-white"><hk-img v-bind="args" /></div>',
  }),
  parameters: storyDocs({
    description: 'The icon has no color of its own, so it takes the white text color of the dark box around it.',
    code: `<div class="p-6 bg-neutral-800 text-white">
  <hk-img src="/icons/star.svg" alt="Star" inherit-color :aspect-ratio="1" :width="96" />
</div>`,
  }),
}
