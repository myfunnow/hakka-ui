import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import HkPagination from './HkPagination.vue'

// The "Show code" panel is built from args and knows nothing about the `render` template, so `v-model:page` would be missing
const exampleCode = (code: string) => ({ docs: { source: { code } } })

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
