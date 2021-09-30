<template>
  <div class="top-power-chart flex column">
    <cm-card class="power-card">
      <div slot="header" class="clearfix powerheader flex jus-between" style="width: 100%">
        <div class="font-500" :class="{
          'padding-head': $route.name==='mobile-statistics-power'
        }">
          {{ $t("home.chart.power.title") }}
          <el-popover
            placement="bottom"
            trigger="hover"
            :content="tr('tips')"
            width="300"
          >
            <i
              class="el-icon-warning-outline"
              slot="reference"
              style="margin-left:3px"
            ></i>
          </el-popover>
        </div>
        <div style="margin-top: 4px" v-if="!moreflag">
          <cm-time-select
                  title="Total Storage Miners"
                  @time-select="handleTimeChange"
                  :times="times"
                  time="1m"
                  :activeIndex="0"
          />
        </div>
        <view-more name="mobile-statistics-power" class="more" v-if="moreflag" />
      </div>
      <div ref="chart" class="chart-con"></div>
    </cm-card>
  </div>
</template>
<script>
import ViewMore from "../../../viewMore/src/index"
import { mapGetters, mapActions } from "vuex"
let chart
export default {
  name: "PowerTrend",
  components: {
    ViewMore
  },
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
      times: ['1m','1y'],
      legendData: [],
      selectedKey: "",
      powerType: "QualityAdjPower",
      prefix: "home.chart.power",
      moreflag: true,
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
      const splitLineColor = this.chartTheme.provenPower.splitLine
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
              fontSize: (isMobile ? 12 : 12) * rate,
              color: color.textStyle
            },
            margin: (isMobile ? 10 : 20) * rate
          },
          axisLine: {
            lineStyle: {
              color: splitLineColor
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
              color: color.textStyle
            },
            max: v => parseInt(v.max / 0.5),
            axisLabel: {
              formatter: "{value} PiB",
              textStyle: {
                color
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: color.lineStyle
              }
            }
          },
          {
            type: "value",
            nameTextStyle: {
              color: color.textStyle
            },
            min: v => Number(v.max - (v.max - v.min) / 0.6).toFixed(1),
            max: v => Number(v.max / 0.9).toFixed(1),
            // interval: 1,
            axisLabel: {
              formatter: "{value} EiB",
              textStyle: {
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
              type: "dashed",
              lineStyle: {
                color: "#153550"
              }
            }
          }
        ],
        legend: {
          data: this.tr("yAxisName"),
					itemWidth: 11,
          // lineStyle: {
          //   color: "#333333"
          // },
          // textStyle: {
          //   color: "#333333"
          // },
          formatter(v) {
            return v
          }
        },
        grid: {
          left: 10 * rate,
          right: 16 * rate,
          top: 50 * rate,
          bottom: 15 * rate,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          },
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
            symbol: "circle",
            yAxisIndex: 1,
            data: this.powerList,
            itemStyle: {
              color: "#F6BD16",
              borderColor: "#F6BD16"
            },
            lineStyle: {
              color: "#F6BD16"
            }
          },
          {
            name: vm.tr("yAxisName")[1],
            type: "line",
            symbol: "circle",
            yAxisIndex: 1,
            data: this.baselineList,
            itemStyle: {
              color: "#5AD8A6",
              borderColor: "#5AD8A6"
            },
            lineStyle: {
              color: "#5AD8A6"
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
    this.moreflag = this.$route.name ==='mobile-statistics-power'?false:true
    chart = this.$chart.init(this.$refs.chart)
    // this.getTopMiner()
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
<style  lang="scss">
  /*.mobile-content-container &::v-deep .el-popover{*/
  /*  width: 400px!important;*/
  /*  white-space: normal;*/
  /*}*/
</style>
<style scoped lang="scss">
.top-power-chart {
  border-radius: 6px 6px 0 0;
  .power-card {
    margin: 0 20px !important;
    .powerheader {
      display: flex;
      flex-direction: row;
			font-size: 22px;
      .padding-head{
        padding-top: 20px;
      }
      .more {
        width: 400px;
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
    display: flex;
    width: 100%;
    height: 450px;
    padding-top: 20px;
    flex: 1;
    // box-sizing: border-box;
  }
}
</style>
