<template>
  <div
    class="top-power-table"
    :class="[dataLoaded ? 'dataLoaded' : '']"
    v-loading="loading"
    element-loading-background="transparent"
  >
    <client-only>
      <cm-miner-list
        :columns="mbColumns"
        :dataSource="dataSource"
        :labels="tr('mbLabel')"
        :sortKey="sortKey"
        @sort-change="handleSortChange"
        initSortKey="quality_adj_power"
        miniRow
      ></cm-miner-list>
    </client-only>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  name: "PoolTable",
  data() {
    const vm = this
    const formatter = v => {
      return this.unitConversion(v, 2)
    }
    return {
      sortKey: "quality_adj_power",
      prefix: "mining.topPowerTable",
      columns: [
        {
          key: "rank",
          hideSort: true
        },
        {
          key: "miner",
          hideSort: true,
          isComponent: true
        },
        {
          key: "tag",
          hideSort: true,
          formatter(v) {
            return vm.formatMinerName(v)
          },
          tips: "home.tag"
        },
        {
          key: "quality_adj_power",
          rateKey: "quality_power_ratio",
          formatter,
          progress: true
        },
        {
          key: "raw_byte_power",
          rateKey: "raw_power_ratio",
          formatter
        },
        {
          key: "block_count",
          rateKey: "block_ratio",
          formatter(v) {
            return vm.formatNumber(v)
          }
        },
        {
          key: "total_win_count",
          formatter(v) {
            return vm.formatNumber(v)
          }
        },
        {
          key: "rewards",
          unit: "FIL",
          rateKey: "reward_ratio",
          formatter(v) {
            return vm.formatNumber(v, 2)
          },
          class: "light"
        },
        {
          key: "last_height",
          formatter(v) {
            return vm.formatNumber(v)
          }
        },
        {
          key: "running_hours",
          formatter(v) {
            return vm.formatHours(v)
          }
        },
        {
          key: "balance",
          isComponent: true,
          hideSort: true
        }
      ],
      mbColumns: [
        {
          key: "rank",
          hideSort: true
        },
        // {
        //     key: "miner",
        //     hideSort: true,
        //     class: "text-center jus-center",
        //     isComponent: true
        // },
        {
          key: "tag",
          type: "link",
          target: "mobile/tipset/pool-detail",
          paramKey: "address",
          hideSort: true,
          formatter(v) {
            return vm.formatMinerName(v)
          },
          tips: "home.tag"
        },
        {
          key: "quality_adj_power",
          progress: "quality_power_ratio",
          rateKey: "pow_percent",
          formatter
        }
      ],
      options: {
        start: 0,
        count: 10,
        order: 8
      },
      dataSource: [],
      dataLoaded: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters("app", ["minerNameMap"])
  },
  methods: {
    async getTopMiners() {
      const vm = this
      this.loading = true
      try {
        let res = await this.$api.getTopOrePool([...Object.values(this.options)])
        this.loading = false
        const { first_data } = res
        if (res.data && Array.isArray(res.data)) {
          this.dataSource = Object.freeze(
            res.data.map((item, index) => {
              item.reward_ratio = item.reward_ratio * 100
              return {
                ...item,
                rank: index + 1,
                progress: (item.quality_adj_power / first_data) * 100 + "%",
                miner_id: item.miner,
                pow_percent: item.pow_percent *100,
                miner: {
                  render() {
                    return (
                      <co-link
                        label={item.miner}
                        target="tipset/address-detail"
                        param={{ key: "address", value: item.miner }}
                      />
                    )
                  }
                },
                balance: {
                  render() {
                    return (
                      <div
                        class={
                          item.balance < 200
                            ? "warning text-center"
                            : "text-center"
                        }
                      >
                        {item.balance < 200 ? (
                          <el-popover
                            placement="bottom-start"
                            width="200"
                            trigger="hover"
                            content={vm.tr("lowBalance")}
                          >
                            <span slot="reference" class="pointer">
                              {vm.formatNumber(item.balance) + " FIL" || "-"}
                            </span>
                          </el-popover>
                        ) : (
                          vm.formatNumber(item.balance) + " FIL" || "-"
                        )}
                      </div>
                    )
                  }
                }
              }
            })
          )
          this.total = res.total
          this.dataLoaded = true
        } else {
          this.total = 0
          this.dataSource = []
        }
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
  $width: 50 240 240 240 150 140 100 155 160 130 140;
  @for $i from 1 through length($width) {
    .column-#{$i} {
      max-width: #{nth($width, $i)}px;
    }
  }
}
.top-power-table:not(.dataLoaded) .cm-miner-list {
  min-height: 40vw;
}
.top-power-table {
  border-top: 1px solid var(--border-line);
  border-bottom: 1px solid var(--border-line);
  .title {
    height: 20px;
    padding-top: 10px;
    background: var(--table-header-bg-color);
  }

  ::v-deep .cm-miner-list {
    background-color: var(--white);
		padding-right: 0;
    .header {
      margin: 0 !important;
      padding: 0 !important;
    }

    .body .row {
      justify-content: space-around;
			.progress {
				height: 22px;
				width: 84px;
			}
			.rate {
				font-size: 22px;
			}
      .column-1 {
        min-width: 80px;
        .index {
          padding-left: 20px !important;
          box-sizing: border-box;
          margin-right: 20px;
        }
      }

      .column-4 div {
        justify-content: flex-end !important;
      }
    }

    .column-item {
      box-sizing: content-box !important;

      & > div {
        span:not(.el-link--inner) {
          font-size: 22px;
        }
      }
    }

    .column-1 {
      min-width: 80px !important;
      padding-left: 20px;
    }

    .column-2 {
      min-width: 260px !important;
      text-align: center;
			.name {
				width: 180px;
				display: inline-block;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
    }

    .column-3 {
      min-width: 346px !important;
      margin: 0;
      text-align: right;
      //justify-content: flex-end;
			justify-content: space-evenly;
      align-items: center;
      padding-right: 0;
			align-items: center;
			box-sizing: border-box;
      div {
        // height: 24px !important;
        // justify-content: flex-end;
        justify-content: flex-start !important;
        align-items: center;
        span {
          //position: static !important;
          transform: none !important;
          margin-top: 0 !important;
        }
      }
    }

    .column-4 {
      max-width: 204px !important;
      padding-right: 20px;
      font-size: 20px;
      justify-content: flex-end;
    }
  }
}
</style>
