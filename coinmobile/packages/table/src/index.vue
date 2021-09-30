<template>
  <div class="table">
    <div class="item" v-for="(i, idx) in dataSource" :key="idx">
      <div v-for="(j, index) in i" :key="index">
        <div class="label">{{ $t("message.detail.transfer")[index] }}:</div>
        <div class="value">{{ j }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CmTable",
  props: {
    dataSource: {
      type: Array,
      default() {
        return []
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
    }
  },
  computed: {
    realList() {
      return this.labels.map((item, index) => {
        return {
          ...this.dataList[index],
          title: item
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  background-color: var(--white);
  margin-top: 30px;
  .item {
    width: 100%;
    border-bottom: 1px dashed var(--border-line);
    background-color: var(--white);
    & ::v-deep * {
      word-break: break-all;
    }
    & > div {
      display: flex;
      flex-direction: row;
      padding: 10px 20px;
      width: 100%;
      font-size: 24px;
      box-sizing: border-box;
      height: auto;
      .label {
        min-width: 120px;
        line-height: 33px;
        box-sizing: border-box;
      }
      .value {
        white-space: break-spaces;
        display: flex;
        flex: 1;
        justify-content: flex-end;
        align-self: center;
        margin: 0;
        text-align: right;
        word-break: break-all;
        height: auto;
        line-height: 33px;
        span {
          line-height: 3px;
          height: auto;
          word-break: break-all;
        }
      }
    }
  }
  .item:last-child {
    padding-bottom: 20px;
  }
  div:last-child {
    border-bottom: 0px dashed #153350;
  }
}
</style>
