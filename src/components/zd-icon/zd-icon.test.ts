
import { describe, it, expect } from "vitest"
import { mount } from '@vue/test-utils'
import ZdIcon from './zd-icon.vue'

describe('Icon', async () => {
  expect(ZdIcon).toBeTruthy()

  const wrapper = mount(ZdIcon, {

  })

  it('should to match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should ...', () => {
    
  })
})
