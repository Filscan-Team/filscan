<template>
  <div class="transferRanking">
    <co-card>
      <div slot="header" class="clearfix">
        <co-heading url="transfer@2x" :title="$t('home.subtitle.transfer')" style="padding: 0"></co-heading>
      </div>
      <transfer-table />
    </co-card>
  </div>
</template>

<script>
import Heading from '../../heading/src/index'
import ViewMore from '../../viewMore/src/index'
import TransferTable from './transferTable'
export default {
  name: 'CoTransferRanking',
  components: {
    Heading,
    ViewMore,
    TransferTable
  },
  props: {
    interval: {
      type: String,
      default: ''
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
  margin: 0 !important;
  .co-card {
    margin: 0 !important;
  }
}
</style>
