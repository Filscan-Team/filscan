<template>
  <div class="resources">
    <div class="links-con">
      <div v-for="link in $t('footer.links')" :key="link.title" class="link-item">
        <div class="link-title">{{ link.title }}</div>
        <div class="link-labels">
          <div v-for="item in link.items" :key="item.label">
            <div v-if="!item.popover" class="link-label">
              <a :href="item.href" target="_blank">{{ item.label }}</a>
            </div>
            <el-popover placement="top" v-else trigger="hover" popper-class="qr-code">
              <div :class="item.qrClass"></div>
              <div slot="reference" class="link-label">
                <span class="iconfont" :class="{ [item.class]: true }" v-if="item.class"></span>
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
  name: 'Tools',
  head() {
    return {
      title: this.$t('header.seo.resource')
    }
  },
}
</script>
<style lang="scss">
.resources {
  margin-top: 20px;
  background-color: var(--content-bg-color);
  .links-con {
    padding: 0 20px 20px 20px;
    display: flex;
    flex-direction: column;
    & > div {
      background-color: var(--content-bg-color);
      display: flex;
      flex-direction: column;
      .link-title {
        padding: 20px 0 20px 0;
        line-height: 22px;
        font-size: var(--font-18);
      }
      .link-labels {
        padding: 8px 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        border: 1px solid var(--border-line);
        .link-label {
          width: 230px;
          color: var(--tag-name-color);
          display: flex;
          align-items: center;
          padding: 12px 0;
          text-align: center;
          justify-content: center;
          a {
            color: var(--tag-name-color);
            cursor: pointer;
          }
          & > span:first-child {
            font-size: 20px;
            padding-left: 20px;
          }
        }
      }
      span {
        font-size: var(--font-16);
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
    background: url('../../assets/qr.jpg');
    background-size: 100% 100%;
  }
  .qr-ipfs {
    width: 160px;
    height: 160px;
    background: url('../../assets/ipfs.png');
    background-size: 100% 100%;
  }
}
</style>
