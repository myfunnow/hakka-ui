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
  computed: {
    props() {
      const finalProps = { ...this.$props }

      // Reapply mappings to circumvent Storybook Vue 2 bug.
      Object.entries(this.$props)
        .filter(([key, value]) =>
          Object.hasOwn(argTypes[key]?.mapping || {}, value),
        )
        .forEach(([key, value]) => {
          finalProps[key] = argTypes[key].mapping[value]
        })

      return finalProps
    },
  },
  props: Object.keys(argTypes),
  template: '<Pagination v-bind="$props"/>',
});