<template>
  <div class="top-power-chart flex column">
    <co-card class="power-card" style="margin:0" :isPaddingBorderBottom="true">
      <div slot="header" class="clearfix powerheader jus-between">
        <div class="header-title font-500">
          {{ $t("home.chart.power.title") }}
          <el-popover
            placement="bottom-start"
            trigger="hover"
            :content="tr('tips')"
          >
            <i
              class="el-icon-warning-outline font-18"
              slot="reference"
              style="margin-left:3px"
            ></i>
          </el-popover>
        </div>
        <co-time-select
                title="Total Storage Miners"
                @time-select="handleTimeChange"
                :times="times"
        />
      </div>
      <div ref="chart" class="chart-con"></div>
    </co-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
let chart
export default {
  name: "CoPowerTrend",
  data() {
    return {
      loading: false,
      series: [],
      selector: {
        time_diff: 1800,
        repeate_time: 48,
        format: "HH:mm"
      },
      time: '1m',
      legendData: [],
      times: ['1m','1y'],
      selectedKey: "",
      powerType: "QualityAdjPower",
      prefix: "home.chart.power"
    }
  },
  methods: {
    ...mapActions("home", ["fetchTotalPowerTrend"]),
    handleTimeChange(v) {
      this.time = v.type
    },
    drawChart() {
      const vm = this
      const rate = this.rate
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
      // const splitLineColor = this.chartTheme.provenPower.splitLine
      const isMobile = this.isMobile
      const legendData = this.legendData
      const selected = {}
      legendData.forEach(item => {
        if (!this.selectedKey) {
          selected[item.name] = true
        } else {
          selected[item.name] = item.name === this.selectedKey
        }
      })
      const option = {
        xAxis: {
          type: "category",
          data: this.dataList,
          axisLabel: {
            textStyle: {
              fontSize: this.fontSize,
              color: color.textStyle
            },
            margin: (isMobile ? 10 : 10) * rate
          },
          axisLine: {
            lineStyle: {
              color: color.lineStyle
            }
          },
          axisTick: {
            show: false
          }
          // boundaryGap: false
        },
        yAxis: [
          {
            type: "value",
            nameTextStyle: {
              color: color.lineStyle
            },
            max: v => parseInt(v.max / 0.5),
            axisLabel: {
              formatter: "{value} PiB",
              textStyle: {
                fontSize: this.fontSize,
                color: color.textStyle
              }
            },
            axisTick: {
              show: false
            },

            axisLine: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                type: "dashed",
                color: color.splitLine
              }
            }
          },
          {
            type: "value",
            // min: v => Number(v.max - (v.max - v.min) / 0.6).toFixed(1),
            // max: v => Number(v.max / 0.9).toFixed(1),
            // interval: 1,
            axisLabel: {
              formatter: "{value} EiB",
              textStyle: {
                fontSize: this.fontSize,
                color: color.textStyle
              }
            },
            axisTick: {
              show: false
            },
            nameTextStyle: {
              color: "#ffffff"
            },
            axisLine: {
              show: false
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: color.splitLine
              }
            }
          }
        ],
        legend: {
          data: this.tr("yAxisName"),
          lineStyle: {
            color: color.lineStyle
          },
          textStyle: {
            fontSize: this.fontSize,
            color: color.textStyle
          },
          formatter(v) {
            return v
          },
          icon: 'circle'
        },
        grid: {
          left: 10 * rate,
          right: 15 * rate,
          top: 48 * rate,
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
            var result = v[0].name
            var options = ["EiB", "EiB", "PiB"]
            v.forEach((item) => {
              if (item.data) {
                result +=
                  "<br/>" +
                  item.marker +
                  item.seriesName +
                  ": " +
                  item.data +
                  " " +
                  options[item.componentIndex]
              }
            })
            return result
          }
        },
        series: [
          {
            name: vm.tr("yAxisName")[0],
            type: "line",
            yAxisIndex: 1,
            data: this.powerList,
            smooth: true,
            itemStyle: {
              color: "#F6BD16",
              borderColor: "#F6BD16"
            },
            lineStyle: {
              color: "#F6BD16"
            },
            markArea: {
              itemStyle: {
                color: "#153550"
              }
            }
          },
          {
            name: vm.tr("yAxisName")[1],
            type: "line",
            yAxisIndex: 1,
            smooth: true,
            data: this.baselineList,
            itemStyle: {
              color: "#5AD8A6",
              borderColor: "#5AD8A6"
            },
            lineStyle: {
              color: "#5AD8A6"
            },
            markArea: {
              itemStyle: {
                color: "#ffffff"
              }
            }
          },
          {
            name: vm.tr("yAxisName")[2],
            type: "bar",
            data: this.increasedList,
            yAxisIndex: 0,
            smooth: true,
            itemStyle: {
              color: "#5B8FF9"
            }
          }
        ]
      }
      chart.setOption(option)
    },
    async getTotalPowerTrend() {
      let res = await this.$api.getTotalPowerTrend([this.time])
      this.fetchTotalPowerTrend(res)
      this.drawChart()
    },
    handleSelect(key) {
      this.selectedKey = key === this.selectedKey ? "" : key
    },
    handleLegendSelect(v) {
      this.selectedKey = v
      this.$emit("update:legendSelect", !!v)
    }
  },
  mounted() {
    chart = this.$chart.init(this.$refs.chart)
    this.getTotalPowerTrend()
    this.$bus.$on("window-resize", () => {
      chart.resize()
      this.drawChart()
    })
    this.$bus.$on("miner-select", miner => {
      this.drawChart(miner)
    })
    this.$bus.$on("miner-select-single", miner => {
      this.selectedKey = miner
    })
  },
  watch: {
    time() {
      this.getTotalPowerTrend()
    },
    selectedKey() {
      this.drawChart()
    },
    theme() {
      this.drawChart()
    },
    latestBlockHeight() {
      {
        if (this.loadCount === 1) {
          return
        }
        // this.getTopMiner()
      }
    },
    powerType() {
      // this.getTopMiner()
    }
  },
  computed: {
    ...mapGetters("home", [
      "dataList",
      "powerList",
      "increasedList",
      "baselineList"
    ]),
    selectOptions() {
      return this.$t("home.topPowerChartLabel").map(item => {
        return item
      })
    }
  }
}
</script>
<style scoped lang="scss">
.top-power-chart {
  border-radius: 6px 6px 0 0;
  .power-card {
    .powerheader {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .font-16 {
        font-size: 14PX;
      }
      .more {
        display: flex;
        flex: 1;
        justify-content: flex-end;
      }
    }
  }
  .title-con {
    border-radius: 6px 6px 0 0;
  }
  .title {
    padding-left: 0;
    font-size: 28px !important;
  }
  .chart-con {
    padding-top: 16px;
    display: flex;
    width: 100%;
    height: 300px;
    flex: 1;
    border: 1px solid var(--border-color);
  }
}
  .header-title{
  font-size: var(--font-18);
}
</style>
