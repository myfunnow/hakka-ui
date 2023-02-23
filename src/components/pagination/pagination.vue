<template>
  <div class="pagination-box">
    <slot name="text">
      <p class="pagination-box__text mb-0">
        {{ `第 ${startIndex} - ${endIndex}，共 ${endIndex} 筆結果` }}
      </p>
    </slot>
    <v-pagination
      v-model="pageIndex"
      class="pagination-box__bar"
      :length="pageCount"
      :total-visible="visible"
      :size="size"
      @input="updatePage"
      v-bind="$attrs"
    />
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    count: { type: Number, default: 0 },
    visible: { type: Number, default: 5 },
    size: { type: Number, default: 20 },
    totalCount: { type: Number, default: 200 },
    page: { type: Number, default: 1 },
    size: { type: Number, default: 24 },
  },
  data() {
    return {
      pageIndex: this.page,
    }
  },
  computed: {
    pageCount() {
      return this.count ? this.count : Math.ceil(this.totalCount / this.size)
    },
    startIndex() {
      return this.getStartIndex(this.pageIndex)
    },
    endIndex() {
      return this.getEndIndex(this.pageIndex)
    },
  },
  watch: {
    page(newPage) {
      this.pageIndex = newPage
    },
  },
  methods: {
    getStartIndex(page) {
      return (page - 1) * this.size + 1
    },
    getEndIndex(page) {
      const endIndex = page * this.size
      return endIndex > this.totalCount ? this.totalCount : endIndex
    },
    updatePage(page) {
      this.$emit('update', page)
    },
  },
}
</script>
<style lang="scss" scoped>
.pagination-box {
  margin: auto;
  display: flex;
  flex-flow: column;

  &__text {
    text-align: center;
    font-size: 13px;
  }
  &__bar {
    margin-top: 20px;
  }
}
</style>
