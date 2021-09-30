<template>
  <div class="poolRanking">
    <cm-heading url="ranking@2x" :title="$t('home.subtitle.pool')"></cm-heading>
    <pool-table :miners="miners" :legendSelect="legendSelect" />
    <div class="bg-board bottom-10 see-more">
      <div class="divider left-20 right-20"></div>
      <view-more name="mobile-mining" />
    </div>
  </div>
</template>

<script>
import Heading from "../../heading/src/index"
import poolTable from "./poolTable"
import ViewMore from "../../viewMore/src/index"
export default {
  name: "CmPoolRanking",
  components: {
    Heading,
    poolTable,
    ViewMore
  },
  data() {
    return {
      miners: [],
      legendSelect: false
    }
  }
}
</script>

<style lang="scss">
.poolRanking {
  display: flex;
  flex-direction: column;
  .see-more {
    padding: 20px 0;
  }
}
</style>
