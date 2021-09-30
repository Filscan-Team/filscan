<template>
  <div class="gas">
    <div
      class="dsn bottom-20 bg-board"
      element-loading-background="var(--board-bg-color)"
    >
      <div class="total-number radius flex align-center">
        <span class="title">{{ tr("title") }}</span>
        <co-time-select :times="times" @time-select="handleTimeChange" />
      </div>
      <div class="chart-con" ref="chart"></div>
    </div>
    <div
      class="dsn"
      v-loading="loading"
      element-loading-background="var(--board-bg-color)"
    >
      <div class="total-number radius flex align-center">
        <span class="title">{{ tr("tb_title") }}</span>
      </div>
      <div class="deal-list">
        <div class="table-con border-outline">
          <co-table
            :dataSource="dealData"
            :columns="columns"
            :labels="tr('labels')"
          ></co-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
let chart
export default {
  name: "gas",
  head() {
    return {
      title: this.$t("header.seo.gas")
    }
  },
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
            let arr = vm.formatFilNum(v, true).split(' ')
            return arr[0]<1? Number(arr[0]).toFixed(6) + arr[1]:Number(arr[0]).toFixed(2) + " " + arr[1]
          }
        },
        {
          key: "sum_gas_fee",
          rateKey: "gas_fee_ratio",
          formatter(v) {
            let arr = vm.formatFilNum(v, true).split(' ')
            return arr[0]<1? Number(arr[0]).toFixed(6) + arr[1]:Number(arr[0]).toFixed(2) + " " + arr[1]
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
          let { gas_fee_ratio, msg_count_ratio  } = item
          item.gas_fee_ratio = gas_fee_ratio
          item.msg_count_ratio = msg_count_ratio
          let methodName = item.method_name ==='transfer'? 'send': item.method_name
          return {
            ...item,
            method_name: methodName
          }
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
              fontSize: this.fontSize,
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
              color: "#153550"
            }
          }
        },
        yAxis: [
          {
            type: "value",
            min: 0,
            // max: v => {
            //   return Number(v.max / 0.8).toFixed(1)
            // },
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
                fontSize: this.fontSize,
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
                fontSize: this.fontSize,
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
            fontSize: this.fontSize,
            color: color.textStyle
          },
          formatter(v) {
            return v
          },
          icon: 'circle'
        },
        grid: {
          left: 20 * rate,
          right: 20 * rate,
          top: 40 * rate,
          bottom: 20 * rate,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          formatter(v) {
            var result = v[0].name
            let data = v.map((item) => {
              const { data } = item
              // eslint-disable-next-line no-unused-vars
              if(item.componentIndex > 0){
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
  overflow: hidden;
  //border-radius: 6px;
  padding: 0 20px;
  background-color: var(--content-bg-color);
  .total-number {
    height: 68px;
    align-items: center;
    color: var(--main-text-color);
    & ::v-deep > span {
      margin-right: auto;
      font-size: var(--font-18);
      i {
        color: var(--force-mark-color);
        font-size: var(--font-18);
        font-weight: 600;
      }
    }
  }
  .deal-list {
    margin-bottom: 20px;
    &::v-deep tr th:nth-child(1) .cell span {
      padding-left: 10px;
    }
    &::v-deep tr td:nth-child(1) .cell span {
      padding-left: 10px;
    }
  }

  .chart-con {
    width: 100%;
    padding: 10px 0;
    height: 341px;
    margin-bottom: 26px;
    border: 1px solid var(--border-line);
    & > div {
      width: 100%;
      background: var(--board-item-bg-color);
      height: 341px;
      margin-right: 15px;
      border-radius: 4px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
