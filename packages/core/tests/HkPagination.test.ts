import { mount, type VueWrapper } from '@vue/test-utils'

import HkPagination from '@/components/HkPagination/HkPagination.vue'

const findPageButton = (wrapper: VueWrapper, page: number) => wrapper.findAll('button').find(button => button.text() === `${page}`)

describe('HkPagination', () => {
  it('should summarize the range shown on the current page', () => {
    const wrapper = mount(HkPagination, { props: { page: 2, totalCount: 50 } })

    expect(wrapper.text()).toContain('第 11 - 20，共 50 筆結果')
  })

  it('should end the range at the total on the last page', () => {
    const wrapper = mount(HkPagination, { props: { page: 5, totalCount: 45 } })

    expect(wrapper.text()).toContain('第 41 - 45，共 45 筆結果')
  })

  it('should show one page with both arrows disabled when there are no results', () => {
    const wrapper = mount(HkPagination, { props: { totalCount: 0 } })

    expect(wrapper.text()).toContain('第 0 - 0，共 0 筆結果')
    expect(wrapper.find('[aria-label="上一頁"]').attributes()).toHaveProperty('disabled')
    expect(wrapper.find('[aria-label="下一頁"]').attributes()).toHaveProperty('disabled')
  })

  it('should mark the current page for assistive technology', () => {
    const wrapper = mount(HkPagination, { props: { page: 3, totalCount: 100 } })

    expect(findPageButton(wrapper, 3)?.attributes('aria-current')).toBe('page')
  })

  it('should emit the clicked page', async () => {
    const wrapper = mount(HkPagination, { props: { page: 1, totalCount: 100 } })

    await findPageButton(wrapper, 3)?.trigger('click')

    expect(wrapper.emitted('update:page')).toEqual([[3]])
  })

  it('should move one page forward with the next button', async () => {
    const wrapper = mount(HkPagination, { props: { page: 4, totalCount: 100 } })

    await wrapper.find('[aria-label="下一頁"]').trigger('click')

    expect(wrapper.emitted('update:page')).toEqual([[5]])
  })

  it('should disable the previous button on the first page', () => {
    const wrapper = mount(HkPagination, { props: { page: 1, totalCount: 100 } })

    expect(wrapper.find('[aria-label="上一頁"]').attributes()).toHaveProperty('disabled')
  })

  it('should show the last page when the bound page is beyond it', () => {
    const wrapper = mount(HkPagination, { props: { page: 99, totalCount: 100 } })

    expect(wrapper.text()).toContain('第 91 - 100，共 100 筆結果')
    expect(findPageButton(wrapper, 10)?.attributes('aria-current')).toBe('page')
    expect(wrapper.find('[aria-label="下一頁"]').attributes()).toHaveProperty('disabled')
  })

  it('should let the text slot render a custom summary', () => {
    const wrapper = mount(HkPagination, {
      props: { page: 2, totalCount: 50 },
      slots: { text: '<template #text="{ start, end, total }">{{ start }}/{{ end }}/{{ total }}</template>' },
    })

    expect(wrapper.text()).toContain('11/20/50')
  })
})
