<template>
  <div class="header-search flex align-center">
    <div class="filters pointer text-center">
      {{ $t("header.filter")[filter].label }}
      <span class="el-icon-arrow-down"></span>
      <div class="filter-list">
        <div
          v-for="(fil, index) in $t('header.filter')"
          :key="fil.label"
          @click="filter = index"
          class="filter-item"
        >
          {{ fil.label }}
        </div>
      </div>
    </div>
    <el-input
      :placeholder="$t('header.placeholder')"
      v-model="key"
      :class="['input-with-select', theme === 'light' ? 'light' : 'dark']"
      @keyup.native="handleSearch"
      :suffix-icon="loading && !isMobile ? 'el-icon-loading' : ''"
      :clearable="!isMobile"
    ></el-input>
    <div class="search-icon">
      <span class="iconfont icon-sousuo" @click="handleSearch"></span>
    </div>
  </div>
</template>
<script>
import mixin from "./searchMixin.js"
export default {
  name: "Search",
  data() {
    return {
      filter: 0,
      key: "",
      loading: false
    }
  },
  mixins: [mixin]
}
</script>
<style lang="scss" scoped>
.header-search {
  border: 1px solid var(--border-line);
  border-radius: 5px;
  flex: 1;
  .filters {
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 12px;
    position: relative;
    background: var(--content-bg-color);
    height: 36px;
    line-height: 36px;
    border-radius: 5px 0 0 5px;
    width: 170px;
    color: var(--search-text-color);

    &::after {
      position: absolute;
      content: "";
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 20px;
      //background: #0d1f2f;
      background: var(--border-line);
      opacity: 0.6;
    }
    &:hover .filter-list {
      display: block;
    }
    .filter-list {
      display: none;
      position: absolute;
      background: var(--content-bg-color);
      box-shadow: 0px 2px 4px 0px var(--main-bg-color);
      width: 100%;
      left: 50%;
      top: 100%;
      transform: translateX(-50%);
      text-align: center;
      .filter-item:hover {
        color: var(--force-mark-color);
      }
    }
  }
  & ::v-deep .el-input {
    flex: 1;
    input {
      height: 36px !important;
      background: var(--content-bg-color) !important;
      padding: 0 !important;
      padding-left: 40px !important;
      padding-right: 28px !important;
      border: none !important;
      border-radius: 0 !important;
      color: var(--main-text-color) !important;
      font-size: 12px;
    }
  }
  .search-icon {
    width: 30px;
    height: 36px;
    background: var(--content-bg-color);
    border-radius: 0 5px 5px 0;
    line-height: 36px;
    text-align: right;
    padding-right: 30px;
    color: var(--search-text-color);
  }
  @media (max-width: 768px) {
    & ::v-deep .el-input__prefix {
      top: 12px !important;
      left: 10px !important;
    }
    & ::v-deep .el-input__suffix {
      top: 12px !important;
      right: 15px !important;
      i {
        font-size: 12px;
        line-height: 10px !important;
      }
    }

    // &::v-deep .el-input input{
    //   font-size: 10px!important
    // }
    & ::v-deep input {
      height: 30px !important;
      border-radius: 4px !important;
      background: var(--board-bg-color) !important;
      border: none !important;
      margin-bottom: 10px;
      padding-left: 10px !important;
      font-size: 10px !important;
    }
    & ::v-deep .el-select {
      width: 100px;
    }
    & ::v-deep .el-input__suffix {
      i {
        line-height: 20px;
        padding-left: 5px;
        &.is-reverse {
          padding-right: 10px;
        }
      }
    }
    & ::v-deep button {
      width: 50px !important;
    }
  }
}
</style>
