import { mount, type VueWrapper } from '@vue/test-utils'
import { createSSRApp, nextTick } from 'vue'
import { renderToString } from 'vue/server-renderer'

import HkImg from '@/components/HkImg/HkImg.vue'

// IS_PRODUCTION is a constant fixed at import, so the getter lets a test turn it on
const env = vi.hoisted(() => ({ isProduction: false }))

vi.mock('@/utils/env', () => ({
  get IS_PRODUCTION() {
    return env.isProduction
  },
}))

const APP_CDN = 'https://cdn.myfunnow.com/eatigo-web/prod'

const stubProductionBuild = (publicBase = '/') => {
  env.isProduction = true
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
  env.isProduction = false
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

    expect(contained.find('img').classes()).toContain('object-contain')
    expect(covered.find('img').classes()).toContain('object-cover')
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

  it('should let a downstream utility class replace a default one on the root', () => {
    const wrapper = mount(HkImg, { props: { src: '/a.png' }, attrs: { class: 'overflow-visible max-w-none' } })

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['overflow-visible', 'max-w-none']))
    expect(wrapper.classes()).not.toContain('overflow-hidden')
    expect(wrapper.classes()).not.toContain('max-w-full')
  })

  it('should land class and listeners on the root element', async () => {
    const onClick = vi.fn()
    const wrapper = mount(HkImg, { props: { src: '/a.png' }, attrs: { class: 'my-card-image', onClick } })

    await wrapper.trigger('click')

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['hk-img', 'my-card-image']))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

describe('HkImg inherit-color', () => {
  const SVG = 'https://cdn.myfunnow.com/eatigo-web/prod/images/logo.svg'
  const findMask = (wrapper: VueWrapper) => wrapper.find('[aria-hidden="true"]')

  it('should paint the svg as a mask filled with the text color', () => {
    const wrapper = mount(HkImg, { props: { src: SVG, inheritColor: true } })

    const mask = findMask(wrapper)

    expect(mask.classes()).toContain('bg-current')
    expect(mask.attributes('style')).toContain(`--hk-img-mask: url("${SVG}")`)
  })

  it('should keep a hidden img that carries the alt text, the load events and the natural ratio', async () => {
    const wrapper = mount(HkImg, { props: { src: SVG, alt: 'Niceday Logo', inheritColor: true } })

    await finishLoading(wrapper, { width: 300, height: 100 })

    const img = wrapper.find('img')

    expect(img.attributes('alt')).toBe('Niceday Logo')
    expect(img.classes()).toContain('opacity-0')
    expect(img.attributes('crossorigin')).toBe('anonymous')
    expect(wrapper.emitted('load')).toEqual([[SVG]])
    expect(aspectRatioOf(wrapper)).toBe('3')
  })

  it('should hide the mask from assistive technology', () => {
    const wrapper = mount(HkImg, { props: { src: SVG, inheritColor: true } })

    expect(findMask(wrapper).attributes('aria-hidden')).toBe('true')
  })

  it.each([
    { name: 'contain by default, so no size is set', props: {}, hasSize: false },
    { name: 'cover with the cover prop', props: { cover: true }, hasSize: true },
  ])('should size the mask to $name', ({ props, hasSize }) => {
    const wrapper = mount(HkImg, { props: { src: SVG, inheritColor: true, ...props } })

    const style = findMask(wrapper).attributes('style')

    expect(style?.includes('--hk-img-mask-size: cover')).toBe(hasSize)
  })

  it('should use the same mask classes whatever the size', () => {
    const contained = mount(HkImg, { props: { src: SVG, inheritColor: true } })
    const covered = mount(HkImg, { props: { src: SVG, inheritColor: true, cover: true } })

    expect(findMask(covered).classes()).toEqual(findMask(contained).classes())
  })

  it('should pass the position to the mask', () => {
    const wrapper = mount(HkImg, { props: { src: SVG, inheritColor: true, position: 'top left' } })

    expect(findMask(wrapper).attributes('style')).toContain('--hk-img-mask-position: top left')
  })

  it('should let the text color class on the root reach the mask', () => {
    const wrapper = mount(HkImg, { props: { src: SVG, inheritColor: true }, attrs: { class: 'text-yellow-50' } })

    expect(wrapper.classes()).toContain('text-yellow-50')
  })

  it('should never offer a webp source, even in production', () => {
    stubProductionBuild()

    const wrapper = mount(HkImg, { props: { src: '/images/logo.png', inheritColor: true } })

    expect(wrapper.find('source').exists()).toBe(false)
  })

  it('should replace the mask with the error slot when the svg fails to load', async () => {
    const wrapper = mount(HkImg, { props: { src: SVG, inheritColor: true }, slots })

    await wrapper.find('img').trigger('error')

    expect(findMask(wrapper).exists()).toBe(false)
    expect(wrapper.find('.the-error').exists()).toBe(true)
    expect(wrapper.emitted('error')).toEqual([[SVG]])
  })

  it('should not add a mask layer without the inherit-color prop', () => {
    const wrapper = mount(HkImg, { props: { src: SVG } })

    expect(findMask(wrapper).exists()).toBe(false)
  })
})

