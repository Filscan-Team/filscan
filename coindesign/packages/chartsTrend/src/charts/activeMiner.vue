<template>
  <div class="active-miner bottom-20 flex column">
    <div class="top flex align-center jus-between">
      <span class="title"> {{ tr("minerTitle") }} </span>
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
  name: "ActiveMiner",
  data() {
    return {
      counts: [],
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
      const countLabel = vm.$t("more.stats.activeMiner.count")
      const isMobile = this.isMobile
      const data = this.counts
      const xData = data.map(item => item.name)
      const color = this.theme === "light" ? "black" : "white"
      const option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xData,
          axisLabel: {
            show: true,
            // fontSize: 9 * rate,
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
        yAxis: {
          type: "value",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            // fontSize: 9 * rate,
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
        legend: {
          selectedMode: false,
          data: [{ name: countLabel }],
          icon: "circle",
          left: 50 * rate,
          textStyle: {
            fontSize: this.fontSize,
            color
          },
          show: false
        },
        // grid: {
        //   left: 60 * rate,
        //   right: 40 * rate,
        //   top: 20 * rate,
        //   bottom: 55 * rate
        // },
        grid: {
          show: false,
          left: 80 * rate,
          right: 80 * rate,
          top: 40 * rate,
          bottom: 40 * rate
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,.6)",
          formatter(v) {
            let result = ""
            v.forEach(item => {
              let time = dayjs
                .unix(item.name)
                .format(
                  vm.selector.type == "24h"
                    ? "HH:mm"
                    : vm.isEn
                    ? "MMM Do"
                    : "YYYY-MM-DD HH:mm"
                )
              result = result + time
              result +=
                "<br/>" + item.marker + item.seriesName + ": " + item.value
            })
            return result
          }
        },
        series: [
          {
            data: data,
            type: "line",
            smooth: true,
            symbol: "none",
            name: countLabel,
            itemStyle: {
              //   color: seriesItem,
              color: "#0090FF",
              backgroundColor: "#ffffff"
            }
            // areaStyle: {
            //     color: area
            // }
          }
        ]
      }
      chart.setOption(option)
    },
    async getActiveMinerCount() {
      try {
        this.loading = true
        // let res = await getActiveMinerCount(this.selector.type)
        let res = await this.$api.getActiveMinerTrend([this.selector.type])
        const data = res.map(item => {
          return {
            name: item.time,
            value: item.count
          }
        })
        data.reverse()
        data.pop()
        this.counts = Object.freeze(data)
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
