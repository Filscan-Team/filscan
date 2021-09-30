<template>
  <div class="charts-content">
    <!--    <div class="charts-title">-->
    <!--      <co-heading url="chartbackup@2x" :title="$t('home.subtitle.charts')"></co-heading>-->
    <!--      <div @click="morecharts" class="moreCharts">{{$t('home.charts.more')}}</div>-->
    <!--    </div>-->
    <div class="chart-con radius flex jus-between">
      <top-power />
      <!--全网算力-->
      <block-reward />
      <!--出块数 & 赢票数及奖励-->
    </div>
  </div>
</template>
<script>
import BlockReward from './block-reward'
import TopPower from './top-power'
export default {
  name: 'ChartContainner',
  components: {
    BlockReward,
    TopPower
  },
  props: ['total'],
  methods: {
    morecharts() {
      this.goTo('statistics-charts')
    }
  }
}
</script>
<style lang="scss" scoped>
.charts-content {
  box-sizing: border-box;
  .charts-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .moreCharts {
      margin: 20px 0;
      padding: 3px 15px;
      height: 17px;
      line-height: 17px;
      text-align: center;
      border: 1px solid var(--border-line);
      border-radius: 17px;
    }
  }
  .chart-con {
    display: flex;
    box-sizing: border-box;
    //height: 454px;
    & > div {
      flex: 1;
      //height: 454px;
      margin-right: 16px;
      border-radius: 4px;
      margin-bottom: 16px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
