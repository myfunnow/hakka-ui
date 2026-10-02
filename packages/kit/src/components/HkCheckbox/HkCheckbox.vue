<template>
  <n-checkbox ref="checkboxRef" v-model:checked="checked" class="hk-checkbox">
    <slot></slot>
  </n-checkbox>
</template>

<script lang="ts" setup>
import { NCheckbox } from 'naive-ui'
import { useTemplateRef } from 'vue'

const checked = defineModel<boolean>('checked', { default: false })
const checkboxRef = useTemplateRef<InstanceType<typeof NCheckbox>>('checkboxRef')

const focus = () => checkboxRef.value?.focus()
const blur = () => checkboxRef.value?.blur()

defineExpose({ focus, blur })
</script>
