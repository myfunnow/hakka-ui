import {{pascalCase name}} from './{{kebabCase name}}.vue';

export default {
  title: '{{pascalCase name}}',
  component: {{pascalCase name}},
};

export const Template = (args, { argTypes }) => ({
  components: { {{pascalCase name}} },
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
  template: '<{{pascalCase name}} v-bind="$props"/>',
});