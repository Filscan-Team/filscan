<template>
  <div class="transferRanking">
    <cm-heading
      url="transfer@2x"
      :title="$t('home.subtitle.transfer')"
    ></cm-heading>
    <transfer-table />
  </div>
</template>

<script>
import TransferTable from "./transferTable"
export default {
  name: "CmTransferRanking",
  components: {
    TransferTable
  },
  props: {
    interval: {
      type: String,
      default: ""
    },
    switchIndex: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="scss">
.transferRanking {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
</style>
