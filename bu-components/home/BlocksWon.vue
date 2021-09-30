<template>
  <div class="blocks-won bg-board" :class="{ 'not-index': !atIndex }">
<!--    <filecoin></filecoin>-->
    <div class="chart-slider">
      <div class="chart-title flex jus-between">
        <span>{{ tr('title') }}</span>
      </div>
      <div ref="chart" class="chart-con"></div>
    </div>
    <client-only>
      <div class="see-more border flex align-center jus-center" @click="goTo('blocksWon')" v-if="isMobile && atIndex">
        {{ tr('more') }}
        <i class="el-icon-arrow-right"></i>
      </div>
    </client-only>
    <div class="miner-select">
      <div class="title">
        <div class="flex align-center">{{ tr("miner") }}</div>
        <div class="flex align-center jus-center">
          {{ tr("blockRate.title") }}
          <el-popover
              placement="bottom-start"
              width="200"
              trigger="hover"
              :content="tr('blockRate.tips')"
              v-if="!isMobile"
          >
            <i
                class="el-icon-warning-outline"
                slot="reference"
                style="margin-left:3px"
            ></i>
          </el-popover>
        </div>
        <div class="flex align-center jus-end">
          {{ tr("block.title") }}
          <el-popover
              placement="bottom-start"
              width="200"
              trigger="hover"
              :content="tr('block.tips')"
              v-if="!isMobile"
          >
            <i
                class="el-icon-warning-outline"
                slot="reference"
                style="margin-left:3px"
            ></i>
          </el-popover>
        </div>
        <div class="flex align-center jus-end">
          {{ tr("win.title") }}
          <el-popover
              placement="bottom-start"
              width="200"
              trigger="hover"
              :content="tr('win.tips')"
              v-if="!isMobile"
          >
            <i
                class="el-icon-warning-outline"
                slot="reference"
                style="margin-left:3px"
            ></i>
          </el-popover>
        </div>
      </div>
      <div
          class="select-list"
          @mouseleave="handleMouseLeave('')"
          :class="{ scroll: !atIndex }"
      >
        <div
            v-for="item in legendData"
            :key="item.name"
            class="select-item flex align-center"
            @mouseenter="handleMouseEvent(item.name)"
            @click="handleClick(item.name)"
            :class="{ active: selectedKey == item.name || hoverKey == item.name }"
            :ref="item.name"
        >
          <div class="miner">
            <span :style="{ background: item.color }"></span>
            <span>{{ item.name }}</span>
          </div>
          <div class="block-rate">
            <i>
              <b>{{ item.blockRate + "%" }}</b>
            </i>
          </div>
          <div class="block-count">
            {{ item.blockCount }}
            <i>
              <b>{{ item.percent + "%" }}</b>
            </i>
          </div>
          <div class="win-count">
            {{ item.winCount }}
            <i>
              <b>{{ item.winPercent + "%" }}</b>
            </i>
          </div>
        </div>
      </div>
      </div>
  </div>
