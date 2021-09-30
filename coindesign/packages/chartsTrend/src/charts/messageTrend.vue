<template>
  <div class="active-miner bottom-20 flex column">
    <div class="top flex align-center jus-between">
      <span class="title">
        {{ tr("messageTitle") }}
      </span>
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
  name: "MessageTrend",
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
              margin: 16 * rate
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
              margin: 16 * rate
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
          data: vm.tr("MessageTrend.names"),
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
          left: 80 * rate,
          right: 120 * rate,
          top: 40 * rate,
          bottom: 40 * rate
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,.6)",
          formatter(v) {
            let time = dayjs
              .unix(v[0].name)
              .format(
                vm.selector.type == "24h"
                  ? "HH:mm"
                  : vm.isEn
                  ? "MMM Do"
                  : "YYYY-MM-DD HH:mm"
              )
            let result = time
            v.forEach((item, index) => {
              if (item.data) {
                result +=
                  "<br/>" + item.marker + item.seriesName + ": " + item.data
              }
            })
            return result
          }
        },
        series: [
          {
            name: vm.tr("MessageTrend.names")[0],
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
            name: vm.tr("MessageTrend.names")[1],
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
    async getMessageCount() {
      try {
        this.loading = true
        let res = await this.$api.getMessageCount([this.selector.type])
        let blockList = res.msg_count_list
        blockList.reverse()
        this.xData = []
        this.rewardList = []
        this.pertList = []
        blockList.map(item => {
          const { block_time, all_msg_count, msg_count_per_block } = item
          this.xData.push(block_time)
          this.rewardList.push(all_msg_count)
          this.pertList.push(msg_count_per_block)
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
    this.getMessageCount()
    this.$bus.$on("window-resize", () => {
      chart.resize()
    })
  },
  watch: {
    selector() {
      this.getMessageCount()
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
  //   height: 314px;
  .line-chart {
    height: 314px;
    margin-top: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    box-sizing: border-box;
    border: 1px solid var(--border-line);
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
