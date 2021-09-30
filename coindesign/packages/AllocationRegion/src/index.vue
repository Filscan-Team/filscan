<template>
  <div class="region-power flex column">
    <div class="chart-con" ref="chart"></div>
  </div>
</template>
<script>
let chart
export default {
  name: 'CoAllocationRegion',
  data() {
    return {
      prefix: 'statistics.fil',
      rateList: []
    }
  },
  methods: {
    drawChart() {
      const vm = this
      const rate = this.rate
      const color = this.theme === 'light' ? '#333333' : 'white'
      const option = {
        tooltip: {
          trigger: 'item',
          formatter(v) {
            console.log(v)
            const {
              data: { value, name }
            } = v
            return v.marker + name + ':' + parseFloat(value).toFixed(2) + '%'
          }
        },
        series: {
          type: 'pie',
          stillShowZeroSum: false,
          center: ['28%', '50%'],
          top: 20,
          left: 20,
          right: 20,
          label: {
            color,
            formatter(v) {
              const { percent, data } = v
              const { name, value } = data
              let strs = parseFloat(value).toFixed(2)
              return `${name}: (${percent}%) `
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
          radius: '70%'
          //minShowLabelAngle: 1.8
        },
        legend: {
          orient: 'vertical',
          left: '56%',
          bottom: '25%',
          lineStyle: {
            color: color
          },
          textStyle: {
            fontSize: this.fontSize,
            color: color
          }
        }
      }
      chart.setOption(option)
    },
    async getFilCompose() {
      this.rateList = Object.freeze(
        this.tr('continent').map((item) => {
          return {
            ...item,
            itemStyle: {
              color: item.color
            }
          }
        })
      )
      this.drawChart()
    }
  },
  mounted() {
    chart = this.$chart.init(this.$refs.chart)
    this.getFilCompose()
    this.$bus.$on('window-resize', () => {
      chart.resize()
      this.drawChart()
    })
  },
  props: ['total'],
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
    height: 235px;
    flex: 1;
  }
}
</style>
