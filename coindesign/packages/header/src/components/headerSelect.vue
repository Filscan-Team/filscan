<template>
  <div class="pc-select pointer">
    <div class="selected flex align-center" @click.stop="navClick">
      <span>{{ selectedOption.label }}</span>
      <span
        class="iconfont "
        v-if="options.length > 1"
        :class="[showList ? 'icon-shang' : 'icon-down']"
      ></span>
    </div>
    <div class="option-list bg-board" v-if="showList && options.length > 1">
      <div
        v-for="option in optionList"
        :key="option.index"
        @click.stop="handleClick(option.index)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HeaderSelect",
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
      default: ""
    }
  },
  created(){
    this.$bus.$on('centerFlag', (v)=>{
      this.showList = v
    })
    this.$bus.$on('netFlag', (v)=>{
      this.showList = v
    })
    this.$bus.$on('langFlag', (v)=>{
      this.showList = v
    })
  },
  computed: {
    optionList() {
      return this.options.filter(option => {
        return option.index !== this.index
      })
    },
    selectedOption() {
      const option = this.options.filter(
        option => option.index == this.index
      )[0]
      return option || {}
    }
  },
  methods: {
    navClick(){
      this.$bus.$emit('langFlag', false)
      this.$bus.$emit('netFlag', false)
      this.showList = !this.showList
    },
    handleClick(index) {
      this.showList = false
      this.$emit("update:index", index)
      this.$emit("change", index)
    }
  },
  mounted() {
    document.addEventListener("click", () => {
      this.showList = false
    })
  }
}
</script>
<style lang="scss" scoped>
.pc-select {
  position: relative;
  height: 36px;
  line-height: 36px;
  margin-right: 10px;
  color: var(--main-text-color);
  font-size: var(--font-16);
  .selected {
    font-size: var(--font-16);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    span {
      font-size: var(--font-16);
      color: #ffffff;
      padding-left: 10px;
    }
  }
  .option-list {
    z-index: 10;
    position: absolute;
    width: 100%;
    padding: 0 20px;
    text-align: left;
    top: 38px;
    left: -1px;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.03);
    & > div {
      &:hover {
        color: var(--force-mark-color);
      }
    }
  }
}
</style>
