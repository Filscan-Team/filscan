<template>
  <div class="ticket-chain">
    <div class="chart-con">
      <div
        class="chart"
        ref="chart"
        v-loading="loading"
        element-loading-background="var(--board-bg-color)"
        :style="{ minHeight: '250px' }"
      ></div>
      <div class="block-type">
        <div class="arrow left" @click="goLeft" v-if="jumpSafeHeight > 100">
          <span class="el-icon-arrow-left"></span>
        </div>
        <div>
          <div class="type-list">
            <span>
              <i class="null"></i>
              {{ $t("tipset.blockType")[0] }}
            </span>
            <span>
              <i class="ticket"></i>
              {{ $t("tipset.blockType")[1] }}
              <el-popover
                placement="bottom-start"
                width="200"
                trigger="hover"
                :content="$t(`tipset.tips`)"
                v-if="!isMobile"
              >
                <i
                  class="el-icon-warning-outline"
                  slot="reference"
                  style="margin-left:3px"
                ></i>
              </el-popover>
            </span>
            <span>
              <i class="normal"></i>
              {{ $t("tipset.blockType")[2] }}
            </span>
          </div>
          <vue-slider
            :min="1"
            :max="sliderMaxValue"
            @change="handleDrag"
            :lazy="true"
            :marks="marks"
            :value="sliderValue"
            silent
            v-if="jumpSafeHeight > 100"
            tooltip="always"
            @mousemove.native.self="handleMove"
            ref="slider"
            @hook:mounted="initScale"
            @click.native.self="handleClick"
          />
        </div>

        <div @click="goRight" class="arrow right" v-if="jumpSafeHeight > 100">
          <span class="el-icon-arrow-right"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueSlider from "vue-slider-component"
