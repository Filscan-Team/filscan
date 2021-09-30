<template>
  <div class="meta">
    <cm-heading url="index@2x" :title="$t('home.subtitle.index')"></cm-heading>
    <div class="meta-list flex align-center">
      <div
        v-for="item in columnsWithLabel"
        :key="item.label"
        class="meta-item flex column jus-even"
      >
        <div class="label">
          {{ item.label }}
          <el-popover placement="bottom" width="180" trigger="hover" :content="item.tips" v-if="item.tips">
            <i class="el-icon-warning-outline" slot="reference" style="margin-left:3px"></i>
          </el-popover>
        </div>
        <div
          class="detail flex jus-center"
          v-show="!firstInit"
          v-if="item.key !== 'latestBlockTime'"
        >
          <span class="value">
            {{
              item.formatter ? item.formatter(info[item.key]) : info[item.key]
            }}
          </span>
          <span class="unit">{{
            item.formatUnit ? item.formatUnit(info[item.key]) : item.unit
          }}</span>
        </div>
        <div class="detail flex jus-center" v-show="!firstInit" v-else>
          <span class="value">
            {{ latestBlockTime }}
          </span>
        </div>
      </div>
    </div>
    <div class="meta-btm">
      <div @click="toggle" class="extend">
        {{ $t("home.metaList.tabs")[extend ? 0 : 1] }}
        <i :class="extend ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from "../../heading/src/index"
export default {
  name: "CmMetaList",
  props: {
    info: {
      type: Object
    },
    firstInit: {
      type: Boolean,
      default: true
    },
    latestBlockTime: {
      type: String,
      default: "0"
    }
  },
  components: {
    Heading
  },
  data() {
    const vm = this
    return {
      extend: true,
      title: "展开",
      formatLatestTime: "0",
      timer: "",
      columns: [
        {
          key: "latest_height",
          formatter(v) {
            return Number(v).toLocaleString()
          }
        },
        {
          key: "latestBlockTime"
        },
        {
          key: "total_quality_power",
          formatter(v) {
            return vm.unitConversion(v, 4)
          }
        },
        {
          key: "power_increase_24h",
          formatter(v) {
            return vm.unitConversion(v, 4)
          }
        },
        {
          key: "fil_per_tera",
          formatter(v) {
            return Number(v).toFixed(4) + " FIL/T"
          }
        },

        {
          key: "base_fee",
          formatter(v) {
            return (
              Number(vm.formatFilNum(v, true, true)).toFixed(4) +
              " " +
              vm.formatFilNum(v, true).split(" ")[1]
            )
          }
        },
        {
          key: "miner_initial_pledge",
          formatter(v) {
            return vm.formatNumber(v) + " FIL/TiB"
          }
        },
        {
          key: "gas_in_32g",
          formatter(v) {
            let str = Number(v) < 0.0001 ? Number(Number(v) * Math.pow(10, 9)).toFixed(2) + 'nanoFIL/TiB' : Number(v).toFixed(4) + ' FIL/TiB'
            return str
          }
        },
        {
          key: "add_power_in_32g",
          formatter(v) {
            return vm.formatNumber(v) + " FIL/TiB"
          }
        },

        {
          key: "rewards_increase_24h",
          formatter(v) {
            return vm.formatNumber(v, 2) + " FIL"
          }
        },

        {
          key: "total_blocks",
          formatter(v) {
            return vm.formatNumber(v, 2)
          }
        },
        {
          key: "total_rewards",
          formatter(v) {
            return Number(v).toLocaleString() + " FIL"
          }
        },
        {
          key: "gas_in_64g",
          formatter(v) {
            let str = Number(v) < 0.0001 ? Number(Number(v) * Math.pow(10, 9)).toFixed(2) + 'nanoFIL/TiB' : Number(v).toFixed(4) + ' FIL/TiB'
            return str
          }
        },
        {
          key: "add_power_in_64g",
          formatter(v) {
            return vm.formatNumber(v) + " FIL/TiB"
          }
        },
        {
          key: "latest_block_reward",
          formatter(v) {
            return Number(v).toFixed(4) + " FIL"
          }
        },
        {
          key: "avg_message_count",
          formatter(v) {
            return vm.formatNumber(v)
          }
        },

        {
          key: "burnt",
          formatter(v) {
            return vm.formatNumber(v, 4) + " FIL"
          }
        },
        {
          key: "active_miners",
          formatter(v) {
            return vm.formatNumber(v)
          }
        },
        {
          key: "circulating_percent",
          formatter(v) {
            return Number(v * 100).toFixed(2) + "%"
          }
        },
        {
          key: "avg_block_count",
          formatter(v) {
            return vm.formatNumber(v)
          }
        }
      ]
    }
  },
  watch: {
    info() {}
  },
  computed: {
    columnsWithLabel() {
      const labels = this.$t("home.meta")
      let tmp = this.columns.map((col, index) => {
        return {
          ...col,
          label: labels[index].label,
          tips: labels[index].tips
        }
      })
      tmp = this.extend ? tmp.slice(0, 10) : tmp
      return tmp
    }
  },
  methods: {
    toggle() {
      this.extend = !this.extend
    }
  }
}
</script>

<style lang="scss" scoped>
.meta {
  background-color: #ffffff;
  margin-bottom: 16px;
  .meta-list.flex.align-center {
    display: flex;
    flex-wrap: wrap;
    background: var(--board-bg-color);
    padding: 0 30px;
    justify-content: space-between;
    align-content: flex-start;
    .meta-item {
      text-align: center;
      background: var(--board-item-bg-color);
      width: 337px;
      height: 122px;
      margin-bottom: 15px;
      box-shadow: none;

      &:nth-child(2n + 1) {
        margin-right: 16px;
      }

      .label {
        color: var(--block-meta-item-label);
        font-size: 22px;
        white-space: normal;
        padding: 0 10px;
        margin: 15px 0 10px;
      }

      .detail {
        padding-bottom: 15px;
        line-height: 33px;

        .value {
          font-weight: 600;
          font-size: 26px;
          color: var(--force-mark-color);
        }

        .unit {
          font-size: 18px;
          margin-left: 5px;
        }
      }
    }
  }
  .meta-btm {
    height: 40px;
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
    .extend {
			font-size: 20px;
      height: 20px;
      line-height: 20px;
      padding: 10px;
    }
  }
}
</style>
