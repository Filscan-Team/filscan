<template>
  <div class="co-tab flex align-center" :class="type">
    <div
      :class="{
        active: activeIndex == index
      }"
      @click="handleClick(index)"
      v-for="(label, index) in labels"
      :key="label"
    >
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CoTab",
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
      default: "switch-button"
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
  height: 40px;
  border: none;
  display: inline-flex;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 7px;
  flex-direction: row;
  border: 1px solid var(--border-line);
  div {
    height: 20px;
    display: flex;
    align-items: center;
    padding: 2px 20px;
    font-size: var(--font-16);
    &:not(:first-child) {
      margin-left: 2px;
    }

    &:not(:last-child) {
      border-right: 1px solid var(--border-line);
    }

    &.active {
      font-size: var(--font-16);
      font-weight: 400;
      color: var(--force-mark-color);
      &::after {
        width: 100%;
      }
    }
    &:hover {
      cursor: pointer;
    }
  }
}
.danger-button {
  height: 34px;
  display: inline-flex;
  align-items: flex-start;
  box-sizing: border-box;
  flex-direction: row;
  padding: 7px 20px;
  border: 1px solid var(--border-line);
  div {
    height: 20px;
    display: flex;
    align-items: center;
    font-size: var(--font-16);
    padding: 10px 20px;
    border-right: 1px solid var(--border-line);
    border-radius: 4px;
    &:not(:first-child) {
      margin-left: 20px;
    }

    &.active {
      font-size: var(--font-16);
      font-weight: 400;
      color: #ffffff;
      background-color: var(--force-mark-color);
      &::after {
        width: 100%;
      }
    }
  }
}

.calculator-button {
  display: inline-flex;
  align-items: flex-start;
  box-sizing: border-box;
  flex-direction: row;
  border: 1px solid var(--force-mark-color);
  height: 34px;
  border-radius: 18px;
  padding: 5px 20px;
  color: var(--main-text-color);
  div {
    height: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 20px;
    font-size: var(--font-16);
    &:not(:first-child) {
      margin-left: 2px;
    }

    &:not(:last-child) {
      border-right: 1px solid var(--border-line);
    }

    &.active {
      font-size: var(--font-16);
      font-weight: 400;
      color: var(--force-mark-color);
      &::after {
        width: 100%;
      }
    }
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
