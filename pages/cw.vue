<template>
  <div style="position: relative">
    <div
      class="block-header-chart"
      ref="chartContainer"
    ></div>
    <div class="console" style="position:absolute;right:85px;top:30px;">
      <div
        class="bc-search"
        style="padding: 8px 15px;border-radius: 30px;width: 200px;height: 38px;box-sizing: border-box;position:relative;"
      >
        <input
          type="text"
          :placeholder="tr('start')"
          v-model="key"
          @keyup="handleSearch"
          style="width:130px;height:25px;padding-left:10px;"
        />
        <i
          slot="suffix"
          class="iconfont icon-sosu"
          style="position:absolute;color: #999999;top:10px;right:20px;top:10px;"
        ></i>
      </div>
    </div>
    <div
      class="back-top-wrap ignore"
      style="position:absolute;right:105px;bottom:105px;"
    >
      <div
        class="back-top"
        style="width: 200px;height: 45px;border-radius: 25px;font-size:16px;"
        @click="handleBackTop"
      >
        <i class="el-icon-top" style="font-size: 20px;" />
        <div style="margin-left:8px;">{{ tr("latest") }}</div>
      </div>
    </div>
    <div
      class="tip-wrap"
      style="position:absolute;left:190px;top:30px;color:rgba(153,153,153,1);"
    >
      <div class="tip-show">
        <i class="el-icon-warning-outline" style="font-size: 16px;" />
        <div style="margin-left:8px;color:rgba(153,153,153,1);font-size:14px">
          {{ tr("op") }}
        </div>
      </div>
    </div>
    <div
      v-show="processing"
      class="loading-wrap"
      style="position: absolute;left:0;top:0; width: 100%;height: 100%;"
    >
      <div class="donut-wrap"><div class="donut" /></div>
    </div>
  </div>
</template>
<script>
// import leecharts from "leecharts"
import {
  contains,
  randStr,
  tail,
  timeToStr,
  delay,
  isArray,
  setStyle,
  setStyles
} from "mytoolkit"
// import * as d3 from "d3";
import axios from "axios"

