<template>
  <div class="region-power flex column">
    <div class="top flex jus-between">
      <div class="font-16 font-500">{{ tr("title") }}</div>
    </div>
    <div class="chart-con" ref="chart"></div>
  </div>
</template>
<script>
let chart
export default {
  name: "region-power",
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
      const color = this.theme === "light" ? "black" : "white"
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
          center: ["50%", "50%"],
          top: 20,
          left: 20,
          right: 20,
          label: {
            color,
            formatter(v) {
              const { percent, data } = v
              const { name, value } = data
              let strs = parseFloat(value).toFixed(2)
              return `${name}: (${percent}%) \n \n ${strs} FIL `
            },
            fontSize: 12 * rate
          },
          labelLine: {
            length2: 5,
            lineStyle: {
              color
            }
          },
          data: vm.rateList,
          radius: "70%"
          //minShowLabelAngle: 1.8
        }
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
.region-power {
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
    flex: 1;
  }
}
</style>
