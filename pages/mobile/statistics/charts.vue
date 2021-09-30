<template>
  <div class="charts">
    <!-- <cm-nav-title :title="tr('title')"></cm-nav-title> -->
    <cm-nav-title :title="tr('title')" class="border-btm"></cm-nav-title>
    <cm-card>
      <div slot="header" class="clearfix">
        <div class="title">
          <div class="heading">{{$t('home.chart.region.title')}}</div>
        </div>
      </div>
      <cm-fil-region class="region"></cm-fil-region>
    </cm-card>
    <cm-charts-trend />
  </div>
</template>
<script>
export default {
  name: "charts",
  layout: "mlayout",
  data() {
    return {
      prefix: "statistics.charts"
    }
  }
}
</script>
<style lang="scss">
.charts {
  .region {
    height: 420px;
    padding: 20px;
  }
}
</style>
