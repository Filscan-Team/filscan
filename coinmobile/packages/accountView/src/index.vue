<template>
  <div class="account-overview top-20 radius">
    <div class="top flex font-24 font-500 p-left-20">
      {{ tr('titleAcount') }}
    </div>
    <cm-cards
      :dataSource="info"
      :columns="columnsWithLabel"
      :span="24"
      :border="false"
    >
    </cm-cards>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'CmAccountView',
  data(vm) {
    return {
      address: '',
      //info: {},
      prefix: 'address.detail',
      colums: [
        {
          key: 'actor'
        },
        {
          key: 'type'
        },
        {
          key: 'address',
          type: 'link',
          target: 'tipset/address-detail'
        },
        {
          key: 'owner_address',
          type: 'link',
          target: 'tipset/address-detail',
          paramKey: 'address'
        },
        {
          key: 'worker_address',
          type: 'link',
          target: 'tipset/address-detail',
          paramKey: 'address'
        },
        {
          key: 'controllers_list',
          type: 'link',
          target: 'tipset/address-detail',
          paramKey: 'address',
          ellipsis: true
        },
        {
          key: 'create_time',
          formatter(v) {
            return vm.formatDateTime(v)
          }
        },
        {
          key: 'running_days'
        },
        {
          key: 'peer_id',
          type: 'link',
          target: 'statistics/peer',
          paramKey: 'peer_id'
        },
        {
          key: 'location'
        }
      ]
    }
  },
  methods: {
    getActorLabelByType(type) {
      const types = this.$t('address.type')
      let typeKey = {
        1: 'account',
        2: 'owner',
        3: 'miner',
        10: 'multisig'
      }[type]
      return types[typeKey]
    }
  },
  computed: {
    ...mapGetters('app', ['minerNameMap']),
    ...mapGetters('address', ['accountInfo']),
    ...mapState('app', ['addressInfo']),
    info() {
      const { location_cn, location_en } = this.accountInfo
      let tmp = this.accountInfo
      let location = this.isEn ? location_en : location_cn
      tmp.location =
        location === '' ? this.tr('accountOverview.unknown') : location
      return tmp
    },
    nameMap() {
      let obj = this.minerNameMap[this.addressInfo.actor]
      if (obj === undefined) {
        return ''
      }
      return this.isEn ? obj.tag_en : obj.tag
    },
    columnsWithLabel() {
      const labels = this.tr('mbaccountOverview')
      return this.colums.map((item, index) => {
        return {
          ...item,
          title: labels[index]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.account-overview {
  margin: 20px;
  padding: 20px;
  border: 1px solid var(--border-line);
  > div:nth-child(2) {
    margin: 0 -20px;
  }
  .top {
    border-bottom: 1px solid var(--border-line);
    //padding-left: 0;
		padding-bottom: 10px;
    font-size: 24px;
		margin: 0 -20px;
    margin-bottom: 20px;
  }
  .bottom.info-main.flex {
    display: flex;
    flex-direction: column;
    padding: 0;
    & > div {
      min-width: 100%;
      max-width: 100%;
      font-size: 22px;
      justify-content: space-between;
      display: flex;
      order: 1;
      margin-bottom: 20px;
      &::v-deep {
        a {
          max-width: 520px;
          line-height: 30px;
          word-break: break-word;
          text-align: right;
        }
      }
      .content {
        padding-right: 0;
        display: flex;
        flex-direction: column;
        &::v-deep {
          a {
            word-break: break-word;
            white-space: break-spaces;
          }
        }
      }
      &:nth-child(4) {
        order: 3;
        &::v-deep {
          a {
            max-width: 520px;
            line-height: 30px;
            word-break: break-word;
            text-align: right;
          }
        }
        margin-bottom: 0;
      }
      &:nth-child(5) {
        order: 2;
        &::v-deep {
          a {
            max-width: 520px;
            line-height: 30px;
            word-break: break-word;
            text-align: right;
          }
        }
        span:first-child {
          width: auto;
        }

        span:last-child {
          flex: 1;
          word-break: break-word;
          white-space: pre-wrap;
          text-align: right;
        }
      }
      &:nth-child(6) {
        &::v-deep {
          a {
            max-width: 520px;
            line-height: 30px;
            word-break: break-word;
            text-align: right;
          }
        }
      }
      span {
        line-height: 30px;
      }
    }
  }
}
</style>
