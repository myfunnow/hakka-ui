
import { mount } from '@vue/test-utils'
import Zd{{pascalCase name}} from './zd-{{kebabCase name}}.vue'

describe('{{pascalCase name}}', async () => {
  expect(Zd{{pascalCase name}}).toBeTruthy()

  const wrapper = mount(Zd{{pascalCase name}}, {
    // props: {

    // },
  })

  it('should to match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should ...', () => {
    
  })
})
