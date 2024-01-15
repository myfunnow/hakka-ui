import { ref } from 'vue'
import ZdPagination from './zd-pagination.vue'

export default {
  title: 'Pagination',
  component: ZdPagination,
}

export const Template = (args, { argTypes }) => ({
  components: { ZdPagination },
  setup() {
    let page = ref(1)
    const updateModel = (event) => page.value = event

    return { args, page, updateModel }
  },
  props: Object.keys(argTypes),
  template: '<zd-pagination v-bind="args" v-model="page"/>',
})