const Ajax = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 100000,
  validateStatus: () => true
})
Ajax.interceptors.response.use(
  response => {
    // TODO
    let { data } = response
    return data
  },
  error => {
    return Promise.reject(error)
  }
)
export default {
  name: "chainWatch",
  data() {
    return {
      option: {},
      key: "",
      processing: false,
      prefix: "blockHeaderChart"
    }
  },
  beforeCreate: function() {
    this.blockList = []
    this.chainList = []
    this.blockHeightList = []
    this.blockHeightMap = {}
    this.blockMap = {}
    this.lastestHeight = 0
    this.bottomHeight = 0
    this.stageClipId = "lc-" + randStr(8)
    this.axisXClipId = "lc-" + randStr(8)
    this.axisYClipId = "lc-" + randStr(8)
    this.minerList = []
    this.colorList = []
    this.transformX = 0
    this.transformY = 0
    this.k = 1
    this.viewBoxWidth = null
    this.viewBoxHeight = null
    this.chainSorted = false
  },
  mounted: function() {
    window.addEventListener("resize", this.onResize.bind(this))
    this.init()
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.onResize.bind(this))
    if (this.chart) {
      this.chart.destroy()
    }
  },
  methods: {
    init() {
      this.chart = this.$leecharts(this.$refs.chartContainer)
      this.getBlocks()
      this.setColorList()
      let container = this.$refs.chartContainer
      let cc = window.document.querySelector(".content-container")
      let innerHeight = window.screen.availHeight
      let containerHeight = innerHeight
      containerHeight = cc.getBoundingClientRect().height
      setStyle(container, "height", containerHeight)
      // setStyles(this.$refs.chartSearch, {})
    },
    reset() {
      this.blockList = []
      this.chainList = []
      this.blockHeightList = []
      this.blockHeightMap = {}
      this.blockMap = {}
      this.lastestHeight = 0
      this.bottomHeight = 0
      this.minerList = []
      this.transformX = 0
      this.transformY = 0
      this.k = 1
      this.viewBoxWidth = null
      this.viewBoxHeight = null
      this.refresh = false
    },
    onResize() {
      this.chart.resize()
    },
    setColorList() {
      this.colorList = [
        "rgba(66,175,196,1)",
        "rgba(91,51,123,1)",
        "rgba(211,185,33,1)",
        "rgba(174,116,32,1)",
        "rgba(10,122,80,1)",
        "rgba(64,93,98,1)",
        "rgba(16,63,116,1)",
        "rgba(227,152,56,1)",
        "rgba(165,74,41,1)",
        "rgba(198,65,87,1)",
        "rgba(101,95,97,1)",
        "rgba(65,90,115,1)",
        "rgba(117,86,42,1)",
        "rgba(199,160,78,1)",
        "rgba(171,209,40,1)",
        "rgba(117,102,74,1)",
        "rgba(164,136,78,1)",
        "rgba(204,109,40,1)",
        "rgba(138,74,96,1)",
        "rgba(198,67,51,1)"
      ]
    },
    getMinerColor(miner) {
      let minerIdx = this.minerList.findIndex(m => m === miner)
      if (minerIdx === -1) {
        minerIdx = this.minerList.length
        this.minerList.push(miner)
      }
      return this.colorList[minerIdx % this.colorList.length]
    },
    appendBlocks(list) {
      if (!list || list.length == 0) {
        return
      }
      let bhl = this.blockHeightList
      let bhm = this.blockHeightMap
      let preHeight = tail(bhl) ? tail(bhl).height : 0

      for (let i = 0, l = list.length; i < l; i++) {
        let block = list[i]
        let bh = block.height
        let groupsInHeight = bhm[bh] || []
        if (bh != preHeight) {
          bhl.push(bh)
          preHeight = bh
        }
        this.appendBlockToChain(block)
        bhm[bh] = appendBlockToGroupList(groupsInHeight, block)
        this.blockMap[block.cid] = block
      }
    },
    appendBlockToChain(block) {
      let chainList = this.chainList
      let shouldMakeNew = true
      if (!this.chainSorted && chainList.length > 1) {
        chainList = chainList.sort((c1, c2) => {
          let d = c1.tail.parent_weight - c2.tail.parent_weight
          return d < 0 ? 1 : d == 0 ? 0 : -1
        })
        chainList[0].main = true
        this.chainSorted = true
      }
      for (let i = 0, l = chainList.length; i < l; i++) {
        let chain = chainList[i]
        if (chain.isMember(block)) {
          let prevtail = chain.tail
          chain.tail = block
          chain.grow()
          block.chain = chain
          shouldMakeNew = false
          // set tail child
          if (prevtail.height - block.height > 0) {
            chain.tailChild = prevtail
          }
          break
        }
      }
      if (shouldMakeNew) {
        let chain = new BlockChain()
        chain.head = chain.tail = block
        chain.grow()
        block.chain = chain
        chainList.push(chain)
      }
    },
    handleSearch(e) {
      if (e.keyCode != 13) {
        return
      }

      let height = parseInt(this.key) || 0
      this.refresh = true
      this.chainSorted = false
      this.getBlocks(height)
    },
    handleBackTop() {
      this.refresh = true
      this.chainSorted = false
      this.getBlocks(0)
    },
    getBlocks(height) {
      if (this.waitingData) {
        return
      }
      let gap = 60
      let endBlockHeight
      if (height != null || height != undefined) {
        endBlockHeight = height
      } else {
        endBlockHeight = this.bottomHeight
      }
      if (endBlockHeight < 0) {
        return
      }
      //startBlockHeight = Math.max(endBlockHeight - gap, 0);
      this.processing = true
      this.waitingData = true
      Ajax({
        method: "post",
        data: {
          id: 1,
          method: "filscan.GraphTipSetTree",
          params: [gap, endBlockHeight],
          jsonrpc: "2.0"
        }
      })
        .then(res => {
          res = res || {}
          let result = res.result
          let error = res.error
          if (!error && result && result.length > 0) {
            let d = result
            if (this.refresh) {
              this.reset()
            }
            this.blockList = [...this.blockList, ...d]
            this.appendBlocks(d)
            this.drawChart()
            this.bottomHeight = tail(d).height - 1
          }
          if (error) {
            console.log(error)
          }
          delay(() => (this.waitingData = false), 1000)
          this.processing = false
        })
        .catch(() => {
          delay(() => (this.waitingData = false), 1000)
          this.processing = false
        })
    },
    maxBlockCountInHeight() {
      let bhl = this.blockHeightList
      let bhm = this.blockHeightMap
      let max = 0,
        groupCount = 0
      bhl.forEach(h => {
        let gl = bhm[h]
        let count = 0
        gl.forEach(g => {
          count += g.length
        })
        if (count > max) {
          max = count
          groupCount = gl.length
        }
      })
      return [max, groupCount]
    },
    drawChart() {
      let getMinerColor = this.getMinerColor
      let getBlocks = this.getBlocks
      let textColor = this.theme === 'dark'? '#ffffff': '#272727'
      let bci = this
      if (this.chainList.length == 1) {
        this.chainList[0].main = true
      }
      this.chart.setOptions({
        tooltip: {
          show: true,
          formatter: data => {
            let p = "<ul style='padding-top: 10px;'>"
            ;(data.parents || []).forEach(item => {
              p += `<li style="padding-left: 20px;margin-bottom: 10px;">${item}</li>`
            })
            p += "</ul>"
            return `
                <div class="tt">
                  <div style="margin-bottom: 10px;">cid: ${data.cid}</div>
                  <div style="margin-bottom: 10px;">miner: ${data.miner}</div>
                  <div style="margin-bottom: 10px;">height: ${data.height}</div>
                  <div style="margin-bottom: 10px;">parent_weight: ${
                    data.parent_weight
                  }</div>
                  <div>
                    parents:
                    ${p}
                  </div>
                  <div style="margin-bottom: 10px;">block time: ${
                    data.block_time
                      ? timeToStr(data.block_time, "yyyy-mm-dd hh:mm:ss")
                      : ""
                  }</div>
                  <div style="margin-bottom: 10px;">first seen: ${
                    data.first_seen
                      ? timeToStr(data.first_seen, "yyyy-mm-dd hh:mm:ss")
                      : ""
                  }</div>
                </div>
              `
          },
          styles: {
            background: "rgba(0,0,0,.8)",
            "font-size": "14px",
            padding: "20px",
            color: "#fff",
            "border-radius": "4px",
            "box-shadow": "1px 1px 5px #000"
          }
        },
        grid: {
          top: 40,
          right: 100,
          left: 150,
          bottom: 80
        },
        series: [
          {
            type: "custom",
            draw: (chart, layer, s) => {
              let d3 = chart.d3
              let bhm = this.blockHeightMap
              let chainList = this.chainList
              let blockMap = this.blockMap
              let blockList = this.blockList

              setChainColor(chainList)
              resetChainTipset(chainList)
              //let maxChainBlockCount = getMaxChainBlockCount(chainList);
              let emitter = chart.emitter
              let stageWrap = layer.safeSelect("g.stage-wrap")
              let axisYWrap = layer.safeSelect("g.ay-wrap")
              let axisXWrap = layer.safeSelect("g.ax-wrap")

              const blockWidth = 160
              const blockHeight = 90
              const ph = 60

              let ellipseRX = 0.9 * blockWidth
              let ellipseRY = 0.55 * blockHeight

              let heightExtent = [tail(blockList).height, blockList[0].height]
              let [maxBlockCount, groupCount] = this.maxBlockCountInHeight()
              let viewBoxWidth = maxBlockCount * blockWidth + groupCount * ph
              let viewBoxHeight =
                (heightExtent[1] - heightExtent[0]) * blockHeight

              let stageWidth = Math.max(viewBoxWidth, chart.containerWidth)
              let stageHeight = Math.max(viewBoxHeight, chart.containerHeight)

              let y = d3
                .scaleLinear()
                .domain(heightExtent)
                .range([stageHeight - chart.gridTop, chart.gridBottom])
              let clipPath, clipPathId, clipRect

              // make clip path axis x
              clipPathId = this.axisXClipId
              clipPath = chart.sections.defs.safeSelect(
                `clipPath#${clipPathId}`
              )
              clipRect = clipPath.safeSelect("rect")
              clipRect.attrs({
                x: chart.gridLeft,
                width: chart.containerWidth - chart.gridRight - chart.gridLeft,
                height: 60
              })
              axisXWrap
                .attr(
                  "transform",
                  `translate(0,${chart.containerHeight - chart.gridBottom})`
                )
                .attr("clip-path", `url(#${clipPathId})`)
              axisXWrap.safeSelect("line.border").attrs({
                stroke: "rgba(243,146,27,1)",
                "stroke-width": "6px",
                x2: chart.containerWidth
              })

              // make clip path axis y
              clipPathId = this.axisYClipId
              clipPath = chart.sections.defs.safeSelect(
                `clipPath#${clipPathId}`
              )
              clipRect = clipPath.safeSelect("rect")
              clipRect.attrs({
                x: -80,
                y: chart.gridTop * 2,
                width: 100,
                height:
                  chart.containerHeight - chart.gridBottom - chart.gridTop + 3
              })
              axisYWrap
                .attr("clip-path", `url(#${clipPathId})`)
                .attr(
                  "transform",
                  `translate(${chart.gridLeft}, -${chart.gridTop})`
                )
              axisYWrap.safeSelect("line.border").attrs({
                stroke: "rgba(243,146,27,1)",
                "stroke-width": "4px",
                y2: chart.containerHeight
              })
              axisYWrap.safeSelect("g.axis-y").call(
                d3
                  .axisLeft(y)
                  .ticks(Math.round((heightExtent[1] - heightExtent[0]) / 2))
                //.tickFormat(d => d)
              )
              axisYWrap.safeSelect("path.domain").attrs({
                stroke: "rgba(0,0,0,0)"
              })
              let yTicks = axisYWrap.safeSelect("g.axis-y").selectAll("g.tick")
              yTicks.each(function() {
                let t = d3.select(this)
                t.safeSelect("line").attr("stroke", "rgba(0,0,0,0)")
                t.safeSelect("text").attrs({
                  fill: textColor,
                  "font-size": 16
                })
                t.safeSelect("circle").attrs({
                  r: 5,
                  fill: "rgba(255,209,153,1)"
                })
              })

              let stage = stageWrap.safeSelect("g.c-stage")
              // make clip path for stage
              clipPathId = this.stageClipId
              clipPath = chart.sections.defs.safeSelect(
                `clipPath#${clipPathId}`
              )
              clipRect = clipPath.safeSelect("rect")
              clipRect.attrs({
                x: chart.gridLeft,
                y: chart.gridTop,
                width: chart.containerWidth - chart.gridRight - chart.gridLeft,
                height: chart.containerHeight - chart.gridBottom - chart.gridTop
              })
              stageWrap.attr("clip-path", `url(#${clipPathId})`)
              let linkGroup = stage.safeSelect("g.link-group")
              let tipsetGroup = stage.safeSelect("g.tipset-group")
              let tipsetList = []
              let forkEndLinkGroup = stage.safeSelect("g.fork-end-link-group")

              let nodeGroup = stage.safeSelect("g.node-group")

              nodeGroup
                .selectAll("g.block-height")
                .data(s.data)
                .join("g.block-height")
                .each(function(blh) {
                  let bhEle = d3.select(this)
                  let groupList = bhm[blh]
                  let groupWidth = getGroupListWidth(groupList, blockWidth, ph)
                  let gx = (stageWidth - groupWidth) / 2
                  bhEle
                    .selectAll("g.block-group")
                    .data(groupList)
                    .join("g.block-group")
                    .each(function(blockGroup) {
                      let bgEle = d3.select(this)
                      let gw = getGroupListWidth(blockGroup, blockWidth, 0)
                      blockGroup.x = gx
                      blockGroup.y =
                        y(blockGroup[0].height) - blockHeight * 0.35
                      blockGroup.width = gw
                      blockGroup.height = blockHeight * 0.7
                      gx += gw + ph
                      tipsetList.push({
                        x: blockGroup.x,
                        y: blockGroup.y,
                        width: blockGroup.width,
                        height: blockGroup.height,
                        //fill: blockGroup[0].chain.color,
                        fill: blockGroup[0].chain.main
                          ? "rgba(124,181,236,.2)"
                          : "rgba(255,255,255,0.5)",
                        rx: 10,
                        ry: 10
                      })
                      blockGroup[0].chain.tipsetList.push(blockGroup)
                      bgEle
                        .selectAll("g.block-header")
                        .data(blockGroup)
                        .join("g.block-header")
                        .each(function(d, i) {
                          let curHeight = d.height
                          let mainColor = getMinerColor(d.miner)

                          let bh = d3.select(this)

                          let wrapX = blockGroup.x + (i + 0.5) * blockWidth
                          let wrapY = y(curHeight)
                          d.x = wrapX
                          d.y = wrapY
                          bh.attr("transform", `translate(${wrapX}, ${wrapY})`)

                          // bh.safeSelect("ellipse")
                          //   .attrs({
                          //     rx: ellipseRX,
                          //     ry: ellipseRY,
                          //     fill: mainColor
                          //   })

                          bh.on("mouseover", onMMove).on("mouseout", onMOut)
                          bh.safeSelect("rect").attrs({
                            width: ellipseRX,
                            height: ellipseRY,
                            fill: d.chain.main
                              ? mainColor
                              : "rgba(100,100,100,0.8)",
                            rx: 6,
                            ry: 6,
                            x: -ellipseRX / 2,
                            y: -ellipseRY / 2
                          })

                          bh.safeSelect("text.t-height")
                            .text(`${dotString(d.cid)}`)
                            .attrs({
                              fill: textColor,
                              y: -12,
                              "text-anchor": "middle",
                              "font-size": 11
                            })
                            .on("click", function() {
                              bci.goTo("tipset", {
                                query: { hash: d.cid }
                              })
                            })

                          bh.safeSelect("text.t-miner")
                            .text(`${d.miner} - ${d.height}`)
                            .attrs({
                              fill: textColor,
                              "text-anchor": "middle",
                              "font-size": 11,
                              y: 5
                            })
                            .on("click", function() {
                              bci.goTo("addressDetail", {
                                query: { address: d.miner }
                              })
                            })
                          bh.safeSelect("text.t-time")
                            .text(
                              `${timeToStr(
                                d.first_seen,
                                "yyyy-mm-dd hh:mm:ss"
                              )}`
                            )
                            .attrs({
                              fill: textColor,
                              "text-anchor": "middle",
                              "font-size": 10,
                              y: 20
                            })
                          let switchTooltip = makeSwitchTooltip()

                          function onMMove() {
                            switchTooltip(true, d3.event)
                          }
                          function onMOut() {
                            switchTooltip(false, d3.event)
                          }
                          function makeSwitchTooltip() {
                            let timeHandle = null
                            let shouldShow = false
                            let delta = 100
                            return (show, d3Event) => {
                              shouldShow = show
                              if (timeHandle) {
                                clearTimeout(timeHandle)
                              }
                              timeHandle = setTimeout(() => {
                                let emitData = {
                                  type: "item",
                                  data: null
                                }
                                if (shouldShow) {
                                  emitData.data = d
                                  emitData.event = d3Event
                                }
                                emitter.emit("showTooltip", emitData)
                                timeHandle = null
                              }, delta)
                            }
                          }
                        })
                    })
                })

              tipsetGroup
                .selectAll("rect.tipset")
                .data(tipsetList)
                .join("rect.tipset")
                .each(function(d) {
                  d3.select(this).attrs(d)
                })
              let [linkData, forkEndLinkData] = getLinkData(chainList, blockMap)
              linkGroup
                .selectAll("g.link")
                .data(linkData)
                .join("g.link")
                .each(function(d) {
                  let lg = d3.select(this)
                  let p1 = {},
                    p2 = {}
                  p1.x = d.start.x + d.start.width / 2
                  p1.y = d.start.y + blockHeight * 0.7
                  p2.x = d.end.x + d.end.width / 2
                  p2.y = d.end.y

                  let line = lg.safeSelect("line").attrs({
                    stroke: "#fff",
                    "stroke-width": 2,
                    x1: p1.x,
                    y1: p1.y,
                    x2: p2.x,
                    y2: p2.y
                  })
                  if (d.type == "fork") {
                    line.attr("stroke-dasharray", "8, 4")
                  }

                  let wtY = p1.y - p2.y
                  let wtX = p1.x - p2.x
                  let angleTan = Math.abs(wtY) / Math.abs(wtX)
                  let angDegree = getTanDeg(angleTan)
                  if (wtX < 0) {
                    angDegree = 180 - angDegree
                  }
                  let arrowSideLength = 12
                  let arrowAngle = (25 * Math.PI) / 180
                  lg.safeSelect("path").attrs({
                    transform: `translate(${p2.x}, ${p2.y}) rotate(-${angDegree})`,
                    fill: "#fff",
                    d: () => {
                      let c1 = arrowSideLength * Math.cos(arrowAngle)
                      let c2 = arrowSideLength * Math.sin(arrowAngle)
                      let d2 = -c2

                      return `M0,0L${c1},${d2}L${c1},${c2}z`
                    }
                  })
                })

              forkEndLinkGroup
                .selectAll("g.link")
                .data(forkEndLinkData)
                .join("g.link")
                .each(function(d) {
                  let lg = d3.select(this)
                  let p1 = {},
                    p2 = {}
                  p1.x = d.start.x + d.start.width / 2
                  p1.y = d.start.y + blockHeight * 0.7
                  p2.x = d.end.x
                  p2.y = d.end.y - blockHeight * 0.29

                  lg.safeSelect("line").attrs({
                    stroke: "#fff",
                    "stroke-width": 1,
                    "stroke-dasharray": "8,4",
                    x1: p1.x,
                    y1: p1.y,
                    x2: p2.x,
                    y2: p2.y
                  })

                  let wtY = p1.y - p2.y
                  let wtX = p1.x - p2.x
                  let angleTan = Math.abs(wtY) / Math.abs(wtX)
                  let angDegree = getTanDeg(angleTan)
                  if (wtX < 0) {
                    angDegree = 180 - angDegree
                  }
                  let arrowSideLength = 10
                  let arrowAngle = (16 * Math.PI) / 180
                  lg.safeSelect("path").attrs({
                    transform: `translate(${p2.x}, ${p2.y}) rotate(-${angDegree})`,
                    fill: "#fff",
                    d: () => {
                      let c1 = arrowSideLength * Math.cos(arrowAngle)
                      let c2 = arrowSideLength * Math.sin(arrowAngle)
                      let d2 = -c2

                      return `M${c1},${d2}L0,0L${c1},${c2}`
                    }
                  })
                })
              // pan and zoom
              let startT, startX, startY, endX, endY
              startX = startY = endX = endY = null
              if (bci.transformY === 0) {
                stage.attr(
                  "transform",
                  `translate(${bci.transformX}, ${bci.transformY}) scale(${bci.k})`
                )
                axisYWrap
                  .select("g.axis-y")
                  .attr(
                    "transform",
                    `translate(0, ${bci.transformY + 50}) scale(1,${bci.k})`
                  )
              }
              let zoom = d3
                .zoom()
                .scaleExtent([1, 1])
                .on("start", zoomStart)
                .on("zoom", zoomed)
                .on("end", zoomEnd)
              d3.select(".lc-root").call(zoom)

              function zoomed() {
                let t = d3.event.transform
                let sevent = d3.event.sourceEvent
                if (!sevent) {
                  return
                }
                endX = sevent.pageX
                endY = sevent.pageY
                if (startX === null) {
                  startX = endX
                  startY = endY
                }
                let dx = endX - startX
                let dy = endY - startY
                bci.k = t.k
                stage.attr(
                  "transform",
                  `translate(${bci.transformX + dx}, ${bci.transformY +
                    dy}) scale(${t.k})`
                )
                // axisXWrap
                //   .select("g.axis-x")
                //   .attr(
                //     "transform",
                //     `translate(${bci.transformX + dx}, 0) scale(${t.k}, 1)`
                //   );
                axisYWrap
                  .select("g.axis-y")
                  .attr(
                    "transform",
                    `translate(0, ${bci.transformY + 50 + dy}) scale(1,${t.k})`
                  )
              }
              function zoomStart() {
                startT = d3.event.transform
                let sevent = d3.event.sourceEvent
                if (sevent) {
                  startX = sevent.pageX
                  startY = sevent.pageY
                }
              }
              function zoomEnd() {
                if (endY && startY) {
                  bci.transformX += endX - startX
                  bci.transformY += endY - startY
                  startX = startY = endX = endY = null
                  let t = d3.event.transform
                  let x = bci.transformX
                  let y = bci.transformY
                  let gx, gy, direction
                  gx = t.x - startT.x
                  gy = t.y - startT.y
                  //console.log(bci.transformX, bci.transformY);
                  if (Math.abs(gx) > Math.abs(gy)) {
                    if (gx > 0) {
                      direction = "right"
                    } else if (gx < 0) {
                      direction = "left"
                    }
                  } else {
                    if (gy < 0) {
                      direction = "up"
                    } else if (gy > 0) {
                      direction = "down"
                    }
                  }
                  if (
                    viewBoxWidth + x + chart.gridRight - chart.containerWidth <
                      0 &&
                    direction === "left"
                  ) {
                    //fromBottom = false;
                  }
                  if (x > 0 && direction === "right") {
                    //console.log("right", x);
                    //fromBottom = true;
                  }
                  if (y > 0 && direction === "down") {
                    //fromBottom = false;
                  }
                  if (
                    y -
                      chart.containerHeight +
                      viewBoxHeight +
                      chart.gridBottom <
                      0 &&
                    direction === "up"
                  ) {
                    console.log("load")
                    getBlocks()
                  }
                }
                if (bci.transformY >= 10) {
                  bci.transformY = 10
                  stage
                    .transition()
                    .duration(200)
                    .attr(
                      "transform",
                      `translate(${bci.transformX}, ${bci.transformY}) scale(${bci.k})`
                    )
                  axisYWrap
                    .select("g.axis-y")
                    .transition()
                    .duration(200)
                    .attr(
                      "transform",
                      `translate(0, ${bci.transformY + 50}) scale(1,${bci.k})`
                    )
                }
              }
            },
            data: this.blockHeightList
          }
        ]
      })
    }
  }
}

