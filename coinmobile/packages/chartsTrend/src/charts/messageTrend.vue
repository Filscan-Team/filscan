<template>
  <div class="active-miner bottom-20 flex column">
    <cm-card>
      <div class="clearfix" slot="header">
        <div class="title">
          <div class="heading">{{ tr("messageTitle") }}</div>
        </div>
        <cm-time-select
          title="Total Storage Miners"
          @time-select="handleTimeChange"
          :times="times"
          :activeIndex="1"
        />
      </div>
      <div
        class="line-chart"
        ref="line"
        v-loading="loading"
        element-loading-background="var(--board-bg-color)"
      ></div>
    </cm-card>
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
      const { splitLine } = this.chartTheme.activeMiner
      const isMobile = this.isMobile
      const color = this.theme === "light" ? "black" : "white"
      const option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xData,
          axisLabel: {
            show: true,
            fontSize: (isMobile ? 9 : 12) * rate,
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
                    : "MM-DD"
                )
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
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
              fontSize: (isMobile ? 9 : 12) * rate,
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
              fontSize: (isMobile ? 9 : 12) * rate,
              color,
              margin: 16 * rate
            },
            splitLine: {
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
            color: color
          }
        },
        grid: {
          show: false,
          left: 40 * rate,
          right: 80 * rate,
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
                  : "MM-DD"
              )
            let result = time
            v.forEach(item => {
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
              color: "#32BDC5"
            }
          }
        ]
      }
      chart.setOption(option)
    },
    async getActiveMinerCount() {
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
    this.getActiveMinerCount()
    this.$bus.$on("window-resize", () => {
      chart.resize()
    })
  },
  watch: {
    selector() {
      this.getActiveMinerCount()
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
  height: 500px;
  .line-chart {
    height: 400px;
    margin-top: 0;
  }
  .top {
    height: 80px;
    padding: 0 20px;
    border-bottom: 1px solid var(--border-color);
  }
  ::v-deep .clearfix {
    display: flex;
    flex-direction: row;
    .title {
      width: 500px;
    }
    .time-selector {
      height: 44px;
    }
    .selected {
      padding: 0 15px;
    }
  }
}
</style>
