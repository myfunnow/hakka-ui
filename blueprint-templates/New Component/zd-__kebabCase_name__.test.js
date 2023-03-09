
import { test, it, expect, beforeAll } from "vitest"
import { mount } from '@vue/test-utils'
import Zd{{pascalCase name}} from './zd-{{kebabCase name}}.vue'
import { vuetify } from '@/plugins/vuetify'

test('{{pascalCase name}}', async () => {
  expect(Zd{{pascalCase name}}).toBeTruthy()

  const wrapper = mount(Zd{{pascalCase name}}, {
    global: {
      plugins: [vuetify],
    },
    props: {

    },
  })

  it('should to match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should ...', () => {
    
  })
})
