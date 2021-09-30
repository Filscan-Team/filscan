<template>
  <div class="co-card">
    <div
      class="co-card__header"
      :class="{ 'no-padding-border': isPaddingBorderBottom }"
    >
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="co-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoCard",
  props: {
    isPaddingBorderBottom: {
      type: Boolean,
      default: false
    },
    header: {},
    bodyStyle: {},
    shadow: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.co-card {
  background-color: var(--content-bg-color);
  margin: 20px;
  .co-card__header {
    display: flex;
    flex-direction: row;
    padding: 16px;
    border-bottom: 1px solid var(--border-line);
    .header-left {
      height: 33px;
      border-left: 4px solid #0090ff;
      margin-right: 10px;
    }
    &.no-padding-border {
      padding: 16px 0;
      border-bottom: none;
    }
  }
}
</style>
