<template>
  <div class="meta">
    <div class="meta-title">
      <co-heading url="index@2x" :title="$t('home.subtitle.index')"></co-heading>
      <div @click="toggle" class="extend">{{ $t('home.metaList.tabs')[extend ? 0 : 1] }}</div>
    </div>
    <div class="meta-list flex align-center" :class="extend ? '' : 'padding-btm'">
      <div v-for="item in columnsWithLabel" :key="item.label" class="meta-item flex column jus-even">
        <div class="label">
          {{ item.label }}
          <el-popover placement="bottom-start" width="200" trigger="hover" :content="item.tips" v-if="!isMobile && item.tips">
            <i class="el-icon-warning-outline" slot="reference" style="margin-left:3px"></i>
          </el-popover>
        </div>
        <div class="detail flex jus-center" v-show="!firstInit" v-if="item.key !== 'latestBlockTime'">
          <span class="value">
            {{ item.formatter ? item.formatter(info[item.key]) : info[item.key] }}
          </span>
          <span class="unit">{{ item.formatUnit ? item.formatUnit(info[item.key]) : item.unit }}</span>
        </div>
        <div class="detail flex jus-center" v-show="!firstInit" v-else>
          <span class="value">
            {{ latestBlockTime }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'metaList',
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
        default: '0'
      }
    },
    data() {
      const vm = this
      const formatter = (v) => Number(Number(v).toFixed(2)).toLocaleString()
      return {
        extend: true,
        title: '展开',
        formatLatestTime: '0',
        timer: '',
        tmpColumns: [],
        columns: [
          {
            key: 'latest_height',
            formatter(v) {
              return Number(v).toLocaleString()
            }
          },
          {
            key: 'latestBlockTime'
          },
          {
            key: 'total_quality_power',
            formatter(v) {
              return vm.unitConversion(v, 4)
            }
          },
          {
            key: 'power_increase_24h',
            formatter(v) {
              return vm.unitConversion(v, 4)
            }
          },
          {
            key: 'fil_per_tera',
            formatter(v) {
              return Number(v).toFixed(4) + ' FIL/T'
            }
          },

          {
            key: 'base_fee',
            formatter(v) {
              return Number(vm.formatFilNum(v, true, true)).toFixed(4) + ' ' + vm.formatFilNum(v, true).split(' ')[1]
            }
          },
          {
            key: 'miner_initial_pledge',
            formatter(v) {
              return vm.formatNumber(v) + ' FIL/TiB'
            }
          },

          {
            key: 'gas_in_32g',
            formatter(v) {
              let str = Number(v) < 0.0001 ? Number(Number(v) * Math.pow(10, 9)).toFixed(2) + 'nanoFIL/TiB' : Number(v).toFixed(4) + ' FIL/TiB'
              return str
            }
          },
          {
            key: 'add_power_in_32g',
            formatter(v) {
              return vm.formatNumber(v) + ' FIL/TiB'
            }
          },
          {
            key: 'rewards_increase_24h',
            formatter(v) {
              return vm.formatNumber(v, 2) + ' FIL'
            }
          },

          {
            key: 'total_blocks',
            formatter(v) {
              return vm.formatNumber(v, 2)
            }
          },
          {
            key: 'total_rewards',
            formatter(v) {
              return Number(v).toLocaleString() + ' FIL'
            }
          },
          {
            key: 'gas_in_64g',
            formatter(v) {
              let str = Number(v) < 0.0001 ? Number(Number(v) * Math.pow(10, 9)).toFixed(2) + 'nanoFIL/TiB' : Number(v).toFixed(4) + ' FIL/TiB'
              return str
            }
          },
          {
            key: 'add_power_in_64g',
            formatter(v) {
              return vm.formatNumber(v) + ' FIL/TiB'
            }
          },
          {
            key: 'latest_block_reward',
            formatter(v) {
              return Number(v).toFixed(4) + ' FIL'
            }
          },

          {
            key: 'avg_message_count',
            formatter(v) {
              return vm.formatNumber(v)
            }
          },
          {
            key: 'burnt',
            formatter(v) {
              return vm.formatNumber(v, 4) + ' FIL'
            }
          },
          {
            key: 'active_miners',
            formatter(v) {
              return vm.formatNumber(v)
            }
          },
          {
            key: 'circulating_percent',
            formatter(v) {
              return Number(v * 100).toFixed(2) + '%'
            }
          },
          {
            key: 'avg_block_count',
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
        const labels = this.isMobile ? this.$t('home.meta') : this.$t('home.meta')
        // const columns = this.isMobile ? this.mbColumns : this.columns
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
  .padding-btm {
    padding-bottom: 20px;
  }
  .meta {
    background-color: var(--content-bg-color);
    padding: 0 20px;
    margin-bottom: 16px;
    .meta-title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .extend {
        height: 17px;
        padding: 4px 16px;
        border-radius: 17px;
        line-height: 17px;
        text-align: center;
        margin-top: 15px;
        cursor: pointer;
        font-size: var(--font-16);
        color: var(--main-text-color);
        border: 1px solid var(--border-line);
      }
      .extend:hover {
        color: #5b8ff9;
      }
    }
    .meta-list {
      display: flex;
      flex-flow: wrap;
      justify-content: space-between;
      align-content: flex-start;
      .meta-item {
        text-align: center;
        width: 19%;
        height: 76px;
        padding: 16px 0;
        background: var(--block-meta-item-bg-color);
        border: 1px solid var(--block-meta-item-border-color);
        &:nth-child(-n + 15) {
          margin-bottom: 16px;
        }

        .label {
          font-size: var(--font-16);
          color: var(--main-text-color);
          white-space: normal;
          padding: 0 20px;
        }

        .detail {
          align-items: baseline;

          .value {
            height: 24px;
            line-height: 24px;
            font-size: 24px;
            color: var(--force-mark-color);
            font-weight: 600;
          }

          .unit {
            font-size: 24px;
            color: var(--main-text-color);
            margin-left: 5px;
          }
        }
      }
    }
  }
  @media (max-width: 768px) {
    .meta-list.flex.align-center {
      flex-wrap: wrap;
      background: var(--board-bg-color);
      padding-bottom: 2.667vw;
      //border-radius: 0.8vw;
      padding: 2.667vw 2vw 0;
      .meta-item {
        background: var(--board-item-bg-color);
        &:nth-child(2n + 1) {
          margin-right: 2.4vw;
        }
        min-width: 48%;
        height: auto;
        margin-bottom: 2vw;
        box-shadow: none;
        .label {
          font-size: 2.667vw;
          white-space: nowrap;
          margin: 2vw 0 1.333vw;
        }
        .detail {
          padding-bottom: 2vw;
          line-height: 4.4vw;
          .value {
            font-weight: 600;
            font-size: 3.2vw;
          }
          .unit {
            font-size: 2.4vw;
            margin-left: 0.667vw;
          }
        }
      }
    }
  }
</style>
