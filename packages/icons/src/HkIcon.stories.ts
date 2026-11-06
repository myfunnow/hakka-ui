import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { storyDocs } from '@myfunnow/hakka-storybook'

import HkIcon from './HkIcon.vue'
import { iconMap } from './iconMap'
import type { IconName } from './iconNames'

const meta: Meta<typeof HkIcon> = {
  title: 'Icons/HkIcon',
  component: HkIcon,
  args: { name: 'stroke_add', size: '32' },
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

const STROKE_PREFIX = 'stroke_'
const FILLED_PREFIX = 'filled_'

const allNames = Object.keys(iconMap) as IconName[]
const strokeNames = allNames.filter(name => name.startsWith(STROKE_PREFIX))
const filledNames = allNames.filter(name => name.startsWith(FILLED_PREFIX))

const iconGridTemplate = `
  <div class="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
    <div v-for="name in names" :key="name" class="flex flex-col items-center gap-1">
      <HkIcon :name="name" size="32" />
      <code class="break-all text-center text-xs">{{ name }}</code>
    </div>
  </div>
`

function renderIconGrid(names: IconName[]) {
  return () => ({
    components: { HkIcon },
    setup() {
      return { names }
    },
    template: iconGridTemplate,
  })
}

export const StrokeIcons: Story = {
  parameters: storyDocs({
    description: 'Every stroke icon with its name. Use the name as the name value of the icon.',
    code: '<hk-icon name="stroke_add" :size="32" />',
  }),
  render: renderIconGrid(strokeNames),
}

export const FilledIcons: Story = {
  parameters: storyDocs({
    description:
      'Every filled icon with its name. Names are grouped by the Figma component group: stroke icons start with stroke_ and filled icons start with filled_, such as filled_feeds.',
    code: '<hk-icon name="filled_feeds" :size="32" />',
  }),
  render: renderIconGrid(filledNames),
}
