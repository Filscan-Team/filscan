<template>
  <div id="app" class="ignore" :theme="theme">
    <cm-header />
    <div class="mobile-content-container">
      <Nuxt v-if="isRouterActive" />
    </div>
    <cm-footer />
  </div>
</template>
<script>
import { mapMutations } from "vuex"
export default {
  data() {
    return {
      themes: "",
      isRouterActive: true
    }
  },
  provide() {
    const end_time = Math.floor(new Date().getTime() / 1000)
    return {
      time: {
        start_time: end_time - 86400,
        end_time: end_time
      },
      reload: this.reload
    }
  },
  mounted() {
    localStorage.clear()
    let theme = "light"
    this.setTheme(theme)
    this.set_lang('zh')
    localStorage.setItem("filscanTheme", theme)
  },
  methods: {
    ...mapMutations("app", ["setRate", "setTheme", 'set_lang']),
    reload() {
      this.isRouterActive = false
      this.$nextTick(() => {
        this.isRouterActive = true
      })
    }
  }
}
</script>
<style lang="scss">
#nprogress .bar {
  background: #2090ff !important;
}
body {
  margin: 0;
}
#app {
  width: 100%;
}
html,
body,
#app {
  height: 100%;
  background: var(--main-bg-color);
  font-size: 14px;
  font-family: PingFang SC;
  color: var(--main-text-color);
  white-space: nowrap;
}
#app.ignore {
  min-width: 1200px;
}
.mobile-content-container {
  margin-top: 80px;
  padding: 140px 0 20px;
  background: var(--white);
  font-size: 16px;
  min-height: calc(100vh - 740px);
}
a {
  text-decoration: none;
  color: var(--link-color);
}
.el-loading-spinner {
  top: 30%;
}
.el-loading-spinner .path {
  stroke: #ff9c00;
}
.el-loading-spinner .circular {
  width: 120px;
  height: 113px;
  color: #ff9c00;
}
</style>
