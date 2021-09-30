<template>
  <div class="chart-con bg-board radius flex bottom-10 jus-between">
    <cm-heading url="chartbackup" :title="$t('home.subtitle.charts')">
      <div class="moreChart" @click="ChangeTo">
        {{ $t("home.subtitle.moreChart") }}
      </div>
    </cm-heading>
    <power-chart />
    <!--全网算力-->
    <gas-trend />
    <!--出块数 & 赢票数及奖励-->
  </div>
</template>
<script>
import GasTrend from "./chart/gasTrend"
import PowerChart from "./chart/powerTrend"
export default {
  name: "CmHomeChart",
  components: {
    GasTrend,
    PowerChart
  },
  props: ["total"],
  methods: {
    ChangeTo() {
      this.$router.push("/mobile/statistics/charts")
    }
  }
}
</script>
<style lang="scss" scoped>
.chart-con {
  display: flex;
  flex-direction: column;
  & > div:nth-child(2),
  & > div:nth-child(3) {
    background: var(--content-bg-color);
    // height: 350px;
    // margin-right: 15px;
    border-radius: 4px;
    &:last-child {
      margin-right: 0;
    }
  }
  cm-heading {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  & > div > div.moreChart {
    width: 160px;
    height: 45px;
    line-height: 45px;
    background: #f8f8f8;
    border: 1px solid #cecece;
    border-radius: 24px;
    margin-top: -6px;
    text-align: center;
		font-size: 20px;
  }
}
</style>
