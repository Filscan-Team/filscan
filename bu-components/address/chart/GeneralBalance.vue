<template>
  <div class="miner-power flex column">
    <div class="top font-18 font-500 flex align-center jus-between">
      <span>{{ tr('title') }}</span>
      <co-time-select @time-select="handleTimeChange" :times="times" :drop="false" />
    </div>
    <div class="power-trend border-outline" ref="blancechart"></div>
  </div>
</template>
<script>
let chart
import { mapGetters } from 'vuex'
export default {
  name: 'GeneralBalance',
  data() {
    return {
      generalOptions: {
        type: '24h',
        address: ''
      },
      times: ['24h', '1w', '1m', '1y'],
      balanceUnit: '',
      dataList: [],
      feeList: [],
      xOptions: [],
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
  // props:{
  //     address: {
  //         type: Array
  //     }
  // },
  methods: {
    drawChart() {
      const vm = this
      const rate = vm.rate
      // const color = this.theme === 'light' ? 'black' : 'white'
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
      const multiple = this.isMobile ? 16 : 40
      const balance = this.$t('address.detail.minerBalance.balance')
      const option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xOptions,
          axisLabel: {
            textStyle: {
              fontSize: this.fontSize,
              color: color.textStyle
            },
            margin: 20
          },
          splitLine: {
            lineStyle: {
              color: color.lineStyle
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: color.lineStyle
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: [
          {
            type: 'value',
            min: 0,
            axisLabel: {
              formatter: `{value} ${vm.balanceUnit}`,
              textStyle: {
                fontSize: this.fontSize,
                color: color.textStyle
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#153550'
              }
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: color.splitLine
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            type: 'line',
            data: this.feeList,
            smooth: true,
            itemStyle: {
              color: '#00E5FF'
            },
            yAxisIndex: 0,
            markArea: {
              itemStyle: {
                color: '#153550'
              }
            }
          }
        ],
        grid: {
          left: 10 * rate,
          right: multiple * rate,
          top: 20 * rate,
          bottom: 15 * rate,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          formatter(v) {
            var result = v[0].name
            v.forEach((item) => {
              if (item.data!==0) {
                result += '<br/>' + item.marker + balance + Number(item.data).toFixed(2) + vm.balanceUnit
              }else{
                result += '<br/>' + item.marker + balance + item.data
              }
            })
            return result
          }
        }
      }
      chart.setOption(option)
    },
    async getGeneralAddressBalanceTrend(add) {
      this.generalOptions.address = add
      let { address, type } = this.generalOptions
      let res = await this.$api.getGeneralAddressBalanceTrend([address, type])
      res.reverse()
      if (res && Array.isArray(res)) {
        let tmp = res.filter((item) => item.balance !== '0')
        this.balanceUnit = tmp.length > 0 ? this.formatFilNum(Number(tmp[0].balance), true, false).split(' ')[1] : 'FIL'
      }
      this.feeList = res.map((item) => {
        return item.balance === '0' ? Number(item.balance) : Number(this.formatFilNum(Number(item.balance), true, false).split(' ')[0])
      })
      let timeStr = type === '24h' ? 'HH:mm' : 'YYYY-MM-DD HH:mm'
      this.xOptions = res.map((item) => this.formatDateTime(item.block_time, timeStr))
      // chart = this.$chart.init(this.$refs.blancechart)
      this.drawChart()
    },
    handleTimeChange(v) {
      v.address = this.generalOptions.address
      this.generalOptions = v
    }
  },
  mounted() {
    chart = this.$chart.init(this.$refs.blancechart)
    this.$bus.$on('window-resize', () => {
      chart.resize()
      this.drawChart()
    })
    this.generalOptions.address = this.$route.query.address
    this.getGeneralAddressBalanceTrend(this.generalOptions.address)
  },
  computed: {
    ...mapGetters('tipset', ['workers'])
  },
  watch: {
    generalOptions() {
      this.getGeneralAddressBalanceTrend(this.generalOptions.address)
    },
    '$route.query.address'() {
      this.generalOptions.address = this.$route.query.address
      this.getGeneralAddressBalanceTrend(this.generalOptions.address)
    }
  }
}
</script>
<style lang="scss" scoped>
.miner-power {
  background-color: var(--content-bg-color);
  padding: 0 20px 20px;
  .top {
    height: 60px;
    line-height: 22px;
    font-size: 16px;
    font-weight: 400;
  }
  .power-trend {
    height: 400px;
    padding: 10px 20px;
    box-sizing: border-box;
  }
}
</style>
