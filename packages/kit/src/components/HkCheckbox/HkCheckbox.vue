<template>
  <n-checkbox ref="checkboxRef" v-model:checked="checked" class="hk-checkbox">
    <slot></slot>
  </n-checkbox>
</template>

<script lang="ts" setup>
import { NCheckbox } from 'naive-ui'
import { useModel, useTemplateRef } from 'vue'

import type { HkCheckboxEmits, HkCheckboxProps, HkCheckboxSlots } from './types'

const props = defineProps<HkCheckboxProps>()

defineEmits<HkCheckboxEmits>()

defineSlots<HkCheckboxSlots>()

const checked = useModel(props, 'checked')
const checkboxRef = useTemplateRef<InstanceType<typeof NCheckbox>>('checkboxRef')

const focus = () => checkboxRef.value?.focus()
const blur = () => checkboxRef.value?.blur()

defineExpose({ focus, blur })
</script>
