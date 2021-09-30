<template>
  <div class="charts-trend">
    <co-nav-title :title="tr('title')"></co-nav-title>
    <co-fil-region class="region"></co-fil-region>
    <co-charts-trend />
  </div>
</template>
<script>
export default {
  name: "charts",
  head() {
    return {
      title: this.$t('header.seo.stats')
    }
  },
  data() {
    return {
      prefix: "statistics.charts"
    }
  }
}
</script>
<style lang="scss">
.charts-trend {
  background-color: var(--content-bg-color);
  padding: 0 20px 20px 20px;
  .region {
    height: 312px;
    padding: 20px 0;
  }
}
</style>
