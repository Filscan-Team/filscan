<template>
  <div class="time-selector" :class="{ border: border }">
    <slot name="left" class="left"></slot>
    <cm-select
        :options="options"
        :index.sync="time"
        v-if="drop"
    />
    <div class="time-con" v-else>
      <span
          v-for="(item, index) in times"
          :key="item.key"
          :class="{
          active: currentIndex === index,
          'bottom-stripe': currentIndex === index
        }"
          @click="handleTabClick(item, index)"
      >{{ $t("component.times")[item] }}</span
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "CmTimeSelect",
  data() {
    return {
      currentIndex: 0,
    }
  },
  props: {
    time: {
      type:  String,
      default: '24h'
    },
    activeIndex: {
      type: Number,
      default: 0
    },
    border: {
      type: Boolean,
      default: false
    },
    times: {
      type: Array,
      default() {
        return ["24h", "1m"]
      }
    },
    drop: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleTabClick(v, index) {
      this.currentIndex = index
      this.$emit("update:activeIndex", index)
      this.$emit("time-select", this.getTimeFromSelector(v))
    }
  },
  mounted() {
    this.currentIndex = this.activeIndex
  },
  computed: {
    options() {
      return this.times.map(item => {
        const timeLabelMap = this.$t("component.times")
        return {
          label: timeLabelMap[item],
          index: item
        }
      })
    }
  },
  watch: {
    time(v) {
      this.$emit("time-select", this.getTimeFromSelector(v))
    }
  }
}
</script>
<style lang="scss" scoped>
.time-selector {
  display: flex;
  height: 68px;
  border-radius: 8px;
  align-items: center;

  &.border {
    border-bottom: 1px dashed var(--border-color);
  }

  .time-con {
    display: flex;
    margin-left: auto;
    height: 25px;
    align-items: center;
    margin-right: 20px;
    font-size: 14px;

    span {
      font-size: 20px;
      width: auto;
      margin-left: 30px;
      height: 30px;
      line-height: 30px;

      &.active {
        font-size: 24px;

        &::after {
          width: 100%;
          height: 2px;
          bottom: -4px;
        }
      }
    }
  }
}
</style>
