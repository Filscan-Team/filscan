<template>
  <div class="power-growth">
    <div class="flex top align-center jus-between panel-heading">
      <div class="left font-20 power-title">{{ tr('title') }}</div>
      <co-time-select @time-select="handleTimeChange" :labels="labels" :times="times" :drop="false" />
    </div>
    <div class="content-growth" v-loading="loading">
      <div class="growth-item" v-for="(key, index) in Object.keys(this.info)" :key="key" :class="(index + 1) % 4 == 0 ? 'item-right' : ''">
        <div class="label">
          {{ tr('labels')[index].label }}
          <el-popover placement="bottom-start" width="200" trigger="hover" :content="labelOptions[index].tips" v-if="labelOptions[index].tips">
            <i class="el-icon-warning-outline" slot="reference" style="margin-left:3px"></i>
          </el-popover>
        </div>
        <div class="value">{{ info[key] }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'PowerGrowth',
  data() {
    const vm = this
    return {
      times: ['24h', '1w', '1m'],
      // times: ['24h', '1d', '1m', '0.5y'],
      labels: vm.$t('component.timeGrowth'),
      options: {
        actor: [vm.$route.query.address],
        interval: '24h',
        type: 1
      },
      loading: false,
      info: {
        force_increment: 0, //算力增量
        miner_precommit_deposits: 0, //扇区质押
        blocks_num: 0, // 出块数
        mining_efficiency: 0, // 挖矿效率
        force_incr_ratio: 0, // 算力增速
        gas_used: 0, // gas消耗
        sigma_rewards: 0, // 出块奖励
        lucky_value: 0, // 幸运值
        sector_size_incr: 0, // 扇区增量
        sector_size_incr_ratio: 0, // 扇区增速
        sigma_win_count: 0, // 赢票数量
        consume_per_t: 0 // 单T消耗
      },
      growthArr: [],
      prefix: 'address.detail.minerOverview.growth',
    }
  },
  computed: {
    ...mapState('app', ['addressInfo']),
    ...mapGetters('tipset', ['workers']),
    addInfo() {
      return this.addressInfo
    },
    labelOptions(){
      let labels = this.tr('labels')
      if(this.$route.name==='tipset-pool-detail'){
        delete  labels[7].tips
      }
      return labels
    }
  },
  mounted() {
    this.times = this.$route.name === 'tipset-pool-detail'? ['24h', '1w', '1m']:['24h', '1w', '1m', '1y']
    this.Statistical()
  },
  methods: {
    Statistical() {
      let ComponentName = this.$route.name
      this.options.type = ComponentName === 'tipset-pool-detail' ? 3 : 1
      this.StatisticalIndicators()
    },

    async StatisticalIndicators() {
      this.loading = true
      try {
        let res = await this.$api.getFilscanStatisticalIndicatorsUnite([...Object.values(this.options)])
        this.loading = false
        if (res !== null) {
          this.info = this.filterInfo(res)
        }
      } catch (e) {
         console.log(e)
         this.loading = false
      }
    },
    handleTimeChange(v) {
      this.options.interval = v.type
    },
    filterInfo(info) {
      const _this = this
      const {
        power_incr, //算力增量
        miner_precommit_deposits, //扇区质押
        blocks, // 出块数
        mining_efficiency, // 挖矿效率
        power_ratio, // 算力增速
        gas_fee_cap, // gas消耗
        blocks_rewards, // 出块奖励
        lucky, // 幸运值
        sector_incr	, // 扇区增量
        sector_ratio, // 扇区增速
        sector_number_incr, // 扇区增量
        sigma_win_count, // 赢票数量
        net_profit_per_tb // 单T消耗
      } = info
      let net_profit = net_profit_per_tb < 0.0001 ? Number(net_profit_per_tb * Math.pow(10, 9)).toFixed(4) + 'nanoFIL/TiB' : Number(net_profit_per_tb).toFixed(4) + ' FIL/TiB'
      if(Number(net_profit_per_tb)===0){net_profit=0}
      // let sectorStr = this.$route.name==='tipset-address-detail'?` (${this.formatNumber(sector_number_incr) +_this.tr('unit')})`: ""
      let capArr = this.formatFilNum(gas_fee_cap, true).split(' ')
      let cap = capArr[0]<1? Number(capArr[0]).toFixed(6) +" "+capArr[1]:Number(capArr[0]).toFixed(2) +" "+capArr[1]
      if(Number(capArr[0])===0){
        cap = 0
      }
      let resObj = {
        power_incr: this.unitConversion(power_incr, 2),
        miner_precommit_deposits: this.formatFil(miner_precommit_deposits, 4),
        blocks,
        mining_efficiency: Number(mining_efficiency).toFixed(4) + ' FIL/TiB',
        power_ratio: this.unitConversion(power_ratio, 2) + '/D',
        gas_fee_cap: cap,
        blocks_rewards: this.formatFil(blocks_rewards, 4),
        lucky: info['lucky'] !== '-1' ? Number(100 * lucky).toFixed(3) + ' %' : '--',
        // sector_incr: this.unitConversion(power_incr, 2) + sectorStr,
        sector_incr: this.unitConversion(sector_incr, 2),
        sector_ratio: this.unitConversion(sector_ratio, 2) + '/D',
        sigma_win_count: sigma_win_count,
        net_profit_per_tb: net_profit
      }
      if(this.$route.name==='tipset-pool-detail'){
        resObj.lucky = '--'
      }
      return resObj
    }
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.Statistical()
      },
      immediate: true
    },
    '$route.query.address'(v) {
      this.options.actor = [v]
    }
  }
}
</script>
<style lang="scss" scoped>
.power-growth {
  padding: 0 20px 10px 20px;
  background-color: var(--content-bg-color);
  .panel-heading {
    padding: 20px 0;
    .power-title {
      font-size: var(--font-18);
      height: 40px;
      align-items: center;
    }
  }
  .content-growth {
    padding: 12px 20px;
    border: 1px solid var(--border-color);
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .growth-item {
      width: 27%;
      display: flex;
      padding: 8px 0;
      flex-direction: row;
      font-size: var(--font-16);
    }
    .growth-item:nth-child(4n) {
      width: 19%;
    }
    .item-right {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: flex-end !important;
    }
  }
  & > div {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    & > div {
      .label {
        padding-right: 20px;
      }
    }
    &:nth-child(2) {
      padding-top: 20px;
    }
    &:last-child {
      /*padding-bottom:20px;*/
    }
    & > div {
      display: flex;
      flex-direction: row;
      &:nth-child(1),
      &:nth-child(2) {
        width: 25%;
      }
      &:nth-child(3) {
        width: 25%;
      }
      &:nth-child(4) {
        width: 25%;
      }
    }
    /*.right{*/
    /*  width: 582px;*/
    /*  display: flex;*/
    /*  flex-direction: row;*/
    /*  &>div{*/
    /*    width: 290px;*/
    /*  }*/
    /*  &>div:nth-child(2){*/
    /*    text-align: right;*/
    /*  }*/
    /*}*/
    &.top {
      height: 54px;
    }
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6) {
      margin-bottom: 14px;
    }
  }
}
@media (max-width: 768px) {
  .power-growth {
    padding: 2.667vw;
    margin-right: 2.667vw !important;
    .panel-heading {
      .power-title {
        font-size: 3.733vw;
        padding-left: 0;
      }
    }
    .top {
      display: flex;
      flex-direction: row;
      margin-bottom: 1.333vw;
      height: 32px !important;
      border-bottom: 1px dashed #153550;
      padding: 0;
      .left {
        width: 50%;
        margin-top: 0;
      }

      .time-selector {
        width: 50%;
      }
    }
    .power .flex {
      height: auto;
      line-height: 4.4vw;
      .left {
        span {
          line-height: 4vw;
          font-size: 3.2vw;
        }
      }
    }

    & > div {
      display: flex;
      flex-direction: column;
      padding: 0;
      .left,
      .right,
      .center {
        width: 100%;
      }

      & > div {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-bottom: 3.2vw;

        &:nth-child(n) {
          width: 100%;
        }

        .label {
          width: 40%;
        }

        .value {
          width: 60%;
          text-align: right;
        }
      }
    }

    & > div {
      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4) {
        margin-bottom: 0 !important;
        justify-content: space-between;
        line-height: 4vw;
      }
    }
  }
}
</style>
