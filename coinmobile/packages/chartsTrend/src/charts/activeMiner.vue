<template>
  <div class="active-miner bottom-20 flex column">
    <cm-card>
      <div class="clearfix" slot="header">
        <div class="title">
          <div class="heading">{{ tr("minerTitle") }}</div>
        </div>
        <cm-time-select
          title="Total Storage Miners"
          :times="times"
          @time-select="handleTimeChange"
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
  name: "ActiveMiner",
  data() {
    return {
      counts: [],
      selector: {
        type: "24h"
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
      const countLabel = this.$t("more.stats.activeMiner.count")
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
            fontSize: 9 * rate,
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
            fontSize: 9 * rate,
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
            fontSize: 9 * rate,
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
          left: 50 * rate,
          right: 20 * rate,
          top: 20 * rate,
          bottom: 40 * rate
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,.6)",
          formatter(yValues) {
            const { data, axisValueLabel } = yValues[0]
            let str = `<div>${dayjs
              .unix(axisValueLabel)
              .format(
                'YYYY-MM-DD HH:mm'
              )} <br/><span class='left-10'>${countLabel}${
              data.value
            }</span></div>`
            return str
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
              color: seriesItem,
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
