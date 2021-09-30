<template>
  <div class="power">
    <cm-nav-title :title="$t('home.chart.power.title')"></cm-nav-title>
    <power-trend />
    <!--全网算力-->
  </div>
</template>
<script>
import PowerTrend from "@/coinmobile/packages/homeChart/src/chart/powerTrend"
export default {
  name: "power",
  layout: "mlayout",
  components: {
    PowerTrend
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss"></style>
