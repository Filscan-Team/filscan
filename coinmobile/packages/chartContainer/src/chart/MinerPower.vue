<template>
  <div class="miner-power">
    <cm-card style="margin: 0">
      <div slot="header" class="clearfix">
        <div class="title">
          <div class="heading">{{ tr("title") }}</div>
<!--          <cm-time-select :times="times" @time-select="handleTimeChange" :drop="false" />-->
        </div>
      </div>
      <div class="power-trend" ref="chart"></div>
    </cm-card>
  </div>
</template>
<script>
let chart
import dayjs from "dayjs"
import { mapGetters } from "vuex"
export default {
  name: "MinerPower",
  data() {
    return {
      times: ["24h", "1m", "1y"],
      powerList: [],
      increaseList: [],
      xData: [],
      selector: {
        format: "HH:mm",
        type: "0.5y"
      },
      prefix: "address.detail.minerPower"
    }
  },
  methods: {
    drawChart() {
      const vm = this
      const rate = this.rate
      const isMobile = this.isMobile
      const { splitLine } = this.chartTheme.activeMiner
      const countLabel = vm.tr('names')
      const fontSize = (isMobile ? 9 : 12) * rate
      const margin = isMobile ? 10 : 20
      const color = this.theme === "light" ? "#333333" : "white"
      const option = {
        xAxis: {
          type: "category",
          data: this.xData,
          axisLine: {
            lineStyle: {
              color: "#153550"
            }
          },
          axisLabel: {
            show: true,
            fontSize,
            margin,
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
          lineStyle: {
            show: false
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
            fontSize,
            color,
            formatter(v) {
              // return vm.unitConversion(v, 2)
              return v + " TiB"
            },
            margin
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: splitLine
            }
          },
          nameTextStyle: {
            color,
            align: "left",
            padding: [0, -margin]
          },
          nameGap: 22 * rate
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
              fontSize,
              color,
              formatter() {
                return ""
              },
              margin
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: splitLine
              }
            },
            nameTextStyle: {
              color,
              align: "left",
              padding: [0, -margin]
            },
            nameGap: 22 * rate
          },
        ],
        grid: {
          left: 20 * rate,
          right: 20 * rate,
          top: 50 * rate,
          bottom: 20 * rate,
          containLabel: true
        },
        legend: {
        	top: 10,
          textStyle: {
            color: color
          }
        },
        tooltip: {
          trigger: "axis",
          position: "right",
          formatter(v) {
            let x = dayjs.unix(v[0].name).format('YYYY-MM-DD HH:mm')
            console.log(x)
            var result = x
            v.forEach((item) => {
              if (item.data) {
                result += '<br/>' + item.marker + item.seriesName + ': ' + item.data + ' TiB'
              }
            })
            return result
          },
          backgroundColor: "rgba(0,0,0,.6)"
        },
        series: [
          {
            data: this.powerList,
            type: "line",
            smooth: true,
            yAxisIndex: 0,
            name: countLabel[0],
            symbolSize: (isMobile ? 2 : 6) * rate,
            symbol: "circle",
            itemStyle: {
              color: "#F6BD16",
            },
            lineStyle: {
              color: "#F6BD16"
            }
          },
          {
            data: this.increaseList,
            type: "bar",
            yAxisIndex: 0,
            smooth: true,
            name: countLabel[1],
            symbolSize: (isMobile ? 2 : 6) * rate,
            itemStyle: {
              color: "#0090FF",
            },
            lineStyle: {
              color: "#0090FF"
            }
          }
        ]
      }
      if (this.isMobile) {
        option.tooltip.position = ["20%", "50%"]
      }
      chart.setOption(option)
    },
    async getMinerTrend() {
      let res
      const { actor } = this.addressInfo
      let ComponentName = this.$route.name
      console.log(ComponentName)
      let miner = this.$route.query.address
      let bool = ComponentName === 'mobile-tipset-pool-detail'
      if (bool) {
        res = await this.$api.getOrePoolCurve([this.selector.type, miner])
      } else {
        res = await this.$api.getMinerTrendInfo([miner, this.selector.type])
      }

      if (!Array.isArray(res)) {
        return
      }
      res.reverse()
      this.xData = []
      this.powerList = []
      this.increaseList = []
      this.dataList = Object.freeze(
              res.map(item => {
                let { time , power, power_incr, block_time } = item
                let times = bool ? block_time : time
                this.xData.push(times)
                power = power === null? "0": power
                power_incr = power_incr === null? "0": power_incr
                power = this.sureunitConversion(power, 0, 4).split(' ')[0]
                power_incr = this.sureunitConversion(power_incr, 0, 4).split(' ')[0]
                this.powerList.push(power)
                this.increaseList.push(power_incr)
              })
      )
      this.drawChart()
    },
    handleTimeChange(v) {
      this.selector = v
    }
  },
  mounted() {
    chart = this.$chart.init(this.$refs.chart)
    this.$bus.$on("window-resize", () => {
      chart.resize()
      this.drawChart()
    })
    this.getMinerTrend()
  },
  computed: {
    ...mapGetters('tipset', ['workers']),
    ...mapGetters('app', ['addressInfo']),
  },
  watch: {
    selector() {
      this.getMinerTrend()
    },
    "$route.query.address"() {
      this.getMinerTrend()
    }
  }
}
</script>
<style lang="scss" scoped>
.miner-power {
    margin-bottom: 20px;
    padding: 20px;
  .clearfix{
    font-weight: 400;
    font-size: 22px;
  }
    .top {
      height: 60px;
      padding-left: 20px;
      font-size: 20px;
      span {
        font-size: 28px;
      }
      &::v-deep .time-selector {
        padding: 0;
      }
    }
  &::v-deep .power-trend {
    height: 383px;
    flex: 1;
  }
}
</style>
