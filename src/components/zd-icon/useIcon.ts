import { MaybeRef, computed, unref } from "vue"

// https://github.com/nuxt/nuxt/issues/14766
const assets = import.meta.glob('./icons/*.svg', {
  eager: true,
  import: 'default',
})
export function useIcon(path: MaybeRef<string>): any {
  const rawPath = unref(path)
  return computed(() => assets[`./icons/${rawPath}`])
}
