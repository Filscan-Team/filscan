<template>
  <div class="miner-power flex column">
    <div class="top font-18 font-500 flex align-center jus-between">
      <span>{{ tr('title') }}</span>
      <co-time-select :times="times" @time-select="handleTimeChange" :drop="false" :activeIndex="1" />
    </div>
    <div class="power-trend" ref="chart" v-loading="loading"></div>
  </div>
</template>
<script>
let chart
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'
export default {
  name: 'MinerPower',
  data() {
    return {
      loading: false,
      times: ['1m', '1y'],
      powerList: [],
      increaseList: [],
      xData: [],
      selector: {
        format: 'HH:mm',
        type: '1y'
      },
      prefix: 'address.detail.minerPower'
    }
  },
  methods: {
    drawChart() {
      const vm = this
      const rate = this.rate
      const isMobile = this.isMobile
      const { splitLine } = this.chartTheme.activeMiner
      const countLabel = vm.tr('names')
      const margin = isMobile ? 10 : 20
      const dataValue = this.powerList.map((item) => item)
      const min = Math.min(...dataValue)
      const max = Math.max(...dataValue)
      const color = this.theme === 'light' ? '#333333' : 'white'
      const option = {
        xAxis: {
          type: 'category',
          data: this.xData,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#153550'
            }
          },
          axisLabel: {
            show: true,
            fontSize:this.fontSize,
            margin,
            color,
            formatter(v) {
              return dayjs.unix(v).format(vm.selector.type == '24h' ? 'HH:mm' : vm.isEn ? 'MMM Do' : 'MM-DD')
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
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              fontSize:this.fontSize,
              color,
              formatter(v) {
                // console.log(v)
                // let tmp = vm.sureunitConversion(v, 0, 4)
                // console.log(tmp)
                // return tmp
                return v + " TiB"
              },
              margin
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: splitLine
              }
            },
            // min: parseInt(0.95 * min),
            // max: parseInt(1.02 * max),
            nameTextStyle: {
              color,
              align: 'left',
              padding: [0, -margin]
            },
            nameGap: 22 * rate
          },
          {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              fontSize:this.fontSize,
              color,
              formatter() {
                return ''
              },
              margin
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: splitLine
              }
            },
            nameTextStyle: {
              color,
              align: 'left',
              padding: [0, -margin]
            },
            nameGap: 22 * rate
          }
        ],
        legend: {
          textStyle: {
            fontSize:this.fontSize,
            color: color
          },
          icon: 'circle'
        },
        grid: {
          show: false,
          left: 40 * rate,
          right: 40 * rate,
          top: 40 * rate,
          bottom: 40 * rate,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          position: 'right',
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
          backgroundColor: 'rgba(0,0,0,.6)'
        },
        series: [
          {
            data: this.powerList,
            type: 'line',
            yAxisIndex: 0,
            smooth: true,
            name: countLabel[0],
            symbolSize: (isMobile ? 2 : 6) * rate,
            itemStyle: {
              color: '#F6BD16'
            },
            lineStyle: {
              color: '#F6BD16'
            }
          },
          {
            data: this.increaseList,
            type: 'bar',
            yAxisIndex: 0,
            smooth: true,
            name: countLabel[1],
            symbolSize: (isMobile ? 2 : 6) * rate,
            itemStyle: {
              color: '#0090FF'
            },
            lineStyle: {
              color: '#0090FF'
            }
          }
        ]
      }
      if (this.isMobile) {
        option.tooltip.position = ['20%', '50%']
        option.grid = {
          show: false,
          left: 10 * rate,
          right: 20 * rate,
          top: 10 * rate,
          bottom: 10 * rate,
          containLabel: true
        }
      }
      chart.setOption(option)
    },
    async getMinerTrend() {
      let ComponentName = this.$route.name
      let miner = this.$route.query.address
      let bool = ComponentName === 'tipset-pool-detail'
      this.loading = true
      let err, res
      if (bool) {
        [ err, res] = await this.to(this.$api.getOrePoolCurve([this.selector.type, miner]))
      } else {
        [ err, res] = await this.to(this.$api.getMinerTrendInfo([miner, this.selector.type]))
      }

      if(err){
        this.loading = false
        return console.log(err)
      }

      if(res){
        this.loading = false
        if (!Array.isArray(res)) {
          return
        }
        res.reverse()
        this.xData = []
        this.powerList = []
        this.increaseList = []
        this.dataList = Object.freeze(
                res.map((item) => {
                  let { time, power, power_incr, block_time } = item
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
      }
    },
    handleTimeChange(v) {
      this.selector = v
    }
  },
  mounted() {
    chart = this.$chart.init(this.$refs.chart)
    this.$bus.$on('window-resize', () => {
      chart.resize()
      this.drawChart()
    })
    this.getMinerTrend()
  },
  computed: {
    ...mapGetters('tipset', ['workers']),
    ...mapGetters('app', ['addressInfo'])
  },
  watch: {
    selector() {
      this.getMinerTrend()
    },
    '$route.query.address'() {
      this.getMinerTrend()
    }
  }
}
</script>
<style lang="scss" scoped>
.miner-power {
  background-color: var(--content-bg-color);
  .top {
    padding: 10px 20px;
    font-size: var(--font-18);
    height: 40px;
    border-bottom: 1px solid var(--border-line);
  }
  .power-trend {
    padding-top: 28px;
    flex: 1;
  }
}
</style>
