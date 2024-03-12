import { type MaybeRef, computed, unref } from "vue"

// https://github.com/nuxt/nuxt/issues/14766
const assets = import.meta.glob('@/assets/images/icons/*.svg', {
  eager: true,
  import: 'default',
})
export function useIcon(path: MaybeRef<string>): any {
  return computed(() => assets[`/src/assets/images/icons/${unref(path)}`])
}
