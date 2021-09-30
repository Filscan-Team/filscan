<template>
  <div
    class="address-con bottom-10 bg-board"
    v-loading="loading"
    element-loading-background="var(--board-bg-color)"
  >
    <div class="page-title">
      {{$t('component.addressList.heading')}}
    </div>
    <div class="total-number bottom-20 radius flex align-center">
      <span
        v-html="
          $t('address.list.total', {
            num: formatNumber(total),
          })
        "
      ></span>
    </div>
    <div class="mb-address-list">
      <cm-cards
        v-for="item in addressData"
        :key="item.cid"
        :dataSource="item"
        :columns="mbColumns"
        :span="24"
      />
    </div>
    <cm-page @page-change="handlePageChange" :total="total" />
  </div>
</template>
<script>
import mixin from "@/bu-components/address/mixin.js"
export default {
  name: "AddressList",
  layout: 'mlayout',
  data(vm) {

    return {
      addressData: [],
      loading: false,
      total: 0,
      filNum: 0,
      columns: [
        {
          key: 'rank'
        },
        {
          key: "balance",
          rateKey: "balance_ratio",
          unit: "FIL"
        },
        {
          key: "type"
        },
        {
          key: "tran_time",
          formatter(v){
            return vm.formatDateTime(v)
          }
        }
      ],
      option: {
        begindex: "0",
        count: "25",
        type: 0
      }
    }
  },
  mixins: [mixin],
  methods: {
    handleSizeChange(v) {
      this.option.count = v
    },
    handlePageChange(v) {
      this.option.begindex = (v - 1) * this.option.count
    },
    async getAddressList() {
      this.loading = true
      try {
        const op = Object.values(this.option).map(item => Number(item))
        const [begindex] = op
        let res = await this.$api.getRichList(op)
        this.loading = false
        const { total, total_fil, items } = res
        const data = items.map((item, index) => {
          const detail = this.parseAddress(item)
          return {
            ...detail,
            mes: this.formatNumber(item.Messages),
            rank: begindex + index + 1,
          }
        })
        this.total = Number(total)
        this.filNum = Number(total_fil)
        this.addressData = Object.freeze(data)
      } catch (e) {
        this.loading = false
      }
    },
    parseAddress(account) {
      const { balance, type, actor, balance_ratio, tran_time , actor_addr,tag } = account
      let addr = actor_addr !== "" && [1, 2].includes(type) ? actor_addr : actor
      return {
        miner: addr,
        type: this.getActorLabelByType(type),
        balance: this.formatNumber(balance, 5),
        balance_ratio,
        tran_time,
        tag
      }
    }
  },
  mounted() {
    this.getAddressList()
  },
  watch: {
    option: {
      deep: true,
      handler() {
        this.getAddressList()
      }
    }
  },
  computed: {
    mbColumns() {
      const labels = this.$t("address.list.label")
      return this.columns.map((item, index) => {
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
.address-con {
  padding: 20px 20px 0;
  overflow: hidden;
  border-radius: 6px;
  .total-number {
		font-size: 22px;
    height: 68px;
    align-items: center;
    padding: 0 60px;
    color: var(--main-text-color);
    & ::v-deep > span {
      margin-right: auto;
      i {
        color: var(--force-mark-color);
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
  @media (max-width: 768px) {
    padding: 0 !important;
    .page-title{
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 15px;
      margin-bottom: 0 !important;
      white-space: nowrap;
      line-height: 37px;
      font-size: 26px;
      font-weight: 500;
    }
    .total-number {
      height: 10.667vw;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 2.667vw;
      margin-bottom: 0 !important;
      white-space: nowrap;
      border-bottom: 1px solid var(--border-line);
      & ::v-deep i {
        font-size: 3.667vw !important;
      }
    }
    .mb-address-list {
      max-height: calc(100vh - 49.333vw);
      overflow-y: scroll;
      background: var(--board-bg-color);
      padding: 2.667vw;
      & ::v-deep .mb-board {
        & > div {
          &:nth-child(2) {
            order: 2;
            text-align: right;
          }
          &:nth-child(3) {
            order: 1;
            text-align: center;
            margin: 0 auto;
          }
          &:nth-child(1) {
            max-width: 13.333vw;
          }
        }
      }
    }
  }
}
</style>
