<template>
  <div class="tipset-item border-outline">
    <div class="tipset-header border-btm">
      <div class="tipset-header-item"> {{ firstLabel }}</div>
      <div v-for="(item, index) in centerLabel" :key="index" class="th">{{ item }}</div>
      <div class="tipset-header-item"> {{ lastLabel }}</div>
    </div>
    <div class="tipset-body">
      <div class="height">
        <div class="flex align-center">
          <co-link
              target="tipset/chain"
              :param="{ key: 'height', value: tipset.height }"
              :label="tipset.height"
          ></co-link>
        </div>
      </div>
      <div class="item">
        <div v-for="block in tipset.blocks" :key="block.cid" class="block-item">
          <div
              v-for="column in columnsWithLabel"
              :key="column.label"
              :class="[column.key, column.class || '']"
          >
            <co-link
                :target="column.target"
                :param="{
              key: column.paramKey || column.key,
              value: block[column.key]
            }"
                :label="ellipsisByLength(block[column.key], 8)"
                v-if="column.isLink"
            ></co-link>
            <co-tag-miner v-else-if="column.key==='tag'" :name="block['tag']" />
            <span v-else class="font-300 value">
            {{ block[column.key] }}
            <i v-if="column.unit">{{ column.unit }}</i>
          </span>
          </div>
        </div>
      </div>
      <div class="times">
        <div class="font-300">{{ tipset.time }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TipsetItem",
  props: {
    tipset: {
      type: Object,
      default() {
        return {}
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    labels: {
      type: Array,
      default() {
        return []
      }
    },
    prefix: {
      type: String,
      default: "home.latest.block"
    },
    showTimeLabel: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    columnsWithLabel() {
      return this.columns.map((item, index) => {
        return {
          ...item,
          label: this.labels[index]
        }
      })
    },
    firstLabel() {
      return this.labels[0];
    },
    lastLabel() {
      return this.labels[this.labels.length - 1];
    },
    centerLabel() {
      // eslint-disable-next-line no-unused-vars
      return this.labels.filter((value, index, array) => {
        return index != 0 && index != 6;
      });
    }
  }
}
</script>
<style lang="scss" scoped>

.tipset-item {

  color: var(--main-text-color);
  border-radius: 4px;
  margin-top: 12px;
  font-size: 16px;

  .tipset-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    //justify-content: space-around;
    .th {
      //padding: 15px 20px;
      padding: 15px 0px !important;
      display: flex;
      flex: 1;
      justify-content: center;
    }
  }

  .tipset-header-item {
    display: flex;
    width: 160px;
    justify-content: center;
    align-items: center;
    height: auto;
    padding: 0 0px !important;
  }

  .tipset-body {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 12px 0px !important;

    .item {
      display: flex;
      flex-direction: column;
      height: auto;
      flex: 1;
      //width: 100%;
      .block-item {
        //height: 40px;
        padding: 8px 0px !important;
        display: flex;
        width: 100%;
        flex-direction: row;


        & > div {
          display: flex;
          flex-direction: row;
          flex: 1;
          max-width: 1000px !important;
        }

        .miner {
          width: 280px;
        }

        &:last-child {
          border: none;
        }
      }
    }

    & > div {
      display: flex;
      height: 62px;
      align-items: center;
      font-size: 16px;
    }

    .height, .times {
      width: 160px;
      justify-content: center;
      padding: 0 0px !important;
      height: auto;
    }
  }

  .label {
    font-weight: 500;
    //margin-right: 10px;
  }

  .value {
    color: var(--main-text-color);
  }

  & ::v-deep .el-link--inner {
    font-weight: 400;
    display: inline-block;
    height: 24px;
    line-height: 24px;
  }
}

@media (max-width: 768px) {
  .tipset-item {
    padding: 0;

    .height {
      height: 9.333vw;
      font-size: 2.933vw;
    }

    .block-item {
      display: flex;
      flex-wrap: wrap;
      height: 14.667vw;
      padding: 0 2.667vw;
    }

    & ::v-deep .el-link--inner {
      height: 2.667vw;
      line-height: 2.667vw;
    }
  }
}
</style>
