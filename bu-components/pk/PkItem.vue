<template>
  <div class="pk-item bottom-20 bg-item radius">
    <div v-if="title" class="title">{{ title }}</div>
    <div class="rows-con">
      <div v-for="row in rows" :key="row.label" class="row flex align-center">
        <div
          class="label"
          :class="{ border: Object.keys(dataSource).length > 0 }"
        >
          {{ row.label }}
        </div>
        <div
          v-for="(data, index) in dataSource[row.key]"
          :key="index"
          class="column"
          :class="{ max: getMaxIndex(dataSource[row.key]) == index }"
        >
          <span>
            {{ formatters[row.key] ? formatters[row.key](data) : data }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PkItem",
  data() {
    return {}
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    rows: {
      type: Array,
      default() {
        return []
      }
    },
    dataSource: {
      type: Object,
      default() {
        return {}
      }
    },
    formatters: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    getMaxIndex(arr) {
      if (parseFloat(arr[0]) == arr[0]) {
        return arr.indexOf(String(Math.max(...arr)))
      } else {
        return -1
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.pk-item {
  .title {
    height: 65px;
    line-height: 65px;
    padding-left: 20px;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 1px solid var(--border-color);
  }
  .row {
    height: 60px;
    line-height: 60px;
    padding-left: 60px;
    font-size: 16px;
    border-bottom: 1px dashed var(--border-color);
    &:last-child {
      border-bottom: none;
    }
    .label {
      min-width: 365px;
      &.border {
        border-right: 1px dashed var(--border-color);
      }
    }
    .column {
      flex: 1;
      text-align: center;
      &.max {
        color: var(--force-mark-color);
      }
    }
  }
}
</style>
