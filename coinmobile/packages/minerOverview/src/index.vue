<template>
    <div class="miner-overview bg-item radius top-20">
        <!--      <div class="font-18 font-500 bottom-20 left-20 title">-->
        <!--        {{ isEn ? "Miner Overview" : "矿工账户" }}-->
        <!--      </div>-->
        <div class="overview-main flex">
            <address-balance :info="info" class="overview-address" />
            <quality-power :info="info" class="overview-power" />
            <power-growth class="overview-growth" />
        </div>
    </div>
</template>
<script>
    import AddressBalance from "./miner-overview/AddressBalance"
    import QualityPower from "./miner-overview/QualityPower"
    import PowerGrowth from "./miner-overview/PowerGrowth"
    export default {
        name: "CmMinerOverview",
        components: {
            AddressBalance,
            QualityPower,
            PowerGrowth
        },
        props: {
            info: {
                type: Object,
                default() {
                    return {}
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .miner-overview {
       background-color: var(--board-bg-color);
        .overview-main .overview-address {
            min-height: 350px;
            box-sizing: border-box;
            margin-top: 20px;
            margin-right: 20px;
        }
        .overview-growth {
            width: 100%;
        }
        .overview-main .overview-power {
            width: 100%;
            min-height: 575px;
            margin: 0 20px 20px 20px;
        }
        margin-top: 0;
        padding: 0;
        .title {
            display: none;
        }
        .overview-main {
            flex-wrap: wrap;
            background: var(--board-bg-color);
            padding: 0;
            .overview-address {
                width: 100%;
            }
            div {
                background: var(--white);
                width: 100%;
                box-sizing: border-box;
                margin: 0 20px 20px 20px;
                border-radius: 0.533vw;
                border: none;
                font-size: 24px;
                border: 1px solid var(--border-line);
            }
        }
    }
</style>
