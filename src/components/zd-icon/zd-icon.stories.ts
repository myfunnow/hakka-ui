import ZdIcon from './zd-icon.vue';

export default {
  title: 'Icon',
  component: ZdIcon,
}

export const Template = (args, { argTypes }) => ({
  components: { ZdIcon },
  setup() {
    return { args };
  },
  props: Object.keys(argTypes),
  template: '<zd-icon v-bind="args" style="height:40px;width:40px"/>',
});