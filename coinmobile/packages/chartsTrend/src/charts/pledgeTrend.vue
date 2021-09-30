<template>
    <div class="active-miner bottom-20  flex column">
        <div class="top flex align-center jus-between">
              <span class="title">
                {{ tr("pledgeTitle") }}
              </span>
            <cm-time-select
                    title="Total Storage Miners"
                    @time-select="handleTimeChange"
            />
        </div>
        <div
                class="line-chart"
                ref="line"
                v-loading="loading"
                element-loading-background="var(--board-bg-color)"
        ></div>
    </div>
</template>
<script>
    let chart
    import dayjs from "dayjs"
    export default {
        name: "PledgeTrend",
        data() {
            return {
                counts: [],
                selector: {
                    type: "24h"
                },
                loading: false,
                prefix: "statistics.charts"
            }
        },
        methods: {
            handleTimeChange(v) {
                this.selector = v
            },
            drawChart() {
                const vm = this
                const rate = this.rate
                const { area, seriesItem, splitLine } = this.chartTheme.activeMiner
                const countLabel = this.$t("stats.mining.activeMiner.count")
                const data = this.counts
                const isMobile = this.isMobile
                const xData = data.map(item => item.name)
                const color = this.theme === "light" ? "black" : "white"
                const option = {
                    xAxis: {
                        type: "category",
                        boundaryGap: false,
                        data: xData,
                        axisLabel: {
                            show: true,
                            fontSize: (isMobile ? 9 : 12) * rate,
                            margin: 20,
                            color,
                            formatter(v) {
                                return dayjs
                                    .unix(v)
                                    .format(
                                        vm.selector.type == "24h"
                                            ? "HH:mm"
                                            : vm.isEn
                                            ? "MMM Do"
                                            : "MM-DD"
                                    )
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: "value",
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            fontSize: (isMobile ? 9 : 12) * rate,
                            color,
                            margin: 16 * rate
                        },
                        splitLine: {
                            lineStyle: {
                                type: "dashed",
                                color: splitLine
                            }
                        }
                    },
                    legend: {
                        selectedMode: false,
                        data: [{ name: countLabel }],
                        icon: "circle",
                        left: 50 * rate,
                        textStyle: {
                            fontSize: (isMobile ? 9 : 12) * rate,
                            color
                        },
                        show: false
                    },
                    grid: {
                        show: false,
                        left: 60 * rate,
                        right: 40 * rate,
                        top: 20 * rate,
                        bottom: 55 * rate
                    },
                    tooltip: {
                        trigger: "axis",
                        backgroundColor: "rgba(0,0,0,.6)",
                        formatter(yValues) {
                            const { data, axisValueLabel } = yValues[0]
                            let str = `<div>${dayjs
                                .unix(axisValueLabel)
                                .format(
                                    vm.getTimeBySelectorType(vm.selector.type)
                                )} <span class='left-10'>${vm.tr("count")}${
                                data.value
                            }</span></div>`
                            return str
                        }
                    },
                    series: [
                        {
                            data: data,
                            type: "line",
                            smooth: true,
                            symbol: "none",
                            name: countLabel,
                            itemStyle: {
                                color: seriesItem
                            },
                            areaStyle: {
                                color: area
                            }
                        }
                    ]
                }
                if (this.isMobile) {
                    option.grid = {
                        top: 15 * rate,
                        bottom: 40 * rate,
                        left: 45 * rate,
                        right: 25 * rate
                    }
                }
                chart.setOption(option)
            },
            async getActiveMinerCount() {
                try {
                    this.loading = true
                    // let res = await getActiveMinerCount(this.selector.type)
                    let res = await this.$api.getActiveMinerTrend([this.selector.type])
                    const data = res.map(item => {
                        return {
                            name: item.time,
                            value: item.count
                        }
                    })
                    data.reverse()
                    data.pop()
                    this.counts = Object.freeze(data)
                    this.loading = false
                    this.drawChart()
                } catch (e) {
                    this.loading = false
                }
            }
        },
        mounted() {
            if (!this.isEn) {
                this.selector.format = "MM-DD HH:mm"
            }
            chart = this.$chart.init(this.$refs.line)
            this.getActiveMinerCount()
            this.$bus.$on("window-resize", () => {
                chart.resize()
            })
        },
        watch: {
            selector() {
                this.getActiveMinerCount()
            },
            theme() {
                this.drawChart()
            }
        }
    }
</script>
<style lang="scss" scoped>
    .active-miner {
        padding: 0 !important;
        height: 500px;
        .line-chart {
            height: 400px;
            margin-top: 0;
        }
        .title {
            font-size: 28px;
            font-weight: 600;
        }
        .top {
            height: 80px;
            padding: 0 20px;
            border-bottom: 1px solid var(--border-color);
        }
    }
</style>