import "vue-slider-component/theme/default.css"
import { getBlockCoord } from "../tool"
import { mapState } from "vuex"
import Null from "@/assets/image/block/null.png"
import Ticket from "@/assets/image/block/ticket.png"
import Normal from "@/assets/image/block/normal.png"
import Active from "@/assets/image/block/active.png"
import NormalDark from "@/assets/image/block/normal-dark.png"
import NullDark from "@/assets/image/block/null-dark.png"
let chart
export default {
  name: "TipsetChain",
  data() {
    return {
      tipsets: [],
      startHeight: 0,
      hashList: [],
      loading: false,
      typeStyle: {
        marginTop: "-160px"
      },
      jumpSafeHeight: 0,
      sliderValue: 0
    }
  },
  props: {
    hash: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState(["defaultHeight"]),
    normalSrc() {
      return this.theme === "light" ? Normal : NormalDark
    },
    ticketSrc() {
      return this.theme === "light" ? Ticket : Active
    },
    activeSrc() {
      return this.theme === "light" ? Active : Ticket
    },
    nullSrc() {
      return this.theme === "light" ? Null : NullDark
    },
    sliderMaxValue() {
      return Number(this.jumpSafeHeight)
    },
    marks() {
      if (!this.jumpSafeHeight) {
        return []
      }
      const str = String(this.jumpSafeHeight)
      const unit = Math.pow(10, str.length - 2) * str[0]
      const len = Math.floor(this.jumpSafeHeight / unit)
      let res = []
      for (let i = 0; i < len; i++) {
        res.push((i + 1) * unit)
      }
      res.unshift(1)
      //res.push(Number(this.jumpSafeHeight));
      return res
    }
  },
  watch: {
    height(v) {
      const minus = this.startHeight - v
      if ((minus >= 7 && minus <= 21) || v == 0) {
        this.drawChart()
      } else {
        this.getTipset(v - -7)
      }
    },
    async hash(v) {
      if (!v) {
        return
      }
      if (this.hashList.includes(v)) {
        this.drawChart()
      } else {
        //for parent hash click
        let data = await this.$api.getBlockByCid([this.$route.query.hash])
        const height = data.blocks[0].block_header.height
        this.getTipset(height)
      }
    },
    defaultHeight: {
      handler(h) {
        const { height, hash, jumpHeight } = this.$route.query
        if ((height || hash || jumpHeight) && !this.atIndex) {
          return
        }
        if (h != 0) {
          this.startHeight = h
          this.jumpSafeHeight = h
          this.getTipset(h)
        }
      }
    },
    theme() {
      this.drawChart()
    }
  },
  async mounted() {
    chart = this.$chart.init(this.$refs.chart)
    let height = this.height
    let currentHeight
    /*get max height*/
    let data = await this.$api.getLatestBlocks([1])
    this.jumpSafeHeight = data.block_header[0].block_header.height
    if (this.hash) {
      let data = await this.$api.getBlockByCid([this.$route.query.hash])
      height = data.blocks[0].block_header.height
    }
    if (height) {
      if (height > this.jumpSafeHeight - 7) {
        currentHeight = this.jumpSafeHeight
      } else {
        currentHeight = height - -7
      }
    } else {
      currentHeight = this.jumpSafeHeight
    }
    this.getTipset(currentHeight)
    chart.on("click", e => {
      if (e.data.originData) {
        this.$emit("hash-change", e.data.originData.cid)
      }
      // if (e.componentType === "markLine") {
      //   this.$emit("height-change", String(this.startHeight - e.value - 7));
      // }
      if (e.data && e.data.symbol == "rect") {
        this.$emit(
          "height-change",

          String(this.startHeight - e.data.value[0] - 7)
        )
      }
    })
    this.$bus.$on("window-resize", () => {
      chart.resize()
      this.drawChart()
    })
  },
  methods: {
    handleMove(e) {
      console.log(
        Math.ceil(
          (this.$refs.slider.getPosByEvent(e) * this.sliderMaxValue) / 100
        )
      )
    },
    handleClick() {
      //this.$refs.slider.setValue(Math.floor(this.$refs.slider.getPosByEvent(e)*this.sliderMaxValue/100))
    },
    initScale() {
      this.$refs.slider.setScale()
    },
    async getTipset(height) {
      if (height == 0) {
        return
      }
      if (height <= 15) {
        height = 15
      }
      this.startHeight = height - -7
      this.sliderValue = height - 7
      try {
        this.loading = true
        const res = await this.$api.getTipset([15, height])
        this.loading = false
        let blocks = []
        let reverse = []
        const allNull = res.tipsets.every(item => item === null)
        if (allNull) {
          for (let i = 0; i < 15; i++) {
            reverse.push({
              tipset: [],
              min_ticket_block: ""
            })
          }
        } else {
          reverse = res.tipsets.reverse()
        }
        reverse.forEach(item => {
          if (item.tipset.length > 0) {
            blocks = blocks.concat(item.tipset)
          }
        })
        blocks = blocks.map(item => {
          console.log(item)
          const { size, cid, reward, block_header, msg_cids } = item
          const {
            timestamp,
            height,
            miner,
            parent_weight,
            parent_base_fee,
            tickets,
            parents,
            parent_state_root
          } = block_header

          return {
            height: this.formatNumber(height),
            hash: cid,
            timestamp: this.formatTime(timestamp),
            utcTime: this.getFormatTime(timestamp),
            size: this.formatNumber(size),
            mesLength: msg_cids.length,
            miner,
            reward,
            parents,
            parent_weight: this.formatNumber(parent_weight),
            parent_base_fee,
            tickets,
            state_root: parent_state_root
          }
        })
        const hashList = blocks.map(item => {
          return item.hash
        })
        this.hashList = hashList
        this.tipsets = Object.freeze(reverse)
        this.$emit("get-blocks", blocks)
        this.drawChart()
      } catch (e) {
        this.loading = false
      }
    },
    drawChart() {
      const vm = this
      const height = this.height
      const rate = this.rate
      const {
        ticketNode,
        otherNode,
        link,
        //seriesMarkLine,
        seriesMarkLineLabel,
        //markArea,
        markAreaBorder,
        markAreaActiveBorder
      } = this.chartTheme.tipset
      this.tipsets.forEach((item, index) => {
        item.tipset = getBlockCoord(item.tipset, index, item.min_ticket_block)
      }) //get coords
      const formatNames = []
      const nodeList = this.tipsets.reduce((pre, cur) => {
        const coords = cur.tipset.map((item, index) => {
          if (!item.cid) {
            return {
              value: item.coord,
              symbol: `image://${this.nullSrc}`,
              symbolSize: [69 * rate, 25 * rate],
              isTicket: false,
              label: {
                show: false
              }
            }
          }
          const formatName = item.block_header.miner
          formatNames.push(formatName.length)
          let symbol
          if (item.cid === this.hash) {
            symbol = `image://${this.activeSrc}`
          } else if (index === 0) {
            symbol = `image://${this.ticketSrc}`
          } else {
            symbol = `image://${this.normalSrc}`
          }
          return {
            name: item.cid,
            originData: item,
            value: item.coord,
            symbol: symbol,
            symbolSize: [69 * rate, 25 * rate],
            symbolOffset: [-11 * rate, 0],
            isTicket: index === 0,
            itemStyle: {
              borderColor: "#F3921B",
              color: "#F3921B"
            },
            label: {
              color:
                index === 0 || item.cid === this.hash ? ticketNode : otherNode,
              formatter() {
                return formatName
              },
              fontSize: 12 * rate
            }
          }
        })
        return pre.concat(coords)
      }, []) //generate echarts nodes
      const maxNameLength = Math.max(...formatNames)
      nodeList.forEach(item => {
        item.symbolSize = [69 * rate * (maxNameLength / 6), 25 * rate]
      })
      const linkList = nodeList
        .map((item, index) => {
          if (!item.isTicket) {
            return null
          }
          return index
        })
        .filter(item => {
          return item !== null
        })
        .map((item, index, arr) => {
          return {
            source: item,
            target: arr[index + 1],
            index: index,
            height: nodeList[item].originData.block_header.height,
            isNull: nodeList[item].isNull,
            blockCount: nodeList[item].originData.blockCount,
            x: nodeList[item].originData.coord[0],
            label: {
              normal: {
                show: false
              }
            },
            lineStyle: {
              normal: {
                color: link
              }
            }
          }
        }) //lines
      const startHeight = this.startHeight - 7

      //Change the height of a graph according to the number of blocks
      const maxCount = linkList
        .map(item => {
          return item.blockCount
        })
        .sort((a, b) => a - b)
        .reverse()[0]
      this.typeStyle = {
        marginTop: `${maxCount * 20 - 200}px`
      }
      //let lineList = [];
      //const format = this.formatNumber;
      // for (let i = 0; i < 15; i++) {
      //   lineList.push({
      //     xAxis: i,
      //     label: {
      //       show: true,
      //       formatter() {
      //         return format(startHeight - i);
      //       }
      //     }
      //   });
      // }
      let areaData = []
      const heightNode = linkList.map(item => {
        return {
          value: [item.index, -3],
          name: item.height,
          symbol: "rect",
          symbolSize: [60, 20],
          label: {
            color: seriesMarkLineLabel,
            show: true,
            fontSize: 12 * rate
          },
          itemStyle: {
            color: "transparent"
          },
          symbolOffset: [-11 * rate, 0]
        }
      })
      linkList.forEach(item => {
        let borderColor = markAreaBorder,
          borderWidth = 1
        if (height && startHeight - height == item.x) {
          borderColor = markAreaActiveBorder
          borderWidth = 2
        }
        areaData.push([
          {
            coord: [
              item.x - 0.2 * (maxNameLength / 6),
              (item.blockCount + 1) * 5
            ],
            itemStyle: {
              borderColor,
              borderWidth
            }
          },
          { coord: [item.x + 0.36 * Math.pow(maxNameLength / 6, 0.7), 1] }
        ])
      })
      var option = {
        xAxis: {
          show: false,
          boundaryGap: false,
          min: -1,
          max: 15,
          inverse: true,
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
          show: false,
          type: "value"
          //inverse: true
        },
        grid: {
          top: 40 * rate,
          left: -40,
          right: 0,
          bottom: 0
        },
        series: [
          {
            type: "graph",
            layout: "none",
            id: "a",
            coordinateSystem: "cartesian2d",
            edgeSymbol: ["", "arrow"],
            label: {
              show: true,
              position: "inside"
            },
            lineStyle: {
              normal: {
                width: 2,
                shadowColor: "none"
              }
            },
            // markLine: {
            //   symbol: ["none", "none"],
            //   silent: false,
            //   lineStyle: {
            //     color: "transparent"||seriesMarkLine,
            //     width: 1,
            //     type: "solid"
            //   },
            //   data: lineList,
            //   label: {
            //     position: "start",
            //     color: "transparent"||seriesMarkLineLabel,
            //     fontSize: 12 * rate
            //   }
            // },
            // markArea: {
            //   data: areaData,
            //   label: {
            //     show: true,
            //     position: "insideTop"
            //   },
            //   itemStyle: {
            //     color: markArea,
            //     borderColor: markAreaBorder,
            //     borderWidth: 1,
            //     borderType: "dotted"
            //   }
            // },
            data: nodeList,
            //links: linkList,
            z: 0,
            zlevel: 4
          },
          {
            type: "graph",
            layout: "none",
            coordinateSystem: "cartesian2d",
            data: heightNode,
            z: 2,
            zlevel: 5
          }
        ],
        tooltip: {
          trigger: "item",
          formatter(p) {
            if (
              p.componentType !== "series" ||
              !(p.data && p.data.originData)
            ) {
              return
            }
            const { cid, block_header } = p.data.originData
            const { miner, height, timestamp } = block_header
            return vm.$t("chart.tipset", {
              miner,
              height,
              cid,
              block_time: vm.getFormatTime(timestamp)
            })
          }
        }
      }
      chart.setOption(option)
    },
    async goLeft() {
      let jumpHeight = Math.max(this.startHeight - 15, 15)
      await this.getTipset(jumpHeight)
      this.goTo("tipset", {
        query: {
          jumpHeight
        }
      })
    },
    async goRight() {
      let jumpHeight = 0
      if (this.startHeight == this.jumpSafeHeight) {
        return
      }
      if (Number(this.startHeight) + 7 >= this.jumpSafeHeight) {
        jumpHeight = this.jumpSafeHeight
      } else {
        jumpHeight = Number(this.startHeight)
      }
      await this.getTipset(jumpHeight)
      this.goTo("tipset", {
        query: {
          jumpHeight: jumpHeight
        }
      })
    },
    async handleDrag(v) {
      let jumpHeight
      if (this.jumpSafeHeight - v < 7) {
        jumpHeight = this.jumpSafeHeight
      } else {
        jumpHeight = v + 7
      }
      await this.getTipset(jumpHeight)
      this.goTo("tipset", {
        query: {
          jumpHeight: jumpHeight - 7
        }
      })
    }
  },
  components: {
    VueSlider
  }
}
</script>
<style lang="scss" scoped>
.ticket-chain {
  border-radius: 8px;
  box-shadow: 0px 1px 7px 9px rgba(0, 0, 0, 0.03);
  background: var(--board-bg-color);
  .chart-con {
    width: 100%;
    .chart {
      width: 100%;
      height: 200px;
    }
  }
  .block-type {
    position: relative;
    z-index: 10;
    padding-bottom: 30px;
    .arrow {
      position: absolute;
      top: 30px;
      font-size: 30px;
      color: var(--main-text-color);
      cursor: pointer;
      &.left {
        left: 20px;
      }
      &.right {
        right: 20px;
      }
    }
    .vue-slider {
      margin: 20px 200px 0;
    }
    &::v-deep .vue-slider-mark-label {
      color: var(--main-text-color);
    }
  }
  .block-type div.type-list {
    width: 600px;
    margin: 0 auto;
    //padding-bottom: 20px;
    white-space: nowrap;
    color: var(--main-text-color);
    & > span {
      margin-left: 20px;
    }
    i {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 5px;
      &.null {
        background: var(--null-block-bg-color);
      }
      &.ticket {
        background: var(--ticket-block-bg-color);
      }
      &.normal {
        border: 1px solid var(--other-block-border-color);
        width: 8px;
        height: 8px;
      }
    }
  }
}
</style>
