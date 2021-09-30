<template>
  <div
    class="miner-rate bottom-10"
    :class="[dataLoaded ? 'dataLoaded' : '']"
    v-loading="loading"
    element-loading-background="transparent"
  >
    <cm-miner-list
      :columns="columns"
      :dataSource="dataSource"
      :labels="tr('labels')"
      initSortKey="increased"
      @sort-change="handleSortChange"
      miniRow
    ></cm-miner-list>
    <div class="bg-board see-more">
      <div class="divider left-20 right-20"></div>
      <view-more name="mobile-tipset-transfer-list" />
    </div>
  </div>
</template>
<script>
import ViewMore from "../../viewMore/src/index"
import MinerList from "../../minerList/src/index"
export default {
  name: "TransferTable",
  components: {
    MinerList
  },
  data() {
    const vm = this
    return {
      prefix: "home.transfer",
      dataSource: [],
      total: 0,
      columns: [
        {
          key: "from",
          type: "link",
          target: "tipset/address-detail",
          paramKey: "address"
        },
        {
          key: "till"
        },
        {
          key: "to",
          type: "link",
          target: "tipset/address-detail",
          paramKey: "address"
        },
        {
          key: "value",
          formatter(v) {
            let arr = vm.formatFilNum(v, true).split(" ")
            return Number(arr[0]).toFixed(2) + " " + arr[1]
          }
        }
      ],
      options: {
        actor: [],
        start: 0,
        order: 1,
        interval: "24h",
        count: 15
      },
      actor: "",
      dataLoaded: false,
      loading: false
    }
  },
  props: {
    interval: {
      type: String,
      default: ""
    },
    switchIndex: {
      type: Number,
      default: 1
    }
  },
  methods: {
    async getTransferList() {
      // let {interval, actor, start, count, order} = this.options
      let res = await this.$api.getLargeAmountTransferList([
        0,
        10,
        "epoch",
        "desc"
      ])
      this.dataSource = res.data.map(item => {
        const { from, to, value } = item
        return {
          from,
          to,
          value
        }
      })
      // console.log(data)
    },
    async getMinersEfficiency() {
      this.loading = true
      try {
        let { interval, actor, start, count, order } = this.options
        let res = await this.$api.getMinersEfficiency([
          interval,
          actor,
          start,
          count,
          order
        ])
        this.loading = false
        const { data, total } = res
        this.total = total

        if (data && Array.isArray(data)) {
          const maxRate = Math.max(...data.map(item => item.storage_rate))
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
              let char = ""
              if (number > 0) {
                char = "+"
              }
              return {
                ...item,
                rank: index + 1,
                progress: (item.storage_rate / maxRate) * 100 + "%",
                tag: this.minerNameMap[item.miner]
                  ? this.minerNameMap[item.miner][this.isEn ? "tag_en" : "tag"]
                  : "--",
                lucky_number: {
                  render() {
                    return (
                      <div class="text-center lucky-con font-14">
                        <span
                          class={`level-${level}`}
                        >{`${char}${number}%`}</span>
                      </div>
                    )
                  }
                },
                miner: {
                  render() {
                    return (
                      <co-link
                        label={item.miner}
                        target="tipset/address-detail"
                        param={{ key: "address", value: item.miner }}
                      />
                    )
                  }
                }
              }
            })
          )
          this.dataLoaded = true
        } else {
          this.dataLoaded = true
          this.dataSource = []
        }
      } catch (e) {
        this.loading = false
      }
    },
    handlePageChange(v) {
      this.options.start = (v - 1) * 25
    },
    handleSortChange(v) {
      const sortMap = {
        increased: 1,
        storage_rate: 3,
        fil_per_t: 7,
        blocks: 10,
        win_count: 9,
        rewards: 11,
        lucky_number: 5
      }
      this.options.order = sortMap[v] || 1
    },
    handleSearch() {}
  },
  computed: {
    mbRealColumns() {
      const columns = [...this.mbColumns]
      if (this.switchIndex == 2) {
        columns.pop()
        columns.push({
          key: "fil_per_t",
          unit: "FIL/T",
          class: "text-center",
          formatter(v) {
            return Number(v).toFixed(2)
          }
        })
      }
      return columns
    }
  },
  mounted() {
    // this.getMinersEfficiency()
    this.getTransferList()
  },
  watch: {
    options: {
      deep: true,
      handler() {
        // this.getMinersEfficiency()
      }
    },
    interval(v) {
      this.options.interval = v
    },
    latestBlockHeight() {
      if (this.loadCount === 1) {
        return
      }
      // this.getMinersEfficiency()
    }
  },
  components: {
    ViewMore
  }
}
</script>
<style lang="scss" scoped>
@mixin column {
  $width: 220 220 120 180 160 140 140 150 160 160;
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
  border-top: 1px solid var(--border-line);
  .top {
    height: 65px;
    color: var(--main-text-color);
    border-radius: 6px 6px 0 0;
  }
  .see-more {
    height: 52px;
    border-radius: 0 0 6px 6px;
    & > div:last-child {
      height: 100%;
    }
  }
  .divider {
    height: 1px;
    background: var(--border-color);
  }
  &::v-deep .cm-miner-list {
    background: var(--board-bg-color);
    .header {
      padding: 0 20px;
      justify-content: space-between;
      @include column;
    }
    .body {
      overflow-y: hidden;
      padding-bottom: 0;
      .row {
        justify-content: space-between;
      }
      @include column;
      .column-2 div {
        justify-content: center;
        box-sizing: border-box;
      }
      .column-3 div {
        position: relative;
        height: 22px;
				font-size: 24px;
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
  @media (min-width: 768px) {
    &.miner-rate:not(.dataLoaded) .miner-list {
      min-height: 40vw;
    }
  }
  @media (max-width: 768px) {
    order: 4;
    padding: 0;
    .base-title {
      height: 10.667vw;
      padding: 0 2.667vw;
      font-size: 3.733vw;
      margin-bottom: 0;
    }
    &::v-deep .cm-miner-list {
      .header {
        background: var(--board-bg-color);
        justify-content: space-between;
        padding: 0;
      }
      .body {
        padding-top: 0;
        .row {
          margin: 0;
          background: var(--board-bg-color);
          justify-content: space-between;
        }
      }
      .column-item div {
        text-align: center;
        span:not(.el-link--inner) {
          font-size: 2.933vw;
        }
      }
      .column-1 {
				flex: 1;
        width: 180px;
        display: flex;
        //justify-content: center;
        .link {
					font-size: 24px;
          padding-left: 40px;
        }
      }
      .column-2 {
				width: 150px;
        //max-width: 12vw !important;
      }
      .column-3 {
				flex: 1;
        max-width: 26.667vw !important;
        margin: 0;
        text-align: center;
        justify-content: flex-start;
        div {
          height: 3.2vw !important;
          justify-content: flex-start;
          span {
            position: static !important;
            transform: none !important;
          }
        }
      }
      .column-4 {
				flex: 1;
        max-width: 27.2vw !important;
        font-size: 2.667vw;
        padding-right: 2.667vw;
        //justify-content: flex-end;
        div {
          justify-content: flex-end;
        }
      }
    }
    .base-title .time-selector {
      margin-right: 0;
      padding-right: 0;
    }
    .see-more {
      height: 9.333vw;
      margin-bottom: 0;
    }
    .divider {
      margin: 0;
    }
    margin-bottom: 0;
  }
}
</style>
