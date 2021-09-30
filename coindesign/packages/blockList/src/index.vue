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
          $t('component.blockList.total', {
            total: formatNumber(total),
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
        name: "CoBlockList",
        data() {
            const formatter = v => dayjs.unix(v).format("YYYY-MM-DD HH:mm")
            return {
                loading: false,
                total: 0,
                filTotal: 0,
                time: null,
                option: {
                    begindex: "0",
                    count: "25",
                    miner: []
                },
                blockData: [],
                columns: [
                    {
                        key: "hash",
                        type:'link',
                        target: "tipset/chain",
                        ellipsis: true
                    },
                    {
                        key: "height",
                        type:'link',
                        target: "tipset/chain",
                        hideInMobile: true
                    },
                    {
                        key: "time",
                        formatter
                    },
                    {
                        key: "mes"
                    },
                    {
                        key: "miner",
                        type:'link',
                        target: "tipset/address-detail",
                        paramKey: "address"
                    },
                    {
                        key: "reward",
                        unit: "FIL",
                        formatter(v){
                            return Number(v).toFixed(2)
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
                return this.$t("component.blockList.label").filter((item, index) => {
                    return !this.hideIndex.includes(index)
                })
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
                this.option.begindex = (v - 1) * this.option.count
            },
            async getBlockByMiner(time) {
                try {
                    this.loading = true
                    const { begindex, count, miner } = this.option
                    const params = {
                        miner,
                        count: Number(count),
                        begindex: Number(begindex)
                    }
                    if (time) {
                        const { start, end } = time
                        params.start = start
                        params.end = end
                    }
                    let data = await this.$api.getBlockByMiner([params])
                    const dataSource = data.blocks.map(item => {
                        const { reward, cid, messages, height, block_time, miner } = item
                        return {
                            hash: cid,
                            height,
                            time: block_time,
                            // time: this.getFormatTime(block_time),
                            mes: messages,
                            miner,
                            reward
                        }
                    })
                    this.blockData = Object.freeze(dataSource)
                    this.total = Number(data.total)
                    this.filTotal = Number(data.total_fil)
                    this.loading = false
                } catch (e) {
                    if (e) {
                        this.loading = false
                    }
                }
            }
        },
        created(){
            let address = this.$route.query.address
            this.option.miner = [address]
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
            miners() {
                this.option = {
                    begindex: "0",
                    count: "25",
                    miners: this.miners
                }
            }
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
            font-size: 14px;
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
                    font-size: 16px;
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
