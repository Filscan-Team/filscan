<template>
  <div
    class="dsn bottom-10 bg-board"
    v-loading="loading"
    element-loading-background="var(--board-bg-color)"
  >
    <div class="page-title">
      {{ tr('heading') }}
    </div>
    <div class="total-number radius">
      <span
        v-html="
          tr('total', {
            num: formatNumber(total)
          })
        "
        class="title"
      ></span>
      <div class="search-wrap bg-board flex align-center border-outline">
        <el-input
          v-model="actor"
          clearable
          @keyup.native.enter="handleSearch"
          @clear="handleSearch"
          :placeholder="tr('placeholder')"
        />
        <span class="iconfont icon-sousuo" @click="handleSearch"></span>
      </div>
    </div>
    <cm-list
      v-for="item in dealData"
      :key="item.dealid"
      :dataSource="item"
      :columns="mbColumnsWithLabel"
    />
    <cm-page @page-change="handlePageChange" :total="total" />
  </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
  name: 'DealList',
  layout: 'mlayout',
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
          isLink: true,
          target: 'tipset/dsn-detail',
          paramKey: 'dealid',
          popover: vm.$t('dsn.list.tips'),
          flag: false
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
          isLink: true,
          target: 'tipset/address-detail',
          paramKey: 'address',
          ellipsis: true
        },
        {
          key: 'provider',
          isLink: true,
          target: 'tipset/address-detail',
          paramKey: 'address',
          tag: true
        },
        {
          key: 'block_time',
          formatter
        },
        {
          key: 'storage_price_per_epoch',
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
      this.option.actor = params[0]
      this.getDealList()
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
        const data = deals.map((item) => {
          const { verified_deal } = item
          let flag = verified_deal
          return {
            ...item,
            mes: this.formatNumber(item.Messages),
            flag: flag
          }
        })
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
      const labels = [...this.tr('mLabels')]
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
.dsn {
  padding: 0 !important;
  margin-bottom: 0 !important;
  .page-title {
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0 !important;
    white-space: nowrap;
    line-height: 37px;
    font-size: 26px;
    font-weight: 500;
    padding: 20px;
  }
  .total-number {
    height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 20px 20px 20px;
    margin-bottom: 0 !important;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-line);
    & ::v-deep i {
      font-size: 28px !important;
    }
    .title {
      height: 40px;
      line-height: 40px;
      font-size: 22px;
    }
    .search-wrap {
      width: 348px;
      height: 40px;
      padding: 0 30px;
      &.auto {
        margin-left: auto;
      }
      &::v-deep .el-input {
        input {
					font-size: 20px;
          height: 40px;
          background: none;
          border: none;
          color: var(--main-text-color);
        }
      }
			.icon-sousuo {
				font-size: 22px;
			}
    }
  }
  .mb-deal-list {
    max-height: calc(100vh - 370px);
    overflow-y: scroll;
    background: var(--board-bg-color);
    padding: 20px;
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
</style>
