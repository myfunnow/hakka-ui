import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { exampleCode } from '@myfunnow/hakka-storybook'

import HkIcon from './HkIcon.vue'
import { iconMap } from './iconMap'
import type { IconName } from './iconNames'

const meta: Meta<typeof HkIcon> = {
  title: 'Icons/HkIcon',
  component: HkIcon,
  args: { name: 'add', size: 32 },
  argTypes: {
    name: { control: 'select', options: Object.keys(iconMap) },
  },
}

export default meta

type Story = StoryObj<typeof HkIcon>

export const Default: Story = {}

export const AllIcons: Story = {
  parameters: exampleCode('<hk-icon v-for="name in names" :key="name" :name="name" :size="32" />'),
  render: () => ({
    components: { HkIcon },
    setup() {
      return { names: Object.keys(iconMap) as IconName[] }
    },
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:16px">
        <div v-for="name in names" :key="name" style="display:flex;flex-direction:column;align-items:center;gap:4px">
          <HkIcon :name="name" size="32" />
          <code style="font-size:12px">{{ name }}</code>
        </div>
      </div>
    `,
  }),
}
