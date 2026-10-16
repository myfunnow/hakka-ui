import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { useArgs } from 'storybook/preview-api'
import { storyDocs } from '@myfunnow/hakka-storybook'

import HkPagination from './HkPagination.vue'

import type { HkPaginationSlots } from './types'

type TextSlotProps = Parameters<NonNullable<HkPaginationSlots['text']>>[0]

// Typed from the real slot props: adding, renaming or retyping a prop makes this object fail typecheck until it is updated
const TEXT_SLOT_PROP_TYPES: { [K in keyof TextSlotProps]-?: TextSlotProps[K] extends number ? 'number' : never } = {
  start: 'number',
  end: 'number',
  total: 'number',
}

const TEXT_SLOT_TYPE = `{ ${Object.entries(TEXT_SLOT_PROP_TYPES)
  .map(([name, type]) => `${name}: ${type}`)
  .join('; ')} }`

const meta: Meta<typeof HkPagination> = {
  title: 'Core/HkPagination',
  component: HkPagination,
  args: { page: 1, totalCount: 200, pageSize: 10, visible: 7, ariaLabels: { nav: '分頁', prev: '上一頁', next: '下一頁' } },
  argTypes: {
    totalCount: { control: { type: 'number', min: 0 } },
    pageSize: { control: { type: 'number', min: 1 } },
    visible: { control: { type: 'number', min: 1 } },
    page: {
      control: { type: 'number', min: 1 },
      description: 'The page that is shown now. The first page is 1. Use it as v-model:page so the page changes when someone clicks.',
      table: { type: { summary: 'number' }, defaultValue: { summary: '1' } },
    },
    ariaLabels: { table: { defaultValue: { summary: '{ nav: "分頁", prev: "上一頁", next: "下一頁" }' } } },
    text: {
      control: false,
      // vue-docgen-api reads the slot bindings of defineSlots by name only, so it prints every type as `unknown`
      table: { type: { summary: TEXT_SLOT_TYPE } },
      description: 'Replaces the line "第 1 - 10，共 200 筆結果" above the buttons. It gets start, end and total to build its own text.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Page buttons with a previous and a next arrow. Click a number or an arrow and the page changes. In the Controls table, change totalCount to say how many results there are.',
      },
    },
  },
  // page lives in the story args, so the Controls table follows every click
  render: args => {
    const [, updateArgs] = useArgs()

    return {
      components: { HkPagination },
      setup() {
        return { args, updateArgs }
      },
      template: '<hk-pagination v-bind="args" @update:page="updateArgs({ page: $event })" />',
    }
  },
}

export default meta

type Story = StoryObj<typeof HkPagination>

export const Default: Story = {
  parameters: storyDocs({
    description: '200 results with 10 on each page make 20 pages. Click a number or an arrow to change the page.',
    code: '<hk-pagination v-model:page="page" :total-count="200" :page-size="10" :visible="7" />',
  }),
}

export const FewPages: Story = {
  args: { totalCount: 35 },
  parameters: storyDocs({
    description: '35 results make only 4 pages, so every page button fits.',
    code: '<hk-pagination v-model:page="page" :total-count="35" :page-size="10" :visible="7" />',
  }),
}

export const NoResults: Story = {
  args: { totalCount: 0 },
  parameters: storyDocs({
    description: 'There are no results, so the line says 0 and both arrows are disabled.',
    code: '<hk-pagination v-model:page="page" :total-count="0" :page-size="10" :visible="7" />',
  }),
}
