<template>
  <div class="hk-{{kebabCase name}}"></div>
</template>

<script setup lang="ts">
import type { Hk{{pascalCase name}}Props } from './types'

defineProps<Hk{{pascalCase name}}Props>()
</script>

<style scoped>
.hk-{{kebabCase name}} {
}
</style>
