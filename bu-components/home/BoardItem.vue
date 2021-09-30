<template>
  <div class="board-item">
    <div>
      {{ $t(`${prefix}.${index}.label`) }}
      <el-popover
        placement="bottom-start"
        width="200"
        trigger="hover"
        :content="$t(`${prefix}.${index}.tips`)"
        v-if="!isMobile && $t(`${prefix}.${index}.tips`)"
      >
        <i
          class="el-icon-warning-outline"
          slot="reference"
          style="margin-left:3px"
        ></i>
      </el-popover>
    </div>
    <div>{{ `${value || ""} ${value && unit}` }}</div>
  </div>
</template>
<script>
export default {
  name: "BoardItem",
  props: {
    index: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    unit: {
      type: String,
      default: ""
    },
    prefix: {
      type: String,
      default: "home.board"
    }
  }
}
</script>
<style lang="scss" scoped>
.board-item {
  height: 120px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0px 1px 7px 9px rgba(0, 0, 0, 0.03);
  flex: 1;
  background: var(--board-bg-color);
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  div {
    height: 30px;
    line-height: 30px;
    color: #999;
    text-align: center;
    color: var(--text-gray-color);
  }
  div:last-child {
    font-size: 24px;
    color: var(--total-board-bottom-color);
  }
  div:first-child {
    margin-bottom: 5px;
    font-weight: bold;
    span {
      position: relative;
      i {
        position: absolute;
        top: 4px;
        font-size: 12px;
      }
    }
  }
}
@media (max-width: 768px) {
  .board-item {
    flex: 1;
    height: 50px;
    min-width: 45%;
    margin-bottom: 10px;
    box-sizing: border-box;
    margin-right: 0;
    div {
      height: 16px;
      line-height: 16px !important;
      color: var(--total-board-bottom-color) !important;
      font-size: 10px;
      &:first-child {
        color: var(--text-gray-color) !important;
      }
      &:last-child {
        font-size: 12px;
      }
    }
  }
}
</style>
