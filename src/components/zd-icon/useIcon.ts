import { MaybeRef, computed, unref } from "vue"

// https://github.com/nuxt/nuxt/issues/14766
const relativePath = '../../assets/images/icons'
const assets = import.meta.glob('../../assets/images/icons/*.svg', {
  eager: true,
  import: 'default',
})
export function useIcon(path: MaybeRef<string>): any {
  return computed(() => assets[`${relativePath}/${unref(path)}`])
}
