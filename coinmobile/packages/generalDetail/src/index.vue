<template>
  <div class="radius bottom-20 account-common">
    <div class="common-top">
      <!--      <div class="bottom-20">-->
      <!--        <cm-nav-title :title="tr('titleAcount')">333</cm-nav-title>-->
      <!--      </div>-->
      <cm-card>
        <div slot="header" class="pool-head clearfix">
          <div class="title">
            <div class="heading">{{ tr('titleAcount') }}</div>
          </div>
        </div>
        <cm-board :dataList="dataList" :dataLabel="dataLabel" :type="type" />
      </cm-card>
      <!--      <cm-board :dataList="dataList" :dataLabel="dataLabel" :type="type" />-->
    </div>
    <cm-general-balance />
    <div class="block-list-con top-20">
      <cm-tab
        :labels="blockFlag ? $t('address.radio') : $t('address.radio1')"
        @click="changeRadio"
      />
      <cm-message-list
        v-if="activeRadio === 0"
        :address="$route.query.address"
        :subAddress="subAddress"
        showExtra
        showSelect
        type="address"
      />
      <cm-block-list v-else-if="activeRadio === 1 && blockFlag" />
      <cm-transfer-list v-else />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import mixin from '@/bu-components/address/mixin'
export default {
  name: 'CmGeneralDetail',
  mixins: [mixin],
  data() {
    return {
      blockFlag: true,
      routerAddress: '',
      activeRadio: 0, // 列表激活项
      address: '',
      subAddress: '',
      perfix: 'address.detail'
    }
  },
  computed: {
    ...mapGetters('address', ['type', 'dataList', 'dataLabel'])
  },
  mounted() {
    this.getBlockFlag()
  },
  methods: {
    changeRadio(e) {
      this.activeRadio = e
    },
    async getBlockFlag() {
      let add = this.$route.query.address
      let params = {
        miner: [add],
        count: 25,
        begindex: 0
      }
      try {
        let data = await this.$api.getBlockByMiner([params])
        this.blockFlag = data ? true : false
      } catch (e) {
        this.blockFlag = e.result == null ? false : true
        console.log(e)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.account-common {
  .pool-head {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .common-top {
    background-color: var(--content-bg-color);
    //padding: 0 20px 20px;
    margin-bottom: 16px;
    &::v-deep .detail-info-con {
      .info-item {
        div {
          .link-list a {
            display: inline-block !important;
            min-width: 80px;
          }
        }
      }
    }
  }
  .block-list-con {
    background-color: var(--content-bg-color);
    padding: 20px;
		&::v-deep .cm-transfer-list {
			padding: 0;
		}
		&::v-deep .total-number {
			padding: 0;
		}
  }
}
</style>
