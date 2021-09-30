// const isTest = window.location.href.indexOf("calibration") >= 0
const isTest = false
const en = {
  links: {},
  mixin:{
    formatTime:{
      before: 'ago',
      suffix: ['day', 'hr', 'min', 's']
    }
  },
  component: {
    empty: {
      label: 'No Data'
    },
    heightDetail: {
      titles: ['Block Height', 'Block List'],
      heightLabels: ['WinCount', 'Rewards', 'Time'],
      blockLabels: ['Block Cid', 'Storage Provider', 'Rewards', 'Message Count']
    },
    filecoin: {
      labels: [
        'Market Cap',
        'Market Dominance',
        'Market Cap Rank',
        '24h Low/24h High',
        'Volume',
        'Diluted market value'
      ]
    },
    overview: {
      btnText: 'Pool Detail'
    },
    mesList: {
      title: 'Messages',
      heading: 'Message List',
      poolheading: 'Message Pool List',
      label: [
        'Message ID',
        'Height',
        'Time',
        'From',
        'To',
        'Value',
        'Status',
        'Method'
      ],
      blockLabel: ['Message ID', 'Height', 'From', 'To', 'Method', 'Value'],
      poolLabels: [
        'Message ID',
        'Time',
        'From',
        'To',
        'Value',
        'Gas Limit',
        'Gas Premium',
        'Method'
      ],
      mbLabel: ['Message ID', 'Time', 'From', 'To', 'Value', 'Gas Limit ','Gas Premium', 'Method' ],
      total: 'Latest {total} Messages <i>{extra}</i>',
      latest: '',
      // latest: "( latest 7 days )",
      range: '( {start} to {end} ) ',
      method: {},
      placeholder: 'Method',
      tips: '(Showing records in the last 1 week)',
      receipt: ['Success', 'Failed', 'Unknown'],
      fail: 'Failed',
      selector: [
        { label: 'IN', type: 'to' },
        { label: 'OUT', type: 'from' }
      ],
      type: ['IN', 'OUT']
    },
    blockList: {
      label: ['Block Cid', 'Height', 'Time', 'Messages', 'Storage Provider', 'Reward'],
      mbLabel: ['Block Cid', 'Storage Provider', 'Time', 'Reward', '', 'Messages'],
      mb: {
        height: 'Height:',
        time: 'Time:',
        label: ['Storage Provider', 'Block Cid', 'Messages', 'Reward']
      },
      total: 'Total of <i>{total}</i> Blocks(<i>{fil}</i>FIL)',
      height: 'Tipset Height # {height}',
      start: 'start date',
      end: 'end date',
      title: 'Block details'
    },
    transactionList: {
      total: 'Total of <i>{total}</i> message',
      label: ['Time', 'Message CID', 'From', 'To', 'Value', 'Type'],
      typeOptions: ['Send', 'Receive', 'Block Rewords', 'Other Penalty', 'Aggregate cost']
    },
    addressList:{
      heading: "Rich Ranking"
    },
    transferList: {
      heading: 'Large Amount Transfer',
      total: 'Total of {total} Message',
      labels: ['Height', 'Message ID', 'Time', 'From', 'To', 'Value', 'Method'],
      addressLabels: [
        'Time',
        'Message ID',
        'From',
        'To',
        'Value',
        'Method',
        'Type'
      ]
    },
    timeSelector: [
      { value: '24h', label: '24h' },
      { value: '1w', label: '1w' },
      { value: '1m', label: '1m' },
      { value: '1y', label: '1y' },
      { value: 'all', label: 'all' }
    ],
    times: {
      '6h': '6H',
      '24h': 'Today',
      '1d': 'Yesterday',
      '1w': '1Week',
      '1m': '30D',
      '6m': '6M',
      '0.5y': 'Half A Year',
      '1y': '1Year',
      all: 'All'
    },
    timeGrowth: {
      '24h': '24h',
      '1d': 'Yesterday',
      '1w': '7D',
      '1m': '30D',
      '6m': '6M',
      '0.5y': 'Half A Year',
      '1y': '1Year'
    },
    timeGrowth1: {
      '24h': 'Today',
      '1d': 'Yesterday',
      '1w': 'Week',
      '1m': '30D',
      '6m': '6M',
      '0.5y': 'Half A Year',
      '1y': '1Year'
    },
    more: 'More'
  },
  account: {
    login: {
      welcome: 'Welcome',
      account: 'Account',
      phoneLogin: ' Mobile login ',
      emailLogin: ' Email login ',
      phone: "Telephone",
      enterPhone: " Please enter your mobile number ",
      email: ' e-mail address ',
      enterEmail: " Please enter email address ",
      pass: 'Password',
      enterPass: " Please input a password ",
      code: " Verification Code ",
      enterCode: " Please enter the verification code ",
      getCode: " Get verification code ",
      resetPass: " reset password ",
      sure: " Sign in ",
      byPass: ' Sign in with password ',
      byCode: ' Login with verification code ',
      registerPrefix: "No account yet？",
      register: " Register new users ",
      remember: 'Remember your password and log in'
    },
    register: {
      welcome: 'Account registration',
      account: 'Account',
      setPwd: 'Set password',
      phoneRegister: " Mobile registration ",
      emailRegister: " Email registration ",
      phone: "Telephone",
      enterPhone: " Please enter the registered mobile phone number ",
      email: "e-mail address",
      enterEmail: " Please enter the registered email address ",
      pass: 'Password',
      enterPass: "Please input a password",
      passAgain: " Confirm password ",
      enterPassAgain: " Please confirm the password ",
      code: " Verification Code ",
      enterCode: " Please enter the verification code ",
      getCode: " Get verification code ",
      private: " Please agree to the service agreement and privacy terms ",
      hasPrefix: "Existing account？",
      has: "please log in ",
      sure: " Register "
    },
    reset: {
      welcome: 'Forget password',
      phoneReset: ' Reset with Phone ',
      emailReset: ' Reset with Email ',
      phone: "Telephone",
      enterPhone: " Please enter your mobile number ",
      email: " E-mail address ",
      enterEmail: " Please enter email address ",
      pass: ' New password ',
      enterPass: " Please enter a new password ",
      newPass: " Confirm new password ",
      enterNewPass: " Please confirm the new password ",
      code: " Verification Code ",
      enterCode: " Please enter the verification code ",
      getCode: " Get verification code ",
      has: " Existing account, please Reqister ",
      sure: "Sure",
      pre: ' Previous step ',
      next: ' Next step '
    },
    logout: {
      msg: ' You are about to log out. Do you want to continue ?',
      tip: 'Tips',
      confirm: 'Sure',
      cancel: 'Cancel',
      success: ' Log out successfully！',
      hasCancel: ' Cancelled ',
    },
    error: {
      emptyPhone: ' Please enter your mobile number ',
      errorPhone: ' Please input the correct mobile number ',
      emptyAccount: ' Account number cannot be empty ',
      errorAccount: ' Please enter the correct mobile number or email address ',
      emptyCode: ' Verification code cannot be empty ',
      emptyPass: ' Please input a password ',
      emptyNewPass: ' Please enter a new password ',
      errorPass: ' Password should be 8-20 characters with at least letters and numbers (case sensitive) ',
      notRegister: ' The account has not been registered ',
      hasRegister: " The account has been registered ",
      sameWithPhone: " The password cannot be exactly the same as the mobile phone number ",
      emptyPassAgain: ' Please enter the password again ',
      emptyNewPassAgain: ' Please enter the new password again ',
      differentPass: " The two passwords are inconsistent ",
      agreePrivate: " Please agree to the service agreement and privacy terms ",
      emptyTag: " Please enter comments ",
      emptyAddress: ' Please enter wallet address ',
      emptyMail: ' Please enter the correct email address ',
      errorEmail: " Email address format error ",
      registerMail: " Mailbox is already registered ",
      emptyNumber: ' Please enter the ID number or passport ',
      emptyName: ' Please enter a name ',
      nameError: ' Name cannot exceed 64 characters ',
      areaCodeError: ' Please enter the correct international area code ',
      phoneError: ' Please enter the correct mobile number ',
      picTypeError: ' The uploaded picture can only be in JPG or PNG format ',
      picSizeError: ' The size of uploaded picture cannot exceed 5MB ',
      infoNotMatch: {
        title: 'Identity information does not match!',
        mes: "The identity authentication information you submitted does not match the identity information of the mobile phone number"
      },
      mustHaveOne: 'Keep at least one security verification method'
    },
  },
  header: {
    network: 'Current network:',
    centerOption:[
      { index: 'center', label: 'Your Profil' },
      { index: 'monitor', label: 'Pool Panel' },
      { index: 'LogOut', label: 'Logout' },
    ],
    meta: {
      content1: 'Filscan,Filecoin,Latest Block,Filecoin Explorer,FIL,IPFS，FIL,Filecoin Browser For Blockchain Query ,FIL Browser,Filecoin Browser, Block Query of Filecoin, Search Engine of Blockchain,Block Height, Blockchain Transaction',
      content2: 'Filscan block browser, a blockchain search engine, is the basic ecological tool of filecoin. It is providing relevant data on the real-time chain, and which set query Filecoin block, transaction, fil token, wallet and other information, update filecoin all node information on real-time synchronous'
    },
    seo: {
      index: 'Filscan--Filecoin Explorer',
      chain: 'Chain - Filscan Explorer',
      message: 'Messages - Filscan Explorer',
      pool: 'Messages In Flight - Filscan Explorer',
      address: 'Rich ranking - Filscan Explorer',
      largeTransfer: 'Large Transfer - Filscan Explorer ',
      addressDetail: 'Address {address} - Filscan Explorer',
      dsn: 'All Deals - Filscan Explorer',
      dsnDetail: 'Deal Detail {dealid} - Filscan Explorer',
      messageDetail: 'Message {message} - Filscan Explorer',
      mining: 'Pool Rank - Filscan Explorer',
      calculator: 'Calculator - Filscan Explorer',
      gas: 'Gas Fee Trend - Filscan Explorer',
      fil: 'FIL - Filscan Explorer',
      stats: 'Charts - Filscan Explorer',
      baseTrend: 'BaseLine & Power Trend - Filscan Explorer',
      map: 'Map - Filscan Explorer',
      resource: "Resource - Filscan Explorer"
    },
    title: 'Filscan',
    placeholder: 'Search by Address/Message ID/Height/Block Cid/Peer ID',
    filter: [
      {
        label: 'All filters',
        value: 0
      },
      {
        label: 'Address',
        value: 1
      },
      {
        label: 'Message ID',
        value: 2
      },
      {
        label: 'Height',
        value: 3
      },
      {
        label: 'Block Cid',
        value: 4
      },
      {
        label: 'Peer ID',
        value: 5
      }
    ],
    nav: {
      home: {
        label: 'Home',
        index: 'home',
        path: '/'
      },
      tipset: {
        label: 'Tipset',
        index: 'tipset',
        down: true,
        items: [
          {
            label: 'Chain',
            path: '/tipset/chain',
            index: 'chain'
          },
          {
            label: 'Message',
            path: '/tipset/message-list',
            index: 'message-list'
          },
          {
            label: 'Rich Ranking',
            path: '/tipset/address-list',
            index: 'address-list'
          },
          {
            label: 'Large Amount Transfer',
            path: '/tipset/transfer-list',
            index: 'transfer-list'
          },
          {
            label: 'Dsn',
            path: '/tipset/dsn',
            index: 'dsn'
          },
          {
            label: 'Pool Message',
            path: '/tipset/pool-message-list',
            index: 'pool-message-list'
          }
        ]
      },
      mining: {
        label: 'Ranking',
        path: '/mining',
        index: 'mining'
      },
      statistics: {
        label: 'Statistics',
        index: 'statistics',
        down: true,
        items: [
          {
            label: 'Gas Fee',
            index: 'gas',
            path: '/statistics/gas'
          },
          {
            label: 'BaseFee& Power',
            path: '/statistics/power',
            index: 'power'
          },
          {
            label: 'FIL',
            path: '/statistics/fil',
            index: 'fil'
          },
          {
            label: 'Charts',
            index: 'charts',
            path: '/statistics/charts'
          },
          {
            label: 'Map',
            index: 'map',
            path: '/statistics/map'
          }
        ]
      },
      resources: {
        label: 'Resources',
        index: 'resources',
        down: true,
        items: [
          {
            label: 'Calculator',
            path: '/resources/calculator',
            index: 'calculator',
          },
          {
            label: 'Tools',
            path: '/resources/tools',
            index: 'tools',
          }
        ]
      },
      // filwallet: {
      //   label: 'Wallet',
      //   href: 'https://filecoinwallet.com/',
      //   index: 'filwallet',
      // },
      incubation: {
        label: 'Storage Provider',
        path: '/forcepool/center?type=1',
        index: 'incubation',
        pro: true
      }
    },
    mbnav: {
      home: {
        label: 'Home',
        index: 'home',
        path: '/'
      },
      tipset: {
        label: 'Tipset',
        index: 'tipset',
        isSubShow: false,
        close: 'icon-down',
        up: 'icon-up',
        items: [
          {
            label: 'Tipset',
            path: '/tipset/chain',
            index: 'chain'
          },
          {
            label: 'Messages',
            path: '/tipset/message-list',
            index: 'message-list'
          },
          {
            label: 'View All Accounts',
            path: '/tipset/address-list',
            index: 'address-list'
          },
          {
            label: 'Large Amount Transfer',
            path: '/mobile/tipset/transfer-list',
            index: 'transfer-list'
          },

          {
            label: 'View All Deals',
            path: '/tipset/dsn',
            index: 'dsn'
          },
          {
            label: 'Messages Pool',
            path: '/tipset/pool-message-list',
            index: 'pool-message-list'
          }
        ]
      },
      mining: {
        label: 'Ranking',
        path: '/mining',
        index: 'mining'
      },
      statistics: {
        label: 'Statistics',
        index: 'statistics',
        isSubShow: false,
        close: 'icon-down',
        up: 'icon-up',
        items: [
          {
            label: 'Gas',
            index: 'gas',
            path: '/mobile/statistics/gas'
          },
          {
            label: 'power Trend',
            path: '/mobile/statistics/power',
            index: 'power'
          },
          {
            label: 'Fil',
            path: '/mobile/statistics/fil',
            index: 'fil'
          },
          {
            label: 'Charts',
            index: 'charts',
            path: '/mobile/statistics/charts'
          }
        ]
      },
      resources: {
        label: 'Resources',
        index: 'resources',
        isSubShow: false,
        close: 'icon-down',
        up: 'icon-up',
        items: [
          {
            label: 'Calculator',
            path: '/resources/calculator',
            index: 'calculator',
          },
          {
            label: 'Tools',
            path: '/resources/tools',
            index: 'tools',
          }
        ]
      },
      filwallet: {
        label: 'Wallet',
        href: 'https://filwallet.ai/',
        index: 'filwallet',
      },
      incubation: {
        label: 'Incubation Center',
        href: 'https://venus.filecoin.io/incubation/Rules.html#storage-provider-incubation-program',
        index: 'incubation',
        hot: true
      }
    },
    mb: {
      title: 'Filecoin Search',
      search: 'Search'
    },
    cancel: 'Cancel'
  },
  footer: {
    mobile: [
      {
        label: 'Filecoin',
        href: ' https://filecoin.io'
      },
      {
        label: 'Faucet ',
        href: isTest
          ? 'https://faucet.calibration.fildev.network/'
          : 'https://faucet.glif.io/'
      },
      {
        label: 'Docs',
        href: 'https://lotu.sh/'
      },
      {
        label: 'Info',
        href: ' https://testnet.filecoin.io/'
      }
    ],
    links: [
      {
        title: 'Filecoin',
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
            label: 'Protocol Labs',
            class: 'icon-slack',
            href: 'https://protocol.ai/'
          },
          {
            label: 'ProtoSchool',
            class: 'icon-slack',
            href: 'https://proto.school/'
          },
          {
            label: 'Filecoin Twitter',
            class: 'icon-slack',
            href: 'https://twitter.com/Filecoin'
          },
          {
            label: 'Filecoin WeChat',
            class: 'icon-wechat',
            popover: true
          },
          {
            label: 'Filecoin Community Github',
            class: 'icon-matrix',
            href: 'https://github.com/filecoin-project/community'
          },
          {
            label: 'Filecoin Foundation',
            class: 'icon-matrix',
            href: 'https://fil.org/'
          },
          {
            label: 'Filecoin DevGrants',
            class: 'icon-ttww',
            href: 'https://github.com/filecoin-project/devgrants'
          },
          // {
          //   label: 'IPFSForce WeChat',
          //   class: 'icon-wechat',
          //   popover: true
          // },
          {
            label: 'Feedback',
            href: 'http://ipfsforce.mikecrm.com/E6kYnYI'
          }
        ]
      },
      {
        title: 'Implementations',
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
            // label: 'filwallet.ai',
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
        title: 'Ecosystem Applications',
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
        title: 'DevTools',
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
    contact: 'Email: ',
    detail:
      'Filscan browser is the filecoin blockchain browser and data service platform，It provides one-stop data services such as mining ranking, blockchain data query and visualization chart based on filecoin.',
    ipfs: 'IPFS',
    copyright:
      'Copyright © Filecoin-Project devgrants. Distributed under the <a href="https://www.mit-license.org/" target="_blank"> MIT </a> and<a href="https://www.apache.org/licenses/LICENSE-2.0.html" target="_blank"> Apache 2.0 </a>license.',
    copyright1:
        'Copyright © Filecoin-Project devgrants. Distributed under the <a href="https://www.mit-license.org/" target="_blank"> MIT </a> and<a href="https://www.apache.org/licenses/LICENSE-2.0.html" target="_blank"> Apache 2.0 </a>license. Dev. by <a href="https://ipfser.org" target="_blank"> IPFSFORCE</a>.'
  },
  home: {
    tips:
      'Lotus upgrading may cause data display errors. <span>We are working on it.</span> Sorry for troubleing you.',
    subtitle: {
      index: 'Data index of the whole network',
      charts: 'Charts Statistics',
      pool: 'Storage Pool',
      poolTips: 'This ranking only counts mining pools over 1 PiB',
      transfer: 'Large Amount Transfer',
      moreChart: 'More Chart'
    },
    charts: {
      more: 'More Charts'
    },
    blocksWon: {
      title: 'Latest Block',
      miner: 'Storage Provider',
      block: {
        title: 'Blocks',
        tips: 'Block count/rate of total block in the latest 30 minutes'
      },
      blockRate: {
        title: 'Block Rate',
        tips: 'Block rate per tipset in the latest 30 minutes'
      },
      win: {
        title: 'WinCount',
        tips: 'Wincount/rate of total wincount  in the latest 30 minutes'
      },
      more: 'More',
      latest:
        'The Last block time：<i class="font-18 mark font-500">{time}</i> &nbsp;ago',
      chart: {
        title: 'No block found in the latest 30 minutes',
        tooltip:
          '<div>NodeID: {miner_id}</div><div>Height: {height}</div><div>BlockTime: {block_time}</div><div>BlockCid: {cid}</div><div>WinCount: {win_count}</div>'
      }
    },
    metaList: {
      tabs: ['open', 'close']
    },
    meta: [
      { label: 'Block Height' },
      { label: 'Latest Block' },
      { label: 'Network Storage Power', tips: 'The sum of the current effective computing power (effective storage space) of the whole network' },
      { label: 'Latest 24h Power Growth' },
      { label: 'Latest 24h Output Efficiency', tips: 'Ratio of total block reward to effective computing power in the last 24 hours' },

      { label: 'Base Fee' },
      { label: 'Current Sector Initial Pledge' },
      {
        label: 'Gas Used of 32G Sectors',
        tips: 'Gas used of Sealing 32G Sectors.'
      },
      {
        label: 'Cost of Sealing 32G Sectors',
        tips:
            'The cost of sealing 32G sectors, including sector initial pledge and message fees'
      },
      { label: 'Latest 24h Block Reward' },

      { label: 'Total Block' },
      { label: 'Total Block Rewards' },

      {
        label: 'Gas Used of 64G Sectors',
        tips: 'Gas used of Sealing 64G Sectors.'
      },
      {
        label: 'Cost of Sealing 64G Sectors',
        tips:
          'The cost of sealing 64G sectors, including sector initial pledge and message fees'
      },
      { label: 'Rewards Per Wincount' },

      {
        label: 'Avg Messages per TipSet',
        tips: 'Average messages packaged per tipSet in 24h.'
      },
      { label: 'Destruction Amount' },
      { label: 'Active Nodes' },
      { label: 'Circulation Amount' },
      {
        label: 'Avg Blocks per TipSet',
        tips: 'Average blocks produced per tipSet in 24h.'
      }
    ],
    mbMeta: [
      {
        label: 'Power Returns'
      },
      { label: 'Rewards Per WinCount' },
      {
        label: 'Efficiency'
      },
      { label: 'Total Block Rewards' },
      { label: 'Total Block' },
      { label: 'Latest Block Height' },
      {
        label: 'Total QualityAdjPower'
      },
      {
        label: 'Active Nodes'
      }
    ],
    chart: {
      power: {
        title: 'baseline and storage power trend',
        yAxisName: ['Network Power', 'Baseline', 'Power Growth'],
        tips:
          'The network baseline is the scale of network growth required by the Filecoin Network, which was 2.5 EiB when the Mainnet launched, with a growth rate of 100% per year.'
      },
      blockReward: {
        title: '24h Base Fee Variations',
        subTitle: 'In the latest 24h',
        meta: ['Block Count: ', '', 'WinCount: ', '', 'Rewards: '],
        yAxisName: ['Base Fee', '32G Sector', '64G Sector'],
        chart: {
          yAxisName: ['Rewards / FIL', 'Block / no.'],
          tooltip:
            '<div>{lineMarker}Hourly Rewards: {lineCount} FIL</div><div>{barMarker}Hourly Block Count: {barCount}</div><div>Hourly WinCount:{winCount}</div>'
        }
      },
      region: {
        title: 'FIL Distribution',
        total: "Power: <i class='mark'>{total}</i>",
        continent: [
          { key: 'circulating', name: 'Circulating', color: '#5B8FF9' },
          { key: 'locked', name: 'Locked Fund', color: '#5AD8A6' },
          { key: 'vested', name: 'Initial Pledge', color: '#5D7092' },
          { key: 'burnt', name: 'Burnt', color: '#F6BD16' },
          { key: 'mined', name: 'Node Awards', color: '#E8684A' },
          { key: "other", name: "", color: "#999999" },
        ]
      }
    },
    topPowerTable: {
      title: 'Top Nodes',
      label: ['Storage Provider', 'QualityAdjPower', 'RawBytePower', 'Blocks', 'Rewards'],
      mbLabel: ['Storage Provider', 'RawByte', 'Blocks', 'Rewards']
    },
    tag:
      'If you want to update your Node Tag, please send email to filscan@ipfsforce.com, or wechat:ipfsforce',
    lucky:
      'Deviation of actual wincount rate of node compared with the average value of the total network',
    topPowerChartLabel: [
      { label: 'RawBytePower', index: 'RawBytePower' },
      { label: 'QualityAdjPower', index: 'QualityAdjPower' }
    ],
    rate: {
      title: "Node's Efficiency",
      table: {
        label: ['Storage Provider', 'Power Growth', 'Storage Rate', 'Power Returns'],
        mbLabel: ['Storage Provider', 'Increment', 'Storage Rate', 'Returns']
      },
      chart: {
        title: "Node's Efficiency"
      }
    },
    latest: {
      block: {
        title: 'The Latest Blocks',
        time: 'Time:',
        more: 'More',
        height: 'Height:',
        hash: 'Cid:',
        miner: 'Storage Provider:',
        reward: 'BlockReward:'
      },
      message: {
        title: 'The Latest Messages',
        more: 'More',
        id: 'Message ID:',
        from: 'From:',
        to: 'To:'
      }
    },
    filType: {
      floating: 'Floating: ',
      pledge: 'Pledge Collateral: ',
      outstanding: 'Outstanding: '
    },
    watch: 'Chain Watch',
    transfer: {
      plabels: ['From', '', 'To', 'Height', 'Value'],
      labels: ['From', 'To', 'Value']
    },
    poolTable: {
      tips:
        'The ratio of mining pool‘s accumulative block rewards to its Quality Adjusted Power within 7 days'
    }
  },
  tipset: {
    height: 'Height',
    block: {
      overview: [
        'Cid',
        'Height',
        'Time',
        'Messages',
        'Storage Provider',
        'WinCount',
        'Reward',
        'Parent Cid',
        'Parent Weight',
        'Parent BaseFee Rate',
        'Ticket',
        'State Root'
      ],
      rewards:
        '{reward} FIL ( {block} FIL Block Reward and {fee} FIL Fee Reward )'
    },
    blockType: ['Null Block', 'Min Ticket Block', 'Other Block'],
    tips: 'Ticket is a random number',
    tooltip: [
      {
        label: 'NodeId: ',
        key: 'node'
      },
      {
        label: 'Height: ',
        key: 'height'
      },
      {
        label: 'BlockTime: ',
        key: 'utcTime'
      },
      {
        label: 'BlockCid: ',
        key: 'hash'
      },
      {
        label: 'WinCount: ',
        key: 'win_count'
      }
    ],
    item: {
      height: 'Height:',
      time: 'Time:',
      labels: ['Height', 'Cid', 'Storage Provider', 'Tag', 'Message', 'Reward', 'Time']
    }
  },
  mining: {
    heading: 'Ranking List',
    efficiency: {
      title: "Node's efficiency",
      placeholder: "Search by Node ID, separate by ',' for multiple id",
      label: [
        'Rank',
        'Storage Provider',
        'Tag',
        'Rewards/Ratio',
        'Blocks',
        'Wincount Rate',
        'Adj.Power',
        'Sector Size '
      ],
      mblabel: [
        'Rank',
        'Wincount Rate',
        'Blocks',
        'Rewards/Ratio',
        'Adj.Power',
        'Sector Size '
      ],
      tips: [
        '',
        'In Filecoin CryptoEconomics, there may be multiple blocks under a tipset, and each block may receive multiple win counts.',
        "The ratio of node's cumulative block reward to the adjusted storage power in the selected period."
      ],
      mbLabel: ['Rank', 'Storage Provider', 'Tag', 'Storage Rate'],
      mbLabel2: ['Rank', 'Storage Provider', 'Tag', 'Power Returns ']
    },
    poolranking: {
      label: [
        'Rank',
        'Pool Name',
        'Power Growth',
        'Daily Power Growth',
        'Power Growth',
        'Adj.Power',
        'Sector'
      ],
      mblabel: [
        'Rank',
        'Owner ID',
        'Adj.Power',
        'Mining Efficiency',
        'Power Growth',
        'Lucky Value',
        'Blocks Count'
      ]
    },
    powerRate: {
      label: [
        'Rank',
        'Storage Provider',
        'Power Growth',
        'Daily Power Growth',
        'Adj.Power',
        'Power Growth',
        'Sector'
      ]
    },
    poolRanking: {
      labels: [
        'Rank',
        // 'Pool Name',
        'Owner ID',
        'Adj.Power',
        'Latest 24h Output Efficiency',
        'Power Growth',
        // 'Lucky Value',
        'Blocks Mined'
      ],
      mlabels: [
        '排名',
        'Owner ID',
        'Adj.Power',
        'Mining Efficiency',
        'Power Growth',
        // 'Lucky Value',
        'Blocks Count'
      ]
    },
    minerRanking: {
      labels: [
        'Rank',
        'Storage Provider',
        'Tag',
        'Adj.Power / Rate',
        '24h Power Growth',
        'Blocks / Rate ',
        // 'WinCount',
        'Wincount Rate',
        'Balance'
      ],
      mblabels: [
        'Rank',
        'Adj.Power / Rate',
        '24h Power Growth',
        'Blocks / Rate ',
        // 'WinCount',
        'Wincount Rate',
        'Balance'
      ]
    },
    powerRanking: {
      labels: [
        'Rank',
        'Storage Provider',
        'Tag',
        'Power Growth',
        'Daily Power Growth',
        'Power Growth',
        'Adj.Power',
        'Sector Size'
      ],
      mblabels: [
        'Rank',
        'Daily Power Growth',
        'Power Growth',
        'Adj.Power',
        'RawBytePower',
        'Sector Size'
      ],
      tips: [
        'Daily total adj. power of the sealed sectors within selected period.',
        "Node's adjusted storage power increment in the selected period."
      ],
      sectorOption: [
        {
          index: '0',
          value: '',
          label: 'All Sectors'
        },
        {
          index: '1',
          label: '32G Sector'
        },
        {
          index: '2',
          label: '64G Sector'
        }
      ]
    },
    topPowerTable: {
      title: 'Top Nodes',
      label: [
        'Rank',
        'Storage Provider',
        'Tag',
        'QualityAdjPower',
        'RawBytePower',
        'Blocks',
        'WinCount',
        'Rewards',
        'Last Block Tipset',
        'Running Time',
        'Balance'
        //"Area"
      ],
      mbLabel: ['Rank', 'Tag', 'Adj.Power/Rate'],
      mbLabel2: [
        'Rank',
        'Pool Name',
        'Owner ID',
        'Adj.Power',
        'Output Efficiency'
      ],
      lowBalance: 'Balance less than 200'
    },
    switch: ['Top Nodes', 'Efficiency'],
    switch2: ['Storage Pool', 'Storage Provider', 'Power Growth', 'Rewards']
    // switch2: ["Top Miners", "Power Growth", "Power Returns"]
  },
  statistics: {
    fil: {
      filTips: '',
      allocationTips: '',
      allocationTitle: 'FIL Allocation',
      trend: 'FIL Spot price trend',
      trend2: 'FIL Allocation',
      tips: 'Price data sources：coingecko',
      continent: [
        {
          key: 'Filecoin Foundation',
          name: 'Filecoin Foundation',
          value: '5',
          color: '#4f7edb'
        },
        {
          key: 'PL Team & Contributors',
          name: 'PL Team & Contributors',
          value: '4.5',
          color: '#4fbc94'
        },
        {
          key: 'Protocol Labs',
          name: 'Protocol Labs',
          value: '10.5',
          color: '#516383'
        },
        {
          key: 'Fundraising-Remainder',
          name: 'Fundraising-Remainder',
          value: '2.5',
          color: '#D3A51A'
        },
        {
          key: 'Fundraising-SAFT 2017',
          name: 'Fundraising-SAFT 2017',
          value: '7.5',
          color: '#C75c46'
        },
        {
          key: 'Mining Reserve',
          name: 'Mining Reserve',
          value: '15',
          color: '#5Faed0'
        },
        {
          key: 'Storage Mining Allocation',
          name: 'Storage Mining Allocation',
          value: '55',
          color: '#7E63b3'
        }
      ],
      sourceLabel: [
        {
          label: 'Allocation',
          value: 'Value',
          Released: 'Released',
          description: 'Description'
        },
        {
          label: 'FIL BASE',
          value: '2,000,000,000',
          Released: '2,000,000',
          description: 'The maximum amount of FIL that will ever be created.'
        },
        {
          label: 'Mining Reserve',
          value: '300,000,000 ',
          Released: '300,000 ',
          description:
            'Tokens reserved for funding mining to support growth of the Filecoin Economy, whose future usage will bedecided by the Filecoin community.'
        },
        {
          label: 'Storage Mining Allocation',
          value: '1,100,000,000',
          Released: '1,100',
          description:
            'The amount of FIL allocated tostorage nodes through block rewards, network initialization, etc.'
        },
        {
          label: 'Fundraising - SAFT 2017',
          value: '150,000,000 ',
          Released: '50,000 ',
          description: '2017 TOKEN SALE'
        },
        {
          label: 'Fundraising - Remainder',
          value: '50,000,000',
          Released: '50,000 ',
          description: 'allocated for ecosystem development, future fundraising'
        },
        {
          label: 'Protocol Labs',
          value: '210,000,000',
          Released: '20,000',
          description: 'allocated for Protocol Labs'
        },
        {
          label: 'PL Team &amp; Contributors',
          value: '90,000,000',
          Released: '9,000 ',
          description: '4.5% for the PL team & contributors'
        }
      ]
    },
    charts: {
      title: 'chart statistics',
      pledgeTitle: 'Single T mortgage trend',
      rewardTitle: 'Block Reward',
      minerTitle: 'Active Storage Provider',
      messageTitle: 'Message Trend',
      blockReward: {
        names: ['Mining Output Efficiency', 'Cumulative Block Reward']
      },
      MessageTrend: {
        names: ['Message Trend of Each Block', 'Message Trend of All Blocks']
      }
    }
  },
  calculator: {
    filUnit: '$',
    subtitle: 'Start mining time：',
    switch: ['Full storage capacity', 'Storage Provider Mining rig '],
    labels1: ['Cycle', 'Rewards', 'submit WindowPoSt only'],
    columns1: ['Daily', 'Weekly', 'Monthly', 'Annually'],
    labels2: [
      'Period of static cost recovery',
      'Mining cost(total cost+Gas Fee/540-day rewards)',
      '540-day rewards'
    ],
    input1: ['Daily power returns', 'FIL price', 'submit WindowPoSt only'],
    input2: ['Total storage power', 'hardware and operations'],
    input3: [
      'Sector size',
      'Scale of capacity',
      'Power growth',
      'hardware and operations'
    ],
    input4: [
      'Daily power returns',
      'FIL price',
      'power growth',
      'submit WindowPoSt only',
      'Sector initial pledge'
    ],
    labels3: [
      'Number of days required',
      'Initial pledge of full storage power',
      'Cost of full storage power growth',
      'Daily rewards (full storage power)',
      'Static cost recovery',
      'Mining cost(total cost+Gas Fee/540-day rewards)',
      '540-day rewards'
    ],
    buttonLabels: 'Start',
    tips:
      'Disclaimer: this calculator is based on static data. In real situation, FIL price, daily rewards(FIL/T) and cost of submit WindowPoSt only are all dynamic values. Therefore, the result is for reference only, not for investment advice.'
  },
  more: {
    gas: {
      title: 'Base Fee Variations',
      tb_title: '24h Gas Data',
      labels: [
        'Message Type',
        'Gas Premium',
        'Avg. Gas Limit',
        'Avg. Gas Used',
        'Avg. Gas Fee',
        'Total Fees/Pencentage',
        'Total Messages/Pencentage'
      ]
    },
    stats: {
      meta: [
        {
          label: 'Avg Blocks in Tipset',
          tips: 'Avg Blocks in Tipset in the last 24H'
        },
        {
          label: 'Avg Messages in Block',
          tips: 'Avg Number of Messages per Tipset Height in the last 24H'
        },
        {
          label: 'Avg Gas Price',
          tips: 'Avg Gas Price in the Last 24h'
        },
        {
          label: 'Pledge Collateral',
          tips: 'Total Fil in Pledge Collateral'
        },
        {
          label: 'Floating',
          tips: ''
        },
        {
          label: 'Outstanding',
          tips: ''
        }
      ],
      filOutstanding: {
        filType: {
          floating: 'Floating: ',
          pledge: 'Pledge Collateral: ',
          outstanding: 'Outstanding: '
        }
      },
      top: {
        title: 'Top Nodes'
      },
      rate: {
        title: "Node's Efficiency"
      },
      activeMiner: {
        title: 'Active Storage Nodes',
        count: 'Storage Provider Count: ',
        tips: 'The StorageNodes who made sector or sent messages'
      },
      blockTime: {
        label: 'Avg Blocktime',
        min: 'Min',
        max: 'Max',
        tips: 'Avg blocktime in the last 24H'
      }
    }
  },
  stats: {
    metrics: {
      blockReward: {
        title: 'Cumulative Block Rewards'
      },
      filecoin: {
        title: 'Filecoin Network Block Reward Curve'
      },
      filVested: {
        title: 'FIL Vested'
      },
      contact: 'If you want to show more Data, Please send email to '
    },
    peer: {
      title: 'Peer ID:',
      label: ['Peer ID', 'Storage Provider Address', 'IP', 'Location']
    }
  },
  address: {
    heading: 'Rich list',
    list: {
      pcLabel: ['height', 'Cid', 'Time', 'From', 'To', 'Value', 'Methods'],
      label: [
        'Rank',
        'Address',
        'Tag',
        'Balance/Rate',
        'Status',
        'Last Seen Time'
      ],
      total: 'Total of  {num} Accounts',
      options: [
        { value: '', index: '0', label: 'All Types' },
        { value: 'account', index: '1', label: 'account' },
        { value: 'owner', index: '2', label: 'owner' },
        { value: 'miner', index: '3', label: 'node' },
        // { value:"system", index: "4", label:"system" },
        // { value:"init", index: "5", label:"init" },
        // { value:"cron", index: "6", label:"cron" },
        // { value:"power", index: "7", label:"power" },
        // { value:"market", index: "8", label:"market" },
        { value: 'payment', index: '9', label: 'payment' },
        { value: 'multisig', index: '10', label: 'multisig' }
        // { value:"reward", index: "11", label:"reward" },
      ]
    },
    detail: {
      mtitle: "Storage Provider Overview",
      titleAcount: 'Account Overview',
      account: 'Address:',
      pool: {
        title: 'Pool Detail',
        tips: 'The data of mine pool is collected from the data of nodes.',
        labels: ['Account', 'Owner Address', 'Nodes'],
      },
      dialog: {
        updateName: 'Update Name>',
        updateNames: ['Update Name >', 'Apply Account >'],
        title: 'Signature verification',
        subtitle: 'Only open claim for accounts with storage power ≥ 32.00 GiB',
        labels: [
          'Owner address',
          'Account abbreviation(En)',
          'Account abbreviation(Zh)',
          'Contact',
          'Message',
          'Sign code',
          'Signature'
        ],
        placeholders: [
          '',
          'Cannot over 18 characters',
          'Cannot over 18 characters',
          'Email、telephone nemb...',
          '',
          '',
          'Pleasa copy the above sign code,sign it with Filecoin wallet,and enter the signature'
        ],
        tips:
          'Special notes: sensitive workds, prohibited words, celebrity names, etc. are not allowed in account names. If there is any violation, the signature will be deleted and prohibited. Thank you for your cooperation.',
        btnText: 'submit'
      },
      title: 'Account changes',
      overview: [
        'Address',
        'ID',
        'Type',
        'Balance',
        'Message Count',
        'Nonce',
        'Code Cid',
        'Create Time',
        'Lastest Timestamp',
        'Multisig Account',
      ],
      worker: 'Worker List',
      ownerOverview: [
        'Owner Account',
        'Peer ID',
        'RawBytePower',
        'QualityAdjPower',
        'Sector Size',
        'Sector Number',
        'Proving Sector Number',
        'Fault Number'
      ],
      owner: [
        'Address',
        'ID',
        'Type',
        'Balance',
        'Message Count',
        'Nonce',
        'Code Cid',
        'Create Time',
        'Lastest Timestamp',
        'Nodes List',
        'Active Nodes List',
        'Multisig Account',
      ],
      storageMiner: [
        'Address',
        'Type',
        'Balance',
        'Owner',
        'Peer ID',
        'RawBytePower',
        'QualityAdjPower',
        'Sector Size',
        'Sector Number',
        'Proving Sector Number',
        'Fault Number',
        'Code Cid',
        'Nonce'
      ],
      multisig: [
        'Address',
        'Type',
        'Robust Address',
        'Balance',
        'Available Balance',
        'Initial Balance',
        'Unlock Period',
        'Locking Balance',
        'Signers',
        'Approval Threshold',
        'Message Count',
        'Nonce',
        'Code Cid',
        'Create Time',
        'Lastest Timestamp'
      ],
      OwnerToMultisig: [
        'Address',
        'Type',
        'Robust Address',
        'Balance',
        'Available Balance',
        'Initial Balance',
        'Unlock Period',
        'Locking Balance',
        'Signers',
        'Approval Threshold',
        'Message Count',
        'Nonce',
        'Code Cid',
        'Create Time',
        'Lastest Timestamp',
        'Nodes List',
        'Active Nodes List'
      ],
      minerOverview: {
        balance: {
          title: 'Total Balance',
          balance: 'Address Balance',
          available: 'Available:',
          pledged: 'Initial Pledge:',
          deposits: 'PreCommitDeposits:',
          reward: 'Locked Rewards:'
        },
        power: {
          title: 'Power Glance',
          rank: 'Ranking',
          subtitle: 'QualityAdjPower',
          raw: 'RawBytePower: ',
          rate: 'Power Rate: ',
          block: 'Total Blocks: ',
          reward: 'Total Reward: ',
          win: 'Total Wincount: ',
          size: 'Sector Size: ',
          status: 'Sector Status: ',
          total: 'Total ',
          proving: 'Active ',
          fault: 'Faults ',
          pre: 'Recoveries '
        },
        growth: {
          labels: [
            { label: 'Power Increase: ' },
            { label: 'Storage Provider Precommit Deposits:' },
            {
              label: 'Block: ',
              tips: 'Blocks mined = the sum of blocks mined'
            },
            {
              label: 'Efficiency: ',
              tips:
                "The ratio of node's cumulative block reward to the adjusted storage power in the selected period."
            },
            { label: 'Power Ratio: ' },
            { label: 'Gas Fee: ' },
            { label: 'Block Rewards:' },
            {
              label: 'Lucky:',
              tips:
                "Ratio of actual blocks produced and theoretical value. If the node's Adj. Power is less than 1PiB, the value has a large randomness and is for reference only."
            },
            { label: 'Sector Increase: ' },
            { label: 'Sector Ratio: ' },
            {
              label: 'Winner Rewards: ',
              tips:
                'In Filecoin mining model, there may be multiple blocks under a tipset, and each block may receive multiple win counts.'
            },
            {
              label: 'consume per:',
              tips:
                'Single T package sector size gas consumption in selected period'
            }
          ],
          title: 'Statistical Indicators',
          unit: ' Sectors'
        }
      },
      accountOverview: {
        title: 'Account Overview',
        actor: 'Actor:',
        owner: 'Owner:',
        time: 'Create Time：',
        runningDays: 'Running Time:',
        type: 'Type: ',
        worker: 'Worker:',
        peer: 'Peer ID:',
        address: 'Address:',
        controller: 'Controller:',
        location: 'Region',
        // location: 'Region(Public IP):',
        unknown: 'unknown'
      },
      mbaccountOverview: [
        'Account: ',
        'Type: ',
        'Address:',
        'Owner:',
        'Worker:',
        'Controller:',
        'Create Time：',
        'Running Time:',
        'Peer ID:',
        'Region:'
        // 'Region(Public IP):'
      ],
      minerBalance: {
        title: 'Account changes',
        chart: {
          title: 'Total Power',
          tooltip:
            '<div>{time}</div><div>{marker} {name}: {value} FIL</div>'
        },
        tooltip: ['Available', 'Pledge', 'PreCommitDeposits', 'Rewards'],
        balance: 'balance: '
      },
      minerPower: {
        title: 'QualityAdjPower',
        names: ['Power', 'Power Increase'],
        chart: {
          title: 'Total Power',
          tooltip:
            '<div>{time}</div><div>{marker}Total QualityAdjPower: {power}</div>'
        }
      },
      minerBlock: {
        title: 'Node’s Block',
        chart: {
          title: ['Total Block', 'Growth']
        }
      },
      minerReward: {
        title: 'Node’s Rewards',
        chart: {
          title: ['Total Reward / FIL', 'Growth / FIL']
        }
      },
      claim: {
        title: 'Claim Account',
        subTitle: 'Only open claim for accounts with storage power ≥ 32.00 GiB',
        owner: {
          label: 'Owner address',
          placeholder: ''
        },
        en: {
          label: 'Account abbreviation',
          placeholder: 'Cannot over 18 characters',
          error: 'please enter account abbreviation'
        },
        nameEn: {
          label: 'Account name(En)',
          placeholder: 'Optional'
        },
        zh: {
          label: 'Account abbreviation(Zh)',
          placeholder: 'Optional'
        },
        nameZh: {
          label: 'Account name(Zh)',
          placeholder: 'Optional'
        },
        contact: {
          label: 'Contact',
          placeholder: 'Email、telephone number…',
          error: 'please enter contact'
        },
        message: {
          label: 'Message',
          placeholder: ''
        },
        signcode: {
          label: 'Sign code',
          placeholder: ''
        },
        signature: {
          label: 'Signature',
          placeholder:
            'Pleasa copy the above sign code,sign it with Filecoin wallet,and enter the signature',
          error: 'please enter the signature'
        },

        submit: 'Submit',
        tips:
          'Special notes: sensitive workds, prohibited words, celebrity names, etc. are not allowed in account names. If there is any violation, the signature will be deleted and prohibited. Thank you for your cooperation.',
        copy: ['copy success', 'copy failed']
      }
    },
    type: {
      verifiedRegister: "Verified Registry",
      account: 'Account',
      owner: 'Account(Owner)',
      miner: 'StorageMiner',
      system: 'SystemActor',
      init: 'InitActor',
      cron: 'CronActor',
      power: 'StoragePowerActor',
      market: 'StorageMarketActor',
      payment: 'PaymentChannelActor',
      multisig: 'MultiSigActor',
      reward: 'RewardActor'
    },
    trend: {
      switch: ['Node’s Power', 'Node’s Block'],
      chartSwitch: ['Node Trend Chart', 'Pack Up']
    },
    radio: ['Message', 'Blocks', 'Transaction'],
    radio1: ['Message', 'Transaction']
  },
  message: {
    detail: {
      transactionLabels: ['From', ' ', 'To', 'Value', 'Type'],
      mbTransferLabels: ['From:', 'To:', 'Value:', 'Type:'],
      consumeTypeArr: ['','Burn Fee','Storage Provider Fee','Transfer','Punishment','Report','Aggregate cost'],
      titles: ['Message Overview', 'Transactions', 'Others'],
      overview: [
        'Message ID',
        'Height',
        'Block',
        'Time',
        'From',
        'To',
        'Value',
        'Receipt',
        'Gas Premium',
        'Gas Used',
        'Gas Limit',
        'Gas Fee Cap',
        'Method',
        'Nonce',
        'Params'
      ],
      infoview: [
        'Message ID',
        'Height',
        'Time',
        'Block',
        'Value',
        'From',
        'To',
        'Receipt',
        'Method'
      ],
      otherview: [
        'Version(API)',
        'Nonce',
        'Gas Fee Cap',
        'Gas Premium',
        'Gas Limit',
        'Gas Used',
        'BaseFee',
        'Gas Fee',
        'Params',
        'Returns'
      ],
      transfer: {
        from: 'From',
        to: 'To',
        value: 'Value',
        consume_type: 'Type'
      },
      paramTip: 'Raw data in Base64',
      confirm: 'Confirmations'
    },
    pool: {
      infoview: [
        'Message ID',
        'Height',
        'Time',
        'Value',
        'From',
        'To',
        'Method'
      ],
      otherview: ['Version(API)', 'Nonce', 'Gas Limit', 'Gas Premium', 'Params']
    }
  },
  dsn: {
    list: {
      heading: 'Order List',
      total: 'Total of {num} Deals',
      labels: [
        'Deal ID',
        'Piece CID',
        'PieceSize',
        'Client',
        'Provider',
        'Start Time',
        'End Time',
        'Storage Fee',
        'Verified Deal'
      ],
      mLabels: [
        'Deal ID',
        'Piece CID',
        'PieceSize',
        'Client',
        'Provider',
        'Create Time',
        'Storage Fee',
        'Verified Deal'
      ],
      tips:
        'This deal is initiated by the official certified client, the adjusted power is about ten times raw power',
      placeholder: 'Search Client/Provider'
    },
    detail: {
      dsnTitle: 'dsn Detail',
      title: 'Storage Detail',
      client: 'Client',
      provider: 'Provider',
      pledge: 'Collateral：',
      storageCost: 'Storage Cost：',
      to: 'to',
      block: '(Force Area)',
      overview: [
        'Dsn ID',
        'Create Time',
        'Block',
        'Message',
        'Piece CID',
        'Verified'
      ]
    }
  },
  noResult: {
    res: 'Search Not Found',
    404: 'Page not found! It will be back to the home page after {count} seconds!',
    key: 'Oops!The search string you enterd was:',
    invalid: 'Sorry! This is an invalid search string',
    back: 'Back Home'
  },
  routeName: {
    blockDetail: 'Block Detail',
    messageDetail: 'Message Detail',
    addressDetail: 'Address Detail',
    messageList: 'View All Messages',
    addressList: 'View All Accounts',
    tipset: 'Tipset',
    mining: 'Mining',
    metrics: 'Metrics',
    map: 'Peer Map',
    peer: 'Peer Detail',
    stats: 'Stats',
    poolMessageList: 'Messages In Flight',
    dsn: 'View All Deals',
    blocksWon: 'Blocks Won',
    token: 'Token'
  },
  chart: {
    blockRatio: 'Blocks',
    minerBlockTrend:
      '<div>{time}</div><div>{totalMarker}Total Block Count : {total} </div><div>{increaseMarker}{interval} Block Count : {increase}</div>',
    minerRewardTrend:
      '<div>{time}</div><div>{totalMarker}Total Rewards : {total}FIL </div><div>{increaseMarker}{interval} Rewards : {increase}FIL</div><div>{interval} WinCount : {winCount}</div>',
    blockTime:
      "<div style='margin-bottom:5px'>Avg Block Time: {value}s</div><div>Time: {name}</div>",
    mesHistory: '<div>Message: {count}</div><div>{time}</div>',
    mesHistoryTitle: 'Message History in 14 Days',
    pledge: '<div>Pledge Collateral: {pledge} FIL</div><div>{time}</div>',
    tipset:
      '<div>MinerID: {miner}</div><div>Height: {height}</div><div>BlockTime: {block_time}</div><div>BlockCid: {cid}</div>',
    filOutstanding: ['Floating', 'Pledge'],
    blockReward: ['# Of Blocked Nodes', 'Cumulative Block Reward(FIL)'],
    filecoin: 'Block Reward(FIL)',
    filVested: ['Cumulative FIL Vested', 'FIL Vested Daily'],
    coming: 'coming soon...',
    map:
      "<div style='margin-bottom:5px'><a href='/more/peer?peer_id={pid}'><span>Peer ID : </span><span>{pid}</span></a></div><div style='margin-bottom:5px'><a href='/tipset/address-detail?address={miner}'><span>Node : </span><span>{Node}</span></a></div><div style='margin-bottom:5px'><span>Location : </span><span>{name}</span></div><div><span>IP : </span><span>{ip}</span></div>"
  },

  blockHeaderChart: {
    op: 'Drag to view more height',
    start: 'start height',
    latest: 'Latest height'
  },
  pk: {
    title: 'Storage Provider PK',
    placeholder: 'Please enter or select a hot node',
    miner: {
      title: '',
      rows: [{ label: 'Storage Provider', key: 'node' }]
    },
    overview: {
      title: 'Overview of nodes',
      rows: [
        { label: 'Total power', key: 'active_power' },
        { label: 'Total Block', key: 'active_block_count' },
        { label: 'Total block reward', key: 'active_block_rewards' }
      ]
    },
    recent: {
      title: 'Recent situation of nodes',
      rows: [
        { label: 'Power increased in the latest 24h', key: 'increased' },
        { label: 'Blocks won in the latest 24h', key: 'active_win_count' },
        { label: 'Block Reward in the latest 24h', key: 'fil' }
      ]
    },
    efficiency: {
      title: 'Mining efficiency',
      rows: [
        {
          label: 'Total Power Returns',
          key: 'active_fil_per_t'
        },
        {
          label: 'Power Returns in the latest 24h',
          key: 'fil_per_t'
        },
        {
          label: 'Proven success rate in the latest 24h',
          key: 'success_rate'
        },
        {
          label: 'Lucky value in the latest 24h',
          key: 'lucky_number'
        }
      ]
    },
    go: 'Go and choose nodes for PK!',
    max: 'You can choose up to 6 nodes.'
  },
  map: {
    label: 'Active Nodes',
    tips: 'The Nodes who sent messages in the latest 24 hour'
  },
  chartIntervalMap: {
    '24h': 'Hourly',
    '1w': 'Daily',
    '1m': 'Daily',
    '6m': 'Daily'
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
            'The amount of FIL allocated tostorage nodes through blockrewards, network initialization, etc.'
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
          des: 'Total FIL locked as collateral in all nodes.',
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
      { label: 'Account Info', name: 'info'},
      { label: 'Preference', name: 'set'}
    ],
    navTips: [
      { title:  'Your Profil', content: 'This page provides an overview of your account information. You can also update your account address and password here.'},
      { title: 'Storage Provider Panel', content: ' You can create your own pools and add Nodes to them for monitoring and management. The created pools are only valid for your current account. ' }
    ],
    center: {
      tabs: ['Your Profile','Storage Provider Panel'],
      menuList:[
        { label: "Your Profile", icon: 'iconfont icon-center' },
        { label: "Storage Provider Panel", icon: 'iconfont icon-monitor'}
      ],
      accountInfo: {
        labels:[
          { label: 'Nickname', icon: 'edit'},
          { label: 'PhoneNumber', icon: 'edit'},
          { label: 'Email' , icon: 'edit'},
          { label: 'Storage Provider Panel List', icon: 'add' },
          { label: 'Latest Login' },
        ]
      },
      errorTips: 'Nonexistent node：',
      successTips: 'Storage pool has created successfully',
      validateTips: 'At least Mobile or Email must be filled out',
      nodeCount: ' Storage Provider Pool',
      nodeTotal: ' Storage Provider',
      accountSet: {
        labels:[
          { label: 'Nickname', placeholder: 'Please enter a Nickname,', model: 'nick_name', tips: ' up to 10 characters' },
          { label: 'PhoneNumber', placeholder: 'Please enter phone number', model: 'phone', tips: 'please enter your new number to make a change' },
          { label: 'Email', placeholder: 'Please enter email',  model: 'email',tips: 'please enter your new number to make a change' },
          { label: 'Old Password', placeholder: 'Please enter the old password', model: 'pwd', tips: 'If not changed, leave it blan' },
          { label: 'New Password', placeholder: 'Please enter new password', model: 'newpwd', tips: 'If not changed, leave it blan' },
          { label: 'Confirm Password', placeholder: 'Please enter your password again', model: 'surepwd', tips: 'If you have changed the password above, please re-enter the new password to confirm' }
        ],
        buttons: ['Confirm', 'Cancel', 'Delete Account'],
        dialog: {
          title: 'Are you sure to permanently delete your account?',
          content: 'Deleting your account will also delete all watch lists, address information, and the above will not be recovered after the deletion is confirmed',
          buttons: ['Confirm','Cancel']
        }
      }
    },
    monitor: {
      title: 'Storage Provider Panel',
      total: '{total} pools have been created (up to {count} pools)',
      button: 'Create Storage Provider',
      labels: ['Storage Provider Tag', 'Storage Provider QualityAdjPower', 'Total Reward', 'Nodes under your pool'],
      emptyText: 'No node pool created',
      dialog: {
        title: 'Create Storage Provider',
        labels: [
          { label: 'Pool Tag', placeholder:'Up to 10 characters can be entered', text: 'Enter Storage Provider Pool Tag', name: 'name' },
          { label: 'Storage Provider', placeholder:'Enter the Nodes of your pool, separated by commas', text: 'Enter the Nodes of your pool, separated by commas', name:'miners'},
        ],
        buttons: ['Confirm', 'Cancel'],
      }
    },
    admin: {
      title: 'Pool Management',
      labels: [
        { label: 'Pool Tag', placeholder: 'Please enter the tag of your Pool' },
        { label: 'Storage Provider Management ', placeholder: 'Please enter the Storage Provider you want to add' },
      ],
      enter: 'Confirm enter',
      buttons: ['Save', 'Cancel', 'Delete Pool'],
      dialog: {
        title:'Are sure you want to delete your current account?',
        content: 'The Pool data will be completely deleted after that',
        buttons: ['Confirm', 'Cancel']
      },
      limit: ['Duplicate added miner', 'Added miner already exists',' Has reached the upper limit '],
      nullTips:'There are no nodes in the current node pool. Please add at least one node and save',
      chartTips: 'Please use English comma'
    },
    notice: {
      title: 'Notification Setup',
      tips: 'Notification method: Start notifying when your address balance is estimated to be available for less than 120 minutes',
      labels: ['Address: ','Type: ','SMS: ','On Call: ','Email: '],
      phoneTips: '( Tip: Calling notifications are only supported for Chinese users currently )',
      emailBtn: 'Add notification account',
      buttons: ['Save', 'Cancel'],
      breadcrumbList: ['Pool Panel', 'notice'],
      msgDialog: {
        title:'SMS',
        placeholder: ['Please enter phone number','Please enter verification code'],
        buttons:['Confirm','Cancel', 'Get Verification Code']
      },
      phoneDialog: {
        title:'Phone notice',
        placeholder: ['Please enter phone number','Please enter verification code'],
        buttons:['Confirm','Cancel', 'Get Verification Code']
      },
      emailDialog: {
        title:'Email notice',
        placeholder: ['Please enter email','Please enter verification code'],
        buttons:['Confirm','Cancel', 'Get Verification Code']
      }
    },

    list:{
      button: 'Pool Management',
      poolOverview:{
        title: 'Storage Pool Overview',
        labels: [
          { label:'StoragePower/Ratio' },
          { label:'Total Rewards' },
          { label:'Sector Pledges' },
          { label:'PreCommitDeposits', tips: 'When Nodes seal sectors for PreCommits, they must provide some pre-deposit as a pledge, if this part of the sector is not completed in time for ProveCommitted, this part of the pre-deposit will be forfeited, if it is completed on time for Prove it will be released back.' },
          { label: 'Locked Rewards' }
        ]
      },
      nodeList:{
        title: 'NodeList',
        labels: ['Storage Provider','Tag','QualityAdjPower','Total Reward','Available', 'Initial Pledge','PreCommitDeposits','Locked Reward']
      }
    },
    detail: {
      nodeOverview: {
        title: 'NodeOverview',
        nodePower: 'Storage Provider Power',
        panelLabels: [
          { label: 'Total Reward'},
          { label: 'Available'},
          { label: 'Sector Pledges'},
          { label: 'PreCommitDeposit', tips: 'When Nodes seal sectors for PreCommits, they must provide some pre-deposit as a pledge, if this part of the sector is not completed in time for ProveCommitted, this part of the pre-deposit will be forfeited, if it is completed on time for Prove it will be released back. '},
          { label: 'Locked reward'}
        ],
        tableLabels: [
          { label: 'Type' },
          { label: 'Address' },
          { label: 'Available' },
          { label: 'Estimated remaining', tips: 'The estimated remaining available time will be displayed within 30 minutes after the address is added. If there is no Gas consumption for the corresponding address, the estimated remaining available time cannot be obtained' },
          { label: 'Notification Center' }
        ]
      },
      nodeData: {
        title: 'Storage Provider Info',
        button: 'Download Excel',
        datePick: ['To','Start date','End date'],
        panelLabels: [
          // { label: 'QualityAdjPower' },
          { label: 'QualityAdjPower Increased' },
          { label: 'Reward' },
          { label: 'Initial Pledge' },
          { label: 'Gas Consumption' }
        ],
        tableLabels: ['Date','Storage Provider','QualityAdjPower','Sealed Power','Reward', 'Initial Pledge', 'Gas Consumption']
      }
    },
  },
  apiStatus: [
    { code: 0 , message: 'ok'},
    { code: 1 , message: 'Verification code error'},
    { code: 2 , message: 'Parameter error'},
    { code: 3 , message: 'unsupported operator segment'},
    { code: 4 , message: 'Account has been registered'},
    { code: 5 , message: 'unknown error'},
    { code: 6 , message: 'Password Error, please re-enter'},
    { code: 7 , message: 'Account Error, please re-enter'},
    { code: 8 , message: 'Account exception, login prohibited'},
    { code: 9 , message: 'Login has expired, please login again'},
    { code: 10 , message: 'The password entered the second time is incorrect, please re-ente'},
    { code: 11 , message: 'invalid operation'},
    { code: 12 , message: 'The verification code is sent too frequently, please try again later'},
    { code: 13 , message: 'Storage pool name already exists, please re-enter'},
    { code: 14 , message: 'node does not exist, please reconfirm'},
    { code: 15 , message: 'the number of storage pools has reached the maximum'},
  ]
}
export default en
