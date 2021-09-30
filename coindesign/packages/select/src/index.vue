<template>
  <div class="pc-select pointer">
    <div class="selected flex align-center" :class="minwidth ? 'min-width' : ''" @click.stop="showList = !showList">
      <span>{{ selectedOption.label }}</span>
      <span class="iconfont " v-if="options.length > 1" :class="[showList ? 'icon-shang' : 'icon-down']"></span>
    </div>
    <div class="option-list bg-board" v-if="showList && options.length > 1" :class="minwidth ? 'min-width' : ''">
      <div v-for="option in optionList" :key="option.index" @click.stop="handleClick(option.index)">
        {{ option.label }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CoSelect',
  data() {
    return {
      showList: false
    }
  },
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    },
    index: {
      type: String,
      default: ''
    },
    minwidth: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    optionList() {
      return this.options.filter((option) => {
        return option.index !== this.index
      })
    },
    selectedOption() {
      const option = this.options.filter((option) => option.index == this.index)[0]
      return option || {}
    }
  },
  methods: {
    handleClick(index) {
      this.showList = false
      this.$emit('update:index', index)
      this.$emit('change', index)
    }
  },
  mounted() {
    document.addEventListener('click', () => {
      this.showList = false
    })
  }
}
</script>
<style lang="scss" scoped>
.min-width {
  min-width: 240px;
}
.pc-select {
  position: relative;
  height: 36px;
  line-height: 36px;
  padding: 0 20px;
  border: 1px solid var(--border-line);
  border-radius: 5px;
  .selected {
    color: var(--main-text-color);
    font-size: var(--font-16);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    span {
      font-size: var(--font-16);
      color: var(--text-gray-color);
      padding-right: 2px;
    }
  }
  .option-list {
    background: var(--content-bg-color);
    z-index: 10;
    position: absolute;
    padding: 10px 20px;
    text-align: left;
    top: 38px;
    left: -1px;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0px 2px 4px 0px var(--border-line);
    & > div {
      font-size: 13PX;
      &:hover {
        color: var(--force-mark-color);
      }
    }
  }
}
</style>
