<template>
  <div class="fil-trend radius font-16 font-500 flex column">
    <co-card style="margin: 0" :isPaddingBorderBottom="true">
      <div slot="header" class="clearfix">
        <div class="title">
          <div class="heading">{{ tr("trend") }}</div>
        </div>
        <div class="times">
          <co-time-select :times="times" @time-select="handleTimeChange" />
        </div>
      </div>
      <div class="chart-con" ref="chart"></div>
    </co-card>
  </div>
</template>
<script>
import { mapActions } from "vuex"
let chart
export default {
  name: "CoFilTrend",
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
      let res = await this.$api.getFilPricePoints([this.interval])
      let times = this.interval === "24h" ? "HH:mm" : "YYYY-MM-DD HH:mm"
      this.xOptions = []
      this.cnyList = []
      this.usdList = []
      const { data } = res
      if(data&&Array.isArray(data)) {
        data.map(item => {
          const {day_time, price_cny, price_usd} = item
          this.cnyList.push(price_cny)
          this.usdList.push(price_usd)
          this.xOptions.push(this.formatDateTime(day_time, times))
        })
      }
      this.drawChart()
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
      // const color = this.theme === "light" ? "black" : "white"
      const lightStyle = {
        lineStyle: "rgba(0,0,0,0.15)",
        splitLine: "rgba(0,0,0,0.15)",
        textStyle: "#333333",
        itemBorder: "#ffffff"
      }
      const blackStyle = {
        lineStyle: "rgba(255,255,255,0.15)",
        splitLine: "rgba(255,255,255,0.15)",
        textStyle: "#ffffff",
        itemBorder: "#ffffff"
      }
      const color = this.theme === "light" ? lightStyle : blackStyle
      const { splitLine } = this.chartTheme.activeMiner
      const option = {
        xAxis: {
          type: "category",
          data: this.xOptions,
          axisLabel: {
            textStyle: {
              fontSize: this.fontSize,
              color: color.textStyle
            }
          },
          splitLine: {
            lineStyle: {
              color: "#15355"
            }
          },
          axisLine: {
            lineStyle: {
              color: color.lineStyle
            }
          },
          axisTick: {
            show: false
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
                fontSize: this.fontSize,
                color: color.textStyle
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color:  color.lineStyle
              }
            },
            splitLine: {
              show:false,
              lineStyle: {
                type: "dashed",
                color: color.lineStyle
              }
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
              formatter() {
                return ""
              },
              textStyle: {
                color
              }
            },
            yAxis: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#153550"
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: splitLine
              }
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
              color: "#0090FF",
              borderColor: "#0090FF"
            },
            lineStyle: {
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
            yAxisIndex: 1,
            data: this.usdList,
            symbol: "none",
            smooth: true,
            lineStyle: {
              width: 0, // 线宽是0
              color: "rgba(0, 0, 0, 0)" // 线的颜色是透明的
            },
            itemStyle: {
              show: false,
              color: "#00E5FF",
              borderColor: "0090FF"
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
          right: 20 * rate,
          top: 10 * rate,
          bottom: 15 * rate,
          containLabel: true
        },
        axisPointer: {
          label: {
            backgroundColor: 'black',
          },
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
  box-sizing: border-box;
  .title {
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
    margin-left: 5px;
    justify-content: space-between;
    font-size: var(--font-18);
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
    height: 314px;
    border: 1px solid var(--border-color);
    box-sizing: border-box;
    & > div {
      background: var(--board-item-bg-color);
      height: 280px;
      margin-right: 15px;
      border-radius: 4px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &::v-deep .clearfix {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .title {
      width: 500px;
    }
    .times {
    }
  }
}
</style>
