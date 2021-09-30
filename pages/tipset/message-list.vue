<template>
  <div class="message-list-con bottom-10 content-bg-color">
    <co-nav-title :title="$t('component.mesList.heading')" />
    <message-list :withType="false" showExtra />
  </div>
</template>
<script>
export default {
  name: "MessageListCon",
  head() {
    return {
      title: this.$t("header.seo.message")
    }
  }
}
</script>
<style lang="scss" scoped>
.message-list-con {
  overflow: hidden;
  padding: 0 20px 20px 20px;
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