</template>
<script>
import Watch from './Watch'
import Filecoin from './Filecoin'
import { mapActions } from 'vuex'
let chart
import randomColor from 'randomcolor'
export default {
  name: 'BlocksWon',
  data() {
    return {
      prefix: 'home.blocksWon',
      series: [],
      legendData: [],
      selectedKey: '',
      hoverKey: '',
      avgTime: 0,
      latestTime: new Date().getTime(),
      formatLatestTime: '',
      timer: ''
    }
  },
  methods: {
    ...mapActions('app', ['setLatestBlockTime']),
    drawChart(miner = '') {
      const vm = this
      let xData = []
      if (this.series.length > 0) {
        xData = this.series[0].data.map((item) => item.height)
      }

      const series = this.series.map((item) => {
        let opacity = 1
        if (!miner) {
          opacity = 1
        } else {
          if (miner != item.name) {
            opacity = 0.2
          }
        }
        return {
          ...item,
          itemStyle: {
            opacity
          }
        }
      })
      const rate = this.rate
      const selected = {}
      const legendData = this.legendData
      const color = this.theme === 'light' ? '#333333' : 'white'
      const show = this.legendData.length === 0
      const fontSize =  (this.isMac?10:12) * rate
      const tooltipShow = !this.isMobile
      const titleText = this.tr('chart.title')
      const isMobile = this.isMobile
      legendData.forEach((item) => {
        if (!this.selectedKey) {
          selected[item.name] = true
        } else {
          selected[item.name] = item.name === this.selectedKey
        }
      })
      const option = {
        tooltip: {
          trigger: 'item',
          formatter(p) {
            const { miner: miner_id, cid, block_time, height, win_count } = p.data.block
            return vm.tr('chart.tooltip', {
              miner_id,
              cid,
              block_time: vm.getFormatTime(block_time),
              height,
              win_count
            })
          },
          show: tooltipShow,
          backgroundColor: 'rgba(0,0,0,.6)'
        },
        xAxis: {
          type: 'category',
          data: xData,
          axisLine: {
            show: false,
            lineStyle: {
              color
            },
            textStyle: {
              fontSize: fontSize
            }
          },
          inverse: true,
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: fontSize
          }
        },
        yAxis: {
          type: 'value',
          minInterval: 1,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color
            }
          },
          axisLabel: {
            fontSize: fontSize,
            show: !isMobile
          }
        },
        grid: {
          left: 20 * rate,
          top: 50 * rate,
          bottom: 5 * rate,
          right: 15 * rate,
          containLabel: true
        },
        legend: {
          legendData,
          show: false,
          selected
        },
        series: series
      }
      const nullOption = {
        title: {
          text: titleText,
          left: 'center',
          top: 'center',
          textStyle: {
            color
          },
          show
        }
      }
      if (this.isMobile) {
        option.grid = {
          top: 30 * rate,
          right: 10 * rate,
          left: 10 * rate,
          bottom: 30 * rate
        }
        // option.dataZoom = [
        //   {
        //     type: "inside",
        //     zoomLock: true,
        //     start: 25,
        //     end: 50
        //   }
        // ];
        option.animation = false
        nullOption.title.textStyle.fontSize = 12
      }
      if (this.maxBlockCount < 3) {
        option.yAxis.max = this.maxBlockCount + 2
      }
      chart.setOption(show ? nullOption : option)
    },
    handleMouseEvent(key) {
      if (this.selectedKey) {
        return
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        //this.selectedKey = key;
        this.drawChart(key)
      }, 0)
    },
    handleMouseLeave(key) {
      console.log(key)
      this.selectedKey = ''
      this.getBlockWon()
    },
    handleClick(key) {
      this.selectedKey = !this.selectedKey ? key : this.selectedKey == key ? '' : key
      this.drawChart()
    },
    async getBlockWon() {
      const vm = this
      let colors = this.chartTheme.blocksWon.items
      let res = await this.$api.getGetBlockWonList([])
      let { tipsets, topn_miners } = res
      if (Array.isArray(topn_miners)) {
        let series = []
        let legendData = []
        let maxBlockCount = 0
        //because there may be no blocks in some height, at this situation, the api will jump that height,so you must generate height in frontend
        const startHeight = res.tipsets[res.tipsets.length - 1].height //get tipset start height
        const endHeight = res.tipsets[0].height //get tipset end height
        let fullHeightMap = {}
        for (let i = startHeight; i <= endHeight; i++) {
          fullHeightMap[i] = {
            height: i,
            blocks: [],
            min_ticket_block_cid: ''
          } //set all tipsets to null block tipset
        }
        tipsets.forEach((item, index) => {
          if (fullHeightMap[item.height]) {
            fullHeightMap[item.height] = item
            //if the tipset which has blocks exist,repalce it
          }
          if (index == 0 && item.blocks.length > 0) {
            this.latestTime = item.blocks[0].block_time
            this.formatLatestTime = this.formatTime(this.latestTime, null, false)
            this.setLatestBlockTime(this.formatTime(this.latestTime, null, false))
          }
        })
        let fullTipsets = Object.values(fullHeightMap)
        fullTipsets.reverse()
        if (this.isMobile && this.atIndex) {
          topn_miners = topn_miners.slice(0, 15)
        }
        topn_miners.forEach(({ miner, block_ratio, block_count, win_count, win_count_ratio, block_rate }, index) => {
          let seriesItem = []
          fullTipsets.forEach((item) => {
            const miners = item.blocks.map((tip) => tip.miner) //miners in given tipset
            if (item.blocks.length > maxBlockCount) {
              maxBlockCount = item.blocks.length //count max block count in 30 minutes
            }
            if (item.blocks.length === 0) {
              seriesItem.push({
                value: 0,
                height: item.height
              })
              //null block in this tipset
            } else {
              const block = item.blocks.filter((tip) => tip.miner === miner)[0] //get block mined by given miner
              seriesItem.push({
                value: miners.includes(miner) ? 1 : 0, // if given miner mined block in this tipset, set the value of the bar chart to 1
                height: item.height,
                block,
                miner,
                label: {
                  show: miners.includes(miner) && block && block.win_count > 1 && !this.isMobile,
                  fontSize: 12 * this.rate,
                  position: 'inside',
                  formatter() {
                    return block.win_count
                  }
                }
              })
            }
          })
          let color
          if (colors[index]) {
            color = colors[index].item
          } else {
            color = randomColor()
          }
          series.push({
            type: 'bar',
            data: seriesItem,
            name: miner,
            stack: 'bar',
            barCategoryGap: ['40%', '60%'][Number(vm.isMobile)],
            color,
            barMaxWidth: 40,
            itemStyle: {
              opacity: 1
            }
          })
          legendData.push({
            name: miner,
            color,
            percent: Number(block_ratio).toFixed(2),
            blockCount: block_count,
            blockRate: Number(block_rate).toFixed(2),
            winCount: win_count,
            winPercent: Number(win_count_ratio).toFixed(2)
          })
        })
        this.series = Object.freeze(series)
        this.legendData = Object.freeze(legendData)
        this.maxBlockCount = maxBlockCount
        this.initTimer()
        chart.clear()
        this.drawChart()
      }
    },
    initTimer() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.formatLatestTime = this.formatTime(this.latestTime, null, false)
        this.setLatestBlockTime(this.formatTime(this.latestTime, null, false))
      }, 1000)
    }
  },
  mounted() {
    this.getBlockWon()
    chart = this.$chart.init(this.$refs.chart)
    chart.on('click', (p) => {
      let url = '/tipset/chain?hash=' + p.data.block.cid
      this.$router.push(url)
      // this.goTo("tipset", {
      //   query: {
      //     hash: p.data.block.cid
      //   }
      // })
    })
    chart.on('mouseout', () => {
      this.hoverKey = ''
      this.drawChart()
    })
    chart.on('mouseover', (p) => {
      if (this.isMobile) {
        return
      }
      this.hoverKey = p.seriesName
      this.drawChart(p.seriesName)
      const selectedItem = this.$refs[p.seriesName]
      if (selectedItem) {
        selectedItem[0].scrollIntoView({
          block: 'center'
        })
        //make hovered miner scroll into view
      }
    })
    this.$bus.$on('window-resize', () => {
      chart.resize()
      this.drawChart()
    })
  },
  watch: {
    theme() {
      this.drawChart()
    },
    latestBlockHeight() {
      if (this.loadCount === 1) {
        return
      }
      this.getBlockWon()
    }
  },
  props: {
    time: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    Watch,
    Filecoin
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
<style lang="scss" scoped>
@mixin column() {
  $width: 70 110 82 82;
  @for $i from 1 through length($width) {
    box-sizing: border-box;
    margin-right: 20px;
    &:nth-child(#{$i}) {
      width: #{nth($width, $i)}px;
      @if $i>2 {
        text-align: right;
        padding-right: 10px;
      }
      @if $i==2 {
        text-align: center;
      }
      @if $i==4 {
        margin-right: 0;
      }
    }
  }
}
.blocks-won {
  padding: 20px;
  background-color: var(--content-bg-color);
  position: relative;
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  margin-bottom: 16px;
  .chart-slider {
    height: 275px;
    flex: 1;
    box-sizing: border-box;
    position: relative;
    .chart-title {
      position: absolute;
      color: var(--main-text-color);
      z-index: 10;
      top: 15px;
      left: 14px;
      font-size: var(--font-16);
      font-weight: 400;
      span {
        position: relative;
        right: 5px;
        top: -5px;
      }
      i {
        font-size: 12px;
      }
    }
    .chart-con {
      height: 100%;
    }
  }
  .miner-select {
    height: 282px;
    margin-top: -13px;
    border-left: 1px solid var(--border-line);
    box-sizing: content-box;
    padding-right: 13px;
    padding-left: 9px;
    color: var(--main-text-color);
    border-radius: 0 8px 8px 0;
    text-align: left;
    .title {
      display: flex;
      height: 40px;
      line-height: 40px;
      justify-content: space-between;
      font-size: 12px;
      div {
        &:first-child {
          padding-left: 23px;
        }
        @include column;
      }
    }
    .select-list {
      height: 245px;
      overflow-y: auto;
      overflow-x: hidden;
      .select-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 5px 0;
        justify-content: space-between;
        & > div {
          white-space: nowrap;
          &:first-child {
            padding-left: 10px;
          }
          i {
            background: var(--table-row-extra-color);
            display: inline-block;
            width: 50px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            border-radius: 10px;
            font-size: 12px;
            margin-left: 3px;
            color: var(--table-row-extra-text-color);
            b {
              display: block;
              transform: scale(0.833);
            }
          }
          @include column;
        }
        span:first-child {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          font-size: 12px;
          margin-right: 7px;
        }
        span:nth-child(2) {
          width: 110px;
        }
        span:nth-child(3),
        span:nth-child(4) {
          width: 70px;
          color: #2dd8d3;
          text-align: center;
        }
        &:hover,
        &.active {
          //opacity: 0.3;
          background: var(--table-row-hover-bg-color);
          i {
            background: var(--table-row-hover-extra-color);
            color: var(--main-text-color);
          }
        }
      }
    }
  }
  .right-con {
    position: absolute;
    top: 10px;
    right: 420px;
    .watch {
      margin-left: 40px;
    }
  }
}
@media (max-width: 768px) {
  .blocks-won.bg-board {
    height: auto;
    margin-bottom: 10px;
    padding: 0;
    //border-radius: 0.8vw;
    flex-direction: column;
    &.not-index {
      margin-bottom: 0;
    }
    & > div.blocks-title {
      position: static;
      height: 10.667vw;
      line-height: 10.667vw;
      padding: 0 2.667vw;
      background: var(--board-item-bg-color);
      font-size: 3.733vw;
      //border-radius: 6px 6px 0 0;
    }
    .chart-slider {
      overflow-x: auto;
      min-height: 40vw;

      .chart-con {
        width: 300vw;
        height: 100%;
      }
    }

    &::v-deep .right-con {
      right: 2.667vw;
      top: 12vw;
      div {
        font-size: 3.2vw;
        i {
          font-size: 3.2vw;
        }
      }
    }
    & > div.miner-select {
      position: static;
      display: flex;
      flex-direction: column;
      background: var(--board-bg-color);
      width: 100%;
      height: auto;
      padding: 0;
      border-left: none;
      border-top: 1px solid var(--border-color);
      border-radius: 0 0 0.8vw 0.8vw;
      .title {
        display: flex;
        height: 10.667vw;
        line-height: 10.667vw;
        justify-content: flex-start;
        div {
          flex: 1;
          margin-right: 0;
          &:first-child {
            padding-left: 5.333vw;
            max-width: 20vw;
          }
          &:nth-child(2) {
            margin: 0 auto;
          }
          &:nth-child(3),
          &:last-child {
            justify-content: center;
          }
        }
      }
      .select-list {
        flex: 1;
        height: auto;
        &.scroll {
          max-height: calc(100vh - 320px);
          overflow-y: auto;
        }
      }
      .select-item {
        width: 100%;
        height: 30px;
        box-sizing: border-box;
        & > div {
          margin-right: 0;
          flex: 1;
          &:first-child {
            max-width: 20vw;
          }
          display: flex;
          align-items: center;
          i {
            width: 12vw;
            height: 4vw;
            border-radius: 2vw;
            font-size: 2.4vw;
            line-height: 4vw;
            margin-left: 1.333vw;
            display: inline-block;
            color: var(--main-text-color);
          }
          justify-content: center;
          &.miner {
            padding-left: 2.667vw;
            justify-content: flex-start;
          }
          &.block-rate {
            i {
              margin-left: 0;
            }
          }
        }
      }
      .miner span:first-child {
        width: 1.333vw;
        height: 1.333vw;
        margin-right: 1.333vw;
      }
      .miner span:not(:first-child) {
        width: 6.667vw;
      }
    }
    .blocks-title {
      font-size: 10px;
    }
    .see-more {
      font-size: 2.933vw;
      font-weight: 400;
      &.border {
        border-top: 1px solid var(--border-color);
        height: 9.333vw;
      }
      i {
        font-size: 3.2vw;
      }
    }
  }
}
</style>
