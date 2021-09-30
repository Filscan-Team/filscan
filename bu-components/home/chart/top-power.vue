<template>
  <div class="top-power-chart flex column">
    <co-card style="margin: 0">
      <div slot="header" class="clearfix" style="width:100%;">
        <div class="title-con flex jus-between">
          <div class="font-500 flex-row subtitle-con">
            <img src="../../../assets/image/mobile/chartbackup@2x.png" class="icon-img"/>{{$t('home.chart.power.title')}}
            <el-popover
                    placement="bottom-start"
                    trigger="hover"
                    :content="tr('tips')"
            >
              <i
                      class="el-icon-warning-outline"
                      slot="reference"
                      style="margin-left:3px"
              ></i>
            </el-popover>
          </div>
          <co-view-more name="statistics-power" />
        </div>
      </div>
      <div ref="chart" class="chart-con"></div>
    </co-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
let chart
export default {
  name: "top-power-chart",
  data() {
    return {
      loading: false,
      series: [],
      selector: {
        time_diff: 1800,
        repeate_time: 48,
        format: "HH:mm"
      },
      legendData: [],
      selectedKey: "",
      powerType: "QualityAdjPower",
      prefix: "home.chart.power"
    }
  },
  methods: {
    ...mapActions("home",["fetchTotalPowerTrend"]),
    drawChart() {
      const vm = this
      const rate = this.rate
      const lightStyle = {
        lineStyle:"rgba(0,0,0,0.15)",
        splitLine: "rgba(0,0,0,0.15)",
        textStyle:"#333333",
        itemBorder: "#ffffff"
      }
      const blackStyle = {
        lineStyle:"rgba(255,255,255,0.15)",
        splitLine: "rgba(255,255,255,0.15)",
        textStyle:"#ffffff",
        itemBorder: "#ffffff"
      }
      const color = this.theme === "light" ? lightStyle : blackStyle
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
              color:color.textStyle
            },
            margin: this.fontSize
          },
          axisLine: {
            lineStyle: {
              color: color.splitLine
            }
          },
          lightStyle: {
            color:color.lineStyle
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
              color:color.textStyle
            },
            max: v => parseInt(v.max / 0.5),
            axisLabel: {
              formatter: "{value} PiB",
              textStyle: {
                fontSize: this.fontSize,
                color: color.textStyle
              }
            },
            axisLine: {
              show: false
            },
            axisTick:{
              show: false
            },
            splitLine: {
              show:false,
              lineStyle: {
                type: "dashed",
                color: color.splitLine
              }
            }
          },
          {
            type: "value",
            nameTextStyle: {
              color:color.textStyle
            },
            // min: v => Number(v.max - (v.max - v.min) / 0.6).toFixed(1),
            // max: v => Number(v.max / 0.8).toFixed(1),
            // interval: 1,
            axisLabel: {
              formatter: "{value} EiB",
              textStyle: {
                fontSize: this.fontSize,
                color:color.textStyle,
              }
            },
            axisTick:{
              show: false
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
          data: this.tr('yAxisName'),
          lineStyle:{
            color: '#ffffff'
          },
          textStyle:{
            fontSize: this.fontSize,
            color: color.textStyle
          },
          formatter(v){
            return v
          },
          icon: 'circle'
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
        ],
        grid: {
          left: 80 * rate,
          right: 60 * rate,
          top: 40 * rate,
          bottom: 40 * rate
        }
      }
      chart.setOption(option)
    },
    async getTotalPowerTrend() {
      let res = await this.$api.getTotalPowerTrend(['1m'])
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
    ...mapGetters("home", ["dataList", "powerList", "increasedList", "baselineList"]),
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
  position: relative;
  /*max-width: 750px;*/
  box-sizing: border-box;
  .title-con {
    .power-select {
      font-size: 12px;
      &::v-deep span {
        line-height: 17px;
        &.bottom-stripe {
          font-size: 14px;
          &::after {
            width: 26px;
            height: 2px;
            bottom: -6px;
          }
        }
        &:last-child {
          margin-left: 20px;
        }
      }
    }
    .subtitle-con{
       font-size: var(--font-18);
      .icon-img{
        margin: 3px 6px 3px 0;
        width: 16px;
        height: 16px;
      }
    }
  }
  .base-legend {
    margin-top: 20px;
  }
  .chart-con {
    padding: 30px 20px;
    display: flex;
    box-sizing: border-box;
    height: 386px;
  }
  .power-select {
    font-size: 14px;
    color: var(--main-text-color);
    span:last-child {
      margin-left: 30px;
    }
    span.bottom-stripe {
      font-size: 18px;
      color: var(--force-mark-color);
      &::after {
        bottom: -10px;
      }
    }
  }
}
@media (max-width: 768px) {
  .top-power-chart {
    border-radius: 0.8vw 0.8vw 0 0;
    .title-con {
      border-radius: 0.8vw 0.8vw 0 0;
    }
    .title {
      padding-left: 0;
      font-size: 3.733vw !important;
    }
    .chart-con {
      height: 60vw;
    }
  }
}
</style>
