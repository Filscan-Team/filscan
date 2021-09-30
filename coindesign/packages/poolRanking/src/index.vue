<template>
  <div class="poolRanking">
    <co-card>
      <div slot="header" class="clearfix pool-heading">
        <co-heading url="ranking@2x" :title="$t('home.subtitle.pool')" style="padding: 0"></co-heading>
        <el-popover placement="bottom-start" trigger="hover" :content="$t('home.subtitle.poolTips')">
          <i class="el-icon-warning-outline" slot="reference" style="margin-left:3px"></i>
        </el-popover>
      </div>
      <pool-table :miners="miners" :legendSelect="legendSelect" />
      <div class="see-more">
        <div class="divider left-20 right-20"></div>
        <co-view-more name="mining" />
      </div>
    </co-card>
  </div>
</template>

<script>
import Heading from '../../heading/src/index'
import poolTable from './poolTable'
export default {
  name: 'CoPoolRanking',
  components: {
    Heading,
    poolTable
  },
  data() {
    return {
      miners: [],
      legendSelect: false
    }
  }
}
</script>

<style lang="scss" scoped>
.poolRanking {
  display: flex;
  flex-direction: column;
  margin-right: 16px;
  .see-more {
    padding: 10px 0;
  }
  .co-card {
    margin: 0 !important;
  }
  & ::v-deep .pool-heading {
    display: flex;
    flex-direction: row;
    .co-heading {
      .co-title {
        min-width: 60px !important;
      }
    }
  }
}
</style>
