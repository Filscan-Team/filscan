<template>
    <div
            class="block-list"
            v-loading="loading"
            element-loading-background="var(--board-bg-color)"
    >
        <div
                class="total-number radius flex align-center"
        >
          <span
                  v-html="
              $t('component.transactionList.total', {
                total: formatNumber(total)
              })
            "
          ></span>
        </div>
        <div class="table-con border-outline">
            <co-table
                    :dataSource="blockData"
                    :columns="realColumns"
                    showPagination
                    :total="total"
                    @size-change="handleSizeChange"
                    @page-change="handlePageChange"
                    :labels="realLabels"
            >
            </co-table>
        </div>
    </div>
</template>
<script>
    import dayjs from "dayjs"
    export default {
        name: "CoTransferList",
        prefix: "component.transactionList",
        data(vm) {
            const formatter = v => dayjs.unix(v).format("YYYY-MM-DD HH:mm")
            return {
                loading: false,
                total: 0,
                filTotal: 0,
                time: null,
                options: {
                    address: this.$route.query.address,
                    offsetRange: {
                        start: 0,
                        count: 20
                    }
                },
                blockData: [],
                columns: [
                    {
                        key: "block_time",
                        formatter
                    },
                    {
                        key: "msg_cid",
                        type:'link',
                        target: "tipset/message-detail",
                        paramKey: "cid",
                        ellipsis: true,
                        formatter(v) {
                            return vm.ellipsisByLength(v)
                        }
                    },
                    {
                        key: "from",
                        type:'link',
                        target: "tipset/address-detail",
                        paramKey: "address",
                        ellipsis: true
                    },
                    {
                        key: "to",
                        type:'link',
                        target: "tipset/address-detail",
                        paramKey: "address",
                        ellipsis: true
                    },
                    {
                        key: "value",
                        formatter(v, row) {
                            let tmp = vm.formatFile(v)
                            let res = row.category === 3 ? "-" + tmp : tmp
                            return res
                        }
                    },
                    {
                        key: "category",
                        formatter(v) {
                            return vm.$t("component.transactionList.typeOptions")[v]
                        }
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
                return this.columns.filter((item, index) => {
                    return !this.hideIndex.includes(index)
                })
            },
            realLabels() {
                return this.$t("component.transferList.addressLabels").filter(
                    (item, index) => {
                        return !this.hideIndex.includes(index)
                    }
                )
            },
        },
        methods: {
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
            handleSizeChange(v) {
                this.option.count = v
            },
            handlePageChange(v) {
                const { count } = this.options.offsetRange
                this.options.offsetRange.start = (v - 1) * count
            },
            async getBlockByMiner() {
                try {
                    this.loading = true
                    let res = await this.$api.getTraceAccountList([this.options])
                    const { trace_accounts, total } = res
                    this.total = total
                    this.loading = false
                    let data = trace_accounts.map(item => {
                        if([2,3].includes(item.category)){
                            item.msg_cid = "N/A"
                        }
                        delete item["target"]
                        return item
                    })
                    this.blockData = data
                } catch (e) {
                    if (e) {
                        this.loading = false
                    }
                }
            }
        },
        created(){

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
            options: {
                deep: true,
                immediate: true,
                handler() {
                    this.getBlockByMiner()
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
    .block-list {
        .total-number {
            height: 60px;
            align-items: center;
            display: flex;
            color: var(--main-text-color);
            font-size: 14PX;
            & > span {
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
                    font-size: 14PX;
                }
                &:nth-child(2) {
                    margin-left: auto;
                    i:first-of-type {
                        font-size: 20PX;
                        font-weight: 600;
                        color: var(--force-mark-color);
                    }
                    i:last-child {
                        font-size: 12PX;
                    }
                }
            }
            .el-dropdown-link {
                color: white;
            }
        }
    }
</style>
