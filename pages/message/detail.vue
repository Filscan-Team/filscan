<template>
  <div class="message-detail bottom-10 bg-board radius">
    <overview
      :dataList="dataList"
      :dataLabel="$t('message.detail.overview')"
      :showLoading="loading"
    />
  </div>
</template>
<script>
import nuxt from "../../.nuxt/components/nuxt";
export default {
  name: "MsgDetail",
  data() {
    return {
      cid: "",
      loading: false,
      dataList: [
        {
          key: "signed_cid"
        },
        {
          key: "height",
          isLink: true,
          target: "tipset/chain",
          isComponent: true
        },
        {
          key: "blockHash",
          isLink: true,
          target: "tipset/chain",
          paramKey: "hash"
        },
        {
          key: "time"
        },
        {
          key: "from",
          isLink: true,
          target: "tipset/address-detail",
          paramKey: "address"
        },
        {
          key: "to",
          isLink: true,
          target: "tipset/address-detail",
          paramKey: "address"
        },
        {
          key: "value",
          formatter(v) {
            return Number(v / Math.pow(10, 18))
          },
          unit: "FIL"
        },
        {
          key: "code"
        },
        {
          key: "gas_premium"
        },
        {
          key: "gas_used"
        },
        {
          key: "gas_limit"
        },
        {
          key: "gas_fee_cap"
        },
        {
          key: "method"
        },
        {
          key: "nonce"
        },
        {
          key: "params",
          isComponent: true
        }
      ]
    }
  },
  methods: {
    async getMessageDetail() {
      const vm = this
      try {
        this.loading = true
        let data = await this.$api.getMessageDetail([this.cid])
        //it means this message has not been packed if the height or blk_cids is undefined
        let {
          height,
          cid,
          blk_cids,
          method_name,
          exit_code,
          from,
          to,
          nonce,
          value,
          gas_premium,
          gas_limit,
          args,
          gas_used,
          gas_fee_cap,
          returns,
          block_time,
          signed_cid
        } = data
        let confirmCount = 0
        if ((exit_code == "0" || !exit_code) && blk_cids) {
          let count = await this.api.getBlockConfirmCount([blk_cids[0]])
          confirmCount = count
        }
        let code
        if (!exit_code) {
          code = this.methodResMap[0]
        } else {
          code = `${this.$t("component.mesList.fail")} (${this.methodResMap[
            exit_code
          ] || exit_code})`
        }
        const confirm = this.$t("message.detail.confirm")
        //const messageMap = this.$t("component.mesList.method");
        const sourceMap = {
          height: this.formatNumber(height),
          heightNum: height,
          cid,
          confirm: this.formatNumber(confirmCount),
          time: height ? this.getFormatTime(block_time) : "",
          from,
          to,
          method: method_name,
          nonce,
          value,
          gas_limit: this.formatNumber(gas_limit),
          gas_used: this.formatNumber(gas_used),
          blockHash: [...new Set(blk_cids)],
          code,
          gas_fee_cap: this.formatFilNum(gas_fee_cap, true),
          //fee: gas_used * gas_price,
          gas_premium,
          signed_cid
        }
        this.dataList = this.dataList.map(item => {
          let linkList
          if (item.isLink && item.key !== "blockHash") {
            linkList = [sourceMap[item.key]]
          } else {
            linkList = sourceMap[item.key]
          }
          let res = {
            ...item,
            value: sourceMap[item.key],
            linkList
          }
          if (item.key === "height" && blk_cids) {
            res.component = {
              render() {
                return (
                  <div class="height-link">
                    <nuxt-link to={`./tipset/chain?height=${sourceMap.heightNum}`}>
                      {sourceMap.height}
                    </nuxt-link>
                    <span>
                      {" "}
                      {exit_code == "0" || !exit_code
                        ? ` ( ${sourceMap.confirm} ${confirm} )`
                        : ""}
                    </span>
                  </div>
                )
              }
            }
          } else {
            item.isComponent = false
          }
          if (item.key === "params") {
            res.component = {
              render() {
                return (
                  <div class="top-20 params-con radius bottom-20">
                    <pre>Args:{JSON.stringify(args || {}, undefined, 3)}</pre>
                    <pre>
                      Returns:{JSON.stringify(returns || {}, undefined, 3)}
                    </pre>
                  </div>
                )
              }
            }
          }
          if (item.key == "blockHash" && !height) {
            res.isLink = false
            res.value = vm.isEn ? "Message in flight" : "待打包"
          }
          return res
        })
        this.loading = false
      } catch (e) {
        if (e) {
          this.loading = false
        }
      }
    }
  },
  watch: {
    cid: {
      immediate: true,
      handler(v) {
        if (v) {
          this.getMessageDetail()
        }
      }
    }
  },
  mounted() {
    this.cid = this.$route.query.cid
  }
}
</script>
<style lang="scss" scoped>
.message-detail {
  padding: 20px;
  & ::v-deep .height-link {
    width: 100%;
    display: flex;
    align-items: center;
    a {
      color: var(--link-color);
      margin-right: 5px;
    }
  }
  & ::v-deep .params-con {
    width: 100%;
    word-break: break-all;
    white-space: pre-wrap;
    margin-right: 10px;
    background: rgba(216, 216, 216, 0.1);
    border: 1px solid #6a6a6a;
    padding: 20px 40px;
    div {
      line-height: 20px;
    }
    pre {
      white-space: pre-line;
      line-height: 1.5;
    }
  }
  @media (max-width: 768px) {
    padding: 0;
    & ::v-deep .height-link {
      align-self: center;
      margin-left: 10px;
      justify-content: flex-end;
    }
    & ::v-deep .params-con {
      div {
        line-height: 6vw;
      }
    }
  }
}
</style>
