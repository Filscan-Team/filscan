<template>
  <div class="region-fil flex column">
    <div class="chart-con border-outline" ref="chart"></div>
  </div>
</template>
<script>
let chart
export default {
  name: "CoFilRegion",
  data() {
    return {
      prefix: "home.chart.region",
      rateList: []
    }
  },
  methods: {
    drawChart() {
      const vm = this
      const rate = this.rate
      const color = this.theme === "light" ? "#333333" : "white"
      const option = {
        tooltip: {
          trigger: "item",
          formatter(v) {
            const {
              data: { value, name }
            } = v
            return v.marker + name + ":" + parseFloat(value).toFixed(2) + "FIL"
          }
        },
        series: {
          type: "pie",
          stillShowZeroSum: false,
          center: ["45%", "50%"],
          top: 20,
          left: 20,
          right: 20,
          label: {
            color,
            formatter(v) {
              const { percent, data } = v
              const { name, value } = data
              let strs = parseFloat(value).toFixed(2)
              return name===''? `${strs} FIL (${percent}%)`:`${name}: ${strs} FIL (${percent}%)`
            },
            fontSize: this.fontSize
          },
          labelLine: {
            length2: 5,
            lineStyle: {
              color
            }
          },
          data: vm.rateList,
          radius: "60%"
          //minShowLabelAngle: 1.8
        }
        // legend: {
        //     orient: 'vertical',
        //     left: 'left',
        //     left: '56%',
        //     bottom: '25%',
        //     lineStyle:{
        //         color: color
        //     },
        //     textStyle:{
        //         color: color
        //     },
        // },
      }
      chart.setOption(option)
    },
    async getFilCompose() {
      let res = await this.$api.getFilCompose()
      if (res) {
        this.rateList = Object.freeze(
          this.tr("continent").map(item => {
            return {
              ...item,
              value: res[item.key],
              itemStyle: {
                color: item.color
              }
            }
          })
        )
        this.drawChart()
      }
    }
  },
  mounted() {
    chart = this.$chart.init(this.$refs.chart)
    this.getFilCompose()
    this.$bus.$on("window-resize", () => {
      chart.resize()
      this.drawChart()
    })
  },
  props: ["total"],
  watch: {
    latestBlockHeight() {
      {
        if (this.loadCount === 1) {
          return
        }
        this.getFilCompose()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.region-fil {
  /*max-width: 480px;*/
  .top {
    height: 22px;
    line-height: 22px;
    margin-top: 15px;
    padding: 0 20px 0 15px;
    div:last-child {
      height: 100%;
    }
  }
  .chart-con {
    height: 314px;
    flex: 1;
  }
}
</style>
