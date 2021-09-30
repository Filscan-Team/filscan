<template>
  <div class="message-list-con content-bg-color">
    <co-nav-title :title="$t('component.mesList.poolheading')" />
    <message-list :withType="false" showExtra />
  </div>
</template>
<script>
export default {
  name: "PoolMessageList",
  head(){
    return {
      title: this.$t('header.seo.pool'),
    }
  },
}
</script>
<style lang="scss" scoped>
.message-list-con {
  padding: 0 20px 20px 20px;
  overflow: hidden;
  @media (max-width: 768px) {
    padding: 0 !important;
    & ::v-deep .message-list {
      .total-number {
        margin-top: 0;
      }
    }
  }
}
</style>
