import ZdPagination from './zd-pagination.vue';

export default {
  component: ZdPagination,
};

export const Template = (args, { argTypes }) => ({
  components: { ZdPagination },
  setup() {
    return { args };
  },
  props: Object.keys(argTypes),
  template: '<zd-pagination v-bind="args" :count="12"/>',
})
