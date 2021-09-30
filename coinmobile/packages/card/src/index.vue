<template>
  <div class="cm-card">
    <div class="cm-card__header" v-if="$slots.header || header">
      <div class="header-left" v-if="borderLeft"></div>
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="msg-divider-line"></div>
    <div class="cm-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CmCard",
  props: {
    header: {},
    borderLeft: {
      type: Boolean,
      default: true
    },
    bodyStyle: {},
    shadow: {
      type: String
    }
  }
}
</script>
<style lang="scss">
.cm-card {
  background-color: #ffffff;
  margin: 20px;
  border: 1px solid var(--border-line);

  .cm-card__header {
    height: 70px;
    display: flex;
    flex-direction: row;
    padding: 0px 10px 0px 20px;
    //border-bottom: 1px solid var(--border-line);
    box-sizing: border-box;
    font-size: 24px;
    //font-weight: 500;
    align-items: center;

    .header-left {
      height: 33px;
      border-left: 4px solid #0090ff;
      margin-right: 10px;
    }
    .clearfix{
      flex: 1;
      display: flex;
      justify-content: space-between;
      padding-right: 15px;
    }
    .title {
      height: 42px;
      display: flex;
      align-items: center;
      .heading {
        height: 33px;
        line-height: 33px;
        font-size: 26px;
      }
    }
  }

  .msg-divider-line {
    background: var(--border-line);
    height: 1px;
    //margin: 0px -20px;

  }

  .cm-card__body {
  }
}
</style>
