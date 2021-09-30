<template>
  <div class="block-reward radius font-16 font-500 flex column">
    <card>
      <div slot="header" class="clearfix">
        <div class="title">
          <div class="heading">{{ tr("title") }}</div>
          <view-more name="mobile-statistics-gas" class="more" />
        </div>
      </div>
      <div class="chart-con" ref="chart"></div>
    </card>
  </div>
</template>
<script>
import Card from "../../../card/src/index"
import { mapActions } from "vuex"
import ViewMore from "../../../viewMore/src/index"
let chart
export default {
  name: "GasTrend",
  components: {
    ViewMore,
    Card
  },
  data() {
    return {
      prefix: "home.chart.blockReward",
      metaList: [
        {
          key: "block_count"
        },
        {
          key: "divider1"
        },
        {
          key: "win_count"
        },
        {
          key: "divider2"
        },
        {
          key: "rewards",
          unit: "FIL"
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
          label: this.tr("meta")[index],
          value: this.info[item.key]
        }
      })
    }
  },
  methods: {
    ...mapActions("home", ["setBaseFeeList"]),
    async getBaseFeeTrend() {
      let res = await this.$api.getBaseFeeTrend()
      let basefee = res.basefee_points
      this.setBaseFeeList(basefee)
      this.feeList = []
      this.gasList = []
      this.gasList2 = []
      this.xOptions = []
      basefee.map(item => {
        const { base_fee, gas_cost_32g, gas_cost_64g, block_time } = item
        this.feeList.push(base_fee)
        this.gasList.push(gas_cost_32g)
        this.gasList2.push(gas_cost_64g)
        this.xOptions.push(this.formatDateTime(block_time, "HH:mm"))
      })
      this.drawChart()
    },
    drawChart() {
      const vm = this
      // const isMobile = vm.isMobile
      const rate = vm.rate
      const lightStyle = {
        lineStyle: "",
        splitLine: "rgba(0,0,0,0.15)",
        textStyle: "#333333",
        itemBorder: "#ffffff"
      }
      const blackStyle = {
        lineStyle: "",
        splitLine: "rgba(255,255,255,0.15)",
        textStyle: "#ffffff",
        itemBorder: "#ffffff"
      }
      const color = this.theme === "light" ? lightStyle : blackStyle
      const option = {
        xAxis: {
          type: "category",
          data: this.xOptions,
          axisLabel: {
            textStyle: {
              color
            }
          },
          splitLine: {
            lineStyle: {
              color: ["#153550"]
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#153550"
            }
          },
          axisTick: {
            lineStyle: {
              color: color.splitLine
            }
          }
        },
        yAxis: [
          {
            type: "value",
            min: 0,
            max: v => {
              return Number(v.max / 0.8).toFixed(1)
            },
            axisLabel: {
              formatter(v) {
                if (v === 0) {
                  return 0
                }
                let value = Number(
                        vm.formatFilNum(v, true, false).split(" ")[0]
                )
                let unit = vm.formatFilNum(v, true, false).split(" ")[1]
                let  num = value > 1? 1:2
                return Number(value).toFixed(num) + " " + unit
              },
              textStyle: {
                color: color.textStyle
              }
            },
            yAxis: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#153550"
              }
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: color.splitLine
              }
            }
          },
          {
            type: "value",
            min: 0,
            // max: v => {
            //   // let max = this.formatFilNum(v.max, true, false).split(" ")[0]
            //   return Number(v.max / 0.8).toFixed(1)
            // },
            axisLabel: {
              formatter(v) {
                // if(v===0){
                //   return 0
                // }
                // return Number(v).toFixed(4) + " FIL/T"
                return v + " FIL/T"
              },
              textStyle: {
                color: color.textStyle
              }
            },
            axisTick: {
              show: false
            },
            yAxis: {
              show: false
            },
            nameTextStyle: {
              color: color.textStyle
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#153550"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                type: "dashed",
                color: color.splitLine
              }
            }
          }
        ],
        series: [
          {
            type: "line",
            name: vm.tr("yAxisName")[0],
            data: this.feeList,
            smooth: true,
            itemStyle: {
              color: "#F6BD16",
              borderColor: "#F6BD16"
            },
            yAxisIndex: 0,
            markArea: {
              itemStyle: {
                color: "#F6BD16"
              }
            }
          },
          {
            type: "line",
            name: vm.tr("yAxisName")[1],
            data: this.gasList,
            smooth: true,
            itemStyle: {
              color: "#5AD8A6",
              borderColor: "#5AD8A6"
            },
            yAxisIndex: 1,
            markArea: {
              itemStyle: {
                color: "#153550"
              }
            }
          },
          {
            type: "line",
            name: vm.tr("yAxisName")[2],
            data: this.gasList2,
            smooth: true,
            itemStyle: {
              color: "#5B8FF9",
              borderColor: "#5B8FF9"
            },
            yAxisIndex: 1,
            markArea: {
              itemStyle: {
                color: "#153550"
              }
            }
          }
        ],
        grid: {
          left: 10 * rate,
          right: 10 * rate,
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
            let unit = 'FIL'
            let data = v.map((item, index) => {
              const { data } = item
              if (index == 0) {
                unit = vm.formatFilNum(data, true, false).split(' ')[1] || 'FIL'
              }
              return index > 0 ? Number(data).toFixed(4) : Number(vm.formatFilNum(data, true, false).split(' ')[0]).toFixed(4)
            })
            var options = [unit, 'FIL/T', 'FIL/T']
            v.forEach((item, index) => {
              if (item.data) {
                result += '<br/>' + item.marker + item.seriesName + ': ' + data[index] + options[item.componentIndex]
              }
            })
            return result
          }
        },
        legend: {
          // type: "scroll",
          itemWidth: 11,
          icon: "circle",
          data: this.tr("yAxisName"),
          formatter(v) {
            return v
          }
        }
      }
      chart.setOption(option)
    }
  },
  mounted() {
    chart = this.$chart.init(this.$refs.chart)
    this.getBaseFeeTrend()
    this.$bus.$on("window-resize", () => {
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
  .title {
		font-size: 22px;
    width: 660px;
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
    margin-left: 5px;
    justify-content: space-between;
    .more {
      display: flex;
      flex: 1;
      justify-content: flex-end;
    }
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
          content: "";
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
  .chart-con {
    padding-top: 20px;
    height: 500px;
    & > div {
      background: var(--board-item-bg-color);
      height: 350px;
      margin-right: 15px;
      border-radius: 4px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