function getTanDeg(tan) {
  let result = Math.atan(tan) / (Math.PI / 180)
  result = Math.round(result)
  return result
}

function dotString(str = "", headLen = 6, tailLen = 6) {
  let strLen = str.length
  if (strLen < headLen + tailLen) {
    return str
  }
  let headStr = str.slice(0, headLen)
  let tailStr = tailLen > 0 ? str.slice(-tailLen) : ""
  return `${headStr}...${tailStr}`
}

// function randColor(){
//   return d3.hsl(randInt(360),randInt(60,100), randInt(20,50)).toString();
// }

function appendBlockToGroupList(gl, b) {
  let shouldMakeNew = true

  for (let i = 0, l = gl.length; i < l; i++) {
    let g = gl[i]
    let c1 = g[0].chain
    let c2 = b.chain
    if (c1.head.cid == c2.head.cid && c1.tail.cid == c2.tail.cid) {
      shouldMakeNew = false
      g.push(b)
      break
    }
  }
  if (shouldMakeNew) {
    gl.push([b])
  }
  return gl
}

function isSameCids(cids1, cids2) {
  let len1 = cids1.length
  let len2 = cids2.length
  if (len1 != len2) {
    return false
  }
  for (let i = 0; i < len1; i++) {
    let cid = cids1[i]
    if (!contains(cids2, cid)) {
      return false
    }
  }
  return true
}
class BlockChain {
  constructor() {
    this.head = null
    this.tail = null
    this.tailChild = null
    this.blockCount = 0
    this.tipsetList = []
    this.main = false
  }
  isMember(block) {
    let tailChild = this.tailChild
    let tailHeight = this.tail.height
    if (block.height == tailHeight) {
      if (tailChild) {
        return contains(tailChild.parents, block.cid)
      }
      return (
        isSameCids(this.tail.parents || [], block.parents || []) &&
        this.tail.parent_weight - block.parent_weight == 0
      )
    } else {
      return contains(this.tail.parents || [], block.cid)
    }
  }
  grow() {
    this.blockCount++
  }
}
// function getCids(cidArray) {
//   return cidArray.map(item => {
//     return item;
//   });
// }
// function getMainChain(chainList) {
//   let mainChain = chainList[0];
//   chainList.forEach(c => {
//     if (c.blockCount > mainChain.blockCount) {
//       mainChain = c;
//     }
//   });
//   return mainChain;
// }
function getMainChainLinkCount(chainList) {
  let count = 0
  chainList.forEach(c => {
    if (c.tipsetList.length > count) {
      count = c.tipsetList.length
    }
  })
  return count
}
function getGroupListWidth(gl, bw, padding) {
  let w = (gl.length - 1) * padding
  w += getGroupBlockCount(gl) * bw
  return w
}
function getGroupBlockCount(gl) {
  let c = 0
  gl.forEach(g => {
    if (isArray(g)) {
      g.forEach(() => {
        c++
      })
    } else {
      c++
    }
  })
  return c
}
function setChainColor(chainList) {
  let colors = [
    ["rgba(124,181,236,.2)", "rgba(124,181,236,.5)"],
    ["rgba(67,67,72,.2)", "rgba(67,67,72,.5)"],
    ["rgba(144,237,125,.2)", "rgba(144,237,125,.5)"],
    ["rgba(247,163,92,.2)", "rgba(247,163,92,.5)"],
    ["rgba(128,133,233,.2)", "rgba(128,133,233,.5)"],
    ["rgba(241,92,128,.2)", "rgba(241,92,128,.5)"],
    ["rgba(228,211,84,.2)", "rgba(228,211,84,.5)"],
    ["rgba(43,144,143,.2)", "rgba(43,144,143,.5)"]
  ]
  // let orderedList = chainList.sort((a, b) => {
  //   let ac = a.blockCount;
  //   let bc = b.blockCount;
  //   return ac - bc > 0 ? 1 : ac - bc < 0 ? -1 : 0;
  // });
  chainList.forEach((item, i) => {
    if (item.color) {
      return
    }
    let idx = i % colors.length
    item.color = colors[idx][0]
    item.linkColor = colors[idx][1]
  })
}
function resetChainTipset(chainList) {
  chainList.forEach(c => {
    c.tipsetList = []
  })
}
function getLinkData(chainList, blockMap) {
  let linkData = []
  let forkEndLinkData = []
  let mainChainLinkCount = getMainChainLinkCount(chainList)
  chainList.forEach(c => {
    let chainTipsetList = c.tipsetList
    let tail = chainTipsetList[0]
    for (let i = 1, l = chainTipsetList.length; i < l; i++) {
      let ts = chainTipsetList[i]
      linkData.push({
        type: l < mainChainLinkCount ? "fork" : "main",
        start: tail,
        end: ts
      })
      tail = ts
    }
    if (tail) {
      ;(tail[0].parents || []).forEach(cid => {
        if (blockMap[cid]) {
          forkEndLinkData.push({
            type: "fork-end",
            start: tail,
            end: blockMap[cid]
          })
        }
      })
    }
  })
  return [linkData, forkEndLinkData]
}
</script>
<style>
.t-height {
  cursor: pointer;
}
.t-miner {
  cursor: pointer;
}
/**
     *  donut-spinner
     *  source from https://30-seconds.github.io/30-seconds-of-css/#donut-spinner
     */
@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.donut {
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #ffffff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: donut-spin 1.2s linear infinite;
}
.donut-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 6px;
}
.bc-search {
  background-color:var( --bc-search) !important;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
}
.bc-search input[type="text"] {
  background-color: transparent !important;
  border: 0 !important;
  outline: 0 !important;
  color: #fff !important;
}
.back-top {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: var( --bc-search);
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
}
.tip-show {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.block-header-chart {
  user-select: none;
  height:80vh;
  background:var(--board-bg-color);
  margin:0 10px 10px 10px;
  min-width:1200px;
  cursor:pointer;
}
.lc-tooltip {
  user-select: none;
}
</style>
