<template>
  <div class="zd-pagination flex flex-col justify-center">
    <slot name="text">
      <p class="text mb-0 text-center text-sm text-gray-80">
        {{ `第 ${startIndex} - ${endIndex}，共 ${totalCount} 筆結果` }}
      </p>
    </slot>
    <n-pagination
      v-model:page="pageIndex"
      class="flex justify-center leading-20px mt-5"
      :page-slot="props.visible || 1"
      :page-size="props.pageSize || 1"
      :item-count="props.totalCount || 1"
      v-bind="$attrs"
    >
      <template #prev>
        <zd-icon name="arrow-left" class="w-4 h-4" />
      </template>
      <template #next>
        <zd-icon name="arrow-right" class="w-4 h-4" />
      </template>
    </n-pagination>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { NPagination } from 'naive-ui'
import ZdIcon from '@/components/zd-icon/zd-icon.vue'

const pageIndex = defineModel<number>('page', { default: 1 })

const props = withDefaults(
  defineProps<{
    visible?: number
    totalCount?: number
    pageSize?: number
  }>(),
  {
    visible: 7,
    totalCount: 200,
    pageSize: 10,
  }
)

const startIndex = computed(() => (pageIndex.value - 1) * props.pageSize + 1)

const endIndex = computed(() => {
  const endIndex = pageIndex.value * props.pageSize
  return endIndex > props.totalCount ? props.totalCount : endIndex
})
</script>

<style lang="scss" scoped>
.nd-pagination {
  :deep(.n-pagination) {
    .n-pagination-item {
      .svg-icon {
        @apply text-black-50 transition-colors;
      }
      &:hover {
        .svg-icon {
          @apply text-white;
        }
      }
      &.n-pagination-item--disabled {
        .svg-icon {
          @apply text-gray-60;
        }
      }
    }
  }
}
</style>
