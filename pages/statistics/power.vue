<template>
  <div class="power">
    <!--        <co-nav-title title="基线与算力走势" style="padding-bottom: 20px"></co-nav-title>-->
    <co-power-trend />
    <!--全网算力-->
  </div>
</template>
<script>
export default {
  name: "power",
  head() {
    return {
      title: this.$t('header.seo.baseTrend')
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss">
.power {
  display: flex;
  flex-direction: column;
  padding: 5px 20px 20px;
  box-sizing: border-box;
  background-color: var(--content-bg-color);
}
</style>
