import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { storyDocs } from '@myfunnow/hakka-storybook'

import HkCheckbox from './HkCheckbox.vue'

const meta: Meta<typeof HkCheckbox> = {
  title: 'Kit/HkCheckbox',
  component: HkCheckbox,
  // `disabled` comes from the naive-ui checkbox underneath, so it is not a typed prop of this component
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Stop people from changing the box. It is grayed out.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    checked: {
      control: false,
      description: 'Whether the box is ticked. Use it as v-model:checked.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    default: { control: false, description: 'The label next to the box.', table: { type: { summary: 'text' } } },
    focus: { table: { disable: true } },
    blur: { table: { disable: true } },
  } as Meta<typeof HkCheckbox>['argTypes'],
  parameters: {
    docs: {
      description: {
        component:
          'A box that can be ticked or unticked, with a label next to it. Click the box in the story, or use the Controls table to disable it.',
      },
    },
  },
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
  parameters: storyDocs({
    description: 'A box with a label. Click it to tick or untick it.',
    code: '<hk-checkbox v-model:checked="checked">我已滿 18 歲</hk-checkbox>',
  }),
}

export const Disabled: Story = {
  args: { disabled: true } as Story['args'],
  parameters: storyDocs({
    description: 'A box that cannot be changed. It is grayed out and clicks do nothing.',
    code: '<hk-checkbox v-model:checked="checked" disabled>我已滿 18 歲</hk-checkbox>',
  }),
}
