<template>
  <div class="cm-heading">
    <img :src="imgUrl" class="cm-logo" />
    <div class="cm-title">{{ title }}</div>
    <slot />
  </div>
</template>
<script>
export default {
  name: "CmHeading",
  data() {
    return {
      imgUrl: require("@/assets/image/mobile/" + this.url + ".png")
    }
  },
  props: {
    url: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  }
}
</script>
<style lang="scss">
.cm-heading {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 30px;
  height: 33px;
  background-color: var(--white);
  .cm-logo {
    display: flex;
    height: 24px;
    width: 24px;
  }
  .cm-title {
    height: 33px;
    line-height: 33px;
    font-size: 24px;
    font-weight: 400;
    margin-left: 12px;
    min-width: 504px;
  }
}
</style>
