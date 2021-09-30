<template>
    <client-only>
        <div
                class="message-list"
                v-loading="loading"
                element-loading-background="transparent"
        >
            <cm-nav-title :title="tr('poolheading')"></cm-nav-title>
            <div
                    class="total-number radius top-20 bottom-20"
                    slot="header"
                    :class="{ 'has-select': showSelect }"
            >
              <span
                      class="statistic"
                      v-html="
                  $t('component.mesList.total', {
                    total: formatNumber(total),
                    extra: showPicker
                      ? time
                        ? $t('component.mesList.range', {
                            start: dateTime.start,
                            end: dateTime.end
                          })
                        : $t('component.mesList.latest')
                      : ''
                  })
                "
              ></span>
                <cm-select :options="messageMethods" :index.sync="index" :minwidth="true" />
            </div>
            <div class="poolList">
                <cm-cards
                        v-for="(item, index) in messageData"
                        :key="item.cid + index"
                        :dataSource="item"
                        :columns="mbColumnsWithLabel"
                />
            </div>
            <cm-page @page-change="handlePageChange" :total="total" />
        </div>
    </client-only>
</template>
<script>
    import { mapActions } from "vuex"
    import dayjs from "dayjs"
    export default {
        name: "MessageList",
        layout: 'mlayout',
        data(vm) {
            const type = this.type
            return {
                prefix: "component.mesList",
                method: [],
                loading: false,
                option: {
                    method: "",
                    begindex: "0",
                    count: "25",
                    from_to: "",
                    begin: "",
                    end: ""
                },
                currentPage: 1,
                total: 0,
                messageData: [],
                mbColumns: [
                    {
                        key: "id",
                        type: 'link',
                        target: "tipset/pool-message-detail",
                        paramKey: "cid",
                        ellipsis: true
                    },
                    {
                        key: "time",
                    },
                    {
                        key: "from",
                        type: 'link',
                        target: "tipset/address-detail",
                        paramKey: "address",
                        ellipsis: true,
                        isComponent: type === "address",
                        class: "text-right"
                    },
                    {
                        key: "to",
                        type: 'link',
                        target: "tipset/address-detail",
                        paramKey: "address",
                        ellipsis: true,
                        isComponent: type === "address"
                    },
                    {
                        key: "value",
                        class: "text-right",
                        formatter(v) {
                            return Number(vm.formatFilNum(v, true, true)).toFixed(3) + " FIL"
                        }
                    },
                    {
                        key: "gas_limit",
                    },
                    {
                        key: "gas_premium",
                        formatter(v) {
                            return vm.formatFilNum(v, true)
                        }
                    },
                    {
                        key: "method",
                        class: "text-center"
                    },
                ],
                labels: [],
                index: "",
                selectType: "",
                time: "",
                pickerOptions: {
                    disabledDate(time) {
                        return (
                            time.getTime() >
                            1000 * dayjs(dayjs().format("YYYY-MM-DD")).unix() + 86400000
                        )
                    }
                },
                methodsMsg: []
            }
        },
        props: {
            showSelect: {
                type: Boolean,
                default: false
            },
            withType: {
                type: Boolean,
                default: true
            },
            cid: {
                type: String,
                default: ""
            },
            type: {
                type: String,
                default: "block"
            },
            address: {
                type: String,
                default: ""
            },
            showExtra: {
                type: Boolean,
                default: false
            },
            subAddress: {
                type: String,
                default: ""
            },
            showPicker: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            ...mapActions("app", ["setMethods", "getMessageMethods"]),
            handleSizeChange(v) {
                this.option.count = v
            },
            handlePageChange(v) {
                this.currentPage = v
                this.option.begindex = (v - 1) * this.option.count
            },
            handleMethodChange(v) {
                this.currentPage = 1
                this.option = {
                    from_to: this.option.from_to,
                    method: v,
                    begindex: 0,
                    count: 25
                }
            },
            handleTimeChange(v) {
                if (v && v.length) {
                    const [begin, end] = v
                    const startUnix = dayjs(begin).unix()
                    const endUnix = dayjs(end).unix()
                    if (Math.ceil((endUnix - startUnix) / 86400) > 6) {
                        //this.time[1] = dayjs(begin).add(6, 'd');
                        this.$set(this.time, 1, dayjs(begin).add(6, "d"))
                    }
                    this.option.begin = dayjs(begin).unix()
                    this.option.end = dayjs(this.time[1]).unix()
                }
                if (v == null) {
                    this.option.begin = null
                }
            },
            async getMessage() {
                try {
                    this.loading = true
                    if (this.cid) {
                        this.option.block_cid = this.cid
                    }
                    let res = {}
                    const { begindex,count,method } = this.option
                    let op = [
                        {
                            offset_range: { start: Number(begindex), count: Number(count) },
                            method
                        }
                    ]
                    res = await this.$api.getMpoolMessages(op)
                    this.getMessageMethods()
                    this.loading = false
                    if (!res || !res.total) {
                        this.total = 0
                        this.messageData = []
                    } else {
                        this.total = Number(res.total)
                        const messageData = this.getDataFrom(res)
                        this.messageData = Object.freeze(messageData)
                    }
                } catch (e) {
                    this.loading = false
                }
            },
            getDataFrom(res) {
                const type = this.type
                const ellipsisByLength = this.ellipsisByLength
                const addressHash = this.address
                const subAddress = this.subAddress
                return res.data.map(item => {
                    let {
                        cid,
                        signed_cid,
                        block_time,
                        from,
                        to,
                        height,
                        gas_price,
                        gas_limit,
                        gas_premium,
                        last_modified,
                        value,
                        exit_code,
                        method_name
                    } = item
                    let code

                    const isFrom = addressHash == from || subAddress == from
                    const isTo = addressHash == to || subAddress == to
                    if (!exit_code) {
                        code = this.methodResMap[0]
                    } else if(exit_code==-1){
                        code = this.isEn? 'flying':'打包中'
                    }else {
                        code = `${this.$t("component.mesList.fail")} (${this.methodResMap[exit_code] || exit_code})`
                    }

                    let methodName = method_name === "transfer" ? "Send" : method_name
                    let res = {
                        cid: signed_cid,
                        id: cid,
                        time: this.formatTime((new Date(last_modified)).getTime()/1000),
                        type: {
                            render() {
                                return (
                                    <div class={isFrom ? "" : "rotate"}>
                                    <span class="iconfont icon-shangsheng"></span>
                                    </div>
                            )
                            }
                        },
                        from: {
                            render() {
                                return !isFrom ? (
                                    <nuxt-link
                                    to={`../tipset/address-detail?address=${from}`}
                                style={{ color: "var(--link-color)" }}
                            >
                                {ellipsisByLength(from, 6, true)}
                            </nuxt-link>
                            ) : (
                                <span>{ellipsisByLength(from, 6, true)}</span>
                            )
                            }
                        },
                        to: {
                            render() {
                                return !isTo ? (
                                    <nuxt-link
                                    to={`../tipset/address-detail?address=${to}`}
                                style={{ color: "var(--link-color)" }}
                            >
                                {ellipsisByLength(to, 6, true)}
                            </nuxt-link>
                            ) : (
                                <span>{ellipsisByLength(to, 6, true)}</span>
                            )
                            }
                        },
                        value,
                        fee: gas_price,
                        gas_limit,
                        gas_premium,
                        method: methodName,
                        height: this.formatNumber(height),
                        code
                    }
                    if (type === "block") {
                        res.from = from
                        res.to = to
                    }
                    return res
                })
            }
        },
        watch: {
            option: {
                deep: true,
                handler() {
                    this.getMessage()
                }
            },
            cid() {
                this.option = {
                    begindex: 0,
                    count: 25
                }
            },
            address() {
                if (this.option.from_to) {
                    this.option.from_to = ""
                } else {
                    this.getMessage()
                }
            },
            index(v) {
                this.handleMethodChange(v)
            },
            selectType(v) {
                this.currentPage = 1
                this.option = {
                    ...this.option,
                    from_to: v
                }
            },
        },
        mounted() {
            // this.labels = [...this.$t('component.mesList.label')];
            // if (!this.withType) {
            // 	this.columns.shift();
            // 	this.labels.shift();
            // }
            this.getMessage()
            /*
            handle search
            if not do this,when you navigate to 'address-detail' page and click the button at the header, it will not request because the 'address'
            does not change
            */
            this.$bus.$on("search", () => {
                this.getMessage()
            })
        },
        computed: {
            mbColumnsWithLabel() {
                return this.mbColumns.map((item, index) => {
                    return {
                        ...item,
                        title: this.$t("component.mesList.mbLabel")[index]
                    }
                })
            },
            dateTime() {
                if (!this.time) {
                    return {
                        start: "",
                        end: ""
                    }
                } else {
                    const [start, end] = this.time
                    const format = this.isEn ? "MM-DD" : "MM月DD日"
                    return {
                        start: dayjs(start).format(format),
                        end: dayjs(end).format(format)
                    }
                }
            }
        },
    }