describe('HkImg img attributes', () => {
  it.each([
    { name: 'fetchpriority', attrs: { fetchpriority: 'high' }, check: ['fetchpriority', 'high'] },
    { name: 'srcset', attrs: { srcset: '/a@2x.png 2x' }, check: ['srcset', '/a@2x.png 2x'] },
    { name: 'sizes', attrs: { sizes: '(min-width: 600px) 50vw, 100vw' }, check: ['sizes', '(min-width: 600px) 50vw, 100vw'] },
    { name: 'decoding', attrs: { decoding: 'async' }, check: ['decoding', 'async'] },
    { name: 'crossorigin', attrs: { crossorigin: 'use-credentials' }, check: ['crossorigin', 'use-credentials'] },
    { name: 'referrerpolicy', attrs: { referrerpolicy: 'no-referrer' }, check: ['referrerpolicy', 'no-referrer'] },
    { name: 'a camelCase fetchPriority', attrs: { fetchPriority: 'low' }, check: ['fetchpriority', 'low'] },
  ])('should hand $name to the img and keep it off the root', ({ attrs, check: [name, value] }) => {
    const wrapper = mount(HkImg, { props: { src: '/a.png' }, attrs })

    expect(wrapper.find('img').attributes(name)).toBe(value)
    expect(wrapper.attributes(name)).toBeUndefined()
  })

  it('should keep other attributes and listeners on the root', async () => {
    const onClick = vi.fn()
    const wrapper = mount(HkImg, { props: { src: '/a.png' }, attrs: { 'data-testid': 'cover', 'aria-label': 'cover', onClick } })

    await wrapper.trigger('click')

    expect(wrapper.attributes('data-testid')).toBe('cover')
    expect(wrapper.find('img').attributes('data-testid')).toBeUndefined()
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it.each([
    { name: 'lazy by default', props: {}, attrs: {}, expected: 'lazy' },
    { name: 'eager with the eager prop', props: { eager: true }, attrs: {}, expected: 'eager' },
    { name: 'the loading attribute over the eager prop', props: { eager: true }, attrs: { loading: 'lazy' }, expected: 'lazy' },
    { name: 'the loading attribute when it is eager', props: {}, attrs: { loading: 'eager' }, expected: 'eager' },
  ])('should load $name', ({ props, attrs, expected }) => {
    const wrapper = mount(HkImg, { props: { src: '/a.png', ...props }, attrs })

    expect(wrapper.find('img').attributes('loading')).toBe(expected)
  })

  it('should leave the webp source out when the img has a srcset, which a webp source would override', () => {
    stubProductionBuild()

    const withSrcset = mount(HkImg, { props: { src: '/images/hero.png' }, attrs: { srcset: '/images/hero@2x.png 2x' } })
    const withoutSrcset = mount(HkImg, { props: { src: '/images/hero.png' } })

    expect(withSrcset.find('source').exists()).toBe(false)
    expect(withoutSrcset.find('source').exists()).toBe(true)
  })

  it('should hand the attributes to the hidden img of a inherit-color svg but keep its CORS mode', () => {
    const wrapper = mount(HkImg, {
      props: { src: 'https://cdn.myfunnow.com/logo.svg', inheritColor: true },
      attrs: { fetchpriority: 'high', crossorigin: 'use-credentials' },
    })

    expect(wrapper.find('img').attributes('fetchpriority')).toBe('high')
    expect(wrapper.find('img').attributes('crossorigin')).toBe('anonymous')
  })
})

describe('HkImg aspect ratio classes', () => {
  it.each([
    { name: 'aspect-square', cls: 'aspect-square' },
    { name: 'a custom aspect-1.8', cls: 'w-full aspect-1.8 object-cover' },
    { name: 'a responsive md:aspect-video', cls: 'md:aspect-video' },
    { name: 'a variant group with aspect-unset', cls: 'w-full sm:(aspect-unset h-300px)' },
    { name: 'a class array', cls: ['w-full', 'aspect-1'] },
    { name: 'a class object', cls: { 'aspect-square': true, hidden: false } },
  ])('should leave the ratio to $name instead of writing the natural ratio inline', async ({ cls }) => {
    const wrapper = mount(HkImg, { props: { src: '/a.png' }, attrs: { class: cls } })

    await finishLoading(wrapper, { width: 400, height: 200 })

    expect(aspectRatioOf(wrapper)).toBe('')
  })

  it.each([
    { name: 'no class', cls: undefined },
    { name: 'classes about something else', cls: 'w-full h-auto rounded' },
    { name: 'a class that only contains the word', cls: 'no-aspect-here' },
  ])('should still use the natural ratio with $name', async ({ cls }) => {
    const wrapper = mount(HkImg, { props: { src: '/a.png' }, attrs: { class: cls } })

    await finishLoading(wrapper, { width: 400, height: 200 })

    expect(aspectRatioOf(wrapper)).toBe('2')
  })

  it('should let the aspectRatio prop win over an aspect class', () => {
    const wrapper = mount(HkImg, { props: { src: '/a.png', aspectRatio: 1.5 }, attrs: { class: 'aspect-square' } })

    expect(aspectRatioOf(wrapper)).toBe('1.5')
  })
})

describe('HkImg without a src', () => {
  it('should show the placeholder slot when there is no src', () => {
    const wrapper = mount(HkImg, { props: { src: '', aspectRatio: 1.8 }, slots })

    expect(wrapper.find('.the-placeholder').exists()).toBe(true)
    expect(wrapper.find('picture').exists()).toBe(false)
    expect(aspectRatioOf(wrapper)).toBe('1.8')
  })

  it('should show the error slot instead of the placeholder when the image fails', async () => {
    const wrapper = mount(HkImg, { props: { src: '/broken.png', aspectRatio: 1.8 }, slots })

    await wrapper.find('img').trigger('error')

    expect(wrapper.find('.the-error').exists()).toBe(true)
    expect(wrapper.find('.the-placeholder').exists()).toBe(false)
  })
})

describe('HkImg fallbackAspectRatio', () => {
  it('should size the box with the fallback ratio when there is no src', () => {
    const wrapper = mount(HkImg, { props: { src: '', fallbackAspectRatio: 1.8 } })

    expect(aspectRatioOf(wrapper)).toBe('1.8')
  })

  it('should size the box with the fallback ratio once the image fails', async () => {
    const wrapper = mount(HkImg, { props: { src: '/broken.png', fallbackAspectRatio: 1.8 } })

    expect(aspectRatioOf(wrapper)).toBe('')

    await wrapper.find('img').trigger('error')

    expect(aspectRatioOf(wrapper)).toBe('1.8')
  })

  it('should not use the fallback ratio for an image that is still loading or has loaded', async () => {
    const wrapper = mount(HkImg, { props: { src: '/a.png', fallbackAspectRatio: 1.8 } })

    expect(aspectRatioOf(wrapper)).toBe('')

    await finishLoading(wrapper, { width: 400, height: 200 })

    expect(aspectRatioOf(wrapper)).toBe('2')
  })

  it('should let the aspectRatio prop and an aspect class win over the fallback ratio', () => {
    const byProp = mount(HkImg, { props: { src: '', aspectRatio: 1, fallbackAspectRatio: 1.8 } })
    const byClass = mount(HkImg, { props: { src: '', fallbackAspectRatio: 1.8 }, attrs: { class: 'aspect-square' } })

    expect(aspectRatioOf(byProp)).toBe('1')
    expect(aspectRatioOf(byClass)).toBe('')
  })
})

describe('HkImg fadeIn', () => {
  const SVG = 'https://cdn.myfunnow.com/eatigo-web/prod/images/logo.svg'

  it('should keep the image transparent until it has loaded, then let the transition fade it in', async () => {
    const wrapper = mount(HkImg, { props: { src: '/a.png' } })
    await nextTick()

    expect(wrapper.find('img').classes()).toEqual(expect.arrayContaining(['transition-opacity', 'duration-300', 'opacity-0']))

    await finishLoading(wrapper)

    expect(wrapper.find('img').classes()).toEqual(expect.arrayContaining(['transition-opacity', 'duration-300']))
    expect(wrapper.find('img').classes()).not.toContain('opacity-0')
  })

  it('should add no fade classes when fadeIn is false', async () => {
    const wrapper = mount(HkImg, { props: { src: '/a.png', fadeIn: false } })
    await nextTick()

    expect(wrapper.find('img').classes()).not.toContain('transition-opacity')
    expect(wrapper.find('img').classes()).not.toContain('opacity-0')
  })

  it('should leave the image visible in server-rendered HTML', async () => {
    const html = await renderToString(createSSRApp(HkImg, { src: '/a.png' }))

    expect(html).not.toContain('opacity-0')
  })

  it('should not hide an image that had already loaded when it was mounted', async () => {
    stubImageState({ complete: true, naturalWidth: 400 })

    const wrapper = mount(HkImg, { props: { src: '/a.png' } })
    await nextTick()

    expect(wrapper.find('img').classes()).not.toContain('opacity-0')
  })

  it('should fade the next image in when the src changes', async () => {
    const wrapper = mount(HkImg, { props: { src: '/a.png' } })
    await finishLoading(wrapper)

    await wrapper.setProps({ src: '/b.png' })

    expect(wrapper.find('img').classes()).toContain('opacity-0')
  })

  it('should fade the mask layer of an inherit-color svg in, not the hidden img', async () => {
    const wrapper = mount(HkImg, { props: { src: SVG, inheritColor: true } })
    const mask = () => wrapper.find('[aria-hidden="true"]')
    await nextTick()

    expect(mask().classes()).toEqual(expect.arrayContaining(['transition-opacity', 'opacity-0']))

    await finishLoading(wrapper)

    expect(mask().classes()).toContain('transition-opacity')
    expect(mask().classes()).not.toContain('opacity-0')
  })
})
