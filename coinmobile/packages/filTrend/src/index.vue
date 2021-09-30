<template>
  <div class="fil-trend radius font-16 font-500 flex column">
    <cm-card>
      <div slot="header" class="clearfix">
        <div class="title">
          <div class="heading">{{ tr("trend") }}</div>
        </div>
        <div class="times">
          <cm-time-select :times="times" @time-select="handleTimeChange" />
        </div>
      </div>
      <div class="chart-con" ref="chart"></div>
    </cm-card>
  </div>
</template>
<script>
import { decl } from "postcss"
import { mapActions } from "vuex"
let chart
export default {
  name: "CmFilTrend",
  data() {
    return {
      prefix: "statistics.fil",
      metaList: [
        {
          key: "block_count"
        },
        {
          key: "divider1"
        },
        {
          key: "win_count"
        },
        {
          key: "divider2"
        },
        {
          key: "rewards",
          unit: "FIL"
        }
      ],
      info: {
        block_count: 0,
        win_count: 0,
        rewards: 0
      },
      blockList: [],
      winCountList: [],
      rewardsList: [],
      feeList: [],
      cnyList: [],
      usdList: [],
      xOptions: [],
      yOptions: [],
      interval: "24h",
      times: ["24h", "1w", "1m", "1y"]
    }
  },
  computed: {
    metaListWithLabel() {
      return this.metaList.map((item, index) => {
        return {
          ...item,
          label: this.tr("meta")[index],
          value: this.info[item.key]
        }
      })
    }
  },
  methods: {
    ...mapActions("home", ["setBaseFeeList"]),
    handleTimeChange(v) {
      this.interval = v.type
      this.getFilPrice()
    },
    async getFilPrice() {
      try {
        let res = await this.$api.getFilPricePoints([this.interval])
        this.xOptions = []
        const { data } = res
        let timeStr = this.interval === '24h' ? 'HH:mm' : 'YYYY-MM-DD HH:mm'
        if(data && Array.isArray(data)) {
          res.data.map(item => {
            const {day_time, price_cny, price_usd} = item
            this.cnyList.push(price_cny)
            this.usdList.push(price_usd)
            this.xOptions.push(this.formatDateTime(day_time, timeStr))
          })
          this.drawChart()
        }
      }catch (e) {
        console.log(e)
      }
    },
    async getBaseFeeTrend() {
      let res = await this.$api.getBaseFeeTrend()
      let basefee = res.basefee_points.reverse()
      this.setBaseFeeList(basefee)
      this.feeList = basefee.map(item => {
        return item.base_fee
        // Number(this.formatFilNum(item.base_fee, true, false).split(" ")[0])
      })
      this.xOptions = basefee.map(item =>
        this.formatDateTime(item.block_time, "HH:mm")
      )
      this.drawChart()
    },
    drawChart() {
      const vm = this
      // const isMobile = vm.isMobile
      const rate = vm.rate
      const color = this.theme === "light" ? "rgba(0,0,0,0.5)" : "white"
      const option = {
        xAxis: {
          type: "category",
          data: this.xOptions,
          axisLabel: {
            textStyle: {
              color
            }
          },
          axisTick: {
            show: false,
            lineStyle: {
              shadowColor: "red"
            }
          },
          splitLine: {
            lineStyle: {
              color: ["#153550"]
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#153550"
            }
          }
        },
        yAxis: [
          {
            type: "value",
            min: 0,
            max: v => {
              // let max = this.formatFilNum(v.max, true, false).split(" ")[0]
              return Number(v.max / 0.8).toFixed(1)
            },
            axisLabel: {
              formatter(v) {
                if (v === 0) {
                  return 0
                }
                let value = Number(
                  vm.formatFilNum(v, true, false).split(" ")[0]
                )
                // let unit =  vm.formatFilNum(v, true, false).split(" ")[1]
                return Number(value).toFixed(1)
              },
              textStyle: {
                color
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#153550"
              }
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: "#CECECE"
              }
            },
            axisTick: {
              show: false
            }
          },
          {
            type: "value",
            min: 0,
            max: v => {
              // let max = this.formatFilNum(v.max, true, false).split(" ")[0]
              return Number(v.max / 0.8).toFixed(1)
            },
            axisLabel: {
              show: false,
              formatter(v) {
                if (v === 0) {
                  return 0
                }
                let value = Number(
                  vm.formatFilNum(v, true, false).split(" ")[0]
                )
                // let unit =  vm.formatFilNum(v, true, false).split(" ")[1]
                return Number(value).toFixed(1)
              },
              textStyle: {
                color
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#153550"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                type: "dashed",
                color: "#153550"
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            type: "line",
            yAxisIndex: 0,
            data: this.cnyList,
            smooth: true,
            itemStyle: {
              color: "#0090FF"
            },
            markArea: {
              itemStyle: {
                color: "#153550"
              }
            }
          },
          {
            type: "line",
            symbol: "circle",
            yAxisIndex: 1,
            data: this.usdList,
            smooth: true,
            itemStyle: {
              color: "#0090FF"
            },
            markArea: {
              itemStyle: {
                color: "#153550"
              }
            }
          }
        ],
        grid: {
          left: 2 * rate,
          right: 8 * rate,
          top: 8 * rate,
          bottom: 15 * rate,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          formatter(v) {
            let result = v[0].name
            let units = ["¥", "$"]
            v.forEach((item, index) => {
              if (item.data) {
                result +=
                        "<br/>" +
                        item.marker +
                        `FIL price ${units[index]}:` +
                        " " +
                        item.data
              }
            })
            return result
          }
        }
      }
      chart.setOption(option)
    }
  },
  mounted() {
    chart = this.$chart.init(this.$refs.chart)
    // this.getBaseFeeTrend()
    this.getFilPrice()
    this.$bus.$on("window-resize", () => {
      chart.resize()
      this.drawChart()
    })
  },
  watch: {
    latestBlockHeight() {
      {
        if (this.loadCount === 1) {
          return
        }
        this.getFilPrice()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.fil-trend {
  /*max-width: 580px;*/
  box-sizing: border-box;
  .title {
		font-size: 26px;
    width: 660px;
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
    margin-left: 5px;
    justify-content: space-between;
    .more {
      display: flex;
      flex: 1;
      justify-content: flex-end;
    }
  }
  .subtitle {
    margin-right: 5px;
  }
  .meta-list {
    padding: 0 30px;
    //margin-top: 10px;
    border: 1px solid var(--border-color);
    height: 34px;
    border-radius: 6px;
    & > div {
      &:nth-child(2),
      &:nth-child(4) {
        flex: 1;
        position: relative;
        &::after {
          position: absolute;
          content: "";
          width: 1px;
          height: 18px;
          background: var(--border-color);
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
      }
      .unit {
        margin-left: 3px;
      }
    }
  }
  .chart-con {
    padding: 20px;
    height: 339px;
    & > div {
      background: var(--board-item-bg-color);
      height: 320px;
      margin-right: 15px;
      border-radius: 4px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  ::v-deep .clearfix {
    display: flex;
    flex-direction: row;
    .title {
      width: 500px;
    }
    .times {
      .time-selector {
        height: 44px;
      }
      .base-select .selected {
        padding: 0 15px;
      }
    }
  }
}
</style>
