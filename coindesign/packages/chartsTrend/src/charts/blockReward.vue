<template>
  <div class="active-miner bottom-20 flex column">
    <div class="top flex align-center jus-between">
      <span class="title"> {{ tr("rewardTitle") }} </span>
      <co-time-select
        title="Total Storage Miners"
        @time-select="handleTimeChange"
        :times="times"
        :activeIndex="2"
      />
    </div>
    <div
      class="line-chart"
      ref="line"
      v-loading="loading"
      element-loading-background="var(--board-bg-color)"
    ></div>
  </div>
</template>
<script>
let chart
import dayjs from "dayjs"
export default {
  name: "BlockReward",
  data() {
    return {
      xData: [],
      rewardList: [],
      pertList: [],
      selector: {
        type: "1m"
      },
      times: ["24h", "1w" ,"1m", "1y"],
      loading: false,
      prefix: "statistics.charts"
    }
  },
  methods: {
    handleTimeChange(v) {
      this.selector = v
    },
    drawChart() {
      const vm = this
      const rate = this.rate
      const { area, seriesItem, splitLine } = this.chartTheme.activeMiner
      const countLabel = this.$t("stats.mining.activeMiner.count")
      const isMobile = this.isMobile
      const color = this.theme === "light" ? "#333333" : "white"
      const option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xData,
          axisLabel: {
            show: true,
            fontSize: this.fontSize,
            margin: 20,
            color,
            formatter(v) {
              return dayjs
                .unix(v)
                .format(
                  vm.selector.type == "24h"
                    ? "HH:mm"
                    : vm.isEn
                    ? "MMM Do"
                    : "YYYY-MM-DD HH:mm"
                )
            }
          },
          axisLine: {
            lineStyle: {
              color: splitLine
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              fontSize: this.fontSize,
              color,
              margin: 16 * rate,
              formatter(v) {
                return v + " FIL/T"
              }
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: splitLine
              }
            }
          },
          {
            type: "value",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              fontSize: this.fontSize,
              color,
              margin: 16 * rate,
              formatter(v) {
                let num = vm.formatFilNum(v, true, true).split(" ")[0]
                let str = num.slice(0, 8)
                return Number(str)
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                type: "dashed",
                color: splitLine
              }
            }
          }
        ],
        legend: {
          data: vm.tr("blockReward.names"),
          icon: "circle",
          lineStyle: {
            color: color
          },
          textStyle: {
            fontSize: this.fontSize,
            color: color
          }
        },
        grid: {
          show: false,
          left: 120 * rate,
          right: 100 * rate,
          top: 40 * rate,
          bottom: 40 * rate
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,.6)",
          formatter(v) {
            let result = ""
            let time = dayjs
              .unix(v[0].name)
              .format(
                vm.selector.type == "24h"
                  ? "HH:mm"
                  : vm.isEn
                  ? "MMM Do"
                  : "YYYY-MM-DD HH:mm"
              )
            result = result + time
            v.forEach((item, index) => {
              if (index === 1) {
                let dataTmp = vm.formatFilNum(item.data, true).split(" ")
                item.data = Number(dataTmp[0]).toFixed(2) + " " + dataTmp[1]
              } else {
                item.data = Number(item.data).toFixed(6) + " FIL/T"
              }
              result +=
                "<br/>" + item.marker + item.seriesName + ": " + item.data
            })
            return result
          }
        },
        series: [
          {
            name: vm.tr("blockReward.names")[0],
            data: this.pertList,
            yAxisIndex: 0,
            type: "line",
            smooth: true,
            symbol: "none",
            itemStyle: {
              color: "#F3921B"
            }
          },
          {
            name: vm.tr("blockReward.names")[1],
            data: this.rewardList,
            type: "line",
            yAxisIndex: 1,
            smooth: true,
            symbol: "none",
            itemStyle: {
              color: "#0090FF"
            }
          }
        ]
      }
      chart.setOption(option)
    },
    async getBlockRewards() {
      try {
        this.loading = true
        let res = await this.$api.getBlockRewards([this.selector.type])
        let blockList = res.block_reward_list
        blockList.reverse()
        this.xData = []
        this.rewardList = []
        this.pertList = []
        let tmp = []
        blockList.map(item => {
          const { block_time, block_reward_per_t, net_block_rewards } = item
          this.xData.push(block_time)
          this.rewardList.push(net_block_rewards)
          this.pertList.push(block_reward_per_t)
          tmp.push(
            Number(
              this.formatFilNum(net_block_rewards, true).split(" ")[0]
            ).toFixed(4)
          )
        })
        this.loading = false
        this.drawChart()
      } catch (e) {
        this.loading = false
      }
    }
  },
  mounted() {
    if (!this.isEn) {
      this.selector.format = "MM-DD HH:mm"
    }
    chart = this.$chart.init(this.$refs.line)
    this.getBlockRewards()
    this.$bus.$on("window-resize", () => {
      chart.resize()
    })
  },
  watch: {
    selector() {
      this.getBlockRewards()
    },
    theme() {
      this.drawChart()
    }
  }
}
</script>
<style lang="scss" scoped>
.active-miner {
  padding: 0 !important;
  //   height: 356px;
  .line-chart {
    height: 314px;
    margin-top: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    border: 1px solid var(--border-line);
    box-sizing: border-box;
  }
  .title {
    font-size: var(--font-18);
    font-weight: 400;
  }
  .top {
    height: 80px;
    // padding: 0 20px;
  }
}
</style>
