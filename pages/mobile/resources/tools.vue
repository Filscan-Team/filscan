<template>
  <div class="cm-resources">
    <div class="links-con">
      <div
        v-for="link in $t('footer.links')"
        :key="link.title"
        class="link-item"
      >
        <div class="link-title bottom-20">{{ link.title }}</div>
        <div class="link-labels">
          <div v-for="item in link.items" :key="item.label" class="bottom-10">
            <div v-if="!item.popover" class="link-label">
              <!--                              <span-->
              <!--                                      class="iconfont"-->
              <!--                                      :class="{ [item.class]: true }"-->
              <!--                                      v-if="item.class"-->
              <!--                              ></span>-->
              <a :href="item.href" target="_blank">{{ item.label }}</a>
            </div>
            <el-popover
              placement="top"
              v-else
              trigger="hover"
              popper-class="qr-code"
            >
              <div :class="item.qrClass"></div>
              <div slot="reference" class="link-label">
                <span
                  class="iconfont"
                  :class="{ [item.class]: true }"
                  v-if="item.class"
                ></span>
                <span>{{ item.label }}</span>
              </div>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tools',
  layout: 'mlayout'
}
</script>
<style lang="scss">
.cm-resources {
  background-color: var(--border-line);
  .links-con {
    display: flex;
    flex-direction: column;
    background-color: var(--main-bg-color);
    & > div {
      background-color: var(--white);
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
      .link-title {
        padding: 20px 20px 24px 20px;
        line-height: 33px;
        font-size: 22px;
        border-bottom: 1px solid var(--border-line);
      }
      .link-labels {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .link-label {
          font-size: 20px;
          width: 375px;
          color: var(--main-text-color);
          display: flex;
          align-items: center;
          padding: 15px 0;
          text-align: center;
          justify-content: center;
          a {
            font-size: 24px;
            color: var(--text-gray-color);
            cursor: pointer;
          }
          & > span:first-child {
            font-size: 22px;
          }
        }
      }
      span {
        font-size: 22px;
      }
    }
    & > div:nth-child(1) {
      a {
        margin-left: 10px;
      }
    }
  }
}
.el-popover {
  .qr {
    width: 160px;
    height: 160px;
    background: url('../../../assets/qr.jpg');
    background-size: 100% 100%;
  }
  .qr-ipfs {
    width: 160px;
    height: 160px;
    background: url('../../../assets/ipfs.png');
    background-size: 100% 100%;
  }
}
</style>
