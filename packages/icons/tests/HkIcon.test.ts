import { mount } from '@vue/test-utils'
import { h } from 'vue'

import HkIcon from '@/HkIcon.vue'

describe('HkIcon', () => {
  it('should render the svg for the given name', async () => {
    const wrapper = mount(HkIcon, { props: { name: 'stroke_arrow_left' } })

    await vi.waitFor(() => expect(wrapper.find('svg').exists()).toBe(true))

    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.classes()).toContain('icon-stroke_arrow_left')
  })

  it('should fill its container when no size is given', async () => {
    const wrapper = mount(HkIcon, { props: { name: 'stroke_add' } })

    await vi.waitFor(() => expect(wrapper.find('svg').exists()).toBe(true))

    expect(wrapper.find('svg').attributes()).toMatchObject({ width: '100%', height: '100%' })
  })

  it('should use a numeric size for both width and height', async () => {
    const wrapper = mount(HkIcon, { props: { name: 'stroke_add', size: 24 } })

    await vi.waitFor(() => expect(wrapper.find('svg').exists()).toBe(true))

    expect(wrapper.find('svg').attributes()).toMatchObject({ width: '24', height: '24' })
  })

  it('should center its icon in a flex box by default', () => {
    const wrapper = mount(HkIcon, { props: { name: 'stroke_add' } })

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['flex', 'items-center', 'justify-center']))
  })

  it('should let a display class from the caller replace the default flex', () => {
    const wrapper = mount(HkIcon, { props: { name: 'stroke_add' }, attrs: { class: 'inline-block size-3' } })

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['inline-block', 'size-3']))
    expect(wrapper.classes()).not.toContain('flex')
  })

  it('should keep the caller class and the default centering classes it does not conflict with', () => {
    const wrapper = mount(HkIcon, { props: { name: 'stroke_add' }, attrs: { class: 'flex-none text-yellow-50' } })

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['flex', 'flex-none', 'items-center', 'justify-center', 'text-yellow-50']))
  })

  it('should pass other attributes to the root element', () => {
    const wrapper = mount(HkIcon, { props: { name: 'stroke_add' }, attrs: { 'data-test': 'icon' } })

    expect(wrapper.attributes('data-test')).toBe('icon')
  })

  it('should render a custom svg component instead of the named icon', () => {
    const custom = () => h('svg', { 'data-test': 'custom' })

    const wrapper = mount(HkIcon, { props: { name: 'stroke_add', svgComponent: custom } })

    expect(wrapper.find('[data-test="custom"]').exists()).toBe(true)
    expect(wrapper.classes()).not.toContain('icon-add')
  })
})
