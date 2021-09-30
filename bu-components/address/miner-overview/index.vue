<template>
    <div class="miner-overview radius">
      <div class="miner-title" v-if="isPool">
        {{ isEn ? "Pool Overview" : "存储池概览"}}
      </div>
        <div class="overview-main flex">
            <address-balance :info="info" class="overview-address" />
            <quality-power :info="info" class="overview-power" />
        </div>

        <power-growth class="overview-growth" />
    </div>
</template>
<script>
    import AddressBalance from "./AddressBalance"
    import QualityPower from "./QualityPower"
    import PowerGrowth from "./PowerGrowth"
    export default {
        name: "MinerOverview",
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
        },
        computed: {
            isPool(){
                return this.$route.name == "tipset-pool-detail"
            }
        }
    }
</script>
<style lang="scss" scoped>
    .miner-overview {
        .miner-title{
            padding: 20px;
            background-color: var(--content-bg-color);
            font-size: var(--font-18);
        }
        .overview-main {
            background-color: var(--content-bg-color);
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 0 20px 20px 20px;
            div {
                border: 1px solid var(--border-line);
                width: 100%;
            }
            & ::v-deep .header-title {
                padding: 20px;
            }
        }
        .overview-main .overview-address {
            width: 45%;
            flex: 1;
            justify-content: flex-start;
            box-sizing: border-box;
        }
        .overview-main .overview-power {
            flex: 1;
            width: 45%;
            box-sizing: border-box;
            margin-left: 20px;
        }
        .overview-growth {
            width: calc(100%- 40px);
            margin-top: 16px;
        }
    }
</style>
