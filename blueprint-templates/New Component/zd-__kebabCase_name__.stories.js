import Zd{{pascalCase name}} from './zd-{{kebabCase name}}.vue';

export default {
  title: '{{pascalCase name}}',
  component: Zd{{pascalCase name}},
};

export const Template = (args, { argTypes }) => ({
  components: { Zd{{pascalCase name}} },
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
  template: '<zd-{{kebabCase name}} v-bind="$props"/>',
});