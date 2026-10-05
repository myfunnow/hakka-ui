import { mount, type VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'

import HkImg from '@/components/HkImg/HkImg.vue'

const APP_CDN = 'https://cdn.myfunnow.com/eatigo-web/prod'

const stubProductionBuild = (publicBase = '/') => {
  vi.stubEnv('NODE_ENV', 'production')
  vi.stubGlobal('__publicAssetsURL', () => publicBase)
}

const stubImageState = ({ complete, naturalWidth }: { complete: boolean; naturalWidth: number }) => {
  vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(complete)
  vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(naturalWidth)
}

const finishLoading = async (wrapper: VueWrapper, size = { width: 400, height: 200 }) => {
  const img = wrapper.find('img')

  Object.defineProperty(img.element, 'naturalWidth', { value: size.width })
  Object.defineProperty(img.element, 'naturalHeight', { value: size.height })
  await img.trigger('load')
}

// Engines serialize aspect-ratio differently ("2" or "2 / 1"), so compare a normalized form
const aspectRatioOf = (wrapper: VueWrapper) => wrapper.element.style.getPropertyValue('aspect-ratio').replace(/\s/g, '').replace(/\/1$/, '')

const slots = { placeholder: '<span class="the-placeholder">loading</span>', error: '<span class="the-error">failed</span>' }

// happy-dom reports a fresh <img> as complete with no size, which the hydration check reads as a
// failed image. Default to what a browser reports for an image that is still downloading.
beforeEach(() => {
  stubImageState({ complete: false, naturalWidth: 0 })
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('HkImg image', () => {
  it('should put the alt text on the img and nothing role-like on the root', () => {
    const wrapper = mount(HkImg, { props: { src: '/a.png', alt: 'A dumpling' } })

    expect(wrapper.find('img').attributes('alt')).toBe('A dumpling')
    expect(wrapper.attributes('role')).toBeUndefined()
    expect(wrapper.attributes('aria-label')).toBeUndefined()
  })

  it('should load lazily by default and eagerly with the eager prop', () => {
    const lazy = mount(HkImg, { props: { src: '/a.png' } })
    const eager = mount(HkImg, { props: { src: '/a.png', eager: true } })

    expect(lazy.find('img').attributes('loading')).toBe('lazy')
    expect(eager.find('img').attributes('loading')).toBe('eager')
  })

  it('should contain the image by default and crop it with the cover prop', () => {
    const contained = mount(HkImg, { props: { src: '/a.png' } })
    const covered = mount(HkImg, { props: { src: '/a.png', cover: true } })

    expect(contained.find('img').classes()).not.toContain('hk-img__image--cover')
    expect(covered.find('img').classes()).toContain('hk-img__image--cover')
  })

  it('should apply the position as object-position', () => {
    const wrapper = mount(HkImg, { props: { src: '/a.png', position: 'top center' } })

    expect(wrapper.find('img').element.style.objectPosition).toBe('top center')
  })

  it('should render no picture when there is no src', () => {
    const wrapper = mount(HkImg, { props: { src: '' } })

    expect(wrapper.find('picture').exists()).toBe(false)
  })
})

describe('HkImg webp', () => {
  it('should offer a webp source for a public image in production', () => {
    stubProductionBuild()

    const wrapper = mount(HkImg, { props: { src: '/images/hero.png' } })

    expect(wrapper.find('source').attributes()).toMatchObject({ srcset: '/images/hero.webp', type: 'image/webp' })
    expect(wrapper.find('img').attributes('src')).toBe('/images/hero.png')
  })

  it('should offer a webp source for a built asset served from the app CDN', () => {
    stubProductionBuild(APP_CDN)

    const wrapper = mount(HkImg, { props: { src: `${APP_CDN}/_nuxt/aftee-intro.9xeEkHE0.jpg` } })

    expect(wrapper.find('source').attributes('srcset')).toBe(`${APP_CDN}/_nuxt/aftee-intro.9xeEkHE0.webp`)
  })

  it('should not offer a webp source for an image from the funnow CDN', () => {
    stubProductionBuild(APP_CDN)

    const wrapper = mount(HkImg, { props: { src: 'https://cdn.myfunnow.com/products/a.jpg' } })

    expect(wrapper.find('source').exists()).toBe(false)
  })

  it('should not offer a webp source outside a production build', () => {
    const wrapper = mount(HkImg, { props: { src: '/images/hero.png' } })

    expect(wrapper.find('source').exists()).toBe(false)
  })
})

describe('HkImg loading states', () => {
  it('should show the placeholder until the image has loaded', async () => {
    const wrapper = mount(HkImg, { props: { src: '/a.png' }, slots })

    expect(wrapper.find('.the-placeholder').exists()).toBe(true)

    await finishLoading(wrapper)

    expect(wrapper.find('.the-placeholder').exists()).toBe(false)
  })

  it('should emit load with the src when the image has loaded', async () => {
    const wrapper = mount(HkImg, { props: { src: '/a.png' } })

    await finishLoading(wrapper)

    expect(wrapper.emitted('load')).toEqual([['/a.png']])
  })

  it('should swap the image for the error slot and emit error when loading fails', async () => {
    const wrapper = mount(HkImg, { props: { src: '/broken.png' }, slots })

    await wrapper.find('img').trigger('error')

    expect(wrapper.find('picture').exists()).toBe(false)
    expect(wrapper.find('.the-error').exists()).toBe(true)
    expect(wrapper.find('.the-placeholder').exists()).toBe(false)
    expect(wrapper.emitted('error')).toEqual([['/broken.png']])
  })

  it('should start loading again when the src changes after a failure', async () => {
    const wrapper = mount(HkImg, { props: { src: '/broken.png' }, slots })
    await wrapper.find('img').trigger('error')

    await wrapper.setProps({ src: '/fixed.png' })

    expect(wrapper.find('img').attributes('src')).toBe('/fixed.png')
    expect(wrapper.find('.the-error').exists()).toBe(false)
    expect(wrapper.find('.the-placeholder').exists()).toBe(true)
  })

  it('should count an image that finished loading before hydration as loaded', async () => {
    stubImageState({ complete: true, naturalWidth: 400 })

    const wrapper = mount(HkImg, { props: { src: '/a.png' }, slots })
    await nextTick()

    expect(wrapper.find('.the-placeholder').exists()).toBe(false)
    expect(wrapper.emitted('load')).toEqual([['/a.png']])
  })

  it('should count an image that failed before hydration as failed', async () => {
    stubImageState({ complete: true, naturalWidth: 0 })

    const wrapper = mount(HkImg, { props: { src: '/a.png' }, slots })
    await nextTick()

    expect(wrapper.find('.the-error').exists()).toBe(true)
    expect(wrapper.emitted('error')).toEqual([['/a.png']])
  })

  it('should wait for the load event while the image is still downloading', () => {
    stubImageState({ complete: false, naturalWidth: 0 })

    const wrapper = mount(HkImg, { props: { src: '/a.png' }, slots })

    expect(wrapper.find('.the-placeholder').exists()).toBe(true)
    expect(wrapper.emitted('load')).toBeUndefined()
    expect(wrapper.emitted('error')).toBeUndefined()
  })
})

describe('HkImg layout', () => {
  it('should turn bare numbers into px and pass other sizes through', () => {
    const wrapper = mount(HkImg, {
      props: { src: '/a.png', width: 200, height: '50%', minWidth: '10', maxWidth: '100%', minHeight: 20, maxHeight: 'none' },
    })

    expect(wrapper.element.style).toMatchObject({
      width: '200px',
      height: '50%',
      minWidth: '10px',
      maxWidth: '100%',
      minHeight: '20px',
      maxHeight: 'none',
    })
  })

  it('should size the root with the aspectRatio prop', () => {
    const wrapper = mount(HkImg, { props: { src: '/a.png', aspectRatio: '16/9' } })

    expect(aspectRatioOf(wrapper)).toBe('16/9')
  })

  it('should size the root with the natural ratio once the image has loaded', async () => {
    const wrapper = mount(HkImg, { props: { src: '/a.png' } })

    expect(aspectRatioOf(wrapper)).toBe('')

    await finishLoading(wrapper, { width: 400, height: 200 })

    expect(aspectRatioOf(wrapper)).toBe('2')
  })

  it('should prefer the aspectRatio prop over the natural ratio', async () => {
    const wrapper = mount(HkImg, { props: { src: '/a.png', aspectRatio: 1.5 } })

    await finishLoading(wrapper, { width: 400, height: 200 })

    expect(aspectRatioOf(wrapper)).toBe('1.5')
  })

  it('should draw the gradient layer from the inner gradient string', () => {
    const wrapper = mount(HkImg, { props: { src: '/a.png', gradient: 'to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4)' } })

    expect(wrapper.find('.hk-img__gradient').attributes('style')).toContain('linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4))')
  })

  it('should not render a gradient layer without the gradient prop', () => {
    const wrapper = mount(HkImg, { props: { src: '/a.png' } })

    expect(wrapper.find('.hk-img__gradient').exists()).toBe(false)
  })

  it('should render the default slot as overlay content', () => {
    const wrapper = mount(HkImg, { props: { src: '/a.png' }, slots: { default: '<span class="overlay">Sold out</span>' } })

    expect(wrapper.find('.hk-img__content .overlay').text()).toBe('Sold out')
  })

  it('should land class and listeners on the root element', async () => {
    const onClick = vi.fn()
    const wrapper = mount(HkImg, { props: { src: '/a.png' }, attrs: { class: 'my-card-image', onClick } })

    await wrapper.trigger('click')

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['hk-img', 'my-card-image']))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
