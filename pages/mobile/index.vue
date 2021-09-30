<template>
  <div class="home-con">
     <div class="notice" v-html="$t('home.tips')" v-if="false"></div>
    <cm-blocks-won :time="time" style="display: none"></cm-blocks-won>
    <cm-meta-list
      :info="info"
      :firstInit="firstInit"
      :latestBlockTime="latestBlockTime"
    ></cm-meta-list>
    <!--气泡板块-->
    <cm-home-chart :total="totalPower" />
    <!--图表板块-->
    <cm-pool-ranking />
    <cm-transfer-ranking :interval="interval" :switchIndex="switchIndex" />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex"
export default {
  name: "home",
  layout: "mlayout",
  data() {
    return {
      paneType: 0,
      interval: "24h",
      showTopMiner: true,
      option: {},
      showMessageCon: false,
      loading: false,
      info: {},
      headTimer: null,
      timer: null,
      firstInit: true,
      env: process.env.VUE_APP_BUILD,
      showMinerSelect: false,
      totalPower: 0,
      switchIndex: 1
    }
  },
  inject: ["time"],
  mounted() {
    this.getMinerNameMap()
    this.getMessageMethods()
    this.getMapDatas()
    this.getBoardInfo()
    this.initTimer()
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        this.getBoardInfo()
      }
    })
  },
  computed: {
    ...mapGetters("app", ["latestBlockTime"])
  },
  methods: {
    ...mapMutations("app", ["setHeight", "increaseLoadCount"]),
    ...mapActions("app", [
      "getMessageMethods",
      "getMinerNameMap",
      "getMapDatas"
    ]),
    async getBoardInfo() {
      try {
        this.loading = true
        const { data: info } = await this.$api.getStatChainInfo([])
        this.loading = false
        if (info) {
          this.firstInit = false
          this.setHeight(this.parseFormatNumber(info.latest_height))
          this.info = Object.freeze(info)
          this.totalPower = info.total_quality_power
          this.increaseLoadCount()
        }
      } catch (e) {
        this.loading = false
      }
    },
    initTimer() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.getBoardInfo()
      }, 30000)
    },
    handleTimeChange(v) {
      this.interval = v.type
    },
    handleSwitch(e) {
      this.paneType = e
      this.showTopMiner = !e
      this.switchIndex = e
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  activated() {
    this.initTimer()
  },
  deactivated() {
    clearInterval(this.timer)
  }
}
</script>
<style lang="scss" scoped>
.aa {
  display: flex;
  background-color: red;
  width: 375px;
  font-size: 24px;
  height: 37.5px;
}
@keyframes breath {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
.home-con {
  display: flex;
  flex-direction: column;
  background-color: var(--dsn-color);
  .meta-list {
    order: 1;
    margin-bottom: 20px;
  }
  .blocks-won {
    order: 2;
  }
  .miner-con {
    order: 3;
    padding: 0;
    border-radius: 8px 8px 0 0;
    .switch {
      height: auto;
      margin-bottom: 0;
      padding: 20px 0 0 20px;
    }
  }
}
</style>
