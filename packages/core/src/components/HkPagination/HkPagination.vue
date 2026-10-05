<template>
  <nav class="hk-pagination" :aria-label="labels.nav">
    <slot name="text" :start="startIndex" :end="endIndex" :total="props.totalCount">
      <p class="hk-pagination__summary">{{ `第 ${startIndex} - ${endIndex}，共 ${props.totalCount} 筆結果` }}</p>
    </slot>
    <ul class="hk-pagination__list">
      <li>
        <button type="button" class="hk-pagination__item" :aria-label="labels.prev" :disabled="currentPage <= 1" @click="goTo(currentPage - 1)">
          <hk-icon name="arrow-left" size="16" />
        </button>
      </li>
      <li v-for="item in items" :key="item.type === 'page' ? item.page : item.key">
        <button
          v-if="item.type === 'page'"
          type="button"
          class="hk-pagination__item"
          :aria-current="item.page === currentPage ? 'page' : undefined"
          @click="goTo(item.page)"
        >
          {{ item.page }}
        </button>
        <span v-else class="hk-pagination__ellipsis" aria-hidden="true">…</span>
      </li>
      <li>
        <button
          type="button"
          class="hk-pagination__item"
          :aria-label="labels.next"
          :disabled="currentPage >= pageCount"
          @click="goTo(currentPage + 1)"
        >
          <hk-icon name="arrow-right" size="16" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { HkIcon } from '@myfunnow/hakka-icons'

import { getPageItems } from '@/utils/pagination'

interface HkPaginationProps {
  totalCount: number
  pageSize?: number
  visible?: number
  ariaLabels?: { nav?: string; prev?: string; next?: string }
}

const page = defineModel<number>('page', { default: 1 })

const props = withDefaults(defineProps<HkPaginationProps>(), { pageSize: 10, visible: 7, ariaLabels: () => ({}) })

const labels = computed(() => ({ nav: '分頁', prev: '上一頁', next: '下一頁', ...props.ariaLabels }))
const pageCount = computed(() => Math.max(Math.ceil(props.totalCount / props.pageSize), 1))
const currentPage = computed(() => Math.min(Math.max(page.value, 1), pageCount.value))
const items = computed(() => getPageItems({ page: currentPage.value, pageCount: pageCount.value, pageSlot: props.visible }))
const startIndex = computed(() => (props.totalCount === 0 ? 0 : (currentPage.value - 1) * props.pageSize + 1))
const endIndex = computed(() => Math.min(currentPage.value * props.pageSize, props.totalCount))

function goTo(target: number) {
  if (target < 1 || target > pageCount.value || target === currentPage.value) {
    return
  }

  page.value = target
}
</script>

<style scoped>
.hk-pagination__summary {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: var(--hk-color-text-helper);
}

.hk-pagination__list {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.hk-pagination__item,
.hk-pagination__ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  font-size: 14px;
  line-height: 20px;
  color: var(--hk-color-text-default);
}

.hk-pagination__item {
  padding: 0 4px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.hk-pagination__item:hover:not(:disabled) {
  background: var(--hk-color-primary-hover);
  color: var(--hk-color-on-color);
}

.hk-pagination__item:active:not(:disabled) {
  background: var(--hk-color-primary-pressed);
  color: var(--hk-color-on-color);
}

.hk-pagination__item[aria-current='page'] {
  background: var(--hk-color-primary);
  color: var(--hk-color-on-color);
}

.hk-pagination__item:disabled {
  color: var(--hk-color-text-disabled);
  cursor: not-allowed;
}

.hk-pagination__item:focus-visible {
  /* Without the fallback an undefined variable drops the ring entirely when no brand CSS is loaded */
  outline: 2px solid var(--hk-color-primary, currentColor);
  outline-offset: 2px;
}
</style>
