<template>
  <n-checkbox ref="checkboxRef" v-model:checked="checked" class="hk-checkbox">
    <slot></slot>
  </n-checkbox>
</template>

<script lang="ts" setup>
import { NCheckbox } from 'naive-ui'
import { useTemplateRef } from 'vue'

/** Whether the box is ticked. Use it as v-model:checked. */
const checked = defineModel<boolean>('checked', { default: false })
const checkboxRef = useTemplateRef<InstanceType<typeof NCheckbox>>('checkboxRef')

const focus = () => checkboxRef.value?.focus()
const blur = () => checkboxRef.value?.blur()

defineExpose({ focus, blur })
</script>
