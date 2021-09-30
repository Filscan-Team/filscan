<template>
  <div class="top-power-table" :class="[dataLoaded ? 'dataLoaded' : '']" v-loading="loading" element-loading-background="transparent">
    <client-only>
      <co-miner-list :columns="columns" :dataSource="dataSource" :labels="tr('mbLabel2')" :sortKey="sortKey" @sort-change="handleSortChange" initSortKey="quality_adj_power" miniRow></co-miner-list>
    </client-only>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PoolTable',
  data() {
    const vm = this
    const formatter = (v) => {
      return this.unitConversion(v, 2)
    }
    // const tips = this.$t('home.poolTable.tips')
    return {
      sortKey: 'quality_adj_power',
      prefix: 'mining.topPowerTable',
      columns: [
        {
          key: 'rank',
          hideSort: true
        },
        {
          key: 'pool_tag',
          id: 'owner'
        },
        {
          key: 'owner',
          type: 'link',
          target: '/tipset/address-detail',
          paramKey: 'address',
          ellipsis: true
        },
        {
          key: 'quality_adj_power',
          formatter,
          progress: true
        },
        {
          key: 'efficiency_mining',
          unit: 'FIL/T',
          formatter(v) {
            return Number(v).toFixed(4)
          },
          // tips: tips
        }
      ],
      options: {
        start: 0,
        count: 20,
        order: 8
      },
      dataSource: [],
      dataLoaded: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters('app', ['minerNameMap'])
  },
  methods: {
    async getTopMiners() {
      const vm = this
      this.loading = true
      try {
        let res = await this.$api.getTopOrePool([...Object.values(this.options)])
        const { first_data, total } = res
        if (res.data && Array.isArray(res.data)) {
          let tmpData = res.data.map((item, index) => {
            return {
              ...item,
              rank: index + 1,
              progress: (item.quality_adj_power / first_data) * 100 + '%'
            }
          })
          this.dataSource = Object.freeze(tmpData)
          this.total = total
          this.dataLoaded = true
        } else {
          this.total = 0
          this.dataSource = []
        }
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    handleSortChange(v) {
      const sortMap = {
        raw_byte_power: 1,
        quality_adj_power: 5,
        block_count: 9,
        rewards: 13,
        total_win_count: 17,
        running_hours: 18,
        last_height: 19
      }
      this.options.order = sortMap[v] || 1
    }
  },
  mounted() {
    this.getTopMiners()
  },
  watch: {
    options: {
      deep: true,
      handler(v) {
        this.getTopMiners(v)
      }
    },
    latestBlockHeight() {
      if (this.loadCount === 1) {
        return
      }
      this.getTopMiners()
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin column {
  $width: 30 240 240 300 150 140 100 155 160 130 140;
  @for $i from 1 through length($width) {
    .column-#{$i} {
      max-width: #{nth($width, $i)}px;
    }
  }
}
.top-power-table:not(.dataLoaded) .cm-miner-list {
  min-height: 442px;
}
.top-power-table {
  .title {
    height: 20px;
    padding-top: 10px;
    background: var(--table-header-bg-color);
    font-size: 12px;
  }

  ::v-deep .cm-miner-list {
    background-color: var(--content-bg-color);
    .header {
      margin: 0 !important;
      padding: 0 !important;
      justify-content: space-between;
      .column-1 {
        width: 80px;
      }
      .column-2 {
        text-align: center;
        min-width: 60px !important;
      }
      .column-3 {
        width: 160px;
      }
      .column-4 {
        display: flex;
        box-sizing: border-box;
        width: 160px !important;
        // justify-content: flex-end;
        padding-right: 20px;
      }
      .column-5 {
        display: flex;
        box-sizing: border-box;
        width: 140px !important;
        // justify-content: flex-end;
        padding-right: 20px;
      }
    }
    .body {
      height: 480px;
      overflow-y: scroll;
    }
    .body .row {
      display: flex;
      box-sizing: border-box;
      justify-content: space-between;
    }

    .column-item {
      box-sizing: content-box !important;
      //   background: chocolate;

      & > div {
        span:not(.el-link--inner) {
          font-size: var(--font-16);
        }
      }
    }

    .column-1 {
      min-width: 80px !important;
    }

    .column-2 {
      //   min-width: 180px !important;
      width: 180px !important;
      text-align: center;
    }
    .column-3 {
      width: 160px !important;
      margin: 0;
      text-align: center;
      justify-content: center;
      div {
        justify-content: center;
        span {
          position: static !important;
          transform: none !important;
        }
      }
    }
    .column-4 {
      width: 160px;
      font-size: 20px;
      //   justify-content: flex-end;
      padding-right: 20px;
      div {
        justify-content: flex-start;
      }
    }
    .column-5 {
      width: 140px;
      font-size: 20px;
      //   justify-content: flex-end;
      padding-right: 20px;
      div {
        //justify-content: flex-end;
      }
    }
  }
}
</style>
