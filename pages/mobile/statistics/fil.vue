<template>
  <div class="fil">
    <cm-nav-title title="FIL" class="border-btm"></cm-nav-title>
    <cm-fil-trend class="trend"></cm-fil-trend>
    <cm-nav-title title="FIL Allocation" class="border-btm"></cm-nav-title>
    <div class="fil-region">
      <cm-fil-region class="region"></cm-fil-region>
    </div>
    <div class="fil-table">
      <div class="table-btm table-panel">
        <div class="table">
          <div class="item" v-for="(item, index) in sourceLabel" :key="index">
            <div class="label">{{ item.label }}</div>
						<div class="value">{{ item.value }} {{ index > 0 ? 'FIL' : '' }}</div>
<!--            <div class="value" v-if="Array.isArray(item.value)">-->
<!--              <div class="fil">{{ item.value[0] || "" }}</div>-->
<!--              <div class="money">{{ item.value[1] || "" }}</div>-->
<!--            </div>-->
<!--            <div class="value" v-else>-->
<!--              {{ item.value }} {{ item.unit ? item.unit : "" }}-->
<!--            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "fil",
  layout: "mlayout",
  data(vm) {
    return {
			sourceLabel: vm.$t('statistics.fil.sourceLabel'),
      sourceLabel2: [
        { label: "Allocation", value: "Value" },
        { label: "FIL BASE", value: "2,000,000,000 FIL" },
        { label: "Mining Reserve", value: "300,000,000 FIL" },
        { label: "Storage Mining Allocation", value: "1,100,000,000 FIL" },
        { label: "Fundraising - SAFT 2017", value: "150,000,000 FIL" },
        { label: "Fundraising - Remainder", value: "50,000,000 FIL" },
        { label: "Protocol Labs", value: "210,000,000 FIL" },
        { label: "PL Team &amp; Contributors", value: "90,000,000 FIL" }
      ]
    }
  }
}
</script>
<style lang="scss">
.fil {
  background-color: #f8f8f8;
  .trend {
    background-color: var(--white);
    margin-bottom: 20px;
  }
  .border-btm {
    background-color: var(--white);
    border-bottom: 1px solid var(--border-line);
  }
  .fil-region {
    padding: 20px;
    background-color: var(--white);
    .region {
      border: 1px solid var(--border-line);
      background-color: var(--white);
      height: 500px;
    }
  }
  .fil-table {
    background-color: var(--white);
    padding: 20px;
    margin-bottom: 20px;
    .table-btm {
      border: 1px solid var(--border-line);
      .item {
        min-height: 117px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid var(--border-line);
        .label {
					font-size: 22px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50%;
          padding: 20px 10px;
					white-space: normal;
        }
        .value {
					font-size: 22px;
          //text-align: center;
          //width: 50%;
          //padding: 20px 0;
					display: flex;
					justify-content: center;
					align-items: center;
					width: 50%;
					padding: 20px 10px;
					white-space: normal;
          border-left: 1px solid var(--border-line);
          .money {
            padding: 10px 0;
            color: #666666;
          }
        }
      }
      .item:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
