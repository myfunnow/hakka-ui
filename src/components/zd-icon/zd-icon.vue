<template>
  <div class="svg-icon flex items-center justify-center transition-opacity" :class="svgClass">
    <component :is="dynamicComponent" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useIcon } from './useIcon'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '',
  },
})

const svgClass = computed(() => ({
  [`text-${props.color}`]: !!props.color,
}))
const iconFileName = computed(() => `${props.name}.svg`)

const dynamicComponent = useIcon(iconFileName)
</script>
