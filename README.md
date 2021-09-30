# Overview

Filscan(https://filscan.io/) is the first data browser in the Filecoin ecosystem and is dedicated to building the Filecoin network data analysis center, providing the Filecoin ecosystem data services, visualization and other one-stop data analysis for the whole network, and building a data intelligence platform for 3rd party ecosystem applications.

# Table of Contents
- [Overview](#overview)
- [Table of Contents](#table-of-contents)
    - Key Features of Filscan
    - Half year Plan
    - Get involved and Contribute
- [Front-End](#front-end)
    - [Install](#install)
        - [Environmental requirements](#environmental-requirements)
        - [Install Dependencies](#install-dependencies)
        - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
        - [API Environment Configuration](#api-environment-configuration)
        - [Build](#build)
        - [Lints and fixes files](#lints-and-fixes-files)
        - [Customize configuration](#customize-configuration)
- [Back-End](#back-end)
    - [Build and Install](#build-and-install)
        - [Environment](#environment)
        - [System Require](#system-require)
        - [Build](#build-1)
        - [Configuration](#configuration)
        - [Run](#run)
    - [API Document](#api-document)
    - [License](#license)


## Key Features of Filscan

•  Provide data applications based on various scenarios

![image](https://user-images.githubusercontent.com/86345705/129295935-15f398b2-fbe9-46fb-9d95-f6e8b5c7beb3.png)

• Provide real-time data display and API interface


![image](https://user-images.githubusercontent.com/86345705/129296005-298481b5-db14-4c79-b8c3-1e80ff7f1f61.png)

• Provide data visualization services to increase business management capabilities


![image](https://user-images.githubusercontent.com/86345705/129296094-c463333b-494c-47c7-a25a-9406eb8edcd8.png)

• Provide rich data analysis functions to drive business progress

![image](https://user-images.githubusercontent.com/86345705/129296192-7b9ae3b2-d576-44b8-b7f7-6a17b297ee42.png)

• Provide advanced services such as predictive data analysis and business evaluation

![image](https://user-images.githubusercontent.com/86345705/129296331-5e75e79e-2cc5-4533-a5df-a8b2605e414e.png)

• Monitoring panel to support multi-node data collection and monitoring

![image](https://user-images.githubusercontent.com/86345705/129296455-c5d02cab-27b4-4bf8-9803-67a99914cd25.png)

### Half year plan :(Next 6 months)

•  Upgrade the back-end architecture to improve the loading speed

•  Better UI display and more intuitive data display

•  Added order query about Filecoin real data

•  Added the isolated block statistics and query function

•  Set private Key to control API interfaces

•  Add address collection list, convenient to view address information faster

### Get involved and Contribute

As a Filecoin ecosystem open source project, Filscan is keen to welcome your feedback and suggestions.

Reach us@

Twitter: https://twitter.com/force_ipfs

Medium: https://ipfsforce-1751.medium.com/

Email: filscan@ipfsforce.com

# Front-End

## Install

### Environmental requirements

- required: Node.js(https://nodejs.org/en/)

- optional : Yarn (https://yarnpkg.com/)

### Install Dependencies
```
yarn install or npm install 
```
### Compiles and hot-reloads for development
```
yarn serve or npm run serve
```
### API Environment Configuration

By default, the profiles are in the root directory of the project. You can modify the value of **VUE_APP_BASE_URL** to change the server address.

**Example:**

If you want to change the server address, you can open the file .env.development. Then you will see the default value of **VUE_APP_BASE_URL** is "http://192.168.1.2:8700/v0/filscan", modify it according to your actual server address. Please notice that you should run "yarn serve" or "npm run serve" to apply this change.

### Build
```
yarn build:pro or npm run build:pro
```
### Lints and fixes files
```
yarn lint or npm run lint
```
### Customize configuration

See Configuration Reference(https://cli.vuejs.org/config/).

# [Back-End](https://github.com/ipfs-force-community/filscan-backend)

## Build and Install

### Environment

- golang >= v1.13
- mongo >= v4.2
- lotus >= v0.2.7

### System Require

- Linux or Mac OS

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3003
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
### Configuration

Edit app.conf in path /conf and set the correct parameter
```
mongoHost = "127.0.0.1:27017"

mongoUser = "root"

mongoPass = "admin"

mongoDB   = "filscan"

lotusGetWay="192.168.1.1:1234"
```
### Run

Make sure mongo and lotus is active, and run the filscan_lotus
```
./filscan_lotus
```
The application will check lotus and mongo’s status. The application will stop if got any error from them. If application start success, it will work until sync all data down from lotus.

## Document

```
├── api
│    ├── custom.js
│    └── index.js  // 后端api
├── assets  // 资源文件
├── bu-components  // 业务组件
│   ├── address  // 地址组件
│   │   ├── ClaimAccount.vue
│   │   ├── account
│   │   │   └── index.vue
│   │   ├── chart  // 地址详情页图表
│   │   │   ├── GeneralBalance.vue
│   │   │   ├── MinerBalance.vue
│   │   │   ├── MinerPower.vue
│   │   │   └── index.vue
│   │   ├── generalDetail.vue  // 一般地址详情页
│   │   ├── miner-overview   
│   │   │   ├── AddressBalance.vue
│   │   │   ├── PowerGrowth.vue
│   │   │   ├── QualityPower.vue
│   │   │   └── index.vue
│   │   ├── minerDetail.vue   // 矿工详情页
│   │   └── mixin.js
│   ├── home  // 主页面组件
│   │   ├── BlocksWon.vue
│   │   ├── BoardItem.vue
│   │   ├── Filecoin.vue
│   │   ├── ViewMore.vue
│   │   ├── Watch.vue
│   │   ├── chart
│   │   │   ├── block-reward.vue
│   │   │   ├── index.vue
│   │   │   ├── region-power.vue
│   │   │   └── top-power.vue
│   │   ├── index.js
│   │   ├── latest
│   │   │   ├── LatestBlock.vue
│   │   │   ├── LatestMessage.vue
│   │   │   ├── MessageItem.vue
│   │   │   └── TipsetItem.vue
│   │   └── metaList.vue
│   ├── mining  // 排行榜组件
│   │   ├── MinerRate.vue
│   │   ├── PoolRanking.vue
│   │   ├── TopMiner.vue
│   │   └── powerRate.vue
│   ├── pk
│   │   ├── PkItem.vue
│   │   └── miner-select.vue
│   └── tipset
│       ├── BlockDetail.vue
│       ├── BlockList.vue
│       ├── Graph.vue
│       ├── MbBlockList.vue
│       ├── TicketChain.vue
│       ├── chain.vue
│       └── mixin.js
├── chart
│   ├── index.js
│   ├── options.js
│   └── theme
│       ├── dark.js
│       └── light.js
├── coindesign  // web端组件
├── coinmobile  // 移动端组件
├── components
│   ├── MessageList.vue
│   ├── coindesign.js
│   ├── coinmobile.js
│   ├── element-setup.js
│   └── index.js
├── directives  //  指令
│   └── scroll.js
├── filters    // 过滤器
│   ├── filters.js
│   └── index.js
├── lang       // 国家化语言
│   ├── en.js    // 英语
│   ├── ja.js    // 日本语
│   ├── ko.js    // 韩国语
│   └── zh.js    // 中文
├── layouts     // 模版文件
│   ├── default.vue   web默认模版
│   ├── error.vue    404页面
│   └── mlayout.vue  手机端默认模版
├── middleware   
│   ├── auth.js
│   └── device.js
├── mixins    
│   ├── headerMixin.js
│   ├── index.js
│   ├── searchMixin.js
│   └── service.js
├── pages  // 页面
│   ├── account
│   │   └── index.vue
│   ├── address  // 地址详情页
│   │   ├── general.vue
│   │   └── miner.vue
│   ├── address.vue
│   ├── blocks-won.vue
│   ├── cw.vue
│   ├── forcepool  
│   │   ├── center.vue
│   │   ├── force-admin.vue
│   │   ├── force-detail.vue
│   │   ├── force-list.vue
│   │   └── force-notice.vue
│   ├── index.vue  // 首页主页面
│   ├── message  
│   │   └── detail.vue
│   ├── miner-pk.vue
│   ├── mining.vue  // 排行榜
│   ├── mobile     // 移动端 结构与web端一致
│   │   ├── address
│   │   │   ├── general.vue
│   │   │   └── miner.vue
│   │   ├── index.vue
│   │   ├── mining.vue
│   │   ├── no-result.vue
│   │   ├── resources
│   │   │   ├── calculator.vue
│   │   │   └── tools.vue
│   │   ├── statistics
│   │   │   ├── charts.vue
│   │   │   ├── fil.vue
│   │   │   ├── gas.vue
│   │   │   ├── peer.vue
│   │   │   └── power.vue
│   │   └── tipset
│   │       ├── address-detail.vue
│   │       ├── address-list.vue
│   │       ├── chain.vue
│   │       ├── dsn-detail.vue
│   │       ├── dsn.vue
│   │       ├── message-detail.vue
│   │       ├── message-list.vue
│   │       ├── pool-detail.vue
│   │       ├── pool-message-detail.vue
│   │       ├── pool-message-list.vue
│   │       └── transfer-list.vue
│   ├── more
│   │   └── gas.vue
│   ├── no-result.vue
│   ├── resources  // 资源
│   │   ├── calculator.vue  // 计算器
│   │   └── tools.vue   // 工具
│   ├── statistics   // 统计
│   │   ├── charts.vue   // 图表统计
│   │   ├── fil.vue      // FIL
│   │   ├── gas.vue      // Gas趋势
│   │   ├── map.vue 
│   │   ├── peer.vue
│   │   └── power.vue   // 基线与算力走势
│   ├── tipset   //  区块链
│   │   ├── address-detail.vue   // 地址详情页
│   │   ├── address-list.vue     // 地址列表
│   │   ├── chain.vue            // 区块 
│   │   ├── dsn-detail.vue       // 订单详情页  
│   │   ├── dsn.vue              // 订单列表
│   │   ├── message-detail.vue   // 消息详情页
│   │   ├── message-list.vue      // 消息列表
│   │   ├── pool-detail.vue       // 存储池详情页面  
│   │   ├── pool-message-detail.vue // 待打包消息池列表
│   │   ├── pool-message-list.vue  // 待打包消息池
│   │   └── transfer-list.vue     //转账列表
│   └── token.vue
├── patches  // 依赖包打补丁
│   └── postcss-pxtorem+5.1.1.patch
├── plugins
│   ├── bus-inject.js  // 大巴车
│   ├── elTableInfiniteScroll.js
│   ├── i18n.js     // 国际化语言
│   ├── index.js
│   ├── leecharts.js // 图表
│   ├── main.js     // 主文件
│   ├── store.js    // vuex永久化存储
│   └── vuex-persist.js // vuex永久化存储
├── static  // 静态资源文件
│   └── favicon.ico  // 浏览器图标
├── store   //状态管理
│   ├── account.js  // 用户
│   ├── address.js // 地址
│   ├── app.js     // 整站
│   ├── dsn.js      // 订单
│   ├── home.js    // 主页
│   ├── index.js  
│   ├── message.js  // 消息
│   ├── mining.js   // 排行榜
│   ├── notice.js   // 通知
│   ├── pk.js
│   ├── stats.js
│   ├── tipset.js   // 区块
│   └── token.js    // 用户信息
└── utils  // 工具包
    ├── api.js     // 接口字符串
    ├── index.js   // 工具包
    ├── key.js    // 密钥
    └── request.js  // 请求服务
├── tsconfig.json
├── prettier.config.js
├── nuxt.config.js 配置文件
```





## License
Dual-licensed under

[MIT](https://github.com/filecoin-project/lotus/blob/master/LICENSE-MIT)

[Apache 2.0](https://github.com/filecoin-project/lotus/blob/master/LICENSE-APACHE)
