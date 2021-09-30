<template>
  <div class="pool-ranking radius" v-loading="loading" element-loading-background="transparent">
    <co-table :columns="columns" :dataSource="dataSource" :labels="tr('labels')" initSortKey="quality_adj_power" hideIndex @sort-change="handleSortChange" miniRow></co-table>
    <co-page :total="total" @page-change="handlePageChange" v-if="type==='0'"/>
    <div class="see-more content-bg-color" v-else>
      <co-view-more name="mining" switch-type="0" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'PoolRanking',
  data() {
    const formatter = (v) => this.unitConversion(v, 2)
    return {
      prefix: 'mining.poolRanking',
      total: 0,
      columns: [
        {
          key: 'rank',
          hideSort: true,
          width: '120px'
        },
        // {
        //   key: 'pool_tag',
        //   id: 'owner'
        // },
        {
          key: 'owner',
          type: 'link',
          target: 'tipset/pool-detail',
          paramKey: 'address'
        },
        {
          key: 'quality_adj_power',
          sortable: true,
          formatter,
          progress: true,
        },
        {
          key: 'efficiency_mining',
          sortable: true,
          formatter(v) {
            return Number(v).toFixed(4) + ' FIL/T'
          }
        },

        {
          key: 'force_increment',
          sortable: true,
          formatter
        },
        // {
        //   key: 'lucky_value',
        //   sortable: true,
        //   formatter(v) {
        //     return Number(Number(v) * 100).toFixed(2) + '%'
        //   }
        // },
        {
          key: 'blocks_num'
        }
      ],
      dataSource: [],
      options: {
        start: 0,
        count: 25,
        order: 8
      },
      page: 1,
      loading: false
    }
  },
  methods: {
    async getTopMiners() {
      const vm = this
      this.loading = true
      try {
        let op = {
          ...this.options
        }
        if(this.type!==0){
          op.count = 20
        }
        let res = await this.$api.getTopOrePool([...Object.values(op)])
        this.loading = false
        const { first_data } = res
        if (res.data && Array.isArray(res.data)) {
          // if (Object.keys(this.minerNameMap).length === 0) {
          //   this.getTopMiners()
          // }
          this.dataSource = Object.freeze(
            res.data.map((item, index) => {
              item.reward_ratio = item.reward_ratio * 100
              return {
                ...item,
                rank: (vm.page - 1) * 25 + index + 1,
                progress: (item.quality_adj_power / first_data) * 100 + '%',
                miner: {
                  render() {
                    return <co-link label={item.miner} target="tipset/address-detail" param={{ key: 'address', value: item.miner }} />
                  }
                },
                balance: {
                  render() {
                    return (
                      <div class={item.balance < 200 ? 'warning text-center' : 'text-center'}>
                        {item.balance < 200 ? (
                          <el-popover placement="bottom-start" width="200" trigger="hover" content={vm.tr('lowBalance')}>
                            <span slot="reference" class="pointer">
                              {vm.formatNumber(item.balance) + ' FIL' || '-'}
                            </span>
                          </el-popover>
                        ) : (
                          vm.formatNumber(item.balance) + ' FIL' || '-'
                        )}
                      </div>
                    )
                  }
                }
              }
            })
          )
          this.total = res.total
        } else {
          this.total = 0
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
      console.log(v)
      const { prop, order } = v
      const obj = {
        efficiency_mining: {
          ascending: 1,
          descending: 2
        },
        force_increment: {
          ascending: 3,
          descending: 4
        },
        lucky_value: {
          ascending: 5,
          descending: 6
        },
        quality_adj_power: {
          ascending: 7,
          descending: 8
        }
      }
      let orders = obj[prop][order]
      this.options.order = orders || 2
    }
  },
  mounted() {
    this.getTopMiners()
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.getTopMiners()
      }
    },
    actor() {
      this.getTopMiners()
    }
  },
  props: {
    type: {
      type: String,
      default() {
        return '0';
      }
    },
    actor: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin column {
  $width: 50 60 120 220 150 140 100 155 160 130 140;
  @for $i from 1 through length($width) {
    .column-#{$i} {
      max-width: #{nth($width, $i)}px;
    }
  }
}
.pool-ranking {
  padding-bottom: 0;
  border-radius: 4px;
  .base-title {
    padding-right: 20px;
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
  }
  .see-more {
    box-sizing: border-box;
    padding: 10px 0;
    border-radius: 0 0 6px 6px;
    & > div:last-child {
      height: 100%;
    }
  }
  &::v-deep tbody tr td:nth-child(4) {
    .cell {
      //justify-content: flex-start !important;
      width: 100%;
      padding-left: 20px;
      box-sizing: border-box;
    }
  }
  &::v-deep .miner-list {
    background: var(--board-item-bg-color);
    .header {
      padding: 0 20px;
      justify-content: space-between;
      @include column;
    }
    .body {
      overflow-y: hidden;
      padding: 0 20px;
      margin-right: 0;
      .row {
        margin: 0;
        justify-content: space-between;
      }
      .column-3 div {
        position: relative;
        height: 2.933vw !important;
        span {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          display: inline-block;
        }
      }
      .column-4 {
        div {
          justify-content: flex-start;
        }
      }
      .column-8 {
        div {
          & > span {
            display: inline-block;
            &:nth-child(1) {
              width: 70px;
              display: flex;
              justify-content: flex-end;
            }
          }
        }
      }
      .warning {
        color: red;
      }
      @include column;
    }
  }
  @media (max-width: 768px) {
    padding: 0;
    .base-title {
      height: 10.667vw;
      padding: 0 2.667vw;
      font-size: 3.733vw;
      margin-bottom: 0;
      .search {
        width: 44vw;
        height: 6.667vw;
        border-radius: 1.6vw;
        input {
          font-size: 2.4vw;
          max-width: 28vw;
        }
        span {
          margin-left: 7.2vw;
        }
      }
    }
    &::v-deep tbody tr td:nth-child(4) {
      .cell {
        justify-content: flex-start !important;
        width: 100%;
        padding-left: 56px;
        box-sizing: border-box;
      }
    }
    &::v-deep .miner-list {
      .column-1 {
        max-width: 13.333vw;
      }
      .header {
        padding: 0;
        justify-content: space-between;
        background: var(--board-bg-color);
      }
      .body {
        padding: 0;
        overflow-y: hidden;
        background: var(--board-bg-color);
        .row {
          justify-content: space-between;
          .column-4 {
            div {
              justify-content: flex-end !important;
            }
          }
          .miner-name {
            padding-left: 0 !important;
          }
        }
      }
      .column-1 {
        max-width: 10vw !important;
        padding-left: 2.667vw;
      }
      .column-2 {
        max-width: 12vw !important;
      }
      .column-3 {
        max-width: 26.667vw !important;
        justify-content: flex-start;
        div {
          justify-content: flex-start;
          span {
            position: static !important;
            transform: none !important;
          }
        }
      }
      .column-4 {
        max-width: 27.2vw !important;
        padding-right: 2.667vw;
        margin-right: 0 !important;
      }
    }
    & .base-title .search-wrap {
      width: 44vw;
      height: 6.667vw;
      border-radius: 1.6vw;
      &::v-deep .el-input {
        input {
          height: 100%;
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
