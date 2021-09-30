<template>
  <div class="chart-container flex">
    <miner-balance />
    <miner-power />
  </div>
</template>
<script>
import MinerBalance from './MinerBalance'
import MinerPower from './MinerPower'
export default {
  name: 'ChartContainer',
  components: {
    MinerBalance,
    MinerPower
  }
}
</script>
<style lang="scss" scoped>
.chart-container {
  margin-top: 16px;
  justify-content: space-between;
  & > div {
    flex: 1;
    min-height: 386px;
    &:not(:last-child) {
      margin-right: 16px;
    }
  }
}
</style>
