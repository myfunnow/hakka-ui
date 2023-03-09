<template>
  <div class="zd-pagination">
    <slot name="text">
      <p class="text mb-0">
        {{ `第 ${startIndex} - ${endIndex}，共 ${totalCount} 筆結果` }}
      </p>
    </slot>
    <v-pagination
      v-model="pageIndex"
      class="actions"
      :length="pageCount"
      :total-visible="visible"
      :size="size"
      v-bind="$attrs"
    />
  </div>
</template>
<script>
export default {
  name: 'zd-pagination',
  props: {
    count: { type: Number, default: 0 },
    visible: { type: Number, default: 5 },
    totalCount: { type: Number, default: 200 },
    page: { type: Number, default: 1 },
    pageSize: { type: Number, default: 20 },
    size: { type: Number, default: 24 },
  },
  data() {
    return {
      pageIndex: this.page,
    }
  },
  computed: {
    pageCount() {
      return this.count ? this.count : Math.ceil(this.totalCount / this.pageSize)
    },
    startIndex() {
      return (this.pageIndex - 1) * this.pageSize + 1
    },
    endIndex() {
      const endIndex = this.pageIndex * this.pageSize
      return endIndex > this.totalCount ? this.totalCount : endIndex
    },
  },
  methods: {
    updatePage(page) {
      this.$emit('update', page)
    },
  },
  watch: {
    page(newPage) {
      this.pageIndex = newPage
    },
  },
}
</script>
<style lang="scss" scoped>
.zd-pagination {
  margin: auto;
  display: flex;
  flex-flow: column;

  > .text {
    text-align: center;
    font-size: 13px;
  }
  > .actions {
    margin-top: 20px;
  }

  :deep(.v-pagination) {
    .v-pagination__navigation {
      background: unset;
      box-shadow: unset;

      &:focus {
        outline: 0;
      }
    }
    .v-pagination__item {
      background: unset;
      box-shadow: unset;
      position: relative;

      &:before {
        border-radius: inherit;
        bottom: 0;
        color: inherit;
        content: '';
        left: 0;
        opacity: 0;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
        transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
        background-color: currentColor;
      }
      &:hover::before {
        opacity: 0.04;
      }

      &:focus {
        outline: 0;
      }
    }
  }
}
</style>
