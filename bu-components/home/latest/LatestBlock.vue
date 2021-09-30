<template>
  <div class="latest-block">
    <div class="title" :class="{ 'mb-top': isMobile }">
      <span>{{ tr("title") }}</span>
      <div class="flex align-center pointer" @click="goTo('tipset')">
        {{ tr("more") }}
        <span class="iconfont icon-you"></span>
      </div>
    </div>
    <div class="tipset-list">
      <tipset-item
        v-for="tipset in tipsetList"
        :key="tipset.height"
        :tipset="tipset"
        :columns="tipsetColumns"
        :labels="labels"
      ></tipset-item>
    </div>
  </div>
</template>
<script>
import TipsetItem from "./TipsetItem"
export default {
  name: "LatestBlock",
  data: function() {
    return {
      tipsetList: [],
      prefix: "home.latest.block",
      tipsetColumns: [
        { key: "cid", isLink: true, target: "tipset/chain", paramKey: "hash" },
        {
          key: "miner",
          isLink: true,
          target: "tipset/address-detail",
          paramKey: "address"
        },
        { key: "reward", unit: "FIL", class: " p-right-40 jus-end" }
      ]
    }
  },
  components: {
    TipsetItem
  },
  methods: {
    async getBlockData() {
      try {
        const data = await this.$api.getLatestBlocks([20])
        const map = {}
        data.forEach(item => {
          let { height, miner, block_time, cid, reward } = item
          reward = Number(reward).toFixed(5)
          if (map[height]) {
            map[height].blocks.push({
              cid,
              miner,
              reward
            })
          } else {
            map[height] = {
              height: String(height),
              miner,
              originTime: block_time,
              current: new Date().getTime(),
              time: this.formatTime(block_time),
              blocks: [
                {
                  cid,
                  reward,
                  miner
                }
              ]
            }
          }
        })
        const list = Object.values(map)
          .map(item => {
            return item
          })
          .sort((a, b) => b.height - a.height)
        this.tipsetList = Object.freeze(list)
        return Promise.resolve()
      } catch (e) {
        //this.blockTable.loading = false;
      }
    },
    initTimer() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.tipsetList = Object.freeze(
          this.tipsetList.map(item => {
            return {
              ...item,
              time: this.formatTime(item.originTime, item.current),
              current: item.current + 1000
            }
          })
        )
      }, 1000)
    }
  },
  mounted() {
    this.getBlockData().then(() => {
      this.initTimer()
    })
  },
  computed: {
    labels() {
      return this.$t("tipset.item.labels").filter((item, index) => index != 2)
    }
  },
  watch: {
    async latestBlockHeight() {
      await this.getBlockData()
      this.initTimer()
    }
  }
}
</script>
<style lang="scss" scoped>
.latest-block {
  color: var(--main-text-color);
  background: var(--board-bg-color);
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  .title {
    background: var(--board-item-bg-color);
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    border-radius: 6px 6px 0 0;
    font-size: 20px;
    div {
      font-size: 14px;
    }
  }
  .tipset-list {
    flex: 1;
    overflow-y: auto;
    padding: 0 14px;
    margin: 20px 14px 20px 0;
    font-weight: 400;
    &::v-deep .tipset-item {
      &:first-child {
        margin-top: 0;
      }
      .miner {
        max-width: 130px;
      }
    }
  }
  @media (max-width: 768px) {
    height: 73.333vw;
    margin-bottom: 2.667vw;
    .title {
      font-size: 3.733vw;
      .flex {
        font-size: 2.933vw;
      }
    }
    .tipset-list {
      padding: 2.667vw;
    }
    .tipset-list ::v-deep .tipset-item {
      margin-bottom: 2.667vw;
      .height {
        padding: 0 2.667vw !important;
      }
      .cid {
        order: 2;
        min-width: 50%;
        font-size: 2.933vw;
      }
      .miner {
        order: 1;
        min-width: 50%;
        font-size: 2.933vw;
      }
      .reward {
        order: 3;
        font-size: 2.933vw;
        justify-content: flex-start;
      }
    }
  }
}
</style>
