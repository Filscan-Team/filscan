<template>
  <div class="cm-no-result">
    <div  class="res">{{ $t("noResult.res") }}</div>
    <div class="info">
      <div class="key">
        {{ $t("noResult.key") }}
        <span>{{ $route.query.key }}</span>
      </div>
      <div>{{ $t("noResult.invalid") }}</div>
      <el-button round type="primary" class="back" @click="nuxtTo('/')">{{
        $t("noResult.back")
        }}</el-button>
    </div>
    <img src="@/assets/image/no-result.png" alt="" />
  </div>

</template>

<script>
export default {
  name: "cm-no-result",
  layout: 'mlayout'
}
</script>

<style lang="scss" scoped>
  .cm-no-result {
    padding: 100px;
    height: auto;
    display: flex;
    .info {
      width: 60%;
      div {
        margin-bottom: 30px;
        color: #999;
        font-size: 20px;
        span {
          color: #333;
          font-size: 30px;
          margin-left: 10px;
        }
      }
      div.res {
        color: var(--force-mark-color);
        font-size: 60px;
        margin-bottom: 50px;
      }
      .key {
        word-break: break-all;
        color: var(--main-text-color);
        span {
          color: var(--main-text-color);
        }
      }
      .key + div {
        color: var(--main-text-color);
      }
    }

    & ::v-deep .back.el-button {
      width: 300px;
      height: 60px;
      border-radius: 4px !important;
      font-size: 16px;
      background: var(--force-mark-color);
      border-color: var(--force-mark-color);
      &:hover {
        background: var(--force-mark-color);
        border-color: var(--force-mark-color);
        filter: brightness(1.2);
      }
    }
    img {
      max-height: 600px;
    }
    @media (max-width: 768px) {
      flex-direction: column;
      .info {
        order: 2;
        padding: 0 5vw;
        width: 100%;
        text-align: center;
        box-sizing: border-box;
        div,
        span {
          font-size: 12px !important;
        }
      }
      img {
        order: 1;
        width: 50vw;
        max-height: 62vw;
        margin: 100px auto;
      }
      & ::v-deep .back.el-button {
        width: 36.4vw;
        height: 8vw;
        border-radius: 4vw;
        box-shadow: 0px 2px 4px 0px var(--force-mark-color);
        margin-top: 6vw;
        font-size: 12px;
      }
      .res {
        text-align: center;
        font-weight: bold;
        color: var(--force-mark-color);
      }
    }
  }

</style>
