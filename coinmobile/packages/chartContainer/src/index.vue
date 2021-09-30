<template>
    <div class="chart-container flex top-20">
        <miner-balance />
        <miner-power />
    </div>
</template>
<script>
    import MinerBalance from "./chart/MinerBalance"
    import MinerPower from "./chart/MinerPower"
    export default {
        name: "CmChartContainer",
        components: {
            MinerBalance,
            MinerPower,
        }
    }
</script>
<style lang="scss" scoped>
    .chart-container {
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 0;
        & > div {
            min-width: 100%;
            box-sizing: border-box;
            height: 453px;
        }
    }
</style>
