import device from "~/middleware/device";

const publicPa = process.env.NODE_ENV
const environment = process.env.environment
const ossAddress = {
  dev: "http://localhost:3000/",
  production: "", // 阿里云oss地址
}

let publicUrl = ossAddress['production']
if(publicPa && publicPa === 'production' && environment){
  publicUrl = ossAddress[environment]
}
const Timestamp = new Date().getTime()
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Filscan--Filecoin区块链浏览器",
    htmlAttrs: {
      lang: "en"
      // theme: 'dark'
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0, minimum-scale=1,user-scalable=no"
      },
      {
        name: "keywords",
        content:
          "Filecoin官方区块浏览器,Filecoin官方浏览器, Filscan,Filecoin,最新区块,Filecoin Explorer,FIL,IPFS，FIL,Filecoin区块链查询浏览器,FIL浏览器,Filecoin浏览器,Filecoin区块查询,区块链搜索引擎,区块高度,区块链交易"
      },
      {
        name: "description",
        content:
          "Filscan区块浏览器是Filecoin生态基础工具，提供实时链上相关数据。集查询Filecoin区块、交易、FIL代币、钱包等信息的网站，实时同步更新Filecoin所有节点信息。"
      },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      ],
    script: [
      { src: "https://hm.baidu.com/hm.js?db68ddd1d28effdabb6dfc9f07258667" },
      { src: "https://forcepool-file.oss-cn-hangzhou.aliyuncs.com/cdn/amfe-flexible.js" }
    ],
    server: {
      host: "0.0.0.0",
      port: 3003
    }
  },
  env: {
    VUE_APP_BASE_URL: process.env.VUE_APP_BASE_URL,
    NODE_ENV: process.env.NODE_ENV
  },
  css: [
    "element-ui/lib/theme-chalk/index.css",
    "@/assets/style/themes.css",
    "@/assets/style/iconfont.css",
    { src: "@/assets/style/main.scss", lang: "scss" }
  ],
  axios: {
    proxy: true
  },
  proxy: {
    "/rpc": {
      target: "http://192.168.1.185:8889/rpc/v1"
    }
  },
  router: {
    middleware: ["auth", "device"]
  },
  plugins: [
    "@/plugins/i18n",
    { src: "@/plugins/bus-inject", ssr: false},  // 大巴车
    { src: "@/plugins/elTableInfiniteScroll", ssr: false },  // 表格滚动
    "@/plugins/main", // 主要插件
    { src: "@/plugins/leecharts", ssr: false },
    { src: "@/plugins/vuex-persist.js", ssr: false },
    { src: '@/plugins/store.js', ssr: false },  // vuex的永久存储
    { src: "@/directives/scroll", ssr: false },
  ],
  loaders: {
    scss: {
      data: `@import "@/assets/style/main.scss";`
    }
  },
  components: true,
  buildModules: ["@nuxt/typescript-build"],
  build: {
    transpile: [
      "element-ui",
      "d3",
      "leecharts",
      "axios",
      "echarts",
      "vuex-persist",
      "vue-clipboard2",
      "el-table-infinite-scroll",
      "installComponents"
    ],
    vendor: ["vue-i18n"],
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    },
    publicPath: publicUrl,
    postcss: {
      plugins: {
        "postcss-pxtorem": {
          rootValue: 75,
          rootValuePC: 192,
          propList: ["*"]
        }
      },
      preset: {
        autoprefixer: true
      }
    },
    extend(config) {
      config.output.filename = `js/[name].${Timestamp}.js` // 每次构建打包时给文件名加上时间戳，保证版本更新时与上版本文件名不一样
      config.output.chunkFilename = `js/[name].${Timestamp}.js`
    }
  }
}
