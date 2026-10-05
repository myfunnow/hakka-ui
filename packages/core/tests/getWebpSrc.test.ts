import { getWebpSrc } from '@/utils/getWebpSrc'

// NUXT_APP_CDN_URL sits under the host that serves funnow CDN images (fn: prefix)
const APP_CDN = 'https://cdn.myfunnow.com/eatigo-web/prod'
const production = { isDev: false, publicBase: APP_CDN }

describe('getWebpSrc', () => {
  it('should convert a root-relative public image', () => {
    expect(getWebpSrc('/images/hero.png', { isDev: false })).toBe('/images/hero.webp')
  })

  it('should convert jpg and jpeg whatever their case', () => {
    expect(getWebpSrc('/a.jpg', production)).toBe('/a.webp')
    expect(getWebpSrc('/a.JPEG', production)).toBe('/a.webp')
  })

  it('should convert a public image served from the app CDN', () => {
    expect(getWebpSrc(`${APP_CDN}/images/hero.jpg`, production)).toBe(`${APP_CDN}/images/hero.webp`)
  })

  it('should convert a built asset served from the app CDN', () => {
    expect(getWebpSrc(`${APP_CDN}/_nuxt/aftee-intro.9xeEkHE0.jpg`, production)).toBe(`${APP_CDN}/_nuxt/aftee-intro.9xeEkHE0.webp`)
  })

  it('should accept a public base written with a trailing slash', () => {
    expect(getWebpSrc(`${APP_CDN}/a.png`, { isDev: false, publicBase: `${APP_CDN}/` })).toBe(`${APP_CDN}/a.webp`)
  })

  it('should not convert an image elsewhere on the same CDN host', () => {
    expect(getWebpSrc('https://cdn.myfunnow.com/products/a.jpg', production)).toBeUndefined()
  })

  it('should not convert a CDN path that only starts like the public base', () => {
    expect(getWebpSrc('https://cdn.myfunnow.com/eatigo-web/prod-staging/a.png', production)).toBeUndefined()
  })

  it('should not convert a remote image when no public base is known', () => {
    expect(getWebpSrc('https://example.com/a.png', { isDev: false })).toBeUndefined()
  })

  it('should not convert a protocol-relative url', () => {
    expect(getWebpSrc('//cdn.example.com/a.png', { isDev: false, publicBase: '/' })).toBeUndefined()
  })

  it('should not convert anything in dev because webp files only exist in a production build', () => {
    expect(getWebpSrc('/images/hero.png', { isDev: true })).toBeUndefined()
  })

  it('should not convert files that are not png or jpeg', () => {
    expect(getWebpSrc('/a.svg', production)).toBeUndefined()
    expect(getWebpSrc('/a.gif', production)).toBeUndefined()
    expect(getWebpSrc('/a.webp', production)).toBeUndefined()
  })

  it('should not convert a url with a query string', () => {
    expect(getWebpSrc('/a.png?v=2', production)).toBeUndefined()
  })

  it('should return undefined when there is no src', () => {
    expect(getWebpSrc('', production)).toBeUndefined()
  })
})
