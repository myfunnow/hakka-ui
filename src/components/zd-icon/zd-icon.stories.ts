import ZdIcon from './zd-icon.vue'

export default {
  title: 'Icon',
  component: ZdIcon,
}

export const Template = {
  render: args => ({
    components: { ZdIcon },
    setup() {
      return { args }
    },
    template: '<zd-icon v-bind="args" style="height:40px;width:40px"/>',
  }),
}
