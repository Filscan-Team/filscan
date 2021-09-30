<template>
  <div class="theme">
    <span
      :class="[iconClass, 'theme-switch']"
      @click="handleThemeChange"
    ></span>
  </div>
</template>
<script>
import { mapMutations } from "vuex"
export default {
  name: "ThemeSwitch",
  methods: {
    ...mapMutations("app", ["setTheme"]),
    handleThemeChange() {
      let theme
      switch (this.theme) {
        case "dark":
          theme = "light"
          break
        case "light":
          theme = "dark"
          break
        default:
          theme = "dark"
          break
      }
      this.setTheme(theme)
      localStorage.setItem("filscanTheme", theme)
      document.cookie = "theme=" + theme
      this.$router.go(0)
    }
  },
  computed: {
    iconClass() {
      return this.theme === "dark" ? "el-icon-sunny" : "el-icon-moon"
    }
  },
  mounted() {
    if (localStorage.getItem("filscanTheme")) {
      const theme = localStorage.getItem("filscanTheme")
      this.setTheme(theme)
      // document.documentElement.setAttribute("theme", theme)
    }
  }
}
</script>
<style lang="scss" scoped>
.theme {
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.theme-switch {
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 20px;
    margin-left: 5px;
  }
}
</style>
