<template>
  <div class="cm-tab flex align-center" :class="type">
    <div
        :class="{
                active: activeIndex == index,
                'bottom-stripe': activeIndex == index && type==='switch-button'
              }"
        @click="handleClick(index)"
        v-for="(label, index) in labels"
        :key="label"
    >
      <div class="content"> {{ label }}</div>
      <div class="divider-line" v-if="activeIndex == index && type==='switch-button'"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CmTab",
  data() {
    return {
      activeIndex: 0
    }
  },
  props: {
    labels: {
      type: Array,
      default() {
        return []
      }
    },
    initIndex: Number,
    type: {
      type: String,
      default: 'switch-button'
    }
  },
  methods: {
    handleClick(index) {
      this.activeIndex = index
      this.$emit("click", index)
    }
  },
  watch: {
    initIndex: {
      handler(v) {
        this.activeIndex = Number(v || 0)
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>

.switch-button {
  width: 100%;
  height: 72px;
  border: none;
  display: inline-flex;
  align-items: flex-start;
  box-sizing: border-box;
  flex-direction: row;
  border-bottom: 1px solid var(--border-line);
  padding: 0 20px;
  overflow-x: scroll;
  div {
    display: flex;
    align-items: stretch;
    flex-direction: column;
    padding: 0;
    justify-content: space-around;
    font-size: 24px;
    font-weight: 500;

    &:not(:first-child) {
      margin-left: 30px;
    }

    .content {
      height: 69px;
    }

    .divider-line {
      background: var(--force-mark-color);
      height: 2px;
      margin-left: 0 !important;
    }

    &:not(:last-child) {
      border-right: none;
    }

    &.active {
      font-size: 24px;
      font-weight: 400;
      color: var(--force-mark-color);
      border: none;

      &::after {
        width: 100%;
        bottom: -24px;
      }
    }
  }
}

.danger-button {
  width: 100%;
  height: 72px;
  display: inline-flex;
  align-items: flex-start;
  box-sizing: border-box;
  flex-direction: row;
  padding: 0 20px;

  & > div {
    height: 26px;
    display: flex;
    align-items: center;
    font-size: 24px;
    padding: 10px 20px;
    border: 1px solid var(--border-line);
    border-radius: 4px;

    &:not(:first-child) {
      margin-left: 20px;
    }

    &.active {
      font-size: 24px;
      font-weight: 400;
      color: #ffffff;
      border: 1px solid var(--force-mark-color);
      background-color: var(--force-mark-color);

      &::after {
        width: 100%;
        bottom: -24px;
      }
    }
  }
}
</style>