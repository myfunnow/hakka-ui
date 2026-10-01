import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

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

export const Default: Story = {}

export const FewPages: Story = { args: { totalCount: 35 } }

export const NoResults: Story = { args: { totalCount: 0 } }
