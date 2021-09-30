<template>
  <client-only>
  <div class="mining bottom-10 bg-board radius">
    <div class="top flex align-center radius bottom-20">
      <div class="titles">
      <div class="page-title">
        <div>{{tr('heading')}}</div>
      </div>
      <div class="selects">
        <cm-time-select
                @time-select="handleTimeChange"
                v-if="[2, 3].includes(switchIndex) && timeBool"
                :times="times"
        />
        <cm-select
                :options="tr('powerRanking.sectorOption')"
                :index.sync="index"
                @change="handleChange"
                v-if="[2,  3, 4].includes(switchIndex) && timeBool"
        />
      </div>
      </div>
        <cm-tab
                :labels="[tr('switch'), tr('switch2')][Number(isMobile)]"
                @click="handleSwitch"
                :initIndex="initIndex"
                class="top-20"
        />
    </div>
    <cm-ranking-pool v-if="switchIndex===0" />
    <cm-ranking-miner v-if="switchIndex===1" ref="top" :actor="formatActor" />
    <cm-ranking-rate v-if="switchIndex===2" :interval="interval" :order="order" />
    <cm-ranking-profit
      v-if="switchIndex===3"
      :interval="interval"
      :actor="formatActor"
      :switchIndex="switchIndex"
      :order="order"
    />
  </div>
  </client-only>
</template>
<script>
export default {
  name: "Mining",
  layout: 'mlayout',
  data() {
    return {
      prefix: "mining",
      timeBool: true,
      times: ["24h", "1w", "1m"],
      showTopMiner: true,
      actor: "",
      interval: "24h",
      initIndex: 0,
      formatActor: [],
      switchIndex: 0,
      index: "0",
      order: 0
    }
  },
  methods: {
    handleChange(v) {
      this.order = Number(v)
    },
    handleSearch() {
      this.formatActor = this.formatInput()
      this.$bus.$emit("mining-search", this.actor)
    },
    handleTimeChange(v) {
      this.interval = v.type
    },
    formatInput() {
      const v = this.actor.replace(/[^0-9a-z,]/g, "")
      return v.split(",").filter(item => item != "")
    },
    handleSwitch(e) {
      this.switchIndex = e
      this.index = "0"
      this.handleChange(0)
      this.timeBool = false
      this.$nextTick(() => {
        this.timeBool = true
      })
      this.showTopMiner = !e
    }
  },
  beforeMount() {
    const type = this.$route.query.type
    if (Number(type)) {
      this.showTopMiner = false
      this.initIndex = Number(type)
    }
  }
}
</script>
<style lang="scss" scoped>
.mining {
  color: var(--main-text-color);
  padding: 20px;
  padding-bottom: 0;
  .top {
    height: 68px;
    .titles{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .selects {
        display: flex;
        flex-direction: row;
        div:first-child {
          margin-right: 20px;
        }
        margin-right: 20px;
      }
      .page-title{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 20px;
        margin-bottom: 0 !important;
        white-space: nowrap;
        line-height: 37px;
        font-size: 26px;
        font-weight: 500;
      }
    }
    .search-wrap {
      width: 380px;
      height: 40px;
      border-radius: 20px;
      padding: 0 30px;
      &.auto {
        margin-left: auto;
      }
      &::v-deep .el-input {
        input {
          background: none;
          border: none;
          color: var(--main-text-color);
        }
      }
    }
    .time-selector {
      margin: 0 60px 0 auto;
    }
  }
  @media (max-width: 768px) {
    padding: 0;
    margin-bottom: 0;
    .top {
      height: auto;
      flex-wrap: wrap;
      align-items: center;
      padding: 2.667vw 0 0 0;
      .time-selector {
        height: 6.4vw;
        padding: 0;
        margin-right: 0;
        box-sizing: border-box;
      }
    }
    .search-wrap {
      height: 6.667vw;
      box-sizing: border-box;
      background: var(--board-item-bg-color);
      color: var(--main-text-color);
      flex: 1;
      margin-left: 2.667vw;
      padding: 0 2.667vw;
      border-radius: 1.6vw;
      &::v-deep .el-input {
        input {
          height: 100%;
          border: none;
          font-size: 2.4vw;
          background: none !important;
          text-align: center;
        }
        .el-input__suffix {
          right: 4vw;
          top: 0.667vw;
        }
      }
      .iconfont {
        color: #6b7278;
        font-size: 3.733vw;
      }
    }
    .tools {
      margin-bottom: 2.667vw;
      padding-right: 2.667vw;
      .time-selector {
        padding: 0;
        padding-left: 2.667vw;
      }
    }
  }
}
</style>
