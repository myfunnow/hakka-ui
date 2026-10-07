import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { exampleCode } from '@myfunnow/hakka-storybook'

import HkPagination from './HkPagination.vue'

const meta: Meta<typeof HkPagination> = {
  title: 'Core/HkPagination',
  component: HkPagination,
  args: { totalCount: 200, pageSize: 10, visible: 7 },
  render: args => ({
    components: { HkPagination },
    setup() {
      const page = ref(1)

      return { args, page }
    },
    template: '<hk-pagination v-model:page="page" v-bind="args" />',
  }),
}

export default meta

type Story = StoryObj<typeof HkPagination>

export const Default: Story = {
  parameters: exampleCode('<hk-pagination v-model:page="page" :total-count="200" :page-size="10" :visible="7" />'),
}

export const FewPages: Story = {
  args: { totalCount: 35 },
  parameters: exampleCode('<hk-pagination v-model:page="page" :total-count="35" :page-size="10" :visible="7" />'),
}

export const NoResults: Story = {
  args: { totalCount: 0 },
  parameters: exampleCode('<hk-pagination v-model:page="page" :total-count="0" :page-size="10" :visible="7" />'),
}
