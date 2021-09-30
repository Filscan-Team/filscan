<template>
  <div class="block-reward radius font-16 font-500 flex column">
    <co-card style="margin: 0">
      <div slot="header" class="clearfix" style="width: 100%">
        <div class="title">
          <div class="flex-row"><img src="../../../assets/image/mobile/trend@2x.png" class="icon-img" />{{ tr('title') }}</div>
          <co-view-more name="statistics-gas" />
        </div>
      </div>
      <div class="chart-con" ref="chart"></div>
    </co-card>
  </div>
</template>
<script>
// import dayjs from "dayjs"
import { mapActions } from 'vuex'
import ViewMore from '@/bu-components/home/ViewMore'
let chart
export default {
  name: 'block-reward',
  components: {
    ViewMore
  },
  data() {
    return {
      prefix: 'home.chart.blockReward',
      metaList: [
        {
          key: 'block_count'
        },
        {
          key: 'divider1'
        },
        {
          key: 'win_count'
        },
        {
          key: 'divider2'
        },
        {
          key: 'rewards',
          unit: 'FIL'
        }
      ],
      info: {
        block_count: 0,
        win_count: 0,
        rewards: 0
      },
      blockList: [],
      winCountList: [],
      rewardsList: [],
      feeList: [],
      gasList: [],
      gasList2: [],
      xOptions: [],
      yOptions: []
    }
  },
  computed: {
    metaListWithLabel() {
      return this.metaList.map((item, index) => {
        return {
          ...item,
          label: this.tr('meta')[index],
          value: this.info[item.key]
        }
      })
    }
  },
  methods: {
    ...mapActions('home', ['setBaseFeeList']),
    async getBaseFeeTrend() {
      let res = await this.$api.getBaseFeeTrend()
      let basefee = res.basefee_points
      this.setBaseFeeList(basefee)
      this.feeList = []
      this.gasList = []
      this.gasList2 = []
      this.xOptions = []
      basefee.map((item) => {
        const { base_fee, gas_cost_32g, gas_cost_64g, block_time } = item
        this.feeList.push(base_fee)
        this.gasList.push(gas_cost_32g)
        this.gasList2.push(gas_cost_64g)
        this.xOptions.push(this.formatDateTime(block_time, 'HH:mm'))
      })
      this.drawChart()
    },
    drawChart() {
      const vm = this
      // const isMobile = vm.isMobile
      const rate = vm.rate
      const lightStyle = {
        lineStyle: '',
        splitLine: 'rgba(0,0,0,0.15)',
        textStyle: '#333333',
        itemBorder: '#ffffff'
      }
      const blackStyle = {
        lineStyle: '',
        splitLine: 'rgba(255,255,255,0.15)',
        textStyle: '#ffffff',
        itemBorder: '#ffffff'
      }
      const color = this.theme === 'light' ? lightStyle : blackStyle
      const option = {
        xAxis: {
          type: 'category',
          data: this.xOptions,
          axisLabel: {
            textStyle: {
              fontSize: this.fontSize,
              color: color.textStyle
            }
          },
          splitLine: {
            lineStyle: {
              color: color.splitLine
            }
          },
          lightStyle: {
            color: color.splitLine
          },
          axisLine: {
            lineStyle: {
              color: color.lineStyle
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            min: 0,
            // max: (v) => {
            //   // let max = this.formatFilNum(v.max, true, false).split(" ")[0]
            //   return Number(v.max / 0.8).toFixed(1)
            // },
            axisLabel: {
              formatter(v) {
                if (v === 0) {
                  return 0
                }
                let value = Number(vm.formatFilNum(v, true, false).split(' ')[0])
                let unit = vm.formatFilNum(v, true, false).split(' ')[1]
                let  num = value > 1? 1:2
                return Number(value).toFixed(num) + ' ' + unit
              },
              textStyle: {
                fontSize: this.fontSize,
                color: color.textStyle
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: color.lineStyle
              }
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: color.splitLine
              }
            }
          },
          {
            type: 'value',
            min: 0,
            // max: v => {
            //   // let max = this.formatFilNum(v.max, true, false).split(" ")[0]
            //   return Number(v.max / 0.8).toFixed(1)
            // },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter(v) {
                // console.log(v)
                // if(v===0){
                //   return 0
                // }
                // return Number(v).toFixed(4) + " FIL/T"
                return v + ' FIL/T'
              },
              textStyle: {
                fontSize: this.fontSize,
                color: color.textStyle
              }
            },
            nameTextStyle: {
              color: '#ffffff'
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: color.lineStyle
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                type: 'dashed',
                color: color.splitLine
              }
            }
          }
        ],
        series: [
          {
            type: 'line',
            name: vm.tr('yAxisName')[0],
            data: this.feeList,
            smooth: true,
            itemStyle: {
              color: '#F6BD16',
              borderColor: '#F6BD16'
            },
            yAxisIndex: 0,
            markArea: {
              itemStyle: {
                color: '#F6BD16'
              }
            }
          },
          {
            type: 'line',
            name: vm.tr('yAxisName')[1],
            data: this.gasList,
            smooth: true,
            itemStyle: {
              color: '#5AD8A6',
              borderColor: '#5AD8A6'
            },
            yAxisIndex: 1,
            markArea: {
              itemStyle: {
                color: '#153550'
              }
            }
          },
          {
            type: 'line',
            name: vm.tr('yAxisName')[2],
            data: this.gasList2,
            smooth: true,
            itemStyle: {
              color: '#5B8FF9',
              borderColor: '#5B8FF9'
            },
            yAxisIndex: 1,
            markArea: {
              itemStyle: {
                color: '#153550'
              }
            }
          }
        ],
        legend: {
          data: this.tr('yAxisName'),
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
          left: 30 * rate,
          right: 30 * rate,
          top: 40 * rate,
          bottom: 40 * rate,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          formatter(v) {
            var result = v[0].name
            let data = v.map((item, index) => {
              const { data } = item
              // eslint-disable-next-line no-unused-vars
              if(index > 0){
                let unit = "FIL/T"
                let tmp = Number(data).toFixed(6)
                if(tmp<0.0001){
                  unit = 'nanoFIL/T'
                  tmp = Number(Number(data)*Math.pow(10,9)).toFixed(2)
                }
                return {
                  value: tmp,
                  unit: unit
                }
              }else{
                return {
                  unit: 'attoFIL',
                  value: data
                }
              }

            })
            v.forEach((item, index) => {
              if (item.data) {
                result +=
                        "<br/>" +
                        item.marker +
                        item.seriesName +
                        ": " +
                        data[index].value +
                        " " +
                        data[index].unit
              }
            })
            return result
          }
        }
      }
      chart.setOption(option)
    }
  },
  mounted() {
    chart = this.$chart.init(this.$refs.chart)
    this.getBaseFeeTrend()
    this.$bus.$on('window-resize', () => {
      chart.resize()
      this.drawChart()
    })
  },
  watch: {
    latestBlockHeight() {
      {
        if (this.loadCount === 1) {
          return
        }
        this.getBaseFeeTrend()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.block-reward {
  /*max-width: 580px;*/
  box-sizing: border-box;
  &::v-deep .title {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    font-size: var(--font-18);
  }
  .subtitle {
    margin-right: 5px;
  }
  .meta-list {
    padding: 0 30px;
    //margin-top: 10px;
    border: 1px solid var(--border-color);
    height: 34px;
    border-radius: 6px;
    & > div {
      &:nth-child(2),
      &:nth-child(4) {
        flex: 1;
        position: relative;
        &::after {
          position: absolute;
          content: '';
          width: 1px;
          height: 18px;
          background: var(--border-color);
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
      }
      .unit {
        margin-left: 3px;
      }
    }
  }
}
.chart-con {
  padding: 30px 0 0;
  box-sizing: border-box;
  height: 386px;
  & > div {
    height: 280px;
    margin-right: 15px;
    border-radius: 4px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
