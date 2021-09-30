<template>
  <div class="dsn content-bg-color" v-loading="loading" element-loading-background="var(--board-bg-color)">
    <co-nav-title :title="$t('dsn.list.heading')" />
    <div class="total-number radius flex align-center">
      <span
        v-html="
          tr('total', {
            num: formatNumber(total)
          })
        "
      ></span>
      <div class="search-wrap flex align-center border-outline">
        <el-input v-model="actor" clearable @keyup.native.enter="handleSearch" @clear="handleSearch" :placeholder="tr('placeholder')" />
        <span class="iconfont icon-sousuo" @click="handleSearch"></span>
      </div>
    </div>
    <div class="deal-list border-outline">
      <div class="table-con">
        <co-table :dataSource="dealData" :columns="columns" showPagination :total="total" @size-change="handleSizeChange" @page-change="handlePageChange" :labels="tr('labels')"></co-table>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import { isChinese, containSpecial } from '@/utils'
export default {
  name: 'DealList',
  head() {
    return {
      title: this.$t('header.seo.dsn')
    }
  },
  data(vm) {
    const formatter = (v) => dayjs.unix(v).format('YYYY-MM-DD HH:mm')
    return {
      dealData: [],
      loading: false,
      total: 0,
      filNum: 0,
      actor: '',
      columns: [
        {
          key: 'dealid',
          type: 'link',
          target: 'tipset/dsn-detail',
          paramKey: 'dealid',
          popover: vm.$t('dsn.list.tips')
        },
        {
          key: 'piece_cid',
          formatter(v) {
            return vm.ellipsisByLength(v, 6)
          }
        },
        {
          key: 'piece_size',
          formatter(v) {
            return vm.unitConversion(v)
          }
        },
        {
          key: 'client',
          type:'link',
          target: 'tipset/address-detail',
          paramKey: 'address',
          ellipsis: true
        },
        {
          key: 'provider',
          type:'link',
          target: 'tipset/address-detail',
          paramKey: 'address'
        },
        {
          key: 'service_start_time',
          formatter
        },
        {
          key: 'service_end_time',
          formatter
        },
        {
          key: 'storage_price_per_epoch',
          width: 240,
          formatter(v) {
            return vm.formatFilNumber(v / Math.pow(10, 18))
          }
        },

        {
          key: 'verified_deal',
          formatter(v) {
            return String(v)
          }
        }
      ],

      option: {
        actor: '',
        begindex: 0,
        count: 25
      },
      prefix: 'dsn.list'
    }
  },
  methods: {
    handleSearch() {
      let params = this.formatInput()
      if (!isChinese(this.actor) && !containSpecial(this.actor)) {
        this.option.actor = params[0]
        this.getDealList()
      } else {
        this.total = 0
        this.dealData = []
      }
    },
    formatInput() {
      const v = this.actor.replace(/[^0-9a-z,]/g, '')
      return v.split(',').filter((item) => item != '')
    },
    handleSizeChange(v) {
      this.option.count = v
    },
    handlePageChange(v) {
      this.option.begindex = (v - 1) * this.option.count
    },
    async getDealList() {
      this.loading = true
      try {
        let res = await this.$api.getGetMarketDeal(this.option)
        this.loading = false
        const { total, deals } = res
        let data = []
        if (Array.isArray(deals)) {
          data = deals.map((item) => {
            const { verified_deal } = item
            let flag = verified_deal
            return {
              ...item,
              mes: this.formatNumber(item.Messages),
              flag: flag
            }
          })
        }
        this.total = Number(total)
        this.dealData = Object.freeze(data)
      } catch (e) {
        this.loading = false
      }
    }
  },
  mounted() {
    this.getDealList()
  },
  watch: {
    option: {
      deep: true,
      handler() {
        this.getDealList()
      }
    }
  },
  computed: {
    mbColumnsWithLabel() {
      const mbKeys = ['service_start_time', 'service_end_time', 'storage_price_per_epoch']
      const labels = [...this.tr('labels')]
      return this.columns
        .map((item, index) => {
          return {
            ...item,
            title: labels[index]
          }
        })
        .filter((item) => !mbKeys.includes(item.key))
    }
  }
}
</script>
<style lang="scss">
  .el-table_body tbody tr td .cell span{
    display: flex;
    white-space: nowrap;
  }
  /*.cell span{*/
  /*  display: flex;*/
  /*  white-space: nowrap;*/
  /*}*/
</style>
<style lang="scss" scoped>
.dsn {
  padding: 0 20px 16px;
  overflow: hidden;
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
    .search-wrap {
      width: 380px;
      height: 40px;
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
  }
  @media (max-width: 768px) {
    padding: 0 !important;
    margin-bottom: 0 !important;
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
    .mb-deal-list {
      max-height: calc(100vh - 49.333vw);
      overflow-y: scroll;
      background: var(--board-bg-color);
      padding: 2.667vw;
      &::v-deep .mb-board {
        & > div {
          &:nth-child(2),
          &:nth-child(5) {
            text-align: center;
          }
          &:nth-child(3),
          &:nth-child(6) {
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
