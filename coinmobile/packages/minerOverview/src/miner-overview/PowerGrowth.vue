<template>
  <div class="cm-power-growth">
    <cm-card style="margin: 0;border: none">
      <div slot="header" class="clearfix">
        <div class="title panel-heading">
          <div class="power-title">{{ tr('title') }}</div>
          <cm-time-select @time-select="handleTimeChange" :times="times" />
        </div>
      </div>
      <div class="content-growth">
        <div
                class="growth-item"
                v-for="(key, index) in Object.keys(this.info)"
                :key="key"
        >
          <div class="label">
            {{ tr('labels')[index].label }}
            <el-popover
                    placement="bottom-start"
                    width="200"
                    trigger="hover"
                    :content="labelOptions[index].tips"
                    v-if="labelOptions[index].tips"
            >
              <i
                      class="el-icon-warning-outline"
                      slot="reference"
                      style="margin-left:3px"
              ></i>
            </el-popover>
            <span>: </span>
          </div>
          <div class="value">{{ info[key] }}</div>
        </div>
      </div>
    </cm-card>
  </div>
</template>
<script>
  import { mapState, mapGetters } from 'vuex'
  export default {
    name: 'PowerGrowth',
    data() {
      const vm = this
      return {
        times: ['24h', '1d', '1m'],
        // times: ['24h', '1d', '1m', '0.5y'],
        options: {
          actor: [vm.$route.query.address],
          interval: '24h',
          type: 1
        },
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
        prefix: 'address.detail.minerOverview.growth'
      }
    },
    computed: {
      ...mapState('app', ['addressInfo']),
      ...mapGetters('tipset', ['workers']),
      addInfo() {
        return this.addressInfo
      },
      labelOptions(){
        let labels = JSON.parse(JSON.stringify(this.tr('labels')))
        if(this.$route.name==='mobile-tipset-pool-detail'){
          delete  labels[7].tips
        } else {
          labels = this.tr('labels')
        }
        return labels
      }
    },
    mounted() {
      this.Statistical()
    },
    methods: {
      Statistical() {
        let ComponentName = this.$route.name
        this.options.type = ComponentName === 'mobile-tipset-pool-detail' ? 3 : 1
        this.StatisticalIndicators()
      },

      async StatisticalIndicators() {
        let res = await this.$api.getFilscanStatisticalIndicatorsUnite([
          ...Object.values(this.options)
        ])
        if (res !== null) {
          this.info = this.filterInfo(res)
        }
      },
      handleTimeChange(v) {
        this.options.interval = v.type
      },
      filterInfo(info) {
        const {
          power_incr, //算力增量
          miner_precommit_deposits, //扇区质押
          blocks, // 出块数
          mining_efficiency, // 挖矿效率
          power_ratio, // 算力增速
          gas_fee_cap, // gas消耗
          blocks_rewards, // 出块奖励
          lucky, // 幸运值
          sector_number_incr, // 扇区增量
          sector_ratio, // 扇区增速
          sigma_win_count, // 赢票数量
          net_profit_per_tb // 单T消耗
        } = info
        let net_profit =
                net_profit_per_tb < 0.0001
                        ? Number(net_profit_per_tb * Math.pow(10, 9)).toFixed(4) +
                        'nanoFIL/TiB'
                        : Number(net_profit_per_tb).toFixed(4) + ' FIL/TiB'
        let sectorStr =
                this.$route.name === 'mobile-tipset-address-detail'
                        ? ` (${this.formatNumber(sector_number_incr) + this.tr('unit')})`
                        : ''
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
          lucky:
                  info['lucky'] !== '-1'
                          ? Number(100 * lucky).toFixed(3) + ' %'
                          : '--',
          sector_number_incr: this.unitConversion(power_incr, 2) + sectorStr,
          sector_ratio: this.unitConversion(sector_ratio, 2) + '/D',
          sigma_win_count: sigma_win_count,
          net_profit_per_tb: net_profit
        }
        if(this.$route.name==='mobile-tipset-pool-detail'){
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
  .cm-power-growth {
    background-color: var(--content-bg-color);
    .clearfix {
      width: 100%;
    }
    .panel-heading {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      justify-items: center;
      width: 100%;
      .power-title {
        display: flex;
        align-items: center;
      }
    }
    .content-growth {
      padding: 12px 0;
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .growth-item {
        width: 100%;
        display: flex;
        padding: 8px 5px;
        flex-direction: row;
        box-sizing: border-box;
        justify-content: space-between;
      }
      .growth-item:nth-child(4n) {
        width: 100%;
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
      ::v-deep .cm-card__header {
        margin: 0 -20px;
      }
      ::v-deep .msg-divider-line {
        margin: 0 -20px;
      }
      & > div {
        display: flex;
        justify-content: space-between;
        .label {
          font-size: 26px;
          padding-right: 20px;
        }
      }
      &.top {
        height: 54px;
      }
    }
  }
</style>
