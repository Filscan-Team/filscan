<template>
  <div class="cm-address-balance flex">
    <!--    <div class="address-title font-18 flex border-btm">-->
    <!--      {{ isEn ? "Miner Overview" : "矿工账户" }}-->
    <!--    </div>-->
    <div class="address-content flex">
      <div class="chart-con" ref="chart"></div>
      <div class="balance-info font-14 font-400">
        <div class="title">{{ tr("title") }}</div>
        <div class="num">
          {{ formatNumber(info.total, 4) }} FIL
        </div>
        <div class="flex chartData">
          <div class="available" v-for="(item,index) in chartOptions" :class="item" :key="index">
            <i></i>
            {{ tr(item) }} {{ formatNumber(info[item], 4) }} FIL
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex"
let chart
export default {
  name: "CmAddressBalance",
  data() {
    return {
      prefix: "address.detail.minerOverview.balance",
      chartOptions: ['available', 'pledged', 'deposits', 'reward'],
      colors: ["#F7C739", "#5AD8A6", "#5B8FF9", "#9270CA"],
    }
  },
  methods: {
    drawChart() {
      const vm = this
      const rate = vm.rate
      // const color = this.theme === "light" ? "black" : "white"
      let data = this.chartOptions.map((item, index) => {
        return {
          value: this.info[item],
          name: vm.tr(item),
          itemStyle: {
            color: this.colors[index]
          }
        }
      })
      const option = {
        tooltip: {
          formatter(v) {
            const {name, value} = v
            return `${v.marker} ${name} ${Number(value).toFixed(4)} FIL`
          },
          position: "right",
          textStyle: {
            fontSize: 12 * rate
          }
        },
        series: [
          {
            type: "pie",
            radius: ["36%", "65%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              fontSize: 10,
              rich: {
                dark: {
                  color: '#000',
                },
                color: {
                  color: '#309cfe'
                }
              }
            },
            labelLine: {
              length: 6,
              show: false
            },
            data: data,
            center: ["50%", "50%"]
          }
        ]
      }
      chart.setOption(option)
    },
    fil(v) {
      if (parseFloat(v) != v) {
        return 0
      }
      return parseFloat(Number(v).toFixed(4))
    }
  },
  watch: {
    info() {
      this.$nextTick(() => {
        this.drawChart()
      })
    }
  },
  mounted() {
    chart = this.$chart.init(this.$refs.chart)
    let that = this
    that.$bus.$on("window-resize", () => {
      chart.resize()
      this.drawChart()
    })
    this.$nextTick(() => {
      this.drawChart()
    })
  },
  computed: {
    ...mapState("address", ["balanceInfo"]),
    info() {
      return this.balanceInfo
    }
  }
}
</script>
<style lang="scss" scoped>
.cm-address-balance {
  flex-direction: column;
  box-sizing: border-box;
  min-height: auto !important;

  .address-title {
    padding: 14px 20px;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
  }

  .address-content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    font-size: 14px;
    align-items: center;

    .chart-con {
      display: flex;
      width: 50%;
      height: 100%;
      box-sizing: border-box;
      align-items: center;
    }

    .balance-info {
      width: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-right: 20px;
      align-items: flex-end;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .title {
        margin: 30px 0 5px 0;
        font-size: 24px;
      }

      .num {

        height: 28px;
        line-height: 28px;
        font-size: 30px;
        font-weight: 500;
        margin-top: 10px;
        margin-bottom: 20px;
        font-stretch: inherit;
      }

      & > div {
        .left {
          width: 100%;
        }

        &:nth-child(3) {
          margin-bottom: 10px;
        }
      }

      .chartData {
        display: flex;
        flex-direction: column;

        div {
          padding-bottom: 10px;
        }
      }

      .pledged,
      .available,
      .deposits,
      .reward {
        font-size: 24px;
        color: var(--main-text-color);
        i {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 3px;
          margin-right: 10px;
        }

        &.available {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          i {
            background: #f7c739;
            align-self: center;
          }

          &:last-child {
            padding-bottom: 20px;
          }
        }

        &.pledged {
          i {
            background: #5ad8a6;
          }
        }

        &.deposits {
          i {
            background: #5b8ff9;
          }
        }

        &.reward {
          i {
            background: #9270ca;
          }
        }
      }
    }
  }
}
</style>
