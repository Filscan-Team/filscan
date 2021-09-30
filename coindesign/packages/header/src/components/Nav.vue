<template>
  <div class="head-nav flex align-center">
    <div v-for="nav of $t('header.nav')" :key="nav.index" :class="{
      'bottom-stripe': currentIndex == nav.index,
      'hot-color': nav.hot,
      'pro-color': nav.pro
    }" class="nav-link pointer flex align-center" @click="handleClick(nav)">
      {{ nav.label }}
      <div class="down" v-if="nav.down"></div>
      <div class="children" v-if="nav.items">
        <div v-for="item in nav.items" :key="item.index" class="child-link pointer" @click.stop="handleClick(item)">
          {{ item.label }}
        </div>
      </div>
      <div class="new" v-if="nav.new"></div>
      <div class="pro" v-if="nav.pro"></div>
      <div class="hot" v-if="nav.hot"></div>
    </div>
  </div>
</template>
<script>
import mixin from '../mixin.js'
export default {
  name: 'Nav',
  data() {
    return {
      currentIndex: ''
    }
  },
  mixins: [mixin]
}
</script>
<style lang="scss" scoped>
.head-nav {
  height: 100%;
  padding-right: 80px;
  .nav-link {
    font-size: var(--font-16);
    margin-right: 30px;
    position: relative;
    height: 100%;
    font-weight: 400;
    &.bottom-stripe {
      color: var(--force-mark-color);
      font-size: var(--font-16);
      font-weight: 500;
      /*&::after {*/
      /*  bottom: 2px;*/
      /*}*/
    }
    &:last-child {
      margin-right: 0;
    }
    &.hot-color{
      color: #F44C30;
    }
    &.pro-color{
      color: var(--force-mark-color);
    }
    .down {
      height: 7px;
      width: 10px;
      background: var(--nav-down);
      background-size: 100% 100%;
      margin: 8px;
    }
    .children {
      display: none;
      position: absolute;
      left: 50%;
      top: 100%;
      transform: translateX(-50%);
      white-space: nowrap;
      background: var(--content-bg-color);
      box-shadow: 0px 2px 4px 0px var(--main-bg-color);
      padding: 0 20px;
      .child-link {
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: var(--main-text-color);
        font-size: var(--font-16);
        &:hover {
          color: var(--force-mark-color);
        }
      }
    }
    .new {
      width: 20px;
      height: var(--font-16);
      margin-left: 6px;
      margin-top: -8px;
      background: url('../../../../../assets/image/new.png');
      background-size: 100% 100%;
    }
    .hot{
      width: 31px;
      height: 15px;
      margin-left: 6px;
      background: url('../../../../../assets/image/hot@2x.png');
      background-size: 100% 100%;
    }
    .pro{
      width: 28px;
      height: 14px;
      margin-left: 6px;
      margin-top: -7px;
      background: url('../../../../../assets/image/pro@2x.png');
      background-size: 100% 100%;
    }
    &:hover {
      color: var(--force-mark-color);
      .children {
        display: block;
      }
    }
  }
}
</style>
