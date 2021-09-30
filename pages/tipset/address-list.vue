<template>
  <div
    class="address-con"
    v-loading="loading"
    element-loading-background="var(--board-bg-color)"
  >
    <co-nav-title :title="$t('component.addressList.heading')" />
    <div class="total-number radius flex align-center">
      <span
        v-html="
          $t('address.list.total', {
            num: formatNumber(total),
            filNum: filNum
          })
        "
      ></span>
      <co-select :options="tr('options')" :index.sync="index" />
    </div>
    <div class="address-list">
      <div class="table-con border-outline">
        <co-table
          :dataSource="addressData"
          :columns="columns"
          showPagination
          :total="total"
          @size-change="handleSizeChange"
          @page-change="handlePageChange"
          :labels="$t('address.list.label')"
        ></co-table>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs"
import mixin from "@/bu-components/address/mixin.js"
export default {
  name: "AddressList",
  head() {
    return {
      title: this.$t("header.seo.address")
    }
  },
  data() {
    const formatterTime = v => dayjs.unix(v).format("YYYY-MM-DD HH:mm")
    return {
      prefix: "address.list",
      index: "0",
      addressData: [],
      loading: false,
      total: 0,
      filNum: 0,
      columns: [
        {
          key: "rank",
          hideSort: true
        },
        {
          key: "actor_addr",
          type: "link",
          target: "tipset/address-detail",
          paramKey: "address"
        },
        {
          key: "tags",
          id: "actor"
        },
        {
          key: "balance",
          rateKey: "balanceRate",
          unit: "FIL"
        },
        {
          key: "type"
        },
        {
          key: "tran_time",
          formatter: formatterTime
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
            balanceRate: detail.balance / total_fil
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
      const { balance, type, actor, tran_time, actor_addr, tag } = account
      let addr = actor_addr !== "" && [1, 2].includes(type) ? actor_addr : actor
      return {
        actor_addr: addr,
        tag,
        actor,
        type: this.getActorLabelByType(type),
        balance: Number(balance).toFixed(5),
        tran_time
      }
    },
    change(v) {
      this.option.type = Number(v)
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
    },
    index(v) {
      this.change(v)
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
  padding: 0 20px 16px;
  overflow: hidden;
  background-color: var(--content-bg-color);
  //border-radius: 6px;
  .total-number {
    font-size: var(--font-16);
    height: 68px;
    align-items: center;
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
    .total-number {
      font-size: 16px;
      height: 10.667vw;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 2.667vw;
      margin-bottom: 0 !important;
      white-space: nowrap;
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
