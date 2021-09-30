<template>
  <div class="graph">
    <div class="chart" ref="chart"></div>
  </div>
</template>
<script>
import ram from "randomcolor"
import mixin from "./mixin.js"
let chart
export default {
  name: "Graph",
  data() {
    return {
      activeIndex: 0,
      tipsetList: [],
      tooltipPos: [],
      tooltipShow: false,
      currentBlock: {},
      startHeight: 0,
      jumpSafeHeight: 0,
      loading: false,
      hoverLeft: 0,
      isGraph: true
    }
  },
  methods: {
    drawChart() {
      const vm = this
      const hash = this.hash
      //const height = this.height;
      const nodeList = []
      const minerMap = {} //miner color map
      const nameList = [] //for links
      const heightList = [] //for height click
      const colors = this.chartTheme.blocksWon.items.map(item => item.item) //Initially, there are 20 colors
      this.tipsetList.forEach((item, index) => {
        const len = item.blocks.length
        heightList.push(item.height)
        nameList[index] = []
        const interval = Math.floor(70 / (len + 1))
        item.blocks.forEach((block, i) => {
          nameList[index].push(block.hash)
          //generate different color for miners
          if (!minerMap[block.miner]) {
            const color = colors.shift()
            minerMap[block.miner] = color || ram() //If the number of miners exceeds 20, generate a random color
          }
          nodeList.push({
            ...block,
            name: block.hash,
            value: [(i + 1) * interval, block.index],
            symbolSize: [70, 25],
            isBlockGraph: true
          })
        })
      })
      nodeList.forEach(item => {
        item.itemStyle = {
          color: hash && hash == item.name ? "#fff" : minerMap[item.miner]
        }
        item.label = {
          color: hash && hash == item.name ? "#F3921B" : "#fff"
        }
      })
      const linkList = []
      nameList.forEach((item, index) => {
        if (index < nameList.length - 1) {
          for (let target of item) {
            for (let source of nameList[index + 1]) {
              linkList.push({
                source,
                target,
                silent: true,
                lineStyle: {
                  color: "#fff"
                }
              })
            }
          }
        }
      })
      chart.setOption({
        xAxis: {
          show: false,
          boundaryGap: false,
          min: 0,
          max: 70,
          axisLine: {
            show: false
          },
          axisTick: {
            show: true,
            alignWithLabel: true
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          //min: 0,
          //max: 70,
          show: true,
          type: "category",
          data: heightList,
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#F3921B",
              width: 4
            }
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        grid: {
          right: 0
        },
        series: [
          {
            type: "graph",
            coordinateSystem: "cartesian2d",
            symbol: "rect",
            symbolSize: [70, 25],
            data: heightList.map((item, index) => {
              return {
                name: item,
                isHeightGraph: true,
                value: [5, index],
                itemStyle: {
                  color: item == vm.height ? "#F3921B" : "transparent"
                },
                label: {
                  show: true,
                  formatter() {
                    return item
                  }
                }
              }
            })
          },
          {
            type: "graph",
            layout: "none",
            id: "a",
            coordinateSystem: "cartesian2d",
            edgeSymbol: ["", "arrow"],
            label: {
              show: true,
              position: "inside",
              formatter(p) {
                return p.data.miner
              }
            },
            lineStyle: {
              normal: {
                width: 2,
                shadowColor: "none"
              }
            },
            data: nodeList,
            links: linkList
          },
          {
            type: "scatter",
            symbolSize: 6,
            itemStyle: {
              color: "#fff"
            },
            data: heightList.map(item => {
              return [0, item]
            })
          }
        ],
        tooltip: {
          trigger: "item",
          formatter(p) {
            if (p.data && p.data.isBlockGraph) {
              const { miner, height, utcTime: block_time, hash: cid } = p.data
              return vm.$t("chart.tipset", {
                miner,
                height,
                cid,
                block_time
              })
            } else {
              return
            }
          }
        }
      })
    }
  },
  mounted() {
    chart = this.$chart.init(this.$refs.chart)
    chart.on("click", e => {
      if (e.data && e.data.isHeightGraph) {
        this.$emit("height-change", e.data.name)
      }
      if (e.data && e.data.isBlockGraph) {
        this.$emit("hash-change", e.data.name)
      }
    })
    this.getInitialStatus()
  },
  props: {
    tipsets: {
      type: Array,
      default() {
        return []
      }
    },
    hash: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: 0
    }
  },
  mixins: [mixin]
}
</script>
<style lang="scss" scoped>
.graph {
  width: 50vw;
  .chart {
    height: 100vh;
  }
}
</style>
