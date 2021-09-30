<template>
  <div class="home-con">
    <!--区块时间-->
<!--    <blocks-won :time="time"></blocks-won>-->
    <!--气泡板块-->
    <meta-list :info="info" :firstInit="firstInit" :latestBlockTime="latestBlockTime"></meta-list>
    <!--图表板块-->
    <chart-container :total="totalPower" />
    <!--矿工表格-->
<!--    <div class="miner-con">-->
<!--      &lt;!&ndash;存储池排行&ndash;&gt;-->
<!--      <co-pool-ranking />-->
<!--      &lt;!&ndash;大额转账记录&ndash;&gt;-->
<!--      <co-transfer-ranking />-->
<!--    </div>-->
    <co-mining />
  </div>
</template>

<script>
import * as components from '@/bu-components/home'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import MetaList from '@/bu-components/home/metaList'
import ChartContainer from '@/bu-components/home/chart/index'
export default {
  name: 'home',
  head() {
    return {
      title: this.$t('header.seo.index')
    }
  },
  data() {
    return {
      interval: '24h',
      showTopMiner: true,
      option: {},
      showMessageCon: false,
      loading: false,
      info: {},
      headTimer: null,
      timer: null,
      timer2: null,
      firstInit: true,
      env: process.env.VUE_APP_BUILD,
      showMinerSelect: false,
      totalPower: 0,
      switchIndex: 1,
      formatLatestTime: '',
      latestTime:  new Date().getTime(),
    }
  },
  components: {
    ...components,
    ChartContainer,
    MetaList
  },
  inject: ['time'],
  mounted() {
    this.getMinerNameMap()
    this.getMessageMethods()
    this.getBoardInfo()
    this.initTimer()
    this.getBlockWon()
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.getBoardInfo()
      }
    })
  },
  computed: {
    ...mapGetters('app', ['latestBlockTime'])
  },
  watch:{
    latestBlockHeight() {
      if (this.loadCount === 1) {
        return
      }
      this.getBlockWon()
    }
  },
  methods: {
    ...mapMutations('app', ['setHeight', 'increaseLoadCount']),
    ...mapActions('app', ['getMessageMethods', 'getMinerNameMap', 'getMapDatas', 'setLatestBlockTime']),
    async getBoardInfo() {
      this.loading = true
      let [err, result] = await this.to(this.$api.getStatChainInfo([]))
      if(err){
         this.loading = false
         return console.log(err)
      }
      if(result){
        this.loading = false
        const { data: info } = result
        if (info) {
          this.firstInit = false
          this.setHeight(this.parseFormatNumber(info.latest_height))
          this.info = Object.freeze(info)
          this.totalPower = info.total_quality_power
          this.increaseLoadCount()
        }
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
      this.showTopMiner = !e
      this.switchIndex = e
    },
    async getBlockWon(){
      let res = await this.$api.getGetBlockWonList([])
      if(res){
        const { tipsets } = res
        if(Array.isArray(tipsets)&&tipsets.length>0){
          let item  = tipsets[0]
          const { blocks } = item
          const { block_time } = blocks[0]
          this.latestTime = block_time
          this.formatLatestTime = this.formatTime(this.latestTime, null, false)
          this.setLatestBlockTime(this.formatTime(this.latestTime, null, false))
        }
        this.initTimer2()
      }
    },
    initTimer2() {
      clearInterval(this.timer2)
      this.timer2 = setInterval(() => {
        this.formatLatestTime = this.formatTime(this.latestTime, null, false)
        this.setLatestBlockTime(this.formatTime(this.latestTime, null, false))
      }, 1000)
    },
  },
  beforeDestroy() {
    clearInterval(this.timer)
    clearInterval(this.timer2)
  },
  activated() {
    this.initTimer()
  },
  deactivated() {
    clearInterval(this.timer)
    clearInterval(this.timer2)
  }
}
</script>
<style lang="scss" scoped>
@keyframes breath {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
.home-con {
  .notice {
    height: 102px;
    background: var(--board-bg-color);
    font-size: 30px;
    line-height: 102px;
    text-align: center;
    margin-bottom: 20px;
    border-radius: 6px;
    &::v-deep span {
      color: var(--force-mark-color);
    }
  }
  & ::v-deep input {
    display: block;
    margin: 0 auto;
  }
  .miner-con {
    display: flex;
    flex-direction: row;
    //padding-bottom: 16px;
    div {
      display: flex;
      flex: 1;
    }
    .switch {
      height: 65px;
      padding: 0 20px;
      .pk-btn {
        width: 84px;
        height: 36px;
        line-height: 42px;
        background: rgba(243, 146, 27, 0.2);
        margin-left: auto;
        font-size: 36px;
        margin-right: 40px;
      }
      .time-selector {
        margin-left: auto;
        margin-right: 30px;
      }
    }
  }
  .table-con {
    display: flex;
    margin-top: 30px;
    & > div {
      flex: 1;
    }
  }
  .latest-con {
    height: 660px;
    margin-bottom: 10px;
    & > div {
      flex: 1;
    }
  }
}
@media (max-width: 768px) {
  .home-con {
    display: flex;
    flex-direction: column;
    .meta-list {
      order: 1;
      margin-bottom: 2.667vw;
    }
    .blocks-won {
      order: 2;
    }
    .miner-con {
      order: 3;
      padding: 0;
      border-radius: 1.067vw 1.067vw 0 0;
      .switch {
        height: auto;
        margin-bottom: 0;
        padding: 2.667vw 0 0 2.667vw;
        //border-radius: 1.067vw 1.067vw 0 0;
      }
    }
  }
}
</style>
