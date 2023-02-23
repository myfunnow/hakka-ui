import Pagination from './pagination.vue';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Pagination',
  component: Pagination,
};

export const Template = (args, { argTypes }) => ({
  components: { Pagination },
  props: Object.keys(argTypes),
  template: '<Pagination v-bind="$props"/>',
});