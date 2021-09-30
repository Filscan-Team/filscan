import "./element-setup"
import "./coindesign"
import "./coinmobile"
import Vue from "vue"
const files = require.context(".", false, /.vue$/)
files.keys().forEach(item => {
  const mod = files(item).default
  Vue.component(mod.name, mod)
})
