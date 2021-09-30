<template>
    <div
            class="miner-rate"
            v-loading="loading"
            element-loading-background="transparent"
    >
        <cm-cards
                v-for="(item, index) in dataSource"
                :key="index"
                :dataSource="item"
                :columns="columnsWithLabel"
                :span="24"
        >
        </cm-cards>
        <cm-page :total="total" @page-change="handlePageChange" />
    </div>
</template>
<script>
    export default {
        name: "CmRankingRate",
        data(vm) {
            const formatter = v => this.unitConversion(v, 2)
            return {
                prefix: "mining.powerRanking",
                total: 0,
                columns: [
                    {
                        key: "rank",
                        hideSort: true
                    },
                    {
                        key: "quality_adj_power_ratio",
                        class: "text-left",
                        formatter(v){
                            return vm.unitConversion(v, 2) + "/D"
                        },
                        tips: vm.$t('mining.powerRanking.tips')[0],
                        progress: true
                    },
                    {
                        key: "quality_adj_power_incr",
                        class: "text-center",
                        formatter,
                        tips: vm.$t('mining.powerRanking.tips')[1]
                    },
                    {
                        key: "quality_adj_power",
                        class: "text-center",
                        formatter
                    },
                    {
                        key: "power",
                        formatter,
                        class: "text-center"
                    },
                    {
                        key: "sector_size",
                        formatter(v) {
                            return v + "G"
                        }
                    },
                ],
                dataSource: [],
                options: {
                    start: 0,
                    count: 25,
                    order: 7,
                    interval: "24h",
                    size: 0,
                },
                page: 1,
                loading: false
            }
        },
        methods: {
            async getTopMiners() {
                const vm = this
                this.loading = true
                try {
                    // let res = await getTopMiners(options)
                    let res = await this.$api.getTopMinersProfit([...Object.values(this.options)])
                    this.loading = false
                    let maxPower = res.first_data
                    if (res.data && Array.isArray(res.data)) {
                        this.dataSource = Object.freeze(
                            res.data.map((item, index) => {
                                item.reward_ratio = item.reward_ratio * 100
                                return {
                                    ...item,
                                    rank: (vm.page - 1) * 25 + index + 1,
                                    progress: (item.quality_adj_power_ratio / maxPower) * 100 + "%",
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
                    } else {
                        this.total = 0
                        this.dataSource = []
                    }
                } catch (e) {
                    this.loading = false
                }
            },
            handlePageChange(v) {
                this.page = v
                this.options.start = (v - 1) * 25
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
                handler() {
                    this.getTopMiners()
                }
            },
            actor() {
                this.getTopMiners()
            },
            interval(v) {
                this.options.interval = v
            },
            order(v){
                this.options.size = v
                this.getTopMiners()
            },
        },
        computed:{
            columnsWithLabel(){
                let labels = this.tr('mblabels')
                return this.columns.map((item,index)=>{
                    return {
                        ...item,
                        title: labels[index]
                    }
                })
            }
        },
        props: {
            actor: {
                type: Array,
                default() {
                    return []
                }
            },
            interval: {
                type: String,
                default: ""
            },
            order: {
                type: Number,
                default: 7
            }
        }
    }
</script>
<style lang="scss" scoped>
    @mixin column {
        $width: 50 60 120 220 150 140 100 155 160 130 140;
        @for $i from 1 through length($width) {
            .column-#{$i} {
                max-width: #{nth($width, $i)}px;
            }
        }
    }
    .miner-rate {
        padding-bottom: 0;
        border-radius: 4px;
        margin: 0 20px;
        .base-title {
            padding-right: 20px;
            .search-wrap {
                width: 300px;
                height: 40px;
                border-radius: 20px;
                padding: 0 30px;
                &::v-deep .el-input {
                    input {
                        background: none;
                        border: none;
                        color: var(--main-text-color);
                    }
                }
            }
        }
        &::v-deep tbody tr td:nth-child(4){
            .cell{
                justify-content: flex-start!important;
            }
        }
        &::v-deep .miner-list {
            background: var(--board-item-bg-color);
            .header {
                padding: 0 20px;
                justify-content: space-between;
                @include column;
            }
            .body {
                overflow-y: hidden;
                padding: 0 20px;
                margin-right: 0;
                .row {
                    margin: 0;
                    justify-content: space-between;
                }
                .column-3 div {
                    position: relative;
                    height: 2.933vw !important;
                    span {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translateX(-50%) translateY(-50%);
                        display: inline-block;
                    }
                }
                .column-4 {
                    div {
                        justify-content: flex-start;
                    }
                }
                .column-8 {
                    div {
                        & > span {
                            display: inline-block;
                            &:nth-child(1) {
                                width: 70px;
                                display: flex;
                                justify-content: flex-end;
                            }
                        }
                    }
                }
                .warning {
                    color: red;
                }
                @include column;
            }
        }
        @media (max-width: 768px) {
            padding: 0;
            .base-title {
                height: 10.667vw;
                padding: 0 2.667vw;
                font-size: 3.733vw;
                margin-bottom: 0;
                .search {
                    width: 44vw;
                    height: 6.667vw;
                    border-radius: 1.6vw;
                    input {
                        font-size: 2.4vw;
                        max-width: 28vw;
                    }
                    span {
                        margin-left: 7.2vw;
                    }
                }
            }
            &::v-deep .miner-list {
                .column-1 {
                    max-width: 13.333vw;
                }
                .header {
                    padding: 0;
                    justify-content: space-between;
                    background: var(--board-bg-color);
                }
                .body {
                    padding: 0;
                    overflow-y: hidden;
                    background: var(--board-bg-color);
                    .row {
                        justify-content: space-between;
                        .column-4 {
                            div {
                                justify-content: flex-end !important;
                            }
                        }
                        .miner-name {
                            padding-left: 0 !important;
                        }
                    }
                }
                .column-1 {
                    max-width: 10vw !important;
                    padding-left: 2.667vw;
                }
                .column-2 {
                    max-width: 12vw !important;
                }
                .column-3 {
                    max-width: 26.667vw !important;
                    justify-content: flex-start;
                    div {
                        justify-content: flex-start;
                        span {
                            position: static !important;
                            transform: none !important;
                        }
                    }
                }
                .column-4 {
                    max-width: 27.2vw !important;
                    padding-right: 2.667vw;
                    margin-right: 0 !important;
                }
            }
            & .base-title .search-wrap {
                width: 44vw;
                height: 6.667vw;
                border-radius: 1.6vw;
                &::v-deep .el-input {
                    input {
                        height: 100%;
                    }
                    .el-input__suffix {
                        right: 4vw;
                        top: 0.667vw;
                    }
                }
            }
        }
    }
</style>