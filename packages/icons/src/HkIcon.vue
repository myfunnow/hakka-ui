<template>
  <div v-bind="restAttrs" :class="rootClass" :role="isLabelled ? 'img' : undefined" :aria-hidden="isLabelled ? undefined : 'true'">
    <component :is="svgComponent" :width="size ?? width" :height="size ?? height" />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@myfunnow/hakka-shared'
import { computed, useAttrs } from 'vue'

import { iconMap } from './iconMap'
import type { HkIconProps } from './types'

// `svg-icon` and `icon-${name}` are hooks for the parent's styles and for finding the icon name in DevTools.
const ROOT_CLASS = 'svg-icon flex-none flex items-center justify-center'

// The caller's class is merged in, so a conflicting utility replaces the default (`inline-block` replaces `flex`).
// That does not depend on the order of rules in the generated CSS.
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<HkIconProps>(), { width: '100%', height: '100%' })

const attrs = useAttrs()

const svgComponent = computed(() => props.svgComponent ?? iconMap[props.name])

// A custom svgComponent is not the named icon, so the name class would point DevTools at the wrong icon.
const nameClass = computed(() => (props.svgComponent ? '' : `icon-${props.name}`))

// An icon with an accessible name is meaningful (role="img"). Without one it is decorative, so hide it from screen readers.
const isLabelled = computed(() => !!(attrs['aria-label'] || attrs['aria-labelledby']))

const rootClass = computed(() => cn(ROOT_CLASS, nameClass.value, attrs.class))

// Class is merged into rootClass; binding it again through v-bind would join both and keep the replaced default.
const restAttrs = computed(() => {
  const { class: _class, ...rest } = attrs

  return rest
})
</script>
