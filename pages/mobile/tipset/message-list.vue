<template>
    <client-only>
        <div
                class="message-list"
                v-loading="loading"
                element-loading-background="transparent"
        >
            <cm-nav-title :title="$t('component.mesList.heading')"></cm-nav-title>
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
                <cm-select :options="messageMethods" :index.sync="index" :minwidth="true"/>
            </div>
            <div class="msgList">
                <cm-cards
                    v-for="(item, index) in messageData"
                    :key="item.cid + index"
                    :dataSource="item"
                    :columns="mbColumnsWithLabel"
                    :span="24"
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
                        key: "cid",
                        type: 'link',
                        target: "tipset/message-detail",
                        paramKey: "cid",
                        ellipsis: true
                    },
                    {
                        key: "height",
                        type: 'link',
                        target: "tipset/chain",
                        paramKey: "height",
                        class: "text-center"
                    },
                    {
                        key: 'time',
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
                        key: "code",
                    },
                    {
                        key: 'method_name'
                    }
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
                    const { block_cid, begindex, count, begin, end, method} = this.option
                    let params = {
                        blk_cid: block_cid,
                        offset_range: { start: Number(begindex), count: Number(count) },
                        time_range: { begin, end },
                        method
                    }
                    if (!begin || !end) {
                        delete params.time_range
                    }
                    res = await this.$api.getGetMessages([params])
                    const { data, total } = res
                    this.getMessageMethods()
                    this.loading = false
                    if (!res || !res.total) {
                        this.total = 0
                        this.messageData = []
                    } else {
                        this.total = Number(total)
                        const messageData = data.map(item=>{
                            const { cid, height, block_time, from, to, value, method_name, exit_code } = item
                            let methodName = method_name === 'transfer' ? 'Send' : method_name
                            return {
                                cid, height, time: this.formatDateTime(block_time), from, to, value, method_name:methodName, code: this.methodResMap[exit_code]
                            }
                        })
                        this.messageData = Object.freeze(messageData)
                    }
                } catch (e) {
                    this.loading = false
                }
            },
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
            isPoolMessage() {
                this.getMessage()
            }
        },
        mounted() {
            this.getMessage()
            this.$bus.$on("search", () => {
                this.getMessage()
            })
        },
        computed: {
            mbColumnsWithLabel() {
                return this.mbColumns.map((item, index) => {
                    return {
                        ...item,
                        title: this.$t("component.mesList.label")[index]
                    }
                })
            },
            isPoolMessage() {
                return this.$route.name == "tipset-pool-message-list"
            },
            returnObj() {
                const vm = this
                const returnObj = {
                    columns: [],
                    labels: []
                }
                const type = this.type
                const labels = this.$t("component.mesList.label")
                const columns = [
                    {
                        key: "type",
                        isComponent: true,
                        hideInMobile: true
                    },
                    {
                        key: "cid",
                        isLink: true,
                        target: "tipset/message-detail",
                        ellipsis: true
                    },
                    {
                        key: "height",
                        isLink: true,
                        target: "tipset/chain",
                        paramKey: "height"
                    },
                    {
                        key: "time",
                        hideInMobile: true
                    },
                    {
                        key: "from",
                        isLink: true,
                        target: "tipset/address-detail",
                        paramKey: "address",
                        ellipsis: true,
                        isComponent: type === "address"
                    },
                    {
                        key: "to",
                        isLink: true,
                        target: "tipset/address-detail",
                        paramKey: "address",
                        ellipsis: true,
                        isComponent: type === "address"
                    },
                    {
                        key: "value",
                        formatter(v) {
                            return Number(vm.formatFilNum(v, true, true)).toFixed(3) + " FIL"
                        }
                    },
                    {
                        key: "code",
                        hideInMobile: true
                    },
                    {
                        key: "method"
                    }
                ]
                // withType 地址详情页面
                if (!this.withType) {
                    returnObj.columns = columns.filter((item, index) => {
                        return index != 0
                    })
                    returnObj.labels = labels.filter((item, index) => {
                        return index != 0
                    })
                } else {
                    returnObj.columns = columns
                    returnObj.labels = labels
                }
                // 待打包消息
                if (this.isPoolMessage) {
                    returnObj.columns = columns.filter((item, index) => {
                        return ![0, 2, 3].includes(index)
                    })
                    returnObj.labels = labels.filter((item, index) => {
                        return ![0, 2, 3].includes(index)
                    })
                }
                return returnObj
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
    background: var(--board-bg-color);
    .total-number {
        margin-bottom: 20px;
        height: 80px;
        padding: 0 20px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid var(--border-line);
        & ::v-deep .statistic {
            font-size: 24px !important;
            i {
                font-size: 28px !important;
            }
        }
        & > span {
            margin-left: 0 !important;
            margin-right: auto !important;
        }
    }
    .msgList{
        padding: 0 20px;
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
</style>
