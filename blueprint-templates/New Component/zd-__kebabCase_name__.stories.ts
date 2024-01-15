import Zd{{pascalCase name}} from './zd-{{kebabCase name}}.vue';

export default {
  title: '{{pascalCase name}}',
  component: Zd{{pascalCase name}},
}

export const Template = (args, { argTypes }) => ({
  components: { Zd{{pascalCase name}} },
  setup() {
    return { args };
  },
  props: Object.keys(argTypes),
  template: '<zd-{{kebabCase name}} v-bind="args"/>',
})
