// @vitest-environment node
// Reads files from disk; DOM test environments give import.meta.url an http scheme
import { readdirSync, readFileSync } from 'node:fs'
import { createGenerator, presetWind } from 'unocss'

// funnow.web.nuxt loads Vuetify's full stylesheet (the same version as the devDependency), and Vuetify defines
// utility classes of its own. A hakka class with the same name also gets Vuetify's declarations and its !important.
// That broke `bg-transparent` (Vuetify adds color: currentColor) and `border-0` (Vuetify adds a border style and color).
// These names exist in both with the same value. Compare the declarations before adding one. Vuetify writes lengths in px
// and UnoCSS in rem, which are equal because the root font size is 16px (funnow.web.nuxt sets it, the others keep the default).
// Vuetify also writes them with !important: another hakka class for the same property (a state variant such as
// `disabled:cursor-not-allowed`) cannot override them, so such a property needs a unique name (`enabled:cursor-pointer`).
const SAME_DECLARATIONS = ['justify-center', 'mb-0', 'mt-5', 'mx-0', 'overflow-hidden', 'px-1', 'py-0', 'rounded', 'text-center']

const srcDir = new URL('../src/', import.meta.url)
const vuetifyCss = readFileSync(new URL('../node_modules/vuetify/dist/vuetify.min.css', import.meta.url), 'utf8')

// Every word in a string of a component that UnoCSS turns into a rule
async function readUtilityTokens() {
  const words = new Set<string>()

  for (const file of readdirSync(srcDir, { recursive: true, encoding: 'utf8' }).filter(name => name.endsWith('.vue'))) {
    // Comments mention class names too, only strings in the code count
    const source = readFileSync(new URL(file, srcDir), 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*\/\/.*$/gm, '')

    for (const [, quoted] of source.matchAll(/(["'`])((?:(?!\1)[^\\\n]|\\.)*)\1/g).map(match => [match[0], match[2]])) {
      quoted.split(/\s+/).forEach(word => word && words.add(word))
    }
  }
  const uno = await createGenerator({ presets: [presetWind()] })
  const { matched } = await uno.generate([...words].join(' '), { preflights: false })

  return [...matched]
}

// Bare class selectors such as `.overflow-hidden{` or `.top-0,`
function readVuetifyClassNames() {
  return new Set([...vuetifyCss.matchAll(/\.((?:[A-Za-z0-9_-]|\\.)+)(?=[,{])/g)].map(match => match[1].replace(/\\(.)/g, '$1')))
}

describe('utility classes next to Vuetify', () => {
  it('should not reuse a Vuetify class name unless the declarations are the same', async () => {
    const vuetifyClasses = readVuetifyClassNames()
    const tokens = await readUtilityTokens()

    const collisions = tokens.filter(token => vuetifyClasses.has(token) && !SAME_DECLARATIONS.includes(token))

    expect(tokens.length).toBeGreaterThan(40)
    expect(collisions).toEqual([])
  })

  it('should only allow names that a component still uses', async () => {
    const tokens = await readUtilityTokens()

    const unused = SAME_DECLARATIONS.filter(name => !tokens.includes(name))

    expect(unused).toEqual([])
  })

  it('should know the Vuetify classes it compares against', () => {
    const vuetifyClasses = readVuetifyClassNames()

    expect(vuetifyClasses.has('bg-transparent')).toBe(true)
    expect(vuetifyClasses.has('border-0')).toBe(true)
  })
})
