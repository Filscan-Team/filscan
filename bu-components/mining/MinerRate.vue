<template>
  <div class="miner-rate" v-loading="loading" element-loading-background="transparent">
    <co-table :columns="columns" :dataSource="dataSource" :labels="tr('label')" initSortKey="increased" hideIndex @sort-change="handleSortChange" miniRow></co-table>
    <co-page :total="total" @page-change="handlePageChange" v-if="type==='0'&&flag"/>
    <div class="see-more content-bg-color" v-else>
      <co-view-more name="mining" switch-type="3" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'MinerRate',
  data() {
    const vm = this
    const formatter = (v) => this.unitConversion(v, 2)
    const tip = vm.$t('mining.efficiency.tips')
    return {
      prefix: 'mining.efficiency',
      dataSource: [],
      total: 0,
      columns: [
        {
          key: 'rank',
          hideSort: true,
          class: 'text-center',
          width: '120px'
        },
        {
          key: 'miner',
          type: 'link',
          target: 'tipset/address-detail',
          paramKey: 'address'
        },
        {
          key: 'tags',
          id: 'miner'
        },
        {
          key: 'block_reward',
          rateKey: 'raw_block_reward',
          class: 'text-center',
          unit: 'FIL',
          sortable: true,
          tips: tip[2]
        },
        {
          key: 'blocks_num',
          sortable: true,
          tips: tip[1]
        },
        {
          key: 'winning_rate',
          sortable: true,
          formatter(v) {
            return Number(v * 100).toFixed(2) + '%'
          },
          tips: tip[0]
        },
        {
          key: 'quality_adj_power',
          class: 'text-center',
          formatter
        },
        {
          key: 'sector_size',
          formatter(v) {
            return v + 'G'
          }
        }
      ],
      options: {
        start: 0,
        count: 25,
        sort: 6,
        interval: '24h',
        order: 0
      },
      page: 1,
      dataLoaded: false,
      loading: false,
      flag: true
    }
  },
  props: {
    type: {
      type: String,
      default() {
        return '0';
      }
    },
    interval: {
      type: String,
      default: ''
    },
    actor: {
      type: Array,
      default() {
        return []
      }
    },
    switchIndex: {
      type: Number,
      default: 1
    },
    order: {
      type: Number,
      default: 0
    }
  },
  methods: {
    async getMinersEfficiency() {
      const vm = this
      this.loading = true
      try {
        let options = {
          ...this.options
        }
        if(this.type!==0){
          options.count =20
        }
        let res = await this.$api.getTopMinersProfit([...Object.values(options)])
        this.loading = false
        const { data, total } = res
        this.total = total
        if (data) {
          const maxRate = Math.max(...data.map((item) => item.storage_rate))
          this.dataSource = Object.freeze(
            res.data.map((item, index) => {
              const number = Number((item.lucky_number - 1) * 100).toFixed(2)
              let level = 1
              if (number >= 50) {
                level = 5
              } else if (number >= 10 && number < 50) {
                level = 4
              } else if (number >= -10 && number < 10) {
                level = 3
              } else if (number >= -50 && number < -10) {
                level = 2
              } else {
                level = 1
              }
              let char = ''
              if (number > 0) {
                char = '+'
              }

              return {
                ...item,
                rank: (vm.page - 1) * 25 + index + 1,
                progress: (item.storage_rate / maxRate) * 100 + '%',
                lucky_number: {
                  render() {
                    return (
                      <div class="text-center lucky-con font-14">
                        <span class={`level-${level}`}>{`${char}${number}%`}</span>
                      </div>
                    )
                  }
                }
              }
            })
          )
        } else {
          this.dataSource = []
        }
      } catch (e) {
        this.loading = false
      }
    },
    handlePageChange(v) {
      this.page = v
      this.options.start = (v - 1) * 25
    },
    handleSortChange(v) {
      const { prop, order } = v
      const obj = {
        winning_rate: {
          ascending: 1,
          descending: 2
        },
        blocks_num: {
          ascending: 3,
          descending: 4
        },
        block_reward: {
          ascending: 5,
          descending: 6
        }
      }
      let sort = obj[prop][order]
      this.options.sort = sort || 2
    },
    handleSearch() {}
  },
  computed: {
    mbRealColumns() {
      const columns = [...this.mbColumns]
      if (this.switchIndex == 2) {
        columns.pop()
        columns.push({
          key: 'fil_per_t',
          unit: 'FIL/T',
          class: 'text-center',
          formatter(v) {
            return Number(v).toFixed(2)
          }
        })
      }
      return columns
    }
  },
  mounted() {
    this.getMinersEfficiency()
    this.$bus.$on('mining-search', (v) => {
      v = v.replace(/[,\s+]/g, ',')
      this.options.actor = v ? v.split(',') : []
    })
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.getMinersEfficiency()
      }
    },
    interval(v) {
      this.options.interval = v
    },
    actor() {
      this.getMinersEfficiency()
    },
    order() {
      this.options.order = this.order
      this.options.start = 0
      this.getMinersEfficiency()
      this.flag = false
      this.$nextTick(()=>{
        this.flag = true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin column {
  $width: 50 60 120 180 160 140 140 150 160 160;
  @for $i from 1 through length($width) {
    .column-#{$i} {
      max-width: #{nth($width, $i)}px;
    }
  }
}
.miner-rate {
  padding-bottom: 0;
  background: var(--board-bg-color);
  border-radius: 4px;
  .base-title {
    padding: 0 20px;
    .time-selector {
      margin-left: auto;
      margin-right: 60px;
    }
  }
  .see-more {
    box-sizing: border-box;
    padding: 10px 0;
    border-radius: 0 0 6px 6px;
    & > div:last-child {
      height: 100%;
    }
  }
  &::v-deep .miner-list {
    background: var(--board-item-bg-color);
    .header {
      padding: 0 20px;
      justify-content: space-between;
      @include column();
    }
    .body {
      overflow-y: hidden;
      padding-top: 20px;
      padding-bottom: 0;
      .row {
        justify-content: space-between;
        &:first-child {
          margin-top: -20px;
        }
      }
      @include column();
      .column-2 div {
        justify-content: center;
        box-sizing: border-box;
      }
      .column-3 div {
        position: relative;
        height: 22px;
        span {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          display: inline-block;
        }
      }
      .column-5 div {
        justify-content: flex-start;
      }
      .lucky-con {
        span {
          width: 84px;
          height: 26px;
          border-radius: 13px;
          display: inline-block;
          line-height: 26px;
          text-align: center;
        }
        .level-5 {
          background: #c89c17;
        }
        .level-4 {
          background: #c75c46;
        }
        .level-3 {
          background: #4f7edb;
        }
        .level-2 {
          background: #1b9b5b;
        }
        .level-1 {
          background: #00ae9b;
        }
      }
    }
  }
  .search-wrap {
    width: 300px;
    height: 40px;
    border-radius: 20px;
    padding: 0 30px;
    &::v-deep .el-input {
      input {
        background: none;
        border: none;
        color: var(--main-text-color);
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0 !important;
    .base-title {
      height: 10.667vw;
      padding: 0 2.667vw;
      font-size: 3.733vw;
      margin-bottom: 0;
    }

    &::v-deep .miner-list {
      .header {
        padding: 0;
        background: var(--board-bg-color);
        justify-content: space-between;
      }
      .body {
        background: var(--board-bg-color);
        .row {
          margin: 0;
          background: var(--board-bg-color);
          justify-content: space-between;
        }
      }
      .column-item div {
        text-align: center;
      }
      .column-1 {
        max-width: 10vw !important;
        padding-left: 2.667vw;
      }
      .column-2 {
        max-width: 12vw !important;
        text-align: center;
      }
      .column-3 {
        max-width: 26.667vw !important;
        margin: 0;
        justify-content: flex-start;

        div {
          height: 2.933vw !important;
          justify-content: flex-start;
          span {
            position: static !important;
            transform: none !important;
          }
        }
      }
      .column-4 {
        max-width: 27.2vw !important;
        font-size: 2.667vw;
        padding-right: 2.667vw;
        justify-content: flex-end;
        div {
          justify-content: flex-end;
        }
      }
    }
    .base-title .time-selector {
      margin-right: 0;
      padding-right: 0;
    }
    .search-wrap {
      width: calc(100% - 5.333vw);
      margin: 0 2.667vw;
      height: 6.667vw;
      box-sizing: border-box;
      background: var(--board-item-bg-color);
      margin-top: 2.667vw;
      color: var(--main-text-color);
      padding-right: 24vw;
      &::v-deep .el-input {
        input {
          height: 100%;
          padding-left: 24vw;
        }
        .el-input__suffix {
          right: 4vw;
          top: 0.667vw;
        }
      }
    }
  }
}
</style>
