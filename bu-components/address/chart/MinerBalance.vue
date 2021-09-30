<template>
  <div class="miner-power flex column">
    <div class="top font-500 flex align-center jus-between">
      <span>{{ tr('title') }}</span>
      <!--            <co-time-selector @time-select="handleTimeChange" :drop="false" />-->
    </div>
    <div class="power-trend" ref="chart"></div>
  </div>
</template>
<script>
let chart
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'
export default {
  name: 'MinerBalance',
  data() {
    return {
      dataList: [],
      xData: [],
      availableList: [],
      pledgeList: [],
      depositsList: [],
      lockedList: [],
      selector: {
        format: 'HH:mm',
        type: '0.5y'
      },
      prefix: 'address.detail.minerBalance'
    }
  },
  methods: {
    drawChart() {
      const vm = this
      const rate = this.rate
      const isMobile = this.isMobile
      const { splitLine } = this.chartTheme.activeMiner
      const countLabel = this.$root.$t('address.detail.minerBalance.tooltip')
      const fontSize = this.fontSize
      const margin = isMobile ? 10 : 20
      const data = this.dataList
      const dataValue = data.map((item) => item.value)
      const min = Math.min(...dataValue)
      const max = Math.max(...dataValue)
      const color = this.theme === 'light' ? '#333333' : 'white'
      const option = {
        xAxis: {
          type: 'category',
          data: this.xData,
          axisLine: {
            lineStyle: {
              color: '#153550'
            }
          },
          axisLabel: {
            show: true,
            fontSize,
            margin,
            color,
            formatter(v) {
              return dayjs.unix(v).format(vm.selector.type == '24h' ? 'HH:mm' : vm.isEn ? 'MMM Do' : 'YYYY-MM-DD HH:mm')
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
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
              return v + ' FIL'
            },
            margin
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: splitLine
            }
          },
          // name: vm.tr("chart.title"),
          nameTextStyle: {
            color,
            align: 'left',
            padding: [0, -margin]
          },
          nameGap: 22 * rate
        },
        legend: {
          data: countLabel,
          textStyle: {
            fontSize,
            color: color
          },
          icon: 'circle'
        },
        grid: {
          show: false,
          left: 40 * rate,
          right: 60 * rate,
          top: 40 * rate,
          bottom: 40 * rate,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          position: 'right',
          formatter(p) {
            let result = []
            p.map((item, index) => {
              const { data, marker, seriesName, axisValue } = item
              let time = dayjs.unix(axisValue).format('YYYY-MM-DD HH:mm')
              if (index === 0) {
                result.push(`<div>${time}</div>`)
              }
              result.push(vm.tr('chart.tooltip', { marker, name: seriesName, value: data }))
            })
            return result.join('')
          },
          backgroundColor: 'rgba(0,0,0,.6)'
        },
        series: [
          {
            data: this.availableList,
            type: 'line',
            smooth: true,
            //symbol: 'none',
            name: countLabel[0],
            symbolSize: (isMobile ? 2 : 6) * rate,
            itemStyle: {
              color: '#f7c739'
            },
            lineStyle: {
              color: '#f7c739'
            }
          },
          {
            data: this.pledgeList,
            type: 'line',
            smooth: true,
            //symbol: 'none',
            name: countLabel[1],
            symbolSize: (isMobile ? 2 : 6) * rate,
            itemStyle: {
              color: '#5ad8a6'
            },
            lineStyle: {
              color: '#5ad8a6'
            }
          },
          {
            data: this.depositsList,
            type: 'line',
            smooth: true,
            //symbol: 'none',
            name: countLabel[2],
            symbolSize: (isMobile ? 2 : 6) * rate,
            itemStyle: {
              color: '#5b8ff9'
            },
            lineStyle: {
              color: '#5B8FF9'
            }
          },
          {
            data: this.lockedList,
            type: 'line',
            smooth: true,
            //symbol: 'none',
            name: countLabel[3],
            symbolSize: (isMobile ? 2 : 6) * rate,
            itemStyle: {
              color: '#9270ca'
            },
            lineStyle: {
              color: '#9270ca'
            }
          }
        ]
      }
      if (this.isMobile) {
        option.tooltip.position = ['20%', '50%']
        option.grid = {
          show: false,
          left: 20 * rate,
          right: 20 * rate,
          top: 10 * rate,
          bottom: 20 * rate,
          containLabel: true
        }
      }
      chart.setOption(option)
    },
    async getMinerTrend() {
      let res
      let ComponentName = this.$route.name
      let miner = this.$route.query.address
      let bool = ComponentName === 'tipset-pool-detail'
      let options = {
        miner: miner,
        interval: this.selector.type
      }
      if (bool) {
        const { miner, interval } = options
        res = await this.$api.getOrePoolCurve([interval, miner])
        res.reverse()
      } else {
        const { miner, interval } = options
        res = await this.$api.getMinerBalanceBalanceTrend([[miner], interval])
      }
      if (!Array.isArray(res)) {
        return
      }
      this.xData = []
      this.availableList = []
      this.pledgeList = []
      this.depositsList = []
      this.lockedList = []
      res.map((item) => {
        const { block_time, InitialPledge, LockedFunds, PreCommitDeposits, available_balance } = item
        this.xData.push(block_time)
        this.availableList.push(Number(this.formatFilNum(available_balance, true, true)).toFixed(2))
        this.pledgeList.push(Number(this.formatFilNum(InitialPledge, true, true)).toFixed(2))
        this.depositsList.push(Number(this.formatFilNum(PreCommitDeposits, true, true)).toFixed(2))
        this.lockedList.push(Number(this.formatFilNum(LockedFunds, true, true)).toFixed(2))
      })
      this.dataList = Object.freeze(
        res.map((item) => {
          const { time: name, power } = item
          return {
            name,
            value: power
          }
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
    display: flex;
    box-sizing: border-box;
    padding-top: 28px;
    flex: 1;
  }
}
</style>
