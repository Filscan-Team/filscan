<template>
  <div class="fil">
    <!-- <co-nav-title title="FIL" class="border-btm"></co-nav-title> -->
<!--    <co-fil-trend class="trend"></co-fil-trend>-->
    <!-- <co-nav-title title="FIL Allocation" class="border-btm"></co-nav-title> -->
    <co-card class="font-16 font-500" style="margin: 0; padding:0; margin-bottom:-10px;" :isPaddingBorderBottom="true">
      <div slot="header" class="clearfix">
        <div class="title">
          <div class="heading heading-title">{{ tr('trend2') }}</div>
        </div>
      </div>
    </co-card>
    <div class="fil-region">
      <co-allocation-region class="region"></co-allocation-region>
    </div>
    <div class="fil-table">
      <div class="table-btm table-panel">
        <div class="table">
          <div class="item" v-for="(item, index) in sourceLabel" :key="index">
            <div class="label">{{ item.label }}</div>
            <div class="value">{{ item.value }} {{ index > 0 ? 'FIL' : '' }}</div>
            <!--                        <div class="released">{{item.Released}} {{index>0?"FIL":""}}</div>-->
            <div class="description">{{ item.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'fil',
  head() {
    return {
      title: this.$t('header.seo.fil')
    }
  },
  data(vm) {
    return {
      prefix: 'statistics.fil',
      sourceLabel: vm.$t('statistics.fil.sourceLabel')
    }
  }
}
</script>
<style lang="scss">
  .heading-title{
    font-size: var(--font-18);
  }
.fil {
  background-color: var(--content-bg-color);
  padding: 5px 20px 0;
  .trend {
    background-color: var(--content-bg-color);
    //margin: 20px 0;
  }
  .border-btm {
    border-bottom: 1px solid var(--border-line);
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  .fil-region {
    padding-top: 20px;
    background-color: var(--content-bg-color);
    .region {
      padding: 20px 0;
      border: 1px solid var(--border-line);
      background-color: var(--content-bg-color);
      height: 235px;
    }
  }
  .fil-table {
    background-color: var(--content-bg-color);
    padding: 20px 0;
    margin-bottom: 20px;
    .table-btm {
      border: 1px solid var(--border-line);
      .item {
        min-height: 30px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid var(--border-line);
        font-size: var(--font-16);
        div {
          padding: 10px 15px;
        }
        .label {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20%;
          white-space: normal;
        }
        .value {
          text-align: center;
          width: 20%;
          border-left: 1px solid var(--border-line);
          .money {
            padding: 10px 0;
            color: #666666;
          }
        }
        .released {
          text-align: center;
          width: 20%;
          border-left: 1px solid var(--border-line);
        }
        .description {
          width: 80%;
          border-left: 1px solid var(--border-line);
          white-space: normal;
          word-break: break-all;
          word-wrap: break-word;
        }
      }
      .item:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