</script>
<style lang="scss" scoped>
    .message-list {
        .total-number {
            align-items: center;
            padding: 0 20px 20px 20px;
            display: flex;
            margin-bottom: 20px;
            color: var(--main-text-color);
            border-bottom: 1px solid var(--border-line);
            & ::v-deep .el-date-editor {
                border-color: #999;
                margin-right: 30px;
                background: transparent;
                .el-range-input {
                    background: transparent;
                }
                .el-range-separator {
                    color: var(--main-text-color);
                }
            }
            & ::v-deep > span {
                height: 30px;
                line-height: 30px;
                i:first-of-type {
                    color: var(--force-mark-color);
                    font-size: 20px;
                    font-weight: 600;
                }
            }
            .select-btns {
                /*border: 1px solid var(--border-color);*/
                border-radius: 4px;
                height: 40px;
                line-height: 40px;
                margin-left: -40px;
                span {
                    padding: 0 30px;
                    display: inline-block;
                    height: 20px;
                    line-height: 20px;
                    border-right: 1px solid var(--border-color);
                    &:last-child {
                        border-right: none;
                    }
                }
            }
            .statistic {
                font-size: 24px;
                margin-right: auto;
                i{
                    font-size: 28px;
                }
                & > span{
                    margin-left: 0;
                    margin-right: auto;
                }

            }
            &.has-select {
                .select-btns {
                    margin-right: auto;
                }
                .statistic {
                    margin-right: 60px;
                }
            }
            &.message-list {
                min-height: 400px;
            }
            .message-item-con {
                max-height: calc(100vh - 370px);
                overflow-y: scroll;
                background: var(--board-bg-color);
                padding: 0 20px;
                &::v-deep .message-item {
                    .el-link {
                        font-size: 28px !important;
                    }
                    .method {
                        div:last-child {
                            font-size: 16px;
                        }
                    }
                }
            }
        }
        .poolList{
            padding: 0 20px;
        }
    }
</style>
