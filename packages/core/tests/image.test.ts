import { getWebpSrc } from '@/utils/image'

// NUXT_APP_CDN_URL sits under the host that serves funnow CDN images (fn: prefix)
const APP_CDN = 'https://cdn.myfunnow.com/eatigo-web/prod'
const production = { isDev: false, publicBase: APP_CDN }

describe('getWebpSrc', () => {
  it.each([
    { name: 'a root-relative public image', src: '/images/hero.png', environment: { isDev: false }, expected: '/images/hero.webp' },
    { name: 'a jpg', src: '/a.jpg', environment: production, expected: '/a.webp' },
    { name: 'a JPEG written in capitals', src: '/a.JPEG', environment: production, expected: '/a.webp' },
    {
      name: 'a public image served from the app CDN',
      src: `${APP_CDN}/images/hero.jpg`,
      environment: production,
      expected: `${APP_CDN}/images/hero.webp`,
    },
    {
      name: 'a built asset served from the app CDN',
      src: `${APP_CDN}/_nuxt/aftee-intro.9xeEkHE0.jpg`,
      environment: production,
      expected: `${APP_CDN}/_nuxt/aftee-intro.9xeEkHE0.webp`,
    },
    {
      name: 'an image under a public base written with a trailing slash',
      src: `${APP_CDN}/a.png`,
      environment: { isDev: false, publicBase: `${APP_CDN}/` },
      expected: `${APP_CDN}/a.webp`,
    },
  ])('should convert $name', ({ src, environment, expected }) => {
    const result = getWebpSrc(src, environment)

    expect(result).toBe(expected)
  })

  it.each([
    { name: 'an image elsewhere on the same CDN host', src: 'https://cdn.myfunnow.com/products/a.jpg', environment: production },
    {
      name: 'a CDN path that only starts like the public base',
      src: 'https://cdn.myfunnow.com/eatigo-web/prod-staging/a.png',
      environment: production,
    },
    { name: 'a remote image when no public base is known', src: 'https://example.com/a.png', environment: { isDev: false } },
    { name: 'a protocol-relative url', src: '//cdn.example.com/a.png', environment: { isDev: false, publicBase: '/' } },
    { name: 'anything in dev, because webp files only exist in a production build', src: '/images/hero.png', environment: { isDev: true } },
    { name: 'an svg', src: '/a.svg', environment: production },
    { name: 'a gif', src: '/a.gif', environment: production },
    { name: 'an image that is already webp', src: '/a.webp', environment: production },
    { name: 'a url with a query string', src: '/a.png?v=2', environment: production },
    { name: 'an empty src', src: '', environment: production },
  ])('should not convert $name', ({ src, environment }) => {
    const result = getWebpSrc(src, environment)

    expect(result).toBeUndefined()
  })
})
