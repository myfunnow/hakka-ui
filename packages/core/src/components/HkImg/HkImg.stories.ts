import type { Meta, StoryObj } from '@storybook/vue3-vite'

import HkImg from './HkImg.vue'

// Inline SVG so the stories need no network
const SAMPLE_SRC = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect width="640" height="360" fill="#ffd9c9"/><circle cx="320" cy="180" r="90" fill="#ff5537"/></svg>'
)}`

const meta: Meta<typeof HkImg> = {
  title: 'Core/HkImg',
  component: HkImg,
  args: { src: SAMPLE_SRC, alt: 'Sample', aspectRatio: '16/9', width: 320 },
}

export default meta

type Story = StoryObj<typeof HkImg>

export const Default: Story = {}

export const Cover: Story = { args: { cover: true, aspectRatio: 1, width: 240 } }

export const GradientWithContent: Story = {
  args: { gradient: 'to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4)' },
  render: args => ({
    components: { HkImg },
    setup: () => ({ args }),
    template: '<hk-img v-bind="args"><p style="position: absolute; bottom: 8px; left: 12px; margin: 0; color: #fff">Sold out</p></hk-img>',
  }),
}

// An empty src never loads, so the placeholder stays visible
export const Placeholder: Story = {
  args: { src: '' },
  render: args => ({
    components: { HkImg },
    setup: () => ({ args }),
    template: '<hk-img v-bind="args"><template #placeholder><div style="width: 100%; height: 100%; background: #eee" /></template></hk-img>',
  }),
}

export const ErrorFallback: Story = {
  args: { src: '/this-image-does-not-exist.png' },
  render: args => ({
    components: { HkImg },
    setup: () => ({ args }),
    template:
      '<hk-img v-bind="args"><template #error><div style="display: grid; place-items: center; width: 100%; height: 100%; background: #eee">Image unavailable</div></template></hk-img>',
  }),
}
