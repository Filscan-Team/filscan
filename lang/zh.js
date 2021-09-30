// const isTest = window.location.href.indexOf("calibration") >= 0
const isTest = false
const zh = {
  mixin:{
    formatTime:{
      before: '之前',
      suffix: ['天', '小时', '分钟', '秒']
    }
  },
  component: {
    empty: {
      label: '暂无数据'
    },
    heightDetail: {
      titles: ['区块高度', '区块列表'],
      heightLabels: ['赢票数', '奖励', '时间'],
      blockLabels: ['区块Cid', '节点', '奖励', '消息数']
    },
    filecoin: {
      labels: [
        '总市值',
        '市场占有率',
        '总市值排名',
        '24h最低价/24h最高价',
        '流通量',
        '完全稀释后市值'
      ]
    },
    overview: {
      btnText: '存储池详情'
    },
    mesList: {
      title: '消息',
      heading: '消息列表',
      poolheading: '消息池列表',
      label: [
        '消息ID',
        '区块高度',
        '时间',
        '发送地址',
        '接收地址',
        '数额',
        '状态',
        '方法'
      ],
      blockLabel: ['消息ID', '高度', '发送地址', '接收地址', '方法', '数额'],
      poolLabels: [
        '消息ID',
        '时间',
        '发送地址',
        '接收地址',
        '数额',
        'Gas 限额',
        'Gas Premium',
        '方法'
      ],
      mbLabel: [
        '消息ID',
        '时间',
        '发送地址',
        '接收地址',
        '数额',
        'Gas限额',
        'Gas Premium',
        '方法'
      ],
      total: '共 {total} 条消息',
      latest: '',
      // latest: "(最近7天)",
      range: '( {start}至{end} ) ',
      method: {
        ChangePeerID: '变更节点编号',
        ChangeWorkerAddress: '变更节点地址',
        ControlAddresses: '地址管理',
        PreCommitSector: '数据预提交',
        ProveCommitSector: '数据提交证明',
        SubmitWindowedPoSt: '提交时空证明',
        Transfer: '转账'
      },
      placeholder: '方法',
      tips: '(仅展示近一周内的消息)',
      receipt: ['成功', '失败', '未知错误'],
      fail: '失败',
      selector: [
        { label: '转入', type: 'to' },
        { label: '转出', type: 'from' }
      ],
      type: ['转入', '转出']
    },
    blockList: {
      label: [
        '区块Cid',
        '区块高度',
        '出块时间',
        '消息数',
        '节点地址',
        '出块奖励'
      ],
      mbLabel: ['区块Cid', '节点', '时间', '奖励', '', '消息'],
      total: '总计 {total} 区块',
      height: '区块高度 # {height}',
      mb: {
        height: '高度:',
        time: '时间:',
        label: ['', '奖励']
      },
      start: '开始日期',
      end: '结束日期',
      title: '区块详情'
    },
    transactionList: {
      total: '总计 {total} 消息',
      label: ['转账时间', '消息CID', '发送者', '接收者', '金额', '转账类型'],
      typeOptions: ['发出', '接收', '区块奖励', '其他惩罚', '聚合费用']
    },
    addressList:{
      heading: "富豪榜"
    },
    transferList: {
      heading: '大额转账记录',
      total: '共有 {total} 条信息',
      labels: [
        '区块高度',
        '消息ID',
        '时间',
        '发送地址',
        '接收地址',
        '数额',
        '方法'
      ],
      addressLabels: [
        '时间',
        '消息ID',
        '发送地址',
        '接收地址',
        '数额',
        '方法',
        '类型'
      ]
    },
    timeSelector: [
      { value: '24h', label: '24小时' },
      { value: '1w', label: '1周' },
      { value: '1m', label: '1月' },
      { value: '1y', label: '1年' },
      { value: 'all', label: '全部' }
    ],
    times: {
      '6h': '6小时',
      '24h': '24h',
      '1d': '昨日',
      '1w': '7天',
      '1m': '30天',
      '6m': '6月',
      '0.5y': '半年',
      '1y': '1年',
      all: '全部'
    },
    timeGrowth: {
      '24h': '24h',
      '1d': '昨日',
      '1w': '7天',
      '1m': '30天',
      '6m': '6月',
      '0.5y': '半年',
      '1y': '1年'
    },
    timeGrowth1: {
      '24h': '今日',
      '1d': '昨日',
      '1w': '1周',
      '1m': '30天',
      '6m': '6月',
      '0.5y': '半年',
      '1y': '1年'
    },
    more: '更多'
  },
  account: {
    login: {
      welcome: '欢迎回来',
      account: '账号',
      phoneLogin: '手机登录',
      emailLogin: '邮箱登录',
      phone: "手机号",
      enterPhone: "请输入手机号",
      email: '邮箱地址',
      enterEmail: "请输入邮箱地址",
      pass: '密码',
      enterPass: "请输入密码",
      code: "验证码",
      enterCode: "请输入验证码",
      getCode: "获取验证码",
      resetPass: "忘记密码？",
      sure: "登录",
      byPass: '密码登录',
      byCode: '验证码登录',
      registerPrefix: "还没有账号？",
      register: "立即注册",
      remember: '记住密码并自动登录'
    },
    register: {
      welcome: '账号注册',
      account: '账号',
      setPwd: '设置密码',
      phoneRegister: "手机注册",
      emailRegister: "邮箱注册",
      phone: "手机号",
      enterPhone: "请输入注册手机号码",
      email: "邮箱地址",
      enterEmail: "请输入注册邮箱地址",
      pass: '密码',
      enterPass: "请输入密码",
      passAgain: "确认密码",
      enterPassAgain: "请确认密码",
      code: "验证码",
      enterCode: "请输入验证码",
      getCode: "获取验证码",
      private: "请同意服务协议及隐私条款",
      hasPrefix: "已有账户?",
      has: "登录",
      sure: "注册"
    },
    reset: {
      welcome: '忘记密码',
      phoneReset: '手机号找回',
      emailReset: '邮箱找回',
      phone: "手机号",
      enterPhone: "请输入手机号",
      email: "邮箱地址",
      enterEmail: "请输入邮箱地址",
      pass: '新密码',
      enterPass: "请输入新密码",
      newPass: "确认新密码",
      enterNewPass: "请确认新密码",
      code: "验证码",
      enterCode: "请输入验证码",
      getCode: "获取验证码",
      hasPrefix: "已有账户?",
      has: "返回登录",
      sure: "确 定",
      pre: '上一步',
      next: '下一步'
    },
    logout: {
      msg: '即将退出登录, 是否继续?',
      tip: '提示',
      confirm: '确定',
      cancel: '取消',
      success: '退出登录成功！',
      hasCancel: '已取消',
    },
    error: {
      listLimit: '此地址已被添加到通知列表中',
      emptyPhone: '请输入手机号',
      errorPhone: '请输入正确的手机号',
      emptyAccount: '账号不能为空',
      errorAccount: '请输入正确的手机号或邮箱地址',
      emptyCode: '验证码不能为空',
      emptyPass: '请输入密码',
      emptyNewPass: '请输入新密码',
      errorPass: '密码应为8-20位字符，至少包含字母和数字（区分大小写）',
      notRegister: '该账户尚未注册',
      hasRegister: "该账户已经注册",
      sameWithPhone: "密码不能和手机号完全一致",
      emptyPassAgain: '请再次输入密码',
      emptyNewPassAgain: '请再次输入新密码',
      differentPass: "两次输入的密码不一致",
      agreePrivate: "请同意服务协议及隐私条款",
      emptyTag: "请输入备注",
      emptyAddress: '请输入通证地址',
      emptyMail: '请输入正确的邮箱地址',
      errorEmail: "邮箱地址格式错误",
      registerMail: "邮箱已经被注册",
      emptyNumber: '请输入证件号码,支持护照',
      emptyName: '请输入姓名',
      nameError: '姓名不能超过64位字符',
      areaCodeError: '请输入正确的国际区号',
      phoneError: '请输入正确的手机号码',
      picTypeError: '上传头像图片只能是 JPG 或 PNG 格式',
      picSizeError: '上传头像图片大小不能超过 5MB',
      infoNotMatch: {
        title: '身份信息不匹配！',
        mes: "您提交的身份认证信息与手机号身份信息不匹配"
      },
      mustHaveOne: '至少保留一种安全验证方式',
      miners: '输入您节点池的矿工，请用英文逗号隔开'
    },
  },
  header: {
    network: '当前网络:',
    centerOption:[
        { index: 'center', label: '个人中心' },
        { index: 'monitor', label: '节点池监控' },
        { index: 'LogOut', label: '退出' },
    ],
    meta: {
      content1: 'Filscan,Filecoin,最新区块,Filecoin Explorer,FIL,IPFS，FIL,Filecoin区块链查询浏览器,FIL浏览器,Filecoin浏览器,Filecoin区块查询,区块链搜索引擎,区块高度,区块链交易',
      content2: 'Filscan区块浏览器是Filecoin生态基础工具，提供实时链上相关数据。集查询Filecoin区块、交易、FIL代币、钱包等信息的网站，实时同步更新Filecoin所有节点信息。'
    },
    seo: {
      index: 'Filscan--Filecoin区块链浏览器',
      chain: '区块 - Filscan浏览器',
      message: '消息 - Filscan浏览器',
      pool: '消息池 - Filscan浏览器',
      address: '富豪榜 - Filscan浏览器',
      largeTransfer: '大额转账- Filscan浏览器 ',
      addressDetail: '地址 {address} - Filscan浏览器',
      dsn: '订单 - Filscan浏览器',
      dsnDetail: '订单详情 {dealid} - Filscan浏览器',
      messageDetail: '消息 {message} - Filscan浏览器',
      mining: '排行榜 - Filscan浏览器',
      calculator: '计算器 - Filscan浏览器',
      gas: 'Gas费趋势 - Filscan浏览器',
      fil: 'FIL - Filscan浏览器',
      baseTrend: '基线与算力走势 - Filscan浏览器',
      stats: '图表统计 - Filscan浏览器',
      map: '节点地图 - Filscan浏览器',
      resource: "资源 - Filscan浏览器"
    },
    title: 'Filscan',
    tab: ['首页', 'Tipset', '统计数据'],
    placeholder: '请输入地址/消息ID/高度/区块Cid/节点ID',
    filter: [
      {
        label: '全部筛选类型',
        value: 0
      },
      {
        label: '地址',
        value: 1
      },
      {
        label: '消息ID',
        value: 2
      },
      {
        label: '高度',
        value: 3
      },
      {
        label: '区块Cid',
        value: 4
      },
      {
        label: '节点ID',
        value: 5
      }
    ],
    nav: {
      home: {
        label: '首页',
        index: 'home',
        path: '/'
      },
      tipset: {
        label: '区块链',
        index: 'tipset',
        down: true,
        items: [
          {
            label: '区块',
            path: '/tipset/chain',
            index: 'chain'
          },
          {
            label: '消息',
            path: '/tipset/message-list',
            index: 'message-list'
          },
          {
            label: '富豪榜',
            path: '/tipset/address-list',
            index: 'address-list'
          },
          {
            label: '大额转账',
            path: '/tipset/transfer-list',
            index: 'transfer-list'
          },
          {
            label: '订单',
            path: '/tipset/dsn',
            index: 'dsn'
          },
          {
            label: '消息池',
            path: '/tipset/pool-message-list',
            index: 'pool-message-list'
          }
        ]
      },
      mining: {
        label: '排行榜',
        path: '/mining',
        index: 'mining'
      },
      statistics: {
        label: '统计',
        index: 'statistics',
        down: true,
        items: [
          {
            label: 'Gas费趋势',
            index: 'gas',
            path: '/statistics/gas'
          },
          {
            label: '基线与算力走势',
            path: '/statistics/power',
            index: 'power'
          },
          {
            label: 'FIL',
            path: '/statistics/fil',
            index: 'fil'
          },
          {
            label: '图表统计',
            index: 'charts',
            path: '/statistics/charts'
          },
          {
            label: '节点地图',
            index: 'map',
            path: '/statistics/map'
          }
        ]
      },
      resources: {
        label: '资源',
        index: 'resources',
        down: true,
        items: [
          {
            label: '计算器',
            path: '/resources/calculator',
            index: 'calculator',
          },
          {
            label: '常用工具',
            path: '/resources/tools',
            index: 'tools',
          }
        ]
      },
      // filwallet: {
      //   label: '钱包',
      //   href: 'https://filecoinwallet.com/',
      //   index: 'filwallet',
      // },
      incubation: {
        label: '存储提供者',
        path: '/forcepool/center?type=1',
        index: 'incubation',
        pro: true,
      }
    },
    mbnav: {
      home: {
        label: '首页',
        index: 'home',
        path: '/'
      },
      tipset: {
        label: '区块链',
        index: 'tipset',
        isSubShow: false,
        close: 'icon-down',
        up: 'icon-up',
        items: [
          {
            label: '区块',
            path: '/mobile/tipset/chain',
            index: 'chain'
          },
          {
            label: '消息',
            path: '/mobile/tipset/message-list',
            index: 'message-list'
          },
          {
            label: '富豪榜',
            path: '/mobile/tipset/address-list',
            index: 'address-list'
          },
          {
            label: '大额转账',
            path: '/mobile/tipset/transfer-list',
            index: 'transfer-list'
          },
          {
            label: '订单',
            path: '/mobile/tipset/dsn',
            index: 'dsn'
          },
          {
            label: '消息池',
            path: '/mobile/tipset/pool-message-list',
            index: 'pool-message-list'
          }
        ]
      },
      mining: {
        label: '排行榜',
        path: '/mobile/mining',
        index: 'mining'
      },
      statistics: {
        label: '统计',
        index: 'statistics',
        isSubShow: false,
        close: 'icon-down',
        up: 'icon-up',
        items: [
          {
            label: 'Gas费趋势',
            index: 'gas',
            path: '/mobile/statistics/gas'
          },
          {
            label: '基线与算力走势',
            path: '/mobile/statistics/power',
            index: 'power'
          },
          {
            label: 'FIL',
            path: '/mobile/statistics/fil',
            index: 'fil'
          },
          {
            label: '图表统计',
            index: 'charts',
            path: '/mobile/statistics/charts'
          }
        ]
      },
      resources: {
        label: '资源',
        index: 'resources',
        isSubShow: false,
        close: 'icon-down',
        up: 'icon-up',
        items: [
          {
            label: '计算器',
            path: '/mobile/resources/calculator',
            index: 'calculator',
          },
          {
            label: '常用工具',
            path: '/mobile/resources/tools',
            index: 'tools',
          }
        ]
      },
      filwallet: {
        label: '钱包',
        href: 'https://filwallet.ai/',
        index: 'filwallet',
      },
      incubation: {
        label: '存储提供者孵化中心',
        href: 'https://venus.filecoin.io/incubation/Rules.html#storage-provider-incubation-program',
        index: 'incubation',
        hot: true
      }
    },
    mb: {
      title: 'Filecoin 搜索',
      search: 'Search'
    },
    cancel: '取消'
  },
  footer: {
    peer: '活跃节点 {count}',
    mobile: [
      {
        label: 'Filecoin官网',
        href: ' https://filecoin.io'
      },
      {
        label: '水龙头',
        href: isTest
          ? 'https://faucet.calibration.fildev.network/'
          : 'https://faucet.glif.io/'
      },
      {
        label: 'lotus文档',
        href: 'https://lotu.sh/'
      },
      {
        label: '测试网说明',
        href: ' https://testnet.filecoin.io/'
      }
    ],
    links: [
      {
        title: 'Filecoin项目',
        items: [
          {
            label: 'Filecoin Blog',
            class: 'icon-github',
            href: 'https://filecoin.io/blog/'
          },
          {
            label: 'Filecoin Slack',
            class: 'icon-forum',
            href: 'https://app.slack.com/client/TEHTVS1L6/CEHTVSEG6/'
          },
          {
            label: 'Filecoin Github',
            class: 'icon-slack',
            href: 'https://github.com/filecoin-project'
          },
          {
            label: '协议实验室',
            class: 'icon-slack',
            href: 'https://protocol.ai/'
          },
          {
            label: '协议学院',
            class: 'icon-slack',
            href: 'https://proto.school/'
          },
          {
            label: 'Filecoin Twitter',
            class: 'icon-slack',
            href: 'https://twitter.com/Filecoin'
          },
          {
            label: 'Filecoin微信公众号',
            class: 'icon-wechat',
            qrClass: 'qr',
            popover: true
          },
          {
            label: 'Filecoin Community Github',
            class: 'icon-matrix',
            href: 'https://github.com/filecoin-project/community'
          },
          {
            label: 'Filecoin基金会',
            class: 'icon-matrix',
            href: 'https://fil.org/'
          },
          {
            label: 'Filecoin DevGrants',
            class: 'icon-ttww',
            href: 'https://github.com/filecoin-project/devgrants'
          },
          // {
          //   label: '原力区微信公众号',
          //   class: 'icon-wechat',
          //   qrClass: 'qr-ipfs',
          //   popover: true
          // },
          {
            label: '在线反馈',
            href: 'http://ipfsforce.mikecrm.com/E6kYnYI'
          }
        ]
      },
      {
        title: '四大实现',
        items: [
          {
            label: 'Lotus',
            href: 'https://github.com/filecoin-project/lotus/'
          },
          {
            label: 'Venus',
            href: 'https://github.com/filecoin-project/venus'
          },
          {
            label: 'Fuhon',
            href: 'https://github.com/filecoin-project/cpp-filecoin'
          },
          {
            label: 'Forest',
            href: 'https://github.com/ChainSafe/forest'
          }
        ]
      },
      {
        title: '应用信息',
        items: [
          // {
          //   label: 'Filecoin Ecosystem Wallet',
          //   href: 'https://filecoinwallet.com/'
          // },
          {
            label: 'Slate',
            href: 'https://www.slate.io/'
          },
          {
            label: 'Textile',
            href: 'https://textile.io/'
          },
          {
            label: 'Timerose',
            href: 'https://timerose.io/'
          },
          {
            label: 'Filedrive',
            href: 'http://filedrive.io/'
          },
          {
            label: 'Brave',
            href: 'https://brave.com/'
          }
        ]
      },
      {
        title: '开发者工具',
        items: [
          {
            label: 'Filecoin Spec',
            href: 'https://spec.filecoin.io/'
          },
          {
            label: 'Filecoin Doc',
            href: 'https://docs.filecoin.io/'
          },
          {
            label: 'Spec-actors',
            href: 'https://github.com/filecoin-project/specs-actors'
          }
        ]
      }
    ],
    contact: '邮箱: ',
    detail:
      'Filscan浏览器是 Filecoin 区块链浏览器及数据服务平台，提供基于 Filecoin 的各类收节点收益排行榜、区块链数据查询、可视化图表等一站式数据服务。',
    ipfs: '原力区',
    copyright:
        '版权所有 © Filecoin开发补助计划 \n遵循<a href="https://www.mit-license.org/" target="_blank"> MIT </a> 和<a href="https://www.apache.org/licenses/LICENSE-2.0.html" target="_blank"> Apache 2.0 </a>版权协议. ',
    copyright1:
      '版权所有 © Filecoin开发补助计划 \n遵循<a href="https://www.mit-license.org/" target="_blank"> MIT </a> 和<a href="https://www.apache.org/licenses/LICENSE-2.0.html" target="_blank"> Apache 2.0 </a>版权协议. <a href="https://ipfser.org" target="_blank"> 原力区 </a>技术支持'
  },
  home: {
    tips:
      '因版本升级，数据展示不能确保完全正确，程序员正在<span ">紧张升级中···</span> 为您带来不好的体验敬请谅解！',
    subtitle: {
      index: '全网数据指标',
      charts: '图表统计',
      pool: '存储池排行',
      poolTips: '此排行榜仅统计算力大于1PiB的存储池',
      transfer: '大额转账记录',
      moreChart: '更多图表'
    },
    charts: {
      more: '更多图表'
    },
    blocksWon: {
      title: '最新高度',
      miner: '节点',
      block: {
        title: '出块 / 占比',
        tips: '近半小时出块数量/占比'
      },
      blockRate: {
        title: '出块率',
        tips: '近半小时每高度出块概率'
      },
      win: {
        title: '赢票 / 占比',
        tips: '近半小时赢票数量/占比'
      },
      more: '更多',
      latest:
        '最新区块时间：<i class="font-18 mark font-500">{time}</i> &nbsp;之前',
      chart: {
        title: '近半小时内未发现区块',
        tooltip:
          '<div>节点ID: {miner_id}</div><div>高度: {height}</div><div>出块时间: {block_time}</div><div>区块Cid: {cid}</div><div>赢票数量: {win_count}</div>'
      }
    },
    metaList: {
      tabs: ['展开', '收起']
    },
    meta: [
      { label: '最新区块高度' },
      { label: '最新区块时间' },
      { label: '全网有效算力', tips: '当前全网有效算力（有效存储空间）的总和' },
      { label: '近24h增长算力' },
      { label: '近24小时产出效率', tips: '最近24小时的总出块奖励与有效算力的比值'},
      { label: '当前基础费率' },
      { label: '当前扇区质押量' },
      { label: '32GiB扇区Gas消耗', tips: '密封32G扇区每T所要消耗的Gas值' },
      { label: '32GiB扇区新增算力成本', tips: '32G扇区新增算力所需要花费的成本，包括扇区质押和封装手续费'},
      { label: '近24h出块奖励' },
      { label: '全网出块数量' },
      { label: '全网出块奖励' },
      { label: '64GiB扇区Gas消耗', tips: '密封64G扇区每T所要消耗的Gas值' },
      { label: '64GiB扇区新增算力成本', tips: '64G扇区新增算力所需要花费的成本，包括扇区质押和封装手续费' },
      { label: '每赢票奖励', tips: '最新高度的单位出块奖励，每个高度有多个区块，每个区块均可获得该奖励' },
      { label: '平均每高度消息数', tips: '最近24h平均每个高度下的消息数量' },
      { label: '销毁量' },
      { label: '活跃节点数' },
      { label: '流通率' },
      { label: '平均每高度区块数量', tips: '最近24h平均每个高度下的区块数量' }
    ],
    mbMeta: [
      {
        label: '算力收益'
      },
      { label: '每赢票奖励' },
      {
        label: '存储速度'
      },
      { label: '全网出块奖励' },
      { label: '全网出块数量' },
      { label: '最新区块高度' },
      {
        label: '全网有效算力'
      },
      {
        label: '活跃节点数'
      }
    ],
    chart: {
      power: {
        title: '基线与算力走势',
        yAxisName: ['全网算力', '基线走势', '增长算力'],
        tips:
          '基线标准即是Filecoin网络要求的网络增长规模，主网上线时2.5EiB，每年100%增长率。'
      },
      blockReward: {
        title: '24h基础手续费走势',
        subTitle: '近24小时',
        meta: ['出块数: ', '', '赢票数: ', '', '奖励: '],
        yAxisName: ['基础手续费', '32GiB扇区Gas消耗', '64GiB扇区Gas消耗'],
        chart: {
          yAxisName: ['奖励 / FIL', '出块'],
          tooltip:
            '<div>{lineMarker}每小时奖励: {lineCount} FIL</div><div>{barMarker}每小时出块数: {barCount}</div><div>每小时赢票:{winCount}</div>'
        }
      },
      region: {
        title: 'FIL流通量构成',
        total: "总算力: <i class='mark'>{total}</i>",
        continent: [
          { key: 'circulating', name: '可交易流通的FIL', color: '#5B8FF9' },
          { key: 'locked', name: '扇区抵押', color: '#5AD8A6' },
          { key: 'vested', name: '待释放奖励', color: '#5D7092' },
          { key: 'burnt', name: '销毁的FIL', color: '#F6BD16' },
          { key: 'mined', name: '存储提供者奖励', color: '#E8684A' },
          { key: "other", name: "", color: "#999999" },
        ]
      }
    },
    blockSize: {
      label: '平均区块元数据',
      size: '字节',
      tips: '近24小时平均区块元数据大小'
    },
    totalPower: {
      power: '原值算力',
      capacity: '有效算力'
    },
    latest: {
      block: {
        title: '最新的区块',
        more: '更多',
        height: '区块高度:',
        time: '时间:',
        hash: 'Cid:',
        miner: '节点:',
        reward: '奖励:'
      },
      message: {
        title: '最新的消息',
        more: '更多',
        id: '最新消息:',
        from: '发送地址:',
        to: '接收地址:'
      }
    },
    tag: '标识节点名称，请发送邮件：filscan@ipfsforce.com或微信：ipfsforce',
    lucky: '节点实际赢票概率相比全网平均值的偏差',
    topPowerTable: {
      title: '节点(算力)排行榜',
      homelabel: [''],
      label: [
        '节点',
        '有效算力 / 占比',
        '原值算力 / 占比',
        '出块 / 占比',
        '奖励'
      ],
      mbLabel: ['节点', '原值算力', '出块', '奖励']
    },
    topPowerChartLabel: [
      { label: '原值算力', index: 'RawBytePower' },
      { label: '有效算力', index: 'QualityAdjPower' }
    ],
    rate: {
      title: '节点效率',
      table: {
        label: ['节点', '算力增量', '存储效率', '算力收益'],
        mbLabel: ['节点', '增量', '存储效率', '收益']
      },
      chart: {
        title: '节点效率'
      }
    },
    watch: '链式图',
    transfer: {
      plabels: ['发送方', ' ', '接收方', '高度', '数额'],
      labels: ['发送方', ' ', '接收方', '数额']
    },
    poolTable: {
      tips: '7天内存储池累计出块奖励与有效算力的比值'
    }
  },
  tipset: {
    height: '高度',
    block: {
      overview: [
        'Cid',
        '高度',
        '时间戳',
        '消息',
        '节点',
        '赢票',
        '奖励',
        '父块Cid',
        '父块重量',
        '父基础费率',
        '票值',
        '根'
      ],
      rewards: '{reward} FIL ( {block} FIL 区块奖励 及 {fee} FIL 手续费奖励 )'
    },
    blockType: ['无区块', '最小票值区块', '其它区块'],
    tips: '票值为一个随机数',
    tooltip: [
      {
        label: '节点ID: ',
        key: 'miner'
      },
      {
        label: '高度: ',
        key: 'height'
      },
      {
        label: '块龄: ',
        key: 'utcTime'
      },
      {
        label: '区块Cid: ',
        key: 'hash'
      },
      {
        label: '赢票: ',
        key: 'win_count'
      }
    ],
    item: {
      height: '高度:',
      time: '块龄:',
      labels: ['高度', 'Cid', '节点', '标签', '消息', '奖励', '时间']
    }
  },
  mining: {
    heading: '排行榜',
    efficiency: {
      title: '节点效率',
      placeholder: "请输入节点ID，多个ID请用英文','分隔",
      label: [
        '排名',
        '节点',
        '标签',
        '出块奖励/占比',
        '出块数',
        '赢票率',
        '有效算力',
        '扇区大小'
      ],
      mblabel: [
        '排名',
        '出块奖励/占比',
        '出块数',
        '赢票率',
        '有效算力',
        '扇区大小'
      ],
      tips: [
        '',
        'Filecoin经济模型中，一个高度（tipset）下可能有多个区块（block），每个区块可能获得多份奖励（win count）。',
        '在选定周期内，节点获得出块奖励与累计产出区块奖励的比值。'
      ],
      mbLabel: ['排名', '节点', '标签', '存储效率'],
      mbLabel2: ['排名', '节点', '标签', '算力收益']
    },
    poolranking: {
      label: [
        '排名',
        '节点名称',
        '算力增速',
        '算力增量',
        '有效算力',
        '原值算力',
        '扇区大小'
      ],
      mblabel: [
        '排名',
        'Owner ID',
        '有效算力',
        '效率',
        '近24h算力增量',
        '幸运值',
        '出块数'
      ]
    },
    powerRate: {
      label: [
        '排名',
        '节点',
        '算力增速',
        '算力增量',
        '有效算力',
        '原值算力',
        '扇区大小'
      ]
    },
    poolRanking: {
      labels: [
        '排名',
        // '存储池名称',
        'Owner ID',
        '有效算力',
        '近24h产出效率',
        '近24h算力增量',
        // '幸运值',
        '出块数'
      ],
      mlabels: [
        '排名',
        'Owner ID',
        '有效算力',
        '效率',
        '近24h算力增量',
        // '幸运值',
        '出块数'
      ]
    },
    minerRanking: {
      labels: [
        '排名',
        '节点',
        '标签',
        '有效算力 / 占比',
        '近24h算力增量',
        '出块 / 占比 ',
        // '赢票',
        '奖励 / 占比',
        '余额'
      ],
      mblabels: [
        '排名',
        '有效算力 / 占比',
        '近24h算力增量',
        '出块 / 占比 ',
        // '赢票',
        '奖励 / 占比',
        '余额'
      ]
    },
    powerRanking: {
      labels: [
        '排名',
        '节点',
        '标签',
        '算力增速',
        '算力增量',
        '有效算力',
        '原值算力',
        '扇区大小'
      ],
      mblabels: [
        '排名',
        '算力增速',
        '算力增量',
        '有效算力',
        '原值算力',
        '扇区大小'
      ],
      tips: [
        '选定周期内，平均每天完成封装扇区的有效算力总和',
        '选定周期内，节点的有效算力增量'
      ],
      sectorOption: [
        {
          index: '0',
          value: '',
          label: '全部扇区'
        },
        {
          index: '1',
          label: '32G 扇区'
        },
        {
          index: '2',
          label: '64G 扇区'
        }
      ]
    },
    topPowerTable: {
      title: '节点(算力)排行榜',
      label: [
        '排名',
        '节点名称',
        'owner地址',
        '有效算力 / 占比',
        '存储池余额',
        '总奖励'
      ],
      mbLabel: ['排名', '存储池名称', '有效算力/占比'],
      mbLabel2: ['排名', '存储池名称', 'Owner ID', '有效算力', '近24h产出效率'],
      lowBalance: '余额小于200'
    },
    switch: ['节点(算力)排行', '节点效率'],
    switch2: ['存储池排行', '节点排行', '算力增速', '节点收益']
  },
  statistics: {
    fil: {
      filTips: '11',
      allocationTips: '22',
      allocationTitle: 'Filecoin代币分配细则',
      trend: 'FIL现货价格走势',
      trend2: 'Filecoin代币分配细则',
      tips: '价格数据来源：coingecko',
      continent: [
        {
          key: 'Filecoin Foundation',
          name: 'Filecoin基金会',
          value: '5',
          color: '#477DE5'
        },
        {
          key: 'PL Team & Contributors',
          name: '协议实验室团队及贡献者',
          value: '4.5',
          color: '#4FD0A1'
        },
        {
          key: 'Protocol Labs',
          name: '协议实验室',
          value: '10.5',
          color: '#5D77A3'
        },
        {
          key: 'Fundraising-Remainder',
          name: '募资 – 剩余代币',
          value: '2.5',
          color: '#E8B61B'
        },
        {
          key: 'Fundraising-SAFT 2017',
          name: '募资 – 未来代币简单协议',
          value: '7.5',
          color: '#D75B42'
        },
        {
          key: 'Mining Reserve',
          name: '为存储服务提供者预留代币',
          value: '15',
          color: '#59BAE3'
        },
        {
          key: 'Storage Mining allocation',
          name: '存储提供者代币分配',
          value: '55',
          color: '#876AC3'
        }
      ],
      sourceLabel: [
        {
          label: '分配项目',
          value: '数额',
          Released: 'Released',
          description: '具体用途'
        },
        {
          label: 'FIL的基础发放',
          value: '2,000,000,000',
          Released: '2,000,000',
          description: '网络FIL铸造上限'
        },
        {
          label: '存储提供者预留代币',
          value: '300,000,000 ',
          Released: '300,000 ',
          description:
            '为未来Filecoin经济增长而预留的代币储备，具体未来使用方案由Filecoin社区决定'
        },
        {
          label: '存储提供者代币分配',
          value: '1,100,000,000',
          Released: '1,100',
          description: '通过区块奖励、网络初始化等方式分给存储提供者的代币奖励'
        },
        {
          label: '募资形式 – 未来代币简单协议 2017',
          value: '150,000,000 ',
          Released: '50,000 ',
          description: '2017年出售的代币'
        },
        {
          label: '募资形式 – 剩余资金',
          value: '50,000,000',
          Released: '50,000 ',
          description: '用作生态发展和后续融资'
        },
        {
          label: '协议实验室',
          value: '210,000,000',
          Released: '20,000',
          description: '用作协议实验室的相关工作'
        },
        {
          label: '协议实验室团队和贡献者',
          value: '90,000,000',
          Released: '9,000 ',
          description: '4.5%给协议实验室团队和贡献者'
        }
      ]
    },
    charts: {
      title: '图表统计',
      pledgeTitle: '单T抵押走势',
      rewardTitle: '区块奖励',
      minerTitle: '活跃节点数',
      messageTitle: '消息数走势图',
      blockReward: {
        names: ['产出效率', '累计区块奖励']
      },
      MessageTrend: {
        names: ['单个区块消息走势', '总消息数走势']
      }
    }
  },
  calculator: {
    filUnit: '¥',
    subtitle: '启动时间：',
    switch: ['满存算力', '存储节点(物理机)封装'],
    labels1: ['周期', '产出', '维持（时空证明）消耗'],
    columns1: ['每日', '每周', '每月', '每年'],
    labels2: [
      '静态回本周期',
      '成本（总成本和GAS消耗/540天产出数量）',
      '540天产出'
    ],
    output: '（总成本和GAS消耗/540天产出数量）',
    input1: ['每日单T产出', '币价', '单T维持消耗'],
    input2: ['总算力', '硬件及运维费用'],
    input3: ['节点类型', '总算力规模', '封装速度', '硬件及运维费用'],
    input4: ['每日单T产出', '币价', '单T封装消耗', '单T维持消耗', '单T抵押'],
    labels3: [
      '满存所需的天数',
      '满存所需抵押',
      '满存封装费用',
      '满存后每日出块奖励',
      '静态回本周期',
      '成本（总成本和GAS消耗/540天产出数量）',
      '540天产出'
    ],
    buttonLabels: '开始计算',
    backLabels: '重新计算',
    tips:
      '免责声明：本计算采用静态数据计算，实际情况中币价、每日单T产出、单T维持消耗均为变化的值，因此，本结果仅供参考，不作为投资建议。'
  },
  more: {
    gas: {
      title: '基础手续费走势',
      tb_title: '24h Gas 数据',
      labels: [
        '消息类型',
        'Gas Premium',
        '平均Gas限额',
        '平均Gas消耗',
        '平均手续费',
        '手续费合计/占比',
        '消息数合计/占比'
      ]
    },
    stats: {
      meta: [
        {
          label: '平均每高度区块数量',
          tips: '近24小时每高度平均区块数量'
        },
        {
          label: '平均区块打包消息数量',
          tips: '近24小时每高度的平均消息数量'
        },
        {
          label: '平均燃料价格',
          tips: '近24小时的平均燃料价格'
        },
        {
          label: '抵押代币',
          tips: '全网抵押担保的代币'
        },
        {
          label: '流通中',
          tips: ''
        },
        {
          label: '全网可用',
          tips: ''
        }
      ],
      top: {
        title: '节点(算力)排行'
      },
      rate: {
        title: '节点效率'
      },
      activeMiner: {
        title: '活跃节点',
        count: '节点数量: ',
        tips: '打包数据或发送消息的存储节点'
      },
      blockTime: {
        label: '平均出块时间',
        min: '最小',
        max: '最大',
        tips: '近24小时平均出块时间'
      },
      filOutstanding: {
        filType: {
          floating: '流通中: ',
          pledge: '全网抵押: ',
          outstanding: '全网可用: '
        }
      }
    }
  },
  stats: {
    metrics: {
      blockReward: {
        title: '累计区块奖励'
      },
      filecoin: {
        title: 'Filecoin区块奖励曲线'
      },
      filVested: {
        title: 'FIL释放'
      },
      contact: '如果您想展示更多的数据，请邮件联系:'
    },
    peer: {
      title: '节点ID:',
      label: ['节点ID', '节点地址', 'IP', '位置']
    }
  },
  address: {
    list: {
      pcLabel: [
        '区块高度',
        '消息ID',
        '时间',
        '发送地址',
        '接收地址',
        '数据',
        '方法'
      ],
      label: ['排名', '地址', '标签', '余额/占比', '类型', '最新交易时间'],
      total: '共有{num}个账户',
      options: [
        { value: '', index: '0', label: '全部类型' },
        { value: 'account', index: '1', label: '一般账户' },
        { value: 'owner', index: '2', label: '所有者账户' },
        { value: 'miner', index: '3', label: '节点账户' },
        // { value:"system", index: "4", label:"系统账户" },
        // { value:"init", index: "5", label:"初始化账户" },
        // { value:"cron", index: "6", label:"定时任务" },
        // { value:"power", index: "7", label:"存储算力" },
        // { value:"market", index: "8", label:"市场账户" },
        { value: 'payment', index: '9', label: '支付通道' },
        { value: 'multisig', index: '10', label: '多签账户' }
        // { value:"reward", index: "11", label:"奖励账户" },
      ]
    },
    detail: {
      mtitle: "节点概览",
      account: '账户:',
      titleAcount: '账户概览',
      title: '账户变化',
      pool: {
        title: '存储池详情',
        tips: '存储池详情：存储池数据由名下节点数据 汇总而成',
        labels: ['账户', 'Owner地址', '名下节点'],
      },
      dialog: {
        updateName: '修改签名>',
        updateNames: ['修改签名 >', '申领账户 >'],
        title: '签名验证',
        subtitle: '目前仅对 有效算力 ≥ 32 GiB 的节点开放自主认证 ',
        labels: [
          'Owner地址',
          '账户英文全称',
          '账户中文全称',
          '联系方式',
          '信息',
          '签名代码',
          '签名'
        ],
        placeholders: [
          '',
          '不超过18个字符',
          '不超过18个字符',
          '邮箱/手机号',
          '',
          '',
          '请复制上面的代码，在filecoin钱包中进行签名，将签名内容粘贴到此处'
        ],
        tips:
          '特别提示：账户名称不得使用敏感词、违禁词、名人姓名等，如有违规将进行删除和禁用签名处理，谢谢配合。',
        btnText: '提交'
      },
      overview: [
        '账户地址',
        '账户ID',
        '账户类型',
        '账户余额',
        '消息数',
        'Nonce',
        '代码Cid',
        '创建时间',
        '最新交易时间',
        '多签账户',
      ],
      worker: '节点列表',
      ownerOverview: [
        '所有者账户',
        '节点ID',
        '原值算力',
        '有效算力',
        '扇区大小',
        '扇区数量',
        '证明中的扇区数量',
        '失败数量'
      ],
      owner: [
        '账户地址',
        '账户ID',
        '账户类型',
        '账户余额',
        '消息数',
        'Nonce',
        '代码 Cid',
        '创建时间',
        '最新交易时间',
        '名下节点',
        '实际工作节点',
        '多签账户',
      ],
      storageMiner: [
        '地址',
        '类型',
        '余额',
        '所有者',
        '节点ID',
        '原值算力',
        '有效算力',
        '扇区大小',
        '扇区数量',
        '证明中的扇区数量',
        '失败数量',
        '代码 Cid',
        '随机数'
      ],
      multisig: [
        '账户地址',
        '账户类型',
        'Robust Address',
        '账户余额',
        'Available Balance',
        'Initial Balance',
        'Unlock Period',
        'Locking Balance',
        'Signers',
        'Approvals Threshold',
        '消息数',
        'Nonce数',
        '代码 Cid',
        '创建时间',
        '最新交易时间'
      ],
      OwnerToMultisig: [
        '账户地址',
        '账户类型',
        'Robust Address',
        '账户余额',
        'Available Balance',
        'Initial Balance',
        'Unlock Period',
        'Locking Balance',
        'Signers',
        'Approvals Threshold',
        '消息数',
        'Nonce数',
        '代码 Cid',
        '创建时间',
        '最新交易时间',
        '名下节点',
        '实际工作节点'
      ],
      minerOverview: {
        balance: {
          title: '账户余额',
          balance: '地址余额: ',
          available: '可用余额:',
          pledged: '扇区质押:',
          deposits: '预存款:',
          reward: '锁仓奖励:'
        },
        power: {
          title: '算力一览',
          rank: '排名',
          subtitle: '有效算力',
          raw: '原值算力: ',
          rate: '算力占比: ',
          block: '总出块数: ',
          reward: '总奖励: ',
          win: '总赢票: ',
          size: '扇区大小: ',
          status: '扇区状态: ',
          total: '全部 ',
          proving: '有效',
          fault: '错误',
          pre: '恢复中'
        },
        growth: {
          labels: [
            { label: '算力增量: ' },
            { label: '扇区抵押: ' },
            {
              label: '出块数量: ',
              tips: '出块数 = 出块数量（block）的总和'
            },
            {
              label: '效率: ',
              tips: '选定周期内，节点累计出块奖励与有效算 力的比值'
            },
            { label: '算力增速: ' },
            { label: 'Gas消耗: ' },
            { label: '出块奖励: ' },
            {
              label: '幸运值: ',
              tips:
                '实际爆块数量和理论爆块数量的比值。若有效算力低于1PiB，则该值存在较大随机性， 仅供参考。'
            },
            { label: '扇区增量: ' },
            { label: '扇区增速: ' },
            {
              label: '赢票数量: ',
              tips:
                'Filecoin经济模型中，一个高度 （tipset）下可能有多个区块（block），每 个区块可能获得多份奖励（win count）。 累计出块份数=每次出块获得奖励份数的总和'
            },
            { label: '单T消耗: ', tips: '选定周期内单T封装扇区大小Gas消耗' }
          ],
          title: '统计指标',
          unit: ' 个扇区'
        }
      },
      accountOverview: {
        title: '账户总览',
        actor: '节点账号:',
        owner: 'Owner:',
        time: '创建时间:',
        runningDays: '运行时间:',
        type: '账户类型:',
        worker: 'Worker:',
        peer: '节点标识:',
        address: '节点地址:',
        controller: 'Controller:',
        location: '地区:',
        // location: '地区(公共IP):',
        unknown: '未知'
      },
      mbaccountOverview: [
        '节点账户',
        '节点类型',
        '节点地址',
        'Owner:',
        'Worker:',
        'Controller:',
        '创建时间:',
        '运行时间：',
        '节点标识：',
        '地理区域：'
      ],
      minerBalance: {
        title: '账户变化',
        chart: {
          title: '总算力',
          tooltip: '<div>{marker} {name}:{value} FIL</div>'
        },
        tooltip: ['可用余额', '扇区质押', '预存款', '锁仓奖励'],
        balance: '余额: '
      },
      minerPower: {
        title: '有效算力',
        names: ['有效算力', '算力增长'],
        chart: {
          title: '总算力',
          tooltip: '<div>{time}</div><div>{marker}有效算力:{power}</div>'
        }
      },
      minerBlock: {
        title: '出块',
        chart: {
          title: ['总出块', '出块增量']
        }
      },
      minerReward: {
        title: '奖励',
        chart: {
          title: ['总奖励 / FIL', '奖励增量 / FIL']
        }
      },
      claim: {
        title: '申领账户',
        subTitle: '仅对 有效算力 ≥ 32.00 GiB 的节点开放自主认证',
        owner: {
          label: '所有者地址',
          placeholder: ''
        },
        en: {
          label: '账户英文简称',
          placeholder: '不超过18个字符',
          error: '请输入账户英文简称'
        },
        nameEn: {
          label: '账户英文全称',
          placeholder: '选填'
        },
        zh: {
          label: '账户中文简称',
          placeholder: '选填'
        },
        nameZh: {
          label: '账户中文全称',
          placeholder: '选填'
        },
        contact: {
          label: '联系方式',
          placeholder: '邮箱、手机号',
          error: '请输入联系方式'
        },
        message: {
          label: '信息',
          placeholder: ''
        },
        signcode: {
          label: '签名代码',
          placeholder: ''
        },
        signature: {
          label: '签名',
          placeholder:
            '请复制上面的代码，在filecoin钱包中进行签名，将签名内容粘贴到此处',
          error: '请输入签名'
        },

        submit: '提交',
        tips:
          '特别提示：账户名称不得使用敏感词、违禁词、名人姓名等，如有违规将进行删除和禁用签名处理，谢谢配合。',
        copy: ['复制成功', '复制失败']
      }
    },
    type: {
      verifiedRegister: "注册确认",
      account: '一般账户',
      owner: '所有者账户',
      miner: '存储节点',
      system: '系统账户',
      init: '初始化账户',
      cron: '定时任务',
      power: '存储算力',
      market: '市场账户',
      payment: '支付通道',
      multisig: '多签账户',
      reward: '奖励账户'
    },
    trend: {
      switch: ['节点算力走势', '节点出块走势'],
      chartSwitch: ['节点走势图', '收起']
    },
    radio: ['消息列表', '出块列表', '转账列表'],
    radio1: ['消息列表', '转账列表']
  },
  message: {
    detail: {
      transactionLabels: ['发送方', ' ', '接收方', '金额', '类型'],
      mbTransferLabels: ['发送方:', '接收方:', '金额:', '类型:'],
      consumeTypeArr: ['','销毁手续费','节点手续费','转账', '惩罚' ,'举报', '聚合费用'],
      titles: ['消息概览', '转账信息', '其他信息'],
      overview: [
        '消息 ID',
        '高度',
        '区块',
        '时间',
        '发送地址',
        '接收地址',
        '数值',
        '收据',
        'Gas Premium',
        'Gas数量',
        'Gas限额',
        'Gas Fee Cap',
        '方法',
        '随机值',
        '参数'
      ],
      infoview: [
        '消息ID',
        '高度',
        '时间',
        '区块',
        '金额',
        '发送者',
        '接收者',
        '执行结果',
        '方法'
      ],
      otherview: [
        '版本编号',
        'Nonce',
        '手续费率上限',
        '节点小费费率',
        'Gas用量上限',
        'Gas实际用量',
        '基础手续费率',
        '手续费',
        '参数',
        '返回值'
      ],
      transfer: {
        from: '发送方',
        to: '接收方',
        value: '金额',
        consume_type: '类型'
      },
      paramTip: 'Base64格式元数据',
      confirm: '确认'
    },
    pool: {
      infoview: ['消息ID', '高度', '时间', '金额', '发送者', '接收者', '方法'],
      otherview: ['版本编号', 'Nonce', 'Gas用量上限', 'Gas实际用量', '参数']
    }
  },
  dsn: {
    list: {
      heading: '订单列表',
      total: '共 {num} 条交易',
      labels: [
        '交易ID',
        'Piece CID',
        '文件大小',
        '客户',
        '托管者',
        '开始时间',
        '结束时间',
        '存储费用',
        '已验证'
      ],
      mLabels: [
        '交易ID',
        'Piece CID',
        '文件大小',
        '客户',
        '托管者',
        '创建时间',
        '存储费用',
        '已验证'
      ],
      tips: '表示官方认证客户发起的文件订单，该订单有效算力约等于十倍原算力 ',
      placeholder: '搜索 客户/托管者'
    },
    detail: {
      dsnTitle: '订单详情',
      title: '托管详情',
      client: '客户',
      provider: '托管节点',
      pledge: '质押金额：',
      storageCost: '托管费用：',
      to: '至',
      block: '(原力区)',
      overview: [
        '交易ID',
        '创建时间',
        '所属区块',
        '所属消息',
        'Piece CID',
        '已验证'
      ]
    }
  },
  noResult: {
    res: '搜索无结果',
    404: '网页未找到！{count}s之后将会带您返回首页！',
    key: 'Oops! 您输入的搜索字符:',
    invalid: '对不起！这是一个无效的字符串',
    back: '返回首页'
  },
  routeName: {
    blockDetail: '区块详情',
    messageDetail: '消息详情',
    addressDetail: '地址详情',
    messageList: '查看全部消息',
    addressList: '查看全部账户',
    tipset: '区块链',
    mining: '节点',
    metrics: '指标',
    map: '节点地图',
    peer: '节点详情',
    stats: '数据',
    dsn: '查看全部订单',
    blocksWon: '出块'
  },
  chart: {
    blockRatio: '出块率',
    minerBlockTrend:
      '<div>{time}</div><div>{totalMarker}总出块数: {total} </div><div>{increaseMarker}{interval}出块数: {increase}</div>',
    minerRewardTrend:
      '<div>{time}</div><div>{totalMarker}总奖励: {total}FIL </div><div>{increaseMarker}{interval}奖励: {increase}FIL</div><div>{interval}赢票: {winCount}</div>',
    blockTime:
      "<div style='margin-bottom:5px'>平均出块时间: {value}s</div><div>时间: {name}</div>",
    mesHistory: '<div>消息: {count}</div><div>{time}</div>',
    mesHistoryTitle: '近14天消息历史',
    pledge: '<div>抵押: {pledge} FIL</div><div>{time}</div>',
    tipset:
      '<div>节点ID: {miner}</div><div>高度: {height}</div><div>出块时间: {block_time}</div><div>区块Cid: {cid}</div>',
    filOutstanding: ['流通中', '抵押'],
    blockReward: ['出块节点数量', '累计区块奖励(FIL)'],
    filecoin: '区块奖励(FIL)',
    filVested: ['累计FIL释放', '每日释放FIL'],
    coming: '敬请期待',
    map:
      "<div style='margin-bottom:5px'><a href='/more/peer?peer_id={pid}'><span>节点ID : </span><span>{pid}</span></a></div><div style='margin-bottom:5px'><a href='/tipset/address-detail?address={miner}'><span>节点 : </span><span>{miner}</span></a></div><div style='margin-bottom:5px'><span>位置 : </span><span>{name}</span></div><div><span>IP : </span><span>{ip}</span></div>"
  },

  blockHeaderChart: {
    op: '操作须进行拖拽',
    start: '开始高度',
    latest: '最新高度'
  },
  pk: {
    title: '节点对比',
    placeholder: '请输入或选择一个热门节点',
    miner: {
      title: '',
      rows: [{ label: '节点', key: 'miner' }]
    },
    overview: {
      title: '节点概况',
      rows: [
        { label: '总算力', key: 'active_power' },
        { label: '总出块数量', key: 'active_block_count' },
        { label: '总区块奖励', key: 'active_block_rewards' }
      ]
    },
    recent: {
      title: '节点近况',
      rows: [
        { label: '近24h算力增量', key: 'increased' },
        { label: '近24h出块数量', key: 'active_win_count' },
        { label: '近24h区块奖励', key: 'fil' }
      ]
    },
    efficiency: {
      title: '效率',
      rows: [
        {
          label: '总单T收益',
          key: 'active_fil_per_t'
        },
        {
          label: '近24h单T收益',
          key: 'fil_per_t'
        },
        {
          label: '近24h证明成功率',
          key: 'success_rate'
        },
        {
          label: '近24h出块幸运值',
          key: 'lucky_number'
        }
      ]
    },
    go: 'Go and choose miners for PK!',
    max: '最大支持6名节点'
  },
  map: {
    label: '活跃节点数',
    tips: '近24小时发送消息的节点'
  },
  chartIntervalMap: {
    '24h': '每小时',
    '1w': '每日',
    '1m': '每日',
    '6m': '每日'
  },
  token: {
    allocation: {
      columns: [
        { label: 'Allocation', key: 'label' },
        { label: 'Value', key: 'value' },
        { label: 'Description', key: 'des' }
      ],
      list: [
        {
          label: 'FIL BASE',
          rate: '100%',
          des: 'The maximum amount of FIL that willever be created.'
        },
        {
          label: 'Mining Reserve',
          rate: '15%',
          des:
            'Tokens reserved for funding miningto support growth of the FilecoinEconomy, whose future usage will bedecided by the Filecoin community.'
        },
        {
          label: 'Storage Mining Allocation',
          rate: '55%',
          des:
            'The amount of FIL allocated tostorage miners through blockrewards, network initialization, etc.'
        },
        {
          label: 'Fundraising - SAFT 2017',
          des: '2017 TOKEN SALE',
          rate: '7.5%'
        },
        {
          label: 'Fundraising - Remainder',
          rate: '2.5%',
          des: 'allocated for ecosystem development, future fundraising'
        },
        {
          label: 'Protocol Labs',
          des: 'allocated for Protocol Labs',
          rate: '10.5%'
        },
        {
          label: 'PL Team & Contributors',
          rate: '4.5%',
          des: '4.5% for the PL team & contributors'
        },
        {
          label: 'Filecoin Foundation',
          rate: '5%',
          des: 'allocated for Filecoin Foundation'
        }
      ]
    },
    supply: {
      columns: [
        { label: '', key: 'label' },
        { label: 'Value', key: 'value' },
        { label: 'Description', key: 'des' }
      ],
      list: [
        {
          label: 'Market Cap',
          des: 'CirculatingSupply * FIL Price',
          key: 'market_cap'
        },
        {
          label: 'Circulating Supply',
          des: 'FIL Vested + FIL Mined - TotalBurntFunds - FIL Locked',
          key: 'circulating_supply'
        },
        {
          label: 'Circulation Rate',
          des: 'Circulating Supply / Total Supply',
          key: 'circulating_rate'
        },
        {
          label: 'Total Supply',
          des: 'Circulating Supply + FIL Locked',
          key: 'total_supply'
        },
        {
          label: 'FIL BASE',
          des: 'The maximum amount of FIL that will ever be created.',
          key: 'base'
        },
        {
          label: 'Total Burnt Funds',
          des:
            'Total FIL burned as part of penalties and on-chain computations.',
          key: 'total_burnt'
        },
        {
          label: 'Max Supply',
          des: 'FIL BASE - Total Burnt Funds',
          key: 'max_supply'
        },
        {
          label: 'FIL Locked',
          des:
            'The amount of FIL locked as part of mining, deals, and other mechanisms.',
          key: 'locked'
        },
        {
          label: 'TotalPledgeCollateral',
          des: 'Total FIL locked as collateral in all miners.',
          key: 'total_ntwk_pledge_collateral'
        },
        {
          label: 'TotalProviderDealCollateral',
          des: 'Total FIL locked as provider deal collateral.',
          key: 'total_provider_locked_collateral'
        },
        {
          label: 'TotalClientDealCollateral ',
          des: 'Total FIL locked as client deal collateral.',
          key: 'total_client_locked_collateral'
        },
        {
          label: 'TotalPendingDealPayment ',
          des: 'Total FIL locked as pending client deal payment.',
          key: 'total_pending_payment'
        }
      ],
      state: {
        title: 'FIL Total Supply by State',
        subTitle:
          'Total Supply = FIL Circulating Supply + FIL Locked + Total Burnt Funds',
        legend: ['FIL Circulating Supply', 'FIL Locked', 'Total Burnt Funds']
      },
      source: {
        title: 'FIL Total Supply by Source',
        subTitle: 'Total Supply = FIL Vested Supply + FIL Mined',
        legend: ['FIL Mined', 'FIL Vested']
      }
    },
    filecoin: {
      title: 'Filecoin [Futures] Charts',
      series: ['Market Cap', 'Price']
    }
  },
  forcePool:{
    forceNav: [
      { label: '账户信息', name: 'info'},
      { label: '账户设置', name: 'set'}
    ],
    navTips: [
      { title:  '个人中心', content: '此页面概述了您的Filscan账户信息。您也可以在此处更新您的账户地址和密码。'},
      { title: '节点池监控', content: '您可以自主创建节点池并添加节点到相应的节点池统一进行监控管理。创建的节点池只对Filscan当前账户有效。' }
    ],
    menuList:[],
    center: {
       tabs: ['个人中心','节点池监控'],
      menuList:[
        { label: "个人中心", icon: 'iconfont icon-center' },
        { label: "节点池监控", icon: 'iconfont icon-monitor'}
      ],
       accountInfo: {
         labels:[
           { label: '昵称', icon: 'edit'},
           { label: '手机号', icon: 'edit'},
           { label: '邮箱' , icon: 'edit'},
           { label: '节点池监控列表', icon: 'add' },
           { label: '上次登录' },
         ]
       },
      errorTips: '不存在的节点：',
      successTips: '节点池创建成功',
      validateTips: '手机号，邮箱至少有一个不能为空',
      nodeCount: '个节点池',
      nodeTotal: '名节点',
      accountSet: {
         labels:[
           { label: '昵称', placeholder: '请输入昵称', model: 'nick_name', tips: '昵称最多10个字符（如果超过10个字符再次输入的时候输入不成功，头末空格输入不成功）' },
           { label: '手机号', placeholder: '请输入手机号', model: 'phone', tips: '如需更改，请输入您的新手机号' },
           { label: '邮箱', placeholder: '请输入邮箱',  model: 'email',tips: '如需更改，请输入您的新邮箱' },
           { label: '旧密码', placeholder: '请输入旧密码', model: 'old_pwd', tips: '如果没有更改，请将密码框留空' },
           { label: '新密码', placeholder: '请输入新密码', model: 'pwd', tips: '如果没有更改，请将密码框留空' },
           { label: '确认密码', placeholder: '请输入确认密码', model: 'confirm_pwd', tips: '如果您在上面修改了密码，请重新输入新密码确认' }
         ],
        buttons: ['确认更改', '取消', '删除账户'],
        dialog: {
           title: '您确定要永久删除您的帐户吗？',
           content: '删除帐户还将删除所有监控列表，地址信息，删除确认后，以上内容将无法恢复。',
           buttons: ['确定删除','取消']
        }
      }
    },
    monitor: {
       title: '节点池监控',
       total: '已创建 {total} 个节点池（最多可创建{count}个节点池）',
       button: '创建节点池',
       labels: ['节点池名称', '节点池有效算力', '总奖励', '节点池名下节点'],
       emptyText: '暂无创建节点池',
       dialog: {
         title: '创建节点池',
         labels: [
           { label: '节点池名称', placeholder:'最多可输入10个字符', text: '请输入节点池名称', name: 'name' },
           { label: '节点', placeholder:'请输入您节点池的节点，请用英文逗号隔开', text: '请输入您节点池的节点，请用英文逗号隔开', name:'miners'},
         ],
         buttons: ['确定', '取消'],
       }
    },
    admin: {
      title: '节点池管理',
      labels: [
        { label: '节点池名称： ', placeholder: '请输入节点池名称' },
        { label: '节点管理： ', placeholder: '请输入您要添加的节点' },
      ],
      enter: '回车确认',
      buttons: ['保存', '取消', '删除节点池'],
      dialog: {
        title:'确定要删除当前帐户吗？',
        content: '删除后节点池数据将全部删除',
        buttons: ['确定删除', '取消']
      },
      limit:['添加的节点有重复','添加的节点已存在','已达到添加上限'],
      nullTips: '当前节点池无节点，请添加至少一个节点后保存',
      chartTips: '请使用英文逗号'
    },
    notice: {
      title: '通知设置',
      tips: '通知方式：当您的地址余额预估可用时间不足120分钟开始通知',
      labels: ['地址:','类型: ','短信通知: ','电话通知: ','邮箱通知: '],
      phoneTips: '（提示：电话通知仅支持中国用户使用）',
      emailBtn: '添加通知账户',
      buttons: ['保存', '取消'],
      breadcrumbList: ['节点池监控', '通知设置'],
      msgDialog: {
        title:'短信通知',
        placeholder: ['请输入手机号','请输入验证码'],
        buttons:['确定','取消', '获取验证码']
      },
      phoneDialog: {
        title:'电话通知',
        placeholder: ['请输入手机号','请输入验证码'],
        buttons:['确定','取消', '获取验证码']
      },
      emailDialog: {
        title:'邮箱通知',
        placeholder: ['请输入邮箱号','请输入验证码'],
        buttons:['确定','取消', '获取验证码']
      }
    },

    list:{
      button: '节点池管理',
      poolOverview:{
         title: '节点池概览',
         labels: [
           { label:'有效算力/占比' },
           { label:'总奖励' },
           { label:'扇区质押' },
           { label:'预存款', tips: '当节点封装扇区进行PreCommits时，必须提供一些预存款作为质押，如果这部分扇区未能及时完成ProveCommitted，这部分预存款将会被罚没，如果按时完成了Prove则会被释放。' },
           { label: '锁仓奖励' }
         ]
      },
      nodeList:{
        title: '节点列表',
        labels: ['节点','标签','有效算力','总奖励','可用余额', '扇区质押','预存款','锁仓奖励']
      }
    },
    detail: {
      nodeOverview: {
        title: '节点概览',
        nodePower: '节点算力',
        panelLabels: [
          { label: '总奖励'},
          { label: '可用余额'},
          { label: '扇区质押'},
          { label: '预存款', tips: '当节点封装扇区进行PreCommits时，必须提供一些预存款作为质押，如果这部分扇区未能及时完成ProveCommitted，这部分预存款将会被罚没，如果按时完成了Prove则会被释放。'},
          { label: '锁仓奖励'}
        ],
        tableLabels: [
          { label: '类型' },
          { label: '地址' },
          { label: '余额' },
          { label: '预估剩余可用时间', tips: ' 预估剩余可用时间将在地址添加后30分钟内显示，如对应地址未进行Gas消耗则该地址预估剩余可用时间无法获取' },
          { label: '通知设置'}
        ]
      },
      nodeData: {
        title: '节点周期数据',
        datePick: ['至','开始日期','结束日期'],
        button: '下载Excel',
        panelLabels: [
          // { label: '有效算力' },
          { label: '新增封装算力' },
          { label: '出块奖励' },
          { label: '扇区质押' },
          { label: 'Gas消耗' }
        ],
        tableLabels: ['日期','节点','有效算力','封装算力','出块奖励', '扇区质押', 'Gas消耗']
      }
    },
  },
  apiStatus: [
    { code: 0 , message: 'ok'},
    { code: 1 , message: '验证码错误'},
    { code: 2 , message: '参数错误'},
    { code: 3 , message: '不支持的运营商号段'},
    { code: 4 , message: '账户已经被注册'},
    { code: 5 , message: '未知错误'},
    { code: 6 , message: '密码错误，请重新输入'},
    { code: 7 , message: '账号错误，请重新输入'},
    { code: 8 , message: '账号异常，禁止登录'},
    { code: 9 , message: '登录已过期，请重新登录'},
    { code: 10 , message: '第二次输入密码有误，请重新输入'},
    { code: 11 , message: '无效的操作'},
    { code: 12 , message: '验证码发送频率太高，请稍后再试'},
    { code: 13 , message: '节点池名字已存在，请重新输入'},
    { code: 14 , message: '节点不存在，请重新确认'},
    { code: 15 , message: '存储池数量已达上限'},
  ]
}
export default zh
