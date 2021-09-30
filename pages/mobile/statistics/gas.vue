<template>
  <div class="gas">
    <div
      class="dsn bottom-10 bg-board"
      element-loading-background="var(--board-bg-color)"
    >
      <cm-card :borderLeft="true">
        <div slot="header" class="clearfix gasheader">
          <span class="title">{{ tr("title") }}</span>
          <cm-time-select
            :times="times"
            @time-select="handleTimeChange"
            class="more"
          />
        </div>
        <div id="chart" class="chart-con" ref="chart"></div>
      </cm-card>

      <cm-card :borderLeft="true">
        <div slot="header" class="clearfix gasheader">
          <span class="title">{{ tr("tb_title") }}</span>
        </div>
        <cm-cards
          v-for="item in dealData"
          :key="item.cid"
          :dataSource="item"
          :columns="mbColumnsWithLabel"
          :span="24"
          :border="false"
          class="cards"
        />
      </cm-card>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
let chart
export default {
  name: "gas",
  layout: "mlayout",
  data(vm) {
    // const formatter = v => dayjs.unix(v).format("YYYY-MM-DD HH:mm")
    return {
      interval: "24h",
      times: ["24h", "1w", "1m", "1y"],
      dealData: [],
      loading: false,
      total: 0,
      filNum: 0,
      columns: [
        {
          key: "method_name",
          align: "left"
        },
        {
          key: "avg_gas_premium",
          formatter(v) {
            return vm.formatFilNum(v, true, false)
          }
        },
        {
          key: "avg_gas_limit",
          formatter(v) {
            return vm.formatNumber(v)
          }
        },
        {
          key: "avg_gas_used",
          formatter(v) {
            return vm.formatNumber(v)
          }
        },
        {
          key: "avg_gas_fee",
          formatter(v) {
            if(Number(v)===0){ return 0 }
            let arr = vm.formatFilNum(v, true).split(' ')
            return arr[0]<1? Number(arr[0]).toFixed(6) + arr[1]:Number(arr[0]).toFixed(2) + " " + arr[1]
          }
        },
        {
          key: "sum_gas_fee",
          rateKey: "gas_fee_ratio",
          formatter(v) {
            return Number(vm.formatFilNum(v, true, true)).toFixed(6) + " FIL"
          },
          class: "light"
        },
        {
          key: "msg_count",
          rateKey: "msg_count_ratio",
          formatter(v) {
            return vm.formatNumber(v)
          },
          class: "light",
          align: "right"
        }
      ],

      option: {
        begindex: 0,
        count: 25
      },
      prefix: "more.gas",
      feeList: [],
      gasList: [],
      gasList2: [],
      xOptions: [],
      yOptions: []
    }
  },
  methods: {
    handleTimeChange(v) {
      this.interval = v.type
      this.getBaseFeeTrend()
    },
    handleSizeChange(v) {
      this.option.count = v
    },
    handlePageChange(v) {
      this.option.begindex = (v - 1) * this.option.count
    },
    async getDealList() {
      this.loading = true
      try {
        let res = await this.$api.getGasData()
        this.loading = false
        let gasData = res.map(item => {
          item.method_name = item.method_name === 'transfer'? 'Send': item.method_name
          return item
        })
        let lastItem = gasData.pop()
        gasData.unshift(lastItem)
        this.dealData = Object.freeze(gasData)
      } catch (e) {
        this.loading = false
      }
    },
    async getBaseFeeTrend() {
      let basefee = {}
      let res = await this.$api.getBaseFeeTrend([this.interval])
      basefee = res.basefee_points
      this.feeList = []
      this.gasList = []
      this.gasList2 = []
      this.xOptions = []
      basefee.map(item => {
        const { base_fee, gas_cost_32g, gas_cost_64g, block_time } = item
        this.feeList.push(base_fee)
        this.gasList.push(gas_cost_32g)
        this.gasList2.push(gas_cost_64g)
        let timeStr = this.interval === "24h" ? "HH:mm" : "YYYY-MM-DD HH:mm"
        this.xOptions.push(this.formatDateTime(block_time, timeStr))
      })
      this.drawChart()
    },
    drawChart() {
      const vm = this
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
      let color = this.theme === "light" ? lightStyle : blackStyle
      let yAxisName = vm.$t("home.chart.blockReward.yAxisName")
      const option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xOptions,
          axisLabel: {
            textStyle: {
              color: color.textStyle
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
              color: "#ccc"
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
              interval: 500,
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
            symbol: "circle",
            name: vm.$t("home.chart.blockReward.yAxisName")[0],
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
            symbol: "circle",
            name: vm.$t("home.chart.blockReward.yAxisName")[1],
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
            symbol: "circle",
            name: vm.$t("home.chart.blockReward.yAxisName")[2],
            data: this.gasList2,
            smooth: true,
            itemStyle: {
              color: "#5B8FF9",
              borderColor: "#5B8FF9"
            },
            yAxisIndex: 1,
            markArea: {
              itemStyle: {
                color: "#5B8FF9"
              }
            }
          }
        ],
        legend: {
          data: this.$t("home.chart.blockReward.yAxisName"),
          // lineStyle:{
          //   color: '#ffffff'
          // },
          textStyle: {
            color: color.textStyle
          },
          formatter(v) {
            return v
          }
        },
        grid: {
          left: 10 * rate,
          right: 10 * rate,
          // top: 40 * rate,
          bottom: 10 * rate,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          formatter(v) {
            var result = v[0].name
            let unit = "FIL"
            let data = v.map((item, index) => {
              const { data } = item
              if (index == 0) {
                unit = vm.formatFilNum(data, true, false).split(" ")[1] || "FIL"
              }
              return index > 0
                ? Number(data).toFixed(4)
                : Number(
                    vm.formatFilNum(data, true, false).split(" ")[0]
                  ).toFixed(4)
            })
            var options = [unit, "FIL/T", "FIL/T"]
            v.forEach((item, index) => {
              if (item.data) {
                result +=
                  "<br/>" +
                  item.marker +
                  item.seriesName +
                  ": " +
                  data[index] +
                  " " +
                  options[item.componentIndex]
              }
            })
            return result
          }
        }
      }
      chart.setOption(option)
    }
  },
  created() {
    this.getDealList()
    this.columns = this.columns.map(item => {
      return {
        ...item,
        hideSort: true
      }
    })
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
    option: {
      deep: true,
      handler() {
        this.getBaseFeeTrend()
      }
    }
  },
  computed: {
    ...mapGetters("home", ["basefeeList"]),
    mbColumnsWithLabel() {
      const mbKeys = [
        "service_start_time",
        "service_end_time",
        "storage_price_per_epoch"
      ]
      const labels = [...this.tr("labels")]
      return this.columns
        .map((item, index) => {
          return {
            ...item,
            title: labels[index]
          }
        })
        .filter(item => !mbKeys.includes(item.key))
    }
  }
}
</script>
<style lang="scss" scoped>
.dsn {
  padding: 0 !important;
  margin-bottom: 0 !important;
  .cm-card {
    .gasheader {
      display: flex;
      flex-direction: row;
      height: 40px;
			width: 100%;
      .more {
        // margin-top: -10px;
        //width: 500px;
        height: 44px;
        display: flex;
        flex: 1;
        justify-content: flex-end;
        ::v-deep .base-select {
          .selected {
            padding: 0 15px;
          }
        }
      }
      #chart > div > canvas {
        z-index: 1;
      }
			.title {
				font-size: 26px;
			}
    }
    .cards{
      border-bottom: 1px dashed var(--border-line) !important;
    }
    .cards:last-child{
      border-bottom: none!important;
    }
    .cm-cards {
      margin: 20px !important;
    }
  }
  .chart-con {
    /*padding: 20px;*/
    height: 383px;
    margin: 20px 20px 0 20px;
    & > div {
      background: var(--board-item-bg-color);
      height: 300px !important;
      border-radius: 4px;
      &:last-child {
				margin-right: 0;
			}
    }
  }
  .total-number {
    height: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0 !important;
    white-space: nowrap;
    margin: 20px;
    .title {
      padding: 0 20px;
      font-size: 16px;
    }
    & ::v-deep i {
      font-size: 10px !important;
    }
  }
  .mb-deal-list {
    max-height: calc(100vh - 370px);
    overflow-y: scroll;
    background: var(--board-bg-color);
    padding: 20px;
    &::v-deep .mb-board {
      & > div {
        &:nth-child(2),
        &:nth-child(5) {
          text-align: center;
        }
        &:nth-child(3),
        &:nth-child(6) {
          text-align: right;
        }
      }
    }
  }
}
</style>
