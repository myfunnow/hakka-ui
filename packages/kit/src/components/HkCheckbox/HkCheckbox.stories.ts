import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import HkCheckbox from './HkCheckbox.vue'

// The "Show code" panel is built from args and knows nothing about the `render` template, so `v-model:checked` and the label would be missing
const exampleCode = (code: string) => ({ docs: { source: { code } } })

const meta: Meta<typeof HkCheckbox> = {
  title: 'Kit/HkCheckbox',
  component: HkCheckbox,
  render: args => ({
    components: { HkCheckbox },
    setup() {
      const checked = ref(false)

      return { args, checked }
    },
    template: '<hk-checkbox v-model:checked="checked" v-bind="args">我已滿 18 歲</hk-checkbox>',
  }),
}

export default meta

type Story = StoryObj<typeof HkCheckbox>

export const Default: Story = {
  parameters: exampleCode('<hk-checkbox v-model:checked="checked">我已滿 18 歲</hk-checkbox>'),
}

export const Disabled: Story = {
  args: { disabled: true } as Story['args'],
  parameters: exampleCode('<hk-checkbox v-model:checked="checked" disabled>我已滿 18 歲</hk-checkbox>'),
}
