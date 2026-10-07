import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { storyDocs } from '@myfunnow/hakka-storybook'

import HkIcon from './HkIcon.vue'
import { iconMap } from './iconMap'
import type { IconName } from './iconNames'

const meta: Meta<typeof HkIcon> = {
  title: 'Icons/HkIcon',
  component: HkIcon,
  args: { name: 'add', size: '32' },
  argTypes: {
    name: { control: 'select', options: Object.keys(iconMap) },
    size: { control: 'text', table: { type: { summary: 'string | number' } } },
    width: { control: 'text', table: { type: { summary: 'string | number' } } },
    height: { control: 'text', table: { type: { summary: 'string | number' } } },
    svgComponent: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Small symbols in one style, such as arrows, warnings, add and delete. Pick a name in the Controls table to see the icon. In the Controls table a number such as 24 means pixels, and text such as 2rem is used as it is.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof HkIcon>

export const Default: Story = { parameters: storyDocs({ description: 'One icon. Pick another name, or change the size, in the Controls table.' }) }

export const AllIcons: Story = {
  parameters: storyDocs({
    description: 'Every icon with its name. Use the name as the name value of the icon.',
    code: '<hk-icon v-for="name in names" :key="name" :name="name" :size="32" />',
  }),
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
