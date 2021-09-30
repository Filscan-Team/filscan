<template>
  <div
    class="chain-con"
    v-loading="loading"
    element-loading-background="var(--board-bg-color)"
  >
    <div class="top">
      <Watch />
      <div class="type-list flex">
        <div
          v-for="(type, index) in $t('tipset.blockType')"
          :key="type"
          class="type-item flex align-center"
        >
          <span class="block" :class="['null', 'min', 'other'][index]"></span>
          <span>{{ type }}</span>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="left pointer" @click="goLeft">
        <span class="el-icon-arrow-left"></span>
      </div>
      <div
        class="flex tipset-list"
        :class="{ 'jus-between': tipsetList.length == 12 }"
      >
        <div
          v-for="(tipset, index) in tipsetList"
          :key="index"
          class="tipset-item flex column"
          :class="{
            active: tipset.height == $route.query.height,
            'left-20': tipsetList.length != 12
          }"
        >
          <div class="height pointer" @click="handleHeightChange(tipset)">
            {{ tipset.height }}
          </div>
          <div
            @mouseenter="handleMouseEnterBlock($event, block)"
            @mouseleave="tooltipShow = false"
            @click="handleBlockClick(block)"
            v-for="block in tipset.blocks"
            :key="block.cid"
            class="block-item pointer"
            :class="{
              min: block.type == 'min',
              null: block.type == 'null',
              other: !block.type,
              active: block.hash && block.hash == $route.query.hash
            }"
          >
            {{ block.type == "null" ? "Null" : block.miner }}
          </div>
          <span class="iconfont icon-arrow-right"></span>
        </div>
      </div>
      <div class="right pointer" @click="goRight">
        <span class="el-icon-arrow-right"></span>
      </div>
    </div>
    <div
      class="flex ruler-x pointer"
      @mousemove.self="handleMouseMove"
      @click="handleHoverClick"
      v-if="jumpSafeHeight > 100"
    >
      <div
        class="ignore"
        @mouseenter="handleMark(item / jumpSafeHeight)"
        v-for="item in marks"
        :key="item"
        :style="{ left: `${(item * 100) / jumpSafeHeight}%` }"
      >
        <span>{{ item }}</span>
      </div>
      <span class="dot abs-y" :style="{ left: dotLeft }">
        <span class="height-tooltip abs-x">{{ tooltipHeight }}</span>
      </span>
      <span
        class="hover-height-tooltip"
        :style="{ left: hoverLeft * 100 + '%' }"
        >{{ hoverHeight }}</span
      >
    </div>
    <!-- block hover tooltip -->
    <div
      class="tooltip"
      :style="{ left: tooltipPos[0] + 'px', top: tooltipPos[1] + 'px' }"
      v-if="tooltipShow"
    >
      <div v-for="item in $t('tipset.tooltip')" :key="item.label">
        <span>{{ item.label }}</span>
        <span>{{ enteredBlock[item.key] }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from "./mixin.js"
import Watch from "@/bu-components/home/Watch"
import { mapGetters } from 'vuex'
export default {
  name: "Chain",
  data() {
    return {
      activeIndex: 0,
      tipsetList: [],
      tooltipPos: [],
      tooltipShow: false,
      enteredBlock: {},
      startHeight: 0,
      jumpSafeHeight: 0,
      loading: false,
      hoverLeft: 0,
      hashList: []
    }
  },
  computed: {
    ...mapGetters('app', ['theme']),
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
      res.unshift(0) //add Genesis
      return res
    },
    dotLeft() {
      return `${(this.tooltipHeight * 100) / this.jumpSafeHeight}%`
    },
    tooltipHeight() {
      const { height, jumpHeight, hash } = this.$route.query
      if (!height && jumpHeight == undefined && !hash) {
        return this.jumpSafeHeight
      } else {
        let h = 0
        if (this.hash) {
          h = this.currentBlock.heightNum || 0
        } else {
          let jumph
          if(Number(jumpHeight)<=0){
            jumph = 0
          }else if(Number(jumpHeight)>this.jumpSafeHeight){
            jumph = this.jumpSafeHeight
          } else{
            jumph = jumpHeight
          }
          h = height||jumph
        }
        return this.parseFormatNumber(
          parseInt(h) == h ? h : this.jumpSafeHeight
        )
      }
    },
    hoverHeight() {
      return parseInt(this.jumpSafeHeight * this.hoverLeft)
    }
  },
  methods: {
    handleHeightChange(tipset) {
      const { min_ticket_block_cid, height } = tipset
      if (min_ticket_block_cid) {
        //only trigger in tipset which is not empty
        this.$emit("height-change", height)
      }
    },
    handleMark(left) {
      //get exact height when mouse enter the mark while the latest height is high and 1px may contain too many blocks
      this.hoverLeft = left
    },
    handleMouseEnterBlock(e, block) {
      if (block.type == "null") {
        return
      }
      const { x, y } = e.target.getBoundingClientRect()
      if (block.index >= 9) {
        this.tooltipPos = [x - 550, y + 20]
      } else {
        this.tooltipPos = [x + 80, y + 20]
      }
      this.tooltipShow = true

      this.enteredBlock = block
    }, //show tooltip when mouseenter
    handleBlockClick(block) {
      if (block.type == "null") {
        return
      }
      this.$emit("hash-change", block.hash)
    }, //handle click event
    async goLeft() {
      let jumpHeight = Math.max(this.startHeight - 12, 12)
      await this.getTipset(jumpHeight)
      this.goTo("tipset-chain", {
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
      if (Number(this.startHeight) + 12 >= this.jumpSafeHeight) {
        jumpHeight = this.jumpSafeHeight
      } else {
        jumpHeight = Number(this.startHeight + 12)
      }
      await this.getTipset(jumpHeight)
      this.goTo("tipset-chain", {
        query: {
          jumpHeight: jumpHeight
        }
      })
    },
    handleMouseMove(e) {
      this.hoverLeft = e.offsetX / e.target.getBoundingClientRect().width
    },
    async handleHoverClick() {
      const v = this.hoverHeight
      let jumpHeight
      if (this.jumpSafeHeight - v < 6) {
        jumpHeight = this.jumpSafeHeight
      } else {
        jumpHeight = v + 6
      }
      await this.getTipset(jumpHeight)
      this.goTo("tipset-chain", {
        query: {
          jumpHeight: jumpHeight - 6
        }
      })
    }
  },
  async mounted() {
    this.getInitialStatus()
  },
  mixins: [mixin],
  components: {
    Watch
  }
}
</script>
<style lang="scss" scoped>
.null {
  background: var(--null-block-bg-color);
}
.other {
  border: 1px solid var(--force-mark-color);
}
.min {
  background: var(--force-mark-color);
}
.chain-con {
  background: var(--content-bg-color);
  color: var(--main-text-color);
  //border-radius: 6px;
  padding: 20px 20px 80px 20px;
  .top {
    display: flex;
    position: relative;
    .watch {
      margin-top: 5px;
      margin-left: 100px;
    }
    .type-list {
      position: absolute;
      left: 50%;
      top: 20px;
      transform: translateX(-50%);
      .type-item {
        margin-right: 50px;
        span {
          display: inline-block;
          color: #999999;
          &:first-child {
            width: 30px;
            height: 16px;
            border-radius: 2px;
            margin-right: 6px;
          }
        }
      }
    }
  }
  .main {
    position: relative;
    margin-top: 50px;
    .left,
    .right {
      position: absolute;
      width: 44px;
      height: 44px;
      background: var(--block-icon-bg-color);
      color: var(--block-icon-color);
      border-radius: 50%;
      text-align: center;
      line-height: 44px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 24px;
      span {
        font-size: 20px;
      }
    }
    .right {
      right: 0;
    }
    .left {
      left: 0;
    }
    .tipset-list {
      padding: 0 70px;
      align-items: flex-end;
      .tipset-item {
        width: 85px;
        flex-direction: column-reverse;
        align-items: center;
        padding-bottom: 10px;
        border: 2px dashed transparent;
        border-radius: 2px;
        position: relative;
        &.active {
          border-color: var(--link-color);
          .height {
            text-align: center;
            padding:  0 16px;
            color: var(--main-text-color);
            background: var(--link-color);
          }
        }
        .block-item {
          height: 25px;
          width: 80px;
          border-radius: 2px;
          color: #ffffff;
          text-align: center;
          font-size: 12px;
          line-height: 25px;
          box-sizing: border-box;
          margin-top: 10px;
          &.other {
            color: var(--force-mark-color);
          }
          &:hover {
            transform: scale(1.1);
          }
          &.active {
            background: var(--force-mark-color);
            color: #ffffff;
          }
        }
        .height {
          font-size: 16px;
          margin-top: 10px;
          height: 25px;
          width: 50px;
          border-radius: 2px;
          text-align: center;
          line-height: 25px;
        }
        span {
          position: absolute;
          color: #545e65;
          left: calc(100% + 3px);
          bottom: 12px;
        }
        &:last-child {
          .iconfont {
            display: none;
          }
        }
      }
      .iconfont {
        transform: rotateY(180deg);
      }
    }
  }
  .ruler-x {
    margin: 60px 100px 0;
    height: 5px;
    background: var(--force-mark-color);
    border-radius: 2px;
    position: relative;
    div.ignore {
      width: 4px;
      height: 4px;
      background: #ffd199;
      position: absolute;
      border-radius: 2px;
      span {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 20px;
      }
    }
    & > span {
      position: absolute;
    }
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background: white;
      box-shadow: 0px 0px 2px 2px rgba(255, 255, 255, 0.5);
      .height-tooltip {
        display: inline-block;
        width: 76px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 4px;
        background: var(--tooltip-block-bg-color);
        color: #ffffff;
        position: absolute;
        top: -40px;
      }
      &:hover {
        & + .hover-height-tooltip {
          display: none;
        }
      }
    }
    .hover-height-tooltip {
      display: none;
      width: 56px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border-radius: 4px;
      background: rgba(66, 203, 211, 0.2);
      top: -44px;
      transform: translateX(-50%);
    }
    &:hover {
      .hover-height-tooltip {
        display: block;
      }
    }
  }
}
.tooltip {
  position: fixed;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  padding: 10px 5px 0;
  & > div {
    padding: 5px 20px;
    margin-bottom: 10px;
    font-size: 16px;
    color: #fff;
  }
}
</style>
