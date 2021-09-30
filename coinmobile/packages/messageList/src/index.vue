<template>
  <div
      class="block-list"
      v-loading="loading"
      element-loading-background="var(--board-bg-color)"
  >
    <div class="message-table" v-if="blockData.length>0">
      <div class="msg-total-number radius flex align-center">
        <span
            v-html="
            $t('component.mesList.total', {
              total: formatNumber(total),
              fil: formatNumber(filTotal)
            })
          "
        ></span>
        <cm-method-select :options="messageMethods" :index.sync="index" :minwidth="true" width="120px"/>
      </div>
      <div class="table-con">
        <cm-cards
            v-for="(item, index) in blockData"
            :key="index"
            :dataSource="item"
            :columns="realColumns"
            :span="24"
            :is-last-row="(blockData.length-1 ) === parseInt(index)"
        >
        </cm-cards>
        <cm-page :total="total" @page-change="handlePageChange"/>
      </div>
    </div>
    <div v-else>
      <cm-null-data/>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs"
import {mapActions} from "vuex";

export default {
  name: "CmMessageList",
  data(vm) {
    const formatterTime = (v) => dayjs.unix(v).format("YYYY-MM-DD HH:mm")
    return {
      loading: false,
      total: 0,
      filTotal: 0,
      time: null,
      index: "",
      option: {
        address: "",
        from_to: "",
        method: "",
        begindex: "0",
        count: "20",
      },
      blockData: [],
      columns: [
        {
          key: "signed_cid",
          type: 'link',
          target: "tipset/message-detail",
          paramKey: "cid",
          ellipsis: true
        },
        {
          key: "height",
          type: 'link',
          target: "tipset/chain",
          paramKey: "height"
        },
        {
          key: "time",
          formatter: formatterTime,
        },
        {
          key: "from",
          type: 'link',
          target: "tipset/address-detail",
          paramKey: "address",
          ellipsis: true,
        },
        {
          key: "to",
          // isLink: true,
          type: 'link',
          target: "tipset/address-detail",
          paramKey: "address",
          ellipsis: true,
        },
        {
          key: "value",
          formatter(v) {
            let str = vm.formatFilNum(v, true, false)
            let ArrStr = str.split(' ')
            return Number(ArrStr[0]).toFixed(3) + " " + ArrStr[1]
          }
        },
        {
          key: "code",
          hideInMobile: true
        },
        {
          key: "method_name"
        }
      ]
    }
  },
  props: {
    hideIndex: {
      type: Array,
      default() {
        return []
      }
    },
    height: {
      type: Number,
      default: 0
    },
  },
  computed: {
    realColumns() {
      let labels = this.$t("component.mesList.label")
      return this.columns.map((item, index) => {
        return {
          ...item,
          title: labels[index]
        }
      })
    },
  },
  methods: {
    ...mapActions("app", ["setMethods", "getMessageMethods", "setMessageMethods"]),
    handleTimeChange(v) {
      if (!v) {
        this.getBlockByMiner()
        return
      }
      this.getBlockByMiner({
        start: dayjs(v[0]).unix(),
        end: dayjs(v[1])
            .add(1, "d")
            .unix()
      })
    },
    handleMethodChange(v) {
      this.option.method = v
    },
    handleSizeChange(v) {
      this.option.count = v
      this.getBlockByMiner()
    },
    handlePageChange(v) {
      this.option.begindex = (v - 1) * this.option.count
    },
    async getBlockByMiner() {
      try {
        this.loading = true
        const {begindex, count, method, from_to} = this.option
        const params = {
          method,
          from_to,
          address: this.$route.query.address,
          offset_range: {
            count: Number(count),
            start: Number(begindex)
          }
        }
        let res = await this.$api.getMessageByAddress([params])
        const {ActorMsgCount, data, total} = res
        const dataSource = data.map(item => {
          const {cid, signed_cid,  height, block_time, from, to, value, exit_code, method_name} = item
          let methodName = method_name === 'transfer' ? 'Send' : method_name
          return {
            cid, signed_cid, height, time: block_time, from, to, value,
            code: this.methodResMap[exit_code],
            method_name: methodName
          }
        })
        this.blockData = Object.freeze(dataSource)
        this.total = total
        this.loading = false
        if (ActorMsgCount && ActorMsgCount !== null) {
          this.setMessageMethods(ActorMsgCount.MethodMsgCount)
        }
      } catch (e) {
        if (e) {
          this.loading = false
        }
      }
    }
  },
  created() {
    // let address = this.$route.query.address
    // this.option.miner = [address]
    this.getBlockByMiner()
  },
  mounted() {
    this.$bus.$on("search", () => {
      this.getBlockByMiner()
    })
  },
  watch: {
    height: {
      immediate: true,
      handler(v) {
        if (v) {
          //this.getBlockByHeight();
        }
      }
    },
    option: {
      deep: true,
      handler() {
        this.getBlockByMiner()
      }
    },
    index(v) {
      this.handleMethodChange(v)
    },
  }
}
</script>
<style lang="scss" scoped>
.block-list {
  //padding: 0 20px;
  .msg-total-number {
    height: 80px;
    align-items: center;
    display: flex;
    color: var(--main-text-color);
    font-size: 14px;

    & > span {
			font-size: 22px;
      margin-right: auto;

      &::v-deep i {
        color: var(--force-mark-color);
      }
    }

    & ::v-deep .el-date-editor {
      border-color: #999;
      margin-left: 100px;
      background: transparent;

      .el-range-input {
        background: transparent;
      }

      .el-range-separator {
        color: var(--main-text-color);
      }
    }

    & ::v-deep > span {
      &:first-child {
        font-size: 22px;
      }

      &:nth-child(2) {
        margin-left: auto;

        i:first-of-type {
          font-size: 20px;
          font-weight: 600;
          color: var(--force-mark-color);
        }

        i:last-child {
          font-size: 12px;
        }
      }
    }

    .el-dropdown-link {
      color: white;
    }
  }
}
</style>
