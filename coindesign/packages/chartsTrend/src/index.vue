<template>
  <div class="ChartsTrend">
    <!--        <pledge-trend/>-->
    <block-reward />
    <active-miner />
    <message-trend />
  </div>
</template>
<script>
// import PledgeTrend from "./charts/pledgeTrend"
import BlockReward from "./charts/blockReward"
import ActiveMiner from "./charts/activeMiner"
import MessageTrend from "./charts/messageTrend"
export default {
  name: "CoChartsTrend",
  components: {
    // PledgeTrend,
    BlockReward,
    ActiveMiner,
    MessageTrend
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss">
.ChartsTrend {
}
</style>
