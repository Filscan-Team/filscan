<template>
  <div class="transfer-list" v-loading="loading" element-loading-background="transparent">
    <co-nav-title :title="tr('heading')"></co-nav-title>
    <div class="total-number bottom-20 radius flex align-center">
      <span
        v-html="
          $t('component.transferList.total', {
            total: formatNumber(total)
          })
        "
      ></span>
    </div>
    <div class="mb-address-list">
      <co-table
        :dataSource="transferData"
        :columns="columnsWithLabels"
        showPagination
        :total="total"
        @size-change="handleSizeChange"
        @page-change="handlePageChange"
        :labels="$t('component.transferList.labels')"
      ></co-table>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'TransferList',
  head() {
    return {
      title: this.$t('header.seo.largeTransfer')
    }
  },
  data(vm) {
    const formatter = (v) => dayjs.unix(v).format('YYYY-MM-DD HH:mm')
    return {
      prefix: 'component.transferList',
      currentPage: 1,
      total: 0,
      transferData: [],
      loading: false,
      option: {
        start: 0,
        count: 25,
        field: 'epoch',
        sort: 'desc'
      },
      columns: [
        {
          key: 'epoch',
          type: 'link',
          target: 'tipset/chain',
          paramKey: 'height'
        },
        {
          key: 'cid',
          type: 'link',
          target: 'tipset/message-detail',
          paramKey: 'cid'
        },
        {
          key: 'block_time',
          formatter
        },
        {
          key: 'from',
          type: 'link',
          target: 'tipset/address-detail',
          paramKey: 'address'
        },
        {
          key: 'to',
          type: 'link',
          target: 'tipset/address-detail',
          paramKey: 'address'
        },
        {
          key: 'value',
          formatter(v) {
            let tmp = vm.formatFilNum(v, true).split(' ')
            return vm.formatNumber(tmp[0], 2) + ' ' + tmp[1]
          }
        },
        {
          key: 'method_name'
        }
      ]
    }
  },
  mounted() {
    this.getTransferList()
  },
  computed: {
    columnsWithLabels() {
      return this.columns.map((item, index) => {
        return {
          ...item,
          title: this.$t('component.transferList.labels')[index]
        }
      })
    }
  },
  watch: {
    option: {
      deep: true,
      immediate: true,
      handler() {
        this.getTransferList()
      }
    }
  },
  methods: {
    handleSizeChange(v) {
      this.option.count = v
    },
    async getTransferList() {
      try {
        this.loading = true
        let { start, count, field, sort } = this.option
        let res = await this.$api.getLargeAmountTransferList([start, count, field, sort])
        const { data, total } = res
        this.transferData = data.map((item) => {
          item.method_name = item.method_name === 'transfer' ? 'Send' : item.method_name
          return item
        })
        this.total = total
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    handlePageChange(v) {
      this.currentPage = v
      this.option.start = (v - 1) * this.option.count
    }
  }
}
</script>
<style lang="scss">
.transfer-list {
  background-color: var(--content-bg-color);
  padding: 0 20px 20px 20px;
  .total-number {
    font-size: var(--font-16);
    padding-top: 20px;
    // border-bottom: 1px solid var(--border-line);
  }
  .mb-address-list {
    border: 1px solid var(--border-line);
  }
}
</style>
