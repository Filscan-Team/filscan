<template>
  <div class="address-balance flex">
<!--    <div class="address-title font-18 flex border-btm">-->
<!--      {{ isEn ? "Miner Overview" : "矿工账户" }}-->
<!--    </div>-->
    <div class="address-content flex">
      <div class="chart-con" ref="chart"></div>
      <div class="balance-info font-400">
        <div class="title">{{ tr("title") }}</div>
        <div class="num">
          {{ formatNumber(info.total, 4) }} FIL
        </div>
        <div class="flex chartData">
          <div  v-for="(item, index) in chartOptions" :class="item" :key="index">
            <i></i>
            <span>{{ tr(item) }} {{ formatNumber(info[item], 4) }} FIL</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
let chart
export default {
  name: "AddressBalance",
  data() {
    return {
      prefix: "address.detail.minerOverview.balance",
      chartOptions: ['available','pledged','deposits','reward'],
      colors: ["#F7C739","#5AD8A6","#5B8FF9","#9270CA"],
    }
  },
  methods: {
    drawChart() {
      const vm = this
      const rate = vm.rate
      let data = this.chartOptions.map((item, index)=>{
         return {
           value: this.info[item],
           name: vm.tr(item),
           itemStyle: {
             color:this.colors[index]
           }
         }
      })
      const option = {
        tooltip: {
          formatter(v) {
            const { name, value } = v
            return `${v.marker} ${name} ${Number(value).toFixed(4)} FIL`
          },
          position: "right",
          textStyle: {
            fontSize: (this.isMac?10:12) * rate
          }
        },
        series: [
          {
            type: "pie",
            radius: ["26%", "48%"],
            avoidLabelOverlap: false,
            label: {
              show:false,
              fontSize: 12,
              rich: {
                dark: {
                  color: '#000',
                },
                color: {
                  color: '#309cfe'
                }
              }
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
    info(){
      this.$nextTick(() => {
        this.drawChart()
      })
    }
  },
  mounted() {
    console.log()
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
.address-balance {
  flex-direction: column;
  box-sizing: border-box;
  .address-title {
    padding: 14px 20px;
    font-size: var(--font-16);
    height: 20px;
    line-height: 20px;
  }
  .address-content {
    width: 100%;
    justify-content: space-between;
    font-size: var(--font-16);
    .chart-con {
      display: flex;
      width: 50%;
      height: 240px;
      padding: 10px;
      box-sizing: border-box;
    }
    .balance-info {
      width: 50%;
      .title{
        margin: 30px 0 5px 0;
      }
      .num {
        height: 28px;
        line-height: 28px;
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 20px;
      }
      & > div {
        .left {
          width: 100%;
        }
        &:nth-child(3) {
          margin-bottom: 10px;
        }
      }
      .chartData{
        display: flex;
        flex-direction: column;
        div{
          padding-bottom: 10px;
        }
      }
      .pledged,
      .available,
      .deposits,
      .reward {
        i {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          margin-right: 10px;
        }

        &.available {
          i {
            background: #f7c739;
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
