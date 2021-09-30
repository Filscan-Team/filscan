<template>
    <div class="message-detail bottom-10 content-bg-color radius">
        <co-overdetail
                :dataList="dataList"
                :dataLabel="$t('message.detail.overview')"
                :infoLabel="$t('message.detail.infoview')"
                :otherLabel="$t('message.detail.otherview')"
                :showLoading="loading"
                :consumeList="consumeList"
        />
    </div>
</template>
<script>
    export default {
        name: "PoolMessageDetail",
        head(){
            return {
                title: this.$t('header.seo.messageDetail',{
                    message: this.$route.query.cid
                }),
            }
        },
        data() {
            return {
                cid: "",
                loading: false,
                dataList: [
                    {
                        key: "signed_cid",
                        type: "string"
                    },
                    {
                        key: "height",
                        isLink: true,
                        target: "tipset/chain",
                        isComponent: true,
                        type: "link"
                    },
                    {
                        key: "blockHash",
                        isLink: true,
                        target: "tipset/chain",
                        paramKey: "hash",
                        type: "link"
                    },
                    {
                        key: "time",
                        type: "string"
                    },
                    {
                        key: "from",
                        isLink: true,
                        target: "tipset/address-detail",
                        paramKey: "address",
                        type: "link"
                    },
                    {
                        key: "to",
                        isLink: true,
                        target: "tipset/address-detail",
                        paramKey: "address",
                        type: "link"
                    },
                    {
                        key: "value",
                        type: "string"
                    },
                    {
                        key: "code",
                        type: "string"
                    },
                    {
                        key: "gas_premium",
                        type: "string"
                    },
                    {
                        key: "gas_used",
                        type: "string"
                    },
                    {
                        key: "gas_limit",
                        type: "string"
                    },
                    {
                        key: "gas_fee_cap",
                        type: "string"
                    },
                    {
                        key: "method",
                        type: "string"
                    },
                    {
                        key: "version",
                        type: "string"
                    },
                    {
                        key: "nonce",
                        type: "string"
                    },
                    {
                        key: "all_gas_fee",
                        type: "string"
                    },
                    {
                        key: "base_fee",
                        type: "string"
                    },
                    {
                        key: "params",
                        isComponent: true,
                        type: "component"
                    },
                    {
                        key: "returns",
                        type: "string"
                    }
                ],
                consumeList: []
            }
        },
        methods: {
            async getMessageDetail() {
                const vm = this
                try {
                    this.loading = true
                    let id = this.$route.query.cid
                    let data = await this.$api.getMessageDetails([id])
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
                        signed_cid,
                        consume_list,
                        params,
                        all_gas_fee,
                        base_fee,
                        version
                    } = data
                    this.consumeList = consume_list

                    let confirmCount = 0
                    if ((exit_code == "0" || !exit_code) && blk_cids) {
                        let count = await this.$api.getBlockConfirmCount([blk_cids[0]])
                        confirmCount = count
                    }
                    let code
                    if (!exit_code) {
                        code = this.methodResMap[0]
                    } else if(exit_code==-1){
                        code = this.isEn? 'flying':'打包中'
                    }else {
                        code = `${this.$t("component.mesList.fail")} (${this.methodResMap[
                            exit_code
                            ] || exit_code})`
                    }
                    const confirm = this.$t("message.detail.confirm")
                    //const messageMap = this.$t("component.mesList.method");
                    method_name = method_name==='transfer'?'send':method_name
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
                        value:this.formatFilNum(value,true),
                        gas_limit: this.formatNumber(gas_limit),
                        gas_used: this.formatNumber(gas_used),
                        blockHash: [...new Set(blk_cids)],
                        code,
                        gas_fee_cap: this.formatFilNum(gas_fee_cap, true),
                        gas_premium: this.formatFilNum(gas_premium, true),
                        signed_cid,
                        consume_list,
                        returns: JSON.stringify(returns),
                        params,
                        all_gas_fee: this.formatFilNum(all_gas_fee, true),
                        base_fee: this.formatFilNum(base_fee, true),
                        version
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
                                        <pre> Args :{JSON.stringify(args || {}, undefined, 3)}</pre>
                                    </div>
                                )
                                }
                            }
                        }
                        if (item.key == "blockHash" && !height) {
                            res.isLink = false
                            res.value = vm.isEn ? "0" : "0"
                        }
                        return res
                    })
                    this.loading = false
                } catch (e) {
                    if (e) {
                        this.loading = false
                    }
                }
            },
            valueFormat(v) {
                return Number(v / Math.pow(10, 18))
            }
        },
        watch: {
            "$route.query.cid"() {
                this.getMessageDetail()
            }
        },
        mounted() {
            this.getMessageDetail()
        }
    }
</script>
<style lang="scss" scoped>
    .message-detail {
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
                height: 344px;
            }
            & > pre:first-child {
                padding-right: 20px;
                height: auto;
                overflow: scroll;
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
