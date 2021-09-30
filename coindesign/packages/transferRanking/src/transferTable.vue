<template>
    <div
            class="miner-rate"
            :class="[dataLoaded ? 'dataLoaded' : '']"
            v-loading="loading"
            element-loading-background="transparent"
    >
        <client-only>
        <co-miner-list
                :columns="columns"
                :dataSource="dataSource"
                :labels="tr('plabels')"
                initSortKey="increased"
                @sort-change="handleSortChange"
                miniRow
        ></co-miner-list>
        </client-only>
        <div class="see-more content-bg-color">
            <co-view-more name="tipset-transfer-list" />
        </div>
    </div>
</template>
<script>
    import ViewMore from "../../viewMore/src/index"
    import MinerList from "../../minerList/src/index";
    export default {
        name: "TransferTable",
        components: {
            MinerList
        },
        data() {
            const vm = this
            return {
                prefix: "home.transfer",
                dataSource: [],
                total: 0,
                columns: [
                    {
                        key: "from",
                        type: 'link',
                        target: "tipset/address-detail",
                        paramKey: "address",
                        ellipsis: true,
                    },
                    {
                        key: "till",
                    },
                    {
                        key: "to",
                        type: 'link',
                        target: "tipset/address-detail",
                        paramKey: "address",
                        ellipsis: true,
                    },
                    {
                        key: "epoch",
                        type: 'link',
                        target: "tipset/chain",
                        paramKey: "height"
                    },
                    {
                        key: "value",
                        formatter(v){
                            const arr = vm.formatFilNum(v,true).split(' ')
                            return Number(arr[0]).toFixed(2) + arr[1]
                        }
                    },
                ],
                options: {
                    actor: [],
                    start: 0,
                    order: 1,
                    interval: "24h",
                    count: 15
                },
                actor: "",
                dataLoaded: false,
                loading: false
            }
        },
        props: {
            interval: {
                type: String,
                default: ""
            },
            switchIndex: {
                type: Number,
                default: 1
            }
        },
        methods: {
            async getTransferList(){
                // let {interval, actor, start, count, order} = this.options
                let res = await this.$api.getLargeAmountTransferList([0,20,"epoch","desc"])
                this.dataSource = res.data.map(item=>{
                    const { from, to, epoch, value} = item
                    return {
                        from,
                        to,
                        epoch,
                        value
                    }
                })
            },
            handlePageChange(v) {
                this.options.start = (v - 1) * 25
            },
            handleSortChange(v) {
                const sortMap = {
                    increased: 1,
                    storage_rate: 3,
                    fil_per_t: 7,
                    blocks: 10,
                    win_count: 9,
                    rewards: 11,
                    lucky_number: 5
                }
                this.options.order = sortMap[v] || 1
            },
            handleSearch() {}
        },
        computed: {
            mbRealColumns() {
                const columns = [...this.mbColumns]
                if (this.switchIndex == 2) {
                    columns.pop()
                    columns.push({
                        key: "fil_per_t",
                        unit: "FIL/T",
                        class: "text-center",
                        formatter(v) {
                            return Number(v).toFixed(2)
                        }
                    })
                }
                return columns
            }
        },
        mounted() {
            this.getTransferList()
        },
        watch: {
            options: {
                deep: true,
                handler() {
                    this.getTransferList()
                }
            },
            interval(v) {
                this.options.interval = v
            },
            latestBlockHeight() {
                if (this.loadCount === 1) {
                    return
                }
                this.getTransferList()
            }
        },
        components: {
            ViewMore
        }
    }
</script>
<style lang="scss" scoped>
    @mixin column {
        $width: 220 120 320 320 220 140 140 150 160 160;
        @for $i from 1 through length($width) {
            .column-#{$i} {
                max-width: #{nth($width, $i)}px;
            }
        }
    }
    .miner-rate {
        padding-bottom: 0;
        background: var(--board-bg-color);
        border-radius: 4px;
        .top {
            height: 65px;
            color: var(--main-text-color);
            border-radius: 6px 6px 0 0;
        }
        .see-more {
            box-sizing: border-box;
            padding: 10px 0;
            border-radius: 0 0 6px 6px;
            & > div:last-child {
                height: 100%;
            }
        }
        &::v-deep .cm-miner-list {
            background: var(--content-bg-color);
            .header {
                justify-content: space-between;
                @include column;
                .column-1 {
                    padding: 20px;
                    width: 120px;
                }
                .column-2 {
                    width: 40px;
                }
                .column-3 {
                    width: 180px;
                }
                .column-4 {
                    width: 120px;
                }
                .column-5 {
                    width: 120px;
                    padding-right: 20px;
                    display: flex;
                    box-sizing: border-box;
                    justify-content: flex-end;
                }
            }
            .body {
                height: 480px;
                overflow-y: scroll;
                padding-bottom: 0;
                font-size: 14px;
                .row{
                    box-sizing: border-box;
                    display: flex;
                    flex: 1;
                    justify-content: space-between;
                }
                @include column;
                .column-1 div {
                    padding: 20px;
                    width: 120px;
                }
                .column-2 div {
                    width: 40px;
                    justify-content: center;
                    box-sizing: border-box;
                }
                .column-3 div {
                    width: 180px;
                    position: relative;
                    height: 22px;
                    justify-content: center;
                    span {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translateX(-50%) translateY(-50%);
                        display: inline-block;
                    }
                }
                .column-4 div {
                    width: 120px;
                    justify-content: center;
                }
                .column-5 div {
                    padding-right: 20px;
                    width: 120px;
                    box-sizing: border-box;
                    justify-content: flex-end;
                }
                .lucky-con {
                    span {
                        width: 84px;
                        height: 26px;
                        border-radius: 13px;
                        display: inline-block;
                        line-height: 26px;
                        text-align: center;
                    }
                    .level-5 {
                        background: #c89c17;
                    }
                    .level-4 {
                        background: #c75c46;
                    }
                    .level-3 {
                        background: #4f7edb;
                    }
                    .level-2 {
                        background: #1b9b5b;
                    }
                    .level-1 {
                        background: #00ae9b;
                    }
                }
            }
        }
    }
</style>
