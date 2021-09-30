<template>
  <client-only>
    <div class="mining">
      <co-heading url="ranking@2x" :title="tr('heading')" style="padding: 0;margin-bottom: 16px"></co-heading>
      <div
          class="mining-content content-bg-color radius border-outline"
      >
        <div class="top flex align-center radius border-btm">
          <co-tab
              :labels="tr('switch2')"
              @click="handleSwitch"
              :initIndex="initIndex"
          />
          <div class="selects">
            <co-time-select
                @time-select="handleTimeChange"
                v-if="[2, 3].includes(switchIndex) && timeBool"
                :times="times"
            />
            <co-select
                :options="tr('powerRanking.sectorOption')"
                :index.sync="index"
                @change="handleChange"
                v-if="[2,  3, 4].includes(switchIndex)"
            />
          </div>
        </div>
        <pool-ranking
            type="1"
            v-if="switchIndex === 0"
        />
        <top-miner
            v-else-if="switchIndex === 1"
            ref="top"
            :actor="formatActor"
            type="1"
        />
        <power-rate
            v-else-if="switchIndex === 2"
            :interval="interval"
            :order="order"
            type="1"
        />
        <miner-rate
            v-if="switchIndex === 3"
            :interval="interval"
            :actor="formatActor"
            :switchIndex="switchIndex"
            :order="order"
            type="1"
        />
      </div>
    </div>
  </client-only>
</template>
<script>
import PoolRanking from "@/bu-components/mining/PoolRanking"
import TopMiner from "@/bu-components/mining/TopMiner"
import PowerRate from "@/bu-components/mining/powerRate"
import MinerRate from "@/bu-components/mining/MinerRate"
export default {
  name: "CoMining",
  data() {
    return {
      prefix: "mining",
      actor: "",
      timeBool: true,
      interval: "24h",
      times: ["24h", "1w", "1m"],
      initIndex: 0,
      formatActor: [],
      switchIndex: 0,
      index: "0",
      order: 0
    }
  },
  components: {
    PoolRanking,
    TopMiner,
    PowerRate,
    MinerRate
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
      this.timeBool = false
      this.$nextTick(() => {
        this.timeBool = true
      })
    }
  },
  beforeMount() {
    const type = this.$route.query.type
    if (Number(type)) {
      this.initIndex = Number(type)
    }
  }
}
</script>
<style lang="scss">
.cell{
  padding-right: 12px!important;
  white-space: nowrap!important;
}
</style>
<style lang="scss" scoped>
.mining {
  padding: 20px;
  background-color: var(--content-bg-color);
  min-height: 800px;
  .title{
    font-size: 24px;
    margin-bottom: 16px;
  }
  .mining-content {
    color: var(--main-text-color);
    .top {
      height: 68px;
      padding: 0 20px;
      justify-content: space-between;
      .selects {
        display: flex;
        flex-direction: row;
        div:first-child {
          margin-right: 20px;
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
  }
}
.cell div span{
  font-size: 26px!important;
  font-weight: 500!important;
  background-color: red!important;
}
</style>
