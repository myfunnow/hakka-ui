<template>
  <div class="svg-icon" :class="{ [`icon-${props.name}`]: !props.svgComponent }" role="img">
    <component :is="svgComponent" :width="size ?? width" :height="size ?? height" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { iconMap } from './iconMap'
import type { HkIconProps } from './types'

const props = withDefaults(defineProps<HkIconProps>(), { width: '100%', height: '100%' })

const svgComponent = computed(() => props.svgComponent ?? iconMap[props.name])
</script>
