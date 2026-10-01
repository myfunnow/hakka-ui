import { mount } from '@vue/test-utils'
import { h } from 'vue'

import HkIcon from './HkIcon.vue'

describe('HkIcon', () => {
  it('should render the svg for the given name', async () => {
    const wrapper = mount(HkIcon, { props: { name: 'arrow-left' } })

    await vi.waitFor(() => expect(wrapper.find('svg').exists()).toBe(true))

    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.classes()).toContain('icon-arrow-left')
  })

  it('should fill its container when no size is given', async () => {
    const wrapper = mount(HkIcon, { props: { name: 'add' } })

    await vi.waitFor(() => expect(wrapper.find('svg').exists()).toBe(true))

    expect(wrapper.find('svg').attributes()).toMatchObject({ width: '100%', height: '100%' })
  })

  it('should use a numeric size for both width and height', async () => {
    const wrapper = mount(HkIcon, { props: { name: 'add', size: 24 } })

    await vi.waitFor(() => expect(wrapper.find('svg').exists()).toBe(true))

    expect(wrapper.find('svg').attributes()).toMatchObject({ width: '24', height: '24' })
  })

  it('should render a custom svg component instead of the named icon', () => {
    const custom = () => h('svg', { 'data-test': 'custom' })

    const wrapper = mount(HkIcon, { props: { name: 'add', svgComponent: custom } })

    expect(wrapper.find('[data-test="custom"]').exists()).toBe(true)
    expect(wrapper.classes()).not.toContain('icon-add')
  })
})
