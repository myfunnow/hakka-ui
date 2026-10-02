import { mount } from '@vue/test-utils'

import HkCheckbox from '@/components/HkCheckbox/HkCheckbox.vue'

describe('HkCheckbox', () => {
  it('should render the slot as its label', () => {
    const wrapper = mount(HkCheckbox, { slots: { default: '我已滿 18 歲' } })

    expect(wrapper.text()).toContain('我已滿 18 歲')
    expect(wrapper.classes()).toContain('hk-checkbox')
  })

  it('should emit the toggled value when clicked', async () => {
    const wrapper = mount(HkCheckbox, { props: { checked: false } })

    await wrapper.trigger('click')

    expect(wrapper.emitted('update:checked')).toEqual([[true]])
  })

  it('should not toggle when disabled is passed through', async () => {
    const wrapper = mount(HkCheckbox, { attrs: { disabled: true } })

    await wrapper.trigger('click')

    expect(wrapper.emitted('update:checked')).toBeUndefined()
  })

  it('should move focus to the checkbox through the exposed focus()', () => {
    const wrapper = mount(HkCheckbox, { attachTo: document.body })

    wrapper.vm.focus()

    expect(document.activeElement).toBe(wrapper.element)
    wrapper.unmount()
  })
})
