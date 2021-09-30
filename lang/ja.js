// const isTest = window.location.href.indexOf("calibration") >= 0
const isTest = false
const ja = {
  mixin:{
    formatTime:{
      before: '前に',
      suffix: ['日間', '時間', '分', '秒']
    }
  },
  component: {
    empty: {
      label: 'データなし'
    },
    heightDetail: {
      titles: ['ブロックのチップセット', 'ブロックリスト'],
      heightLabels: ['得票数', '報酬', '時間'],
      blockLabels: ['ブロックCid', 'マイナー', '報酬', 'メッセージ数']
    },
    filecoin: {
      labels: [
        '時価総額',
        '市場シェア',
        '時価総額ランキング',
        '24h最低価格/24h最高価格',
        '流通量',
        '完全に希薄化された市値'
      ]
    },
    overview: {
      btnText: 'マイニングプールの詳細'
    },
    mesList: {
      title: ' メッセージ',
      heading: 'メッセージリスト',
      poolheading: 'メッセージプールリスト',
      label: [
        'メッセージID',
        'ブロックのチップセット',
        '時間',
        '送信アドレス',
        '受信アドレス',
        '数量',
        '状態',
        '方法'
      ],
      blockLabel: [
        'メッセージID',
        'チップセット',
        '送信アドレス',
        '受信アドレス',
        '方法',
        '数量'
      ],
      poolLabels: [
        'メッセージID',
        '時間',
        '送信アドレス',
        '受信アドレス',
        '数量',
        'Gas 制限',
        'Gas Premium',
        '方法'
      ],
      mbLabel: [
        'メッセージID',
        '時間',
        '送信アドレス',
        '受信アドレス',
        '数量',
        'Gas制限',
        'Gas Premium',
        '方法'
      ],
      total: '合計 {total} 件メッセージ',
      latest: '',
      // latest: "(直近7日間)",
      range: '( {start}から{end} ) ',
      method: {
        ChangePeerID: 'ノード番号の変更',
        ChangeWorkerAddress: 'マイナーのアドレス変更',
        ControlAddresses: 'アドレス管理',
        PreCommitSector: 'データのプレサブミッション',
        ProveCommitSector: 'データ提出の証明',
        SubmitWindowedPoSt: '時空証明の提出',
        Transfer: '振込'
      },
      placeholder: '方法',
      tips: '(一週間以内のメッセージのみ示す)',
      receipt: ['成功', '失敗', '不明なエラー'],
      fail: '失败',
      selector: [
        { label: '転入', type: 'to' },
        { label: '転出', type: 'from' }
      ],
      type: ['転入', '転出']
    },
    blockList: {
      label: [
        'ブロックCid',
        'ブロックのチップセット',
        'ブロックジェネレーション時間',
        'メッセージ数',
        'マイナーアドレス',
        'ブロックジェネレーション報酬'
      ],
      mbLabel: ['ブロックCid', 'マイナー', '時間', '報酬', '', ' メッセージ'],
      total: '合計 {total} ブロック',
      height: 'ブロックのチップセット # {height}',
      mb: {
        height: 'チップセット:',
        time: '時間:',
        label: ['', '報酬']
      },
      start: '開始日時',
      end: '完了日時',
      title: 'ブロック詳細'
    },
    transactionList: {
      total: '合計 {total}  メッセージ',
      label: [
        '振込時間',
        ' メッセージCID',
        '発送者',
        '受信者',
        '金額',
        '振込タイプ'
      ],
      typeOptions: ['発送', '受信', 'ブロック報酬', 'その他の罰', '重合費']
    },
    addressList:{
      heading: "富豪ランキング"
    },
    transferList: {
      heading: '大量振込記録',
      total: '合計 {total} 件メッセージ',
      labels: [
        'ブロックのチップセット',
        'メッセージID',
        '時間',
        '送信アドレス',
        '受信アドレス',
        '数量',
        '方法'
      ],
      addressLabels: [
        '時間',
        'メッセージID',
        '送信アドレス',
        '受信アドレス',
        '数量',
        '方法',
        'タイプ'
      ]
    },
    timeSelector: [
      { value: '24h', label: '24時間' },
      { value: '1w', label: '1週間' },
      { value: '1m', label: '1ヶ月' },
      { value: '1y', label: '1年' },
      { value: 'all', label: '全部' }
    ],
    times: {
      '6h': '6時間',
      '24h': '今日',
      '1d': '昨日',
      '1w': '1週間',
      '1m': '30日',
      '6m': '6ヶ月',
      '0.5y': '半年',
      '1y': '1年',
      all: '全部'
    },
    timeGrowth: {
      '24h': '24時間',
      '1d': '昨日',
      '1w': '7日間',
      '1m': '30日',
      '6m': '6ヶ月',
      '0.5y': '半年',
      '1y': '1年'
    },
    timeGrowth1: {
      '24h': '今日',
      '1d': '昨日',
      '1w': '1週間',
      '1m': '30日',
      '6m': '6ヶ月',
      '0.5y': '半年',
      '1y': '1年'
    },
    more: '更なる'
  },
  account: {
    login: {
      welcome: 'お帰りなさい',
      account: 'アカウント',
      phoneLogin: '携帯番号ログイン',
      emailLogin: 'メールログイン',
      phone: "携帯番号",
      enterPhone: "携帯番号を入力してください",
      email: 'メールアドレス',
      enterEmail: "メールアドレスを入力してください",
      pass: 'パスワード',
      enterPass: "パスワードを入力してください",
      code: "確認コード",
      enterCode: "確認コードを入力してください",
      getCode: "確認コードの取る",
      resetPass: "パスワードをリセット",
      sure: "ログイン",
      byPass: 'パスワードでログイン',
      byCode: '認証コードで登録する',
      registerPrefix: "まだアカウントがありません？",
      register: "新しいユーザを登録します",
      remember: 'パスワードを覚えて自動登録します'
    },
    register: {
      welcome: 'アカウント登録',
      account: 'アカウント',
      setPwd: 'パスワードの設定',
      phoneRegister: "携帯番号のアカウント",
      emailRegister: "メールアドレスのアカウント",
      phone: "携帯番号",
      enterPhone: "携帯番号を入力してください",
      email: "メールアドレス",
      enterEmail: "メールアドレスを入力してください",
      pass: 'パスワード',
      enterPass: "パスワードを入力してください",
      passAgain: "パスワードを確認する",
      enterPassAgain: "パスワードを確認してください",
      code: "確認コード",
      enterCode: "確認コードを入力してください",
      getCode: "確認コードの取る",
      private: "サービス規約及びプライバシーポリシーに同意してください",
      hasPrefix: "既存のアカウント?",
      has: "存在のアカウントです,登録してください",
      sure: "登録"
    },
    reset: {
      phoneReset: '携帯番号によるリセット',
      emailReset: 'メールによるリセット',
      phone: "携帯番号",
      enterPhone: "携帯番号を入力してください",
      email: "メールアドレス",
      enterEmail: "メールアドレスを入力してください",
      pass: '新パスワードを入力してください',
      enterPass: "新パスワードを再入力してください",
      newPass: "新パスワードを確認",
      enterNewPass: "新パスワードを確認してください",
      code: "確認コード",
      enterCode: "確認コードを入力してください",
      getCode: "確認コードを送信",
      has: "アカウントが既に存在しています",
      sure: "確定",
      pre: '前へ',
      next: '次へ'
    },
    logout: {
      msg: 'ログアウトしようとしています，続行するかどうか',
      tip: 'ヒント',
      confirm: '確認',
      cancel: 'キャンセル',
      success: 'ログアウト完了',
      hasCancel: 'キャンセル完了',
    },
    error: {
      emptyPhone: '携帯番号を入力してください',
      errorPhone: '正しい携帯番号を入力してください',
      emptyAccount: 'アカウントを入力してください',
      errorAccount: '正しい携帯番号やメールアドレスを入力してください',
      emptyCode: '確認コードを入力してください',
      emptyPass: 'パスワードを入力してください',
      emptyNewPass: '新しいパスワードを入力してください',
      errorPass: 'パスワードは8〜20文字で，少なくとも文字と数字を含む必要があります（大文字と小文字を区別してください）',
      notRegister: 'このアカウントは登録されていません',
      hasRegister: "このアカウントは登録されています",
      sameWithPhone: "パスワードは携帯番号と完全に一致していけません",
      emptyPassAgain: 'パスワードをもう一度入力してください',
      emptyNewPassAgain: '新しいパスワードをもう一度入力してください',
      differentPass: "2回入力したパスワードは一致していません",
      agreePrivate: "サービス規約及びプライバシーポリシーに同意してください",
      emptyTag: "備考を入力してください",
      emptyAddress: 'トークンアドレスを入力してください',
      emptyMail: '正しいメールアドレスを入力してください',
      errorEmail: "メールアドレスの格式エラー",
      registerMail: "登録されたメールアドレスです",
      emptyNumber: 'ID番号を入力してください',
      emptyName: '名前を入力してください',
      nameError: '名前は64文字を超えることはできません',
      areaCodeError: '正しい国番号を入力してください',
      phoneError: '正しい携帯番号を入力してください',
      picTypeError: 'アップロードするアバター画像はJPGまたはPNG形式でのみ使用できます',
      picSizeError: 'アップロードプロフィール写真のサイズは5MBを超えることはできません',
      infoNotMatch: {
        title: '身分情報が一致しません！',
        mes: "提出した身分証情報は携帯番号の情報と一致しません"
      },
      mustHaveOne: '少なくとも1つのセキュリティ検証方法を維持する'
    },
  },
  header: {
    network: '現在のネットワーク:',
    centerOption:[
      { index: 'center', label: 'パーソナルセンター' },
      { index: 'monitor', label: 'プールの監視' },
      { index: 'LogOut', label: '終了' },
    ],
    seo: {
      index: 'Filscan--Filecoinブロックチェーンのブラウザ',
      chain: 'ブロック確認 - Filscanブラウザ',
      message: '全てのメッセージ - Filscanブラウザ',
      pool: 'パッケージ化待ちメッセージ - Filscanブラウザ',
      address: '全てのアカウント - Filscanブラウザ',
      addressDetail: 'アドレス {address} - Filscanブラウザ',
      dsn: '全てのオーダー - Filscanブラウザ',
      dsnDetail: 'オーダー詳細 {dealid} - Filscanブラウザ',
      messageDetail: ' メッセージ {message} - Filscanブラウザ',
      mining: 'ランキング - Filscanブラウザ',
      calculator: '電卓 - Filscanブラウザ',
      gas: 'Gas統計 - Filscanブラウザ',
      fil: 'FIL - Filscanブラウザ',
      stats: 'チャート&統計 - Filscanブラウザ',
      map: 'ノードマップ - Filscanブラウザ'
    },
    title: 'Filscan',
    tab: ['ホームページ', 'Tipset', '統計データ'],
    placeholder:
      'アドレスを入力ください/メッセージID/チップセット/ブロックCid/ノートID',
    filter: [
      {
        label: '全てのフィルタータイプ',
        value: 0
      },
      {
        label: 'アドレス',
        value: 1
      },
      {
        label: 'メッセージID',
        value: 2
      },
      {
        label: 'チップセット',
        value: 3
      },
      {
        label: 'ブロックCid',
        value: 4
      },
      {
        label: 'ノートID',
        value: 5
      }
    ],
    nav: {
      home: {
        label: 'ホームページ',
        index: 'home',
        path: '/'
      },
      tipset: {
        label: 'ブロックチェーン',
        index: 'tipset',
        down: true,
        items: [
          {
            label: 'ブロック',
            path: '/tipset/chain',
            index: 'chain'
          },
          {
            label: ' メッセージ',
            path: '/tipset/message-list',
            index: 'message-list'
          },
          {
            label: '富豪ランキング',
            path: '/tipset/address-list',
            index: 'address-list'
          },
          {
            label: '大量振込',
            path: '/tipset/transfer-list',
            index: 'transfer-list'
          },
          {
            label: 'オーダー',
            path: '/tipset/dsn',
            index: 'dsn'
          },
          {
            label: 'メッセージプール',
            path: '/tipset/pool-message-list',
            index: 'pool-message-list'
          }
        ]
      },
      mining: {
        label: 'ランキング',
        path: '/mining',
        index: 'mining'
      },
      statistics: {
        label: '統計',
        index: 'statistics',
        down: true,
        items: [
          {
            label: 'Gas費用トレンド',
            index: 'gas',
            path: '/statistics/gas'
          },
          {
            label: 'ベースラインと計算力トレンド',
            path: '/statistics/power',
            index: 'power'
          },
          {
            label: 'FIL',
            path: '/statistics/fil',
            index: 'fil'
          },
          {
            label: 'チャート統計',
            index: 'charts',
            path: '/statistics/charts'
          }
        ]
      },
      resources: {
        label: '資源',
        index: 'resources',
        down: true,
        items: [
          {
            label: '電卓',
            path: '/resources/calculator',
            index: 'calculator',
          },
          {
            label: '常用ツール',
            path: '/resources/tools',
            index: 'tools',
          }
        ]
      },
      // filwallet: {
      //   label: 'ウォレット',
      //   href: 'https://filecoinwallet.com/',
      //   index: 'filwallet',
      // },
      incubation: {
        label: 'ストレージプロバイダ',
        path: '/forcepool/center?type=1',
        index: 'incubation',
        pro: true,
      }
    },
    mbnav: {
      home: {
        label: 'ホームページ',
        index: 'home',
        path: '/'
      },
      tipset: {
        label: 'ブロックチェーン',
        index: 'tipset',
        isSubShow: false,
        close: 'icon-down',
        up: 'icon-up',
        items: [
          {
            label: 'ブロック',
            path: '/mobile/tipset/chain',
            index: 'chain'
          },
          {
            label: ' メッセージ',
            path: '/mobile/tipset/message-list',
            index: 'message-list'
          },
          {
            label: '富豪ランキング',
            path: '/mobile/tipset/address-list',
            index: 'address-list'
          },
          {
            label: '大量振込',
            path: '/mobile/tipset/transfer-list',
            index: 'transfer-list'
          },
          {
            label: 'オーダー',
            path: '/mobile/tipset/dsn',
            index: 'dsn'
          },
          {
            label: 'メッセージプール',
            path: '/mobile/tipset/pool-message-list',
            index: 'pool-message-list'
          }
        ]
      },
      mining: {
        label: 'ランキング',
        path: '/mobile/mining',
        index: 'mining'
      },
      statistics: {
        label: '統計',
        index: 'statistics',
        isSubShow: false,
        close: 'icon-down',
        up: 'icon-up',
        items: [
          {
            label: 'Gas費用トレンド',
            index: 'gas',
            path: '/mobile/statistics/gas'
          },
          {
            label: 'ベースラインと計算力トレンド',
            path: '/mobile/statistics/power',
            index: 'power'
          },
          {
            label: 'FIL',
            path: '/mobile/statistics/fil',
            index: 'fil'
          },
          {
            label: 'チャート統計',
            index: 'charts',
            path: '/mobile/statistics/charts'
          }
        ]
      },
      resources: {
        label: '資源',
        index: 'resources',
        isSubShow: false,
        close: 'icon-down',
        up: 'icon-up',
        items: [
          {
            label: '電卓',
            path: '/mobile/resources/calculator',
            index: 'calculator',
          },
          {
            label: '資源',
            path: '/mobile/resources/tools',
            index: 'tools',
          }
        ]
      },
      filwallet: {
        label: 'ウォレット',
        href: 'https://filwallet.ai/',
        index: 'filwallet',
      },
      incubation: {
        label: 'ふ化センター',
        href: 'https://venus.filecoin.io/incubation/Rules.html#storage-provider-incubation-program',
        index: 'incubation',
        hot: true,
      }
    },
    mb: {
      title: 'Filecoin 検索',
      search: 'Search'
    },
    cancel: '取消し'
  },
  footer: {
    peer: 'アクティブなマイナー {count}',
    mobile: [
      {
        label: 'Filecoin公式サイト',
        href: ' https://filecoin.io'
      },
      {
        label: '蛇口',
        href: isTest
          ? 'https://faucet.calibration.fildev.network/'
          : 'https://faucet.glif.io/'
      },
      {
        label: 'lotusドキュメント',
        href: 'https://lotu.sh/'
      },
      {
        label: 'テストネットの説明',
        href: ' https://testnet.filecoin.io/'
      }
    ],
    links: [
      {
        title: 'Filecoinプロジェクト',
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
            label: 'プロトコルラボ',
            class: 'icon-slack',
            href: 'https://protocol.ai/'
          },
          {
            label: 'プロトコルスクール',
            class: 'icon-slack',
            href: 'https://proto.school/'
          },
          {
            label: 'Filecoin Twitter',
            class: 'icon-slack',
            href: 'https://twitter.com/Filecoin'
          },
          {
            label: 'Filecoin WeChat公式アカウント',
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
            label: 'Filecoin財団',
            class: 'icon-matrix',
            href: 'https://fil.org/'
          },
          {
            label: 'Filecoin DevGrants',
            class: 'icon-ttww',
            href: 'https://github.com/filecoin-project/devgrants'
          },
          // {
          //   label: '原力区WeChat公式アカウント',
          //   class: 'icon-wechat',
          //   qrClass: 'qr-ipfs',
          //   popover: true
          // },
          {
            label: 'オンラインフィードバック',
            href: 'http://ipfsforce.mikecrm.com/E6kYnYI'
          }
        ]
      },
      {
        title: '四つの実現',
        items: [
          {
            label: 'Lotus Githud',
            href: 'https://github.com/filecoin-project/lotus/'
          },
          {
            label: 'Venus Github',
            href: 'https://github.com/filecoin-project/venus'
          },
          {
            // label: 'filwallet.ai',
            label: 'Fuhon Github',
            href: 'https://github.com/filecoin-project/cpp-filecoin'
          },
          {
            label: 'Forest Github',
            href: 'https://github.com/ChainSafe/forest'
          }
        ]
      },
      {
        title: '応用情報',
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
        title: '開発者ツール',
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
    contact: 'メールボックス: ',
    detail:
      'Filscanブラウザは Filecoin ブロックチェーンブラウザおよびデータサービスプラットフォームであり， Filecoin に基づく 各種のマイニングランキング、ブロックチェーンのデータ確認、可視化チャートなどワンストップのデータサービスを提供する。',
    ipfs: '原力区',
    copyright:
      '著作権所有 © Filecoin開発助成計画 \n<a href="https://www.mit-license.org/" target="_blank"> MIT </a> と<a href="https://www.apache.org/licenses/LICENSE-2.0.html" target="_blank"> Apache 2.0 </a>版著作権契約に従う. ',
    copyright1:
        '著作権所有 © Filecoin開発助成計画 \n<a href="https://www.mit-license.org/" target="_blank"> MIT </a> と<a href="https://www.apache.org/licenses/LICENSE-2.0.html" target="_blank"> Apache 2.0 </a>版著作権契約に従う. <a href="https://ipfser.org" target="_blank"> 原力区 </a>技術サポート'
  },
  home: {
    tips:
      'バージョンアップにより，データ展示が完全な正確を確保できない，プログラマーが<span ">緊急アップデータ中···</span>この度は、ご迷惑をおかけしますが、誠に申し訳ございませんでした！',
    subtitle: {
      index: '全ネットワークのデータ指標',
      charts: 'チャート',
      pool: 'マイニングプールのランキング',
      poolTips:
        'このランキングは計算力が1PiB以上のマイニングプールのみ統計する',
      transfer: '大量振込記録',
      moreChart: '更なるチャート'
    },
    charts: {
      more: '更なるチャート'
    },
    blocksWon: {
      title: '最新のチップセット',
      miner: 'マイナー',
      block: {
        title: 'ノード / 割合',
        tips: '約30分のブロックジェネレーション数/割合'
      },
      blockRate: {
        title: 'しゅっか率',
        tips: '約30分のチップセット毎のブロックジェネレーション確率'
      },
      win: {
        title: '得票 / 割合',
        tips: '約30分の得票数/割合'
      },
      more: '更なる',
      latest:
        '最新のブロック時間：<i class="font-18 mark font-500">{time}</i> &nbsp;之前',
      chart: {
        title: '約30分内にブロックを発見できない',
        tooltip:
          '<div>マイナーID: {miner_id}</div><div>チップセット: {height}</div><div>ブロックジェネレーション時間: {block_time}</div><div>ブロックCid: {cid}</div><div>得票数: {win_count}</div>'
      }
    },
    metaList: {
      tabs: ['展開', '片付け']
    },
    meta: [
      { label: '最新のブロックのチップセット' },
      { label: '最新のブロック時間' },
      {
        label: '全ネットーワークの有効計算力',
        tips:
          '現在全ネットーワークの有効計算力（有効なストレージスペース）の合計'
      },
      { label: '直近24h増加した計算力' },
      {
        label: '直近24時間のマイニング効率',
        tips: '直近24時間の合計ブロックジェネレーション報酬と有効計算力の割合'
      },
      {
        label: '得票時の報酬',
        tips:
          '最新チップセットの一単位のブロックジェネレーション報酬，各チップセットは多数のブロックがあり，各ブロックはこの報酬を獲得できる'
      },
      { label: '現在の基準率。' },
      { label: '直近24hブロックジェネレーション報酬' },
      { label: '全ネットーワークのブロックジェネレーション量' },
      { label: '全ネットーワークのブロックジェネレーション報酬' },
      {
        label: '32GiBディスクセクターGas消耗',
        tips: '密閉の32Gディスクセクター每にT消耗必要なGas値'
      },
      {
        label: '32GiBディスクセクターの新たに増加する計算力コスト',
        tips:
          '32Gディスクセクターの新たに増加する計算力がかかるコストは，ディスクセクター抵当とパッケージ化の手数料を含む'
      },
      { label: '現在のディスクセクター抵当量' },
      { label: '破壊量' },
      {
        label: '平均のチップセットごとのメッセージ数',
        tips: '直近24h平均のチップセットごとのメッセージ数'
      },
      {
        label: '64GiBディスクセクターGas消耗',
        tips: '密閉の64GディスクセクターTあたり消耗必要なGas値'
      },
      {
        label: '64GiBディスクセクターの新たに増加する計算力コスト',
        tips:
          '64Gディスクセクターの新たに増加する計算力がかかるコストは，ディスクセクター抵当とパッケージ化の手数料を含む'
      },
      { label: 'アクティブなマイナー数' },
      { label: '流通率' },
      {
        label: '平均のチップセットごとのブロック数',
        tips: '直近24h平均のチップセットごとのブロック数'
      }
    ],
    mbMeta: [
      {
        label: '計算力の収益'
      },
      { label: '得票時の報酬' },
      {
        label: '保存速度'
      },
      { label: '全ネットーワークのブロックジェネレーション報酬' },
      { label: '全ネットーワークのブロックジェネレーション量' },
      { label: '最新のブロックのチップセット' },
      {
        label: '全ネットーワークの有效な計算力'
      },
      {
        label: 'アクティブなマイナー数'
      }
    ],
    chart: {
      power: {
        title: '30天ベースラインと計算力トレンド',
        yAxisName: [
          '全ネットーワークの計算力',
          'ベースライントレンド',
          '増加する計算力'
        ],
        tips:
          `ベースライン基準は、Filecoinに要求されるネットワーク成長規模であり、メインネットがオンラインになったときに2.5EiBであり、年間成長率は100％となる。`
      },
      blockReward: {
        title: '24h基本手数料トレンド',
        subTitle: '約24時間',
        meta: ['ブロックジェネレーション数: ', '', '得票数: ', '', '報酬: '],
        yAxisName: [
          '基本手数料',
          '32GiBディスクセクターGas消耗',
          '64GiBディスクセクターGas消耗'
        ],
        chart: {
          yAxisName: ['報酬 / FIL', 'ブロックジェネレーション'],
          tooltip:
            '<div>{lineMarker}一時間ごとの報酬: {lineCount} FIL</div><div>{barMarker}一時間ごとのブロックジェネレーション数: {barCount}</div><div>一時間ごとの得票:{winCount}</div>'
        }
      },
      region: {
        title: 'FIL流通量の構成',
        total: "合計計算力: <i class='mark'>{total}</i>",
        continent: [
          { key: 'circulating', name: '取引可能なFIL', color: '#5B8FF9' },
          { key: 'locked', name: 'ディスクセクター抵当', color: '#5AD8A6' },
          { key: 'vested', name: 'リリース待ち報酬', color: '#5D7092' },
          { key: 'burnt', name: '破壊されたFIL', color: '#F6BD16' },
          { key: 'mined', name: 'マイナー報酬', color: '#E8684A' },
          { key: "other", name: "", color: "#999999" },
        ]
      }
    },
    blockSize: {
      label: '平均ブロック元データ',
      size: 'バイト',
      tips: '直近24時間の平均ブロック元データサイズ'
    },
    totalPower: {
      power: 'ローバイトパワー',
      capacity: '有効な計算力'
    },
    latest: {
      block: {
        title: '最新なブロック',
        more: '更なる',
        height: 'ブロックのチップセット:',
        time: '時間:',
        hash: 'Cid:',
        miner: 'マイナー:',
        reward: '報酬:'
      },
      message: {
        title: '最新情報',
        more: '更なる',
        id: '最新情報:',
        from: '送信アドレス:',
        to: '受信アドレス:'
      }
    },
    tag:
      'マイナーの名称を示し、メールを送信してください：filscan@ipfsforce.comまたはWeChatで連絡してください：ipfsforce',
    lucky: 'マイナーの実際得票率がネットワーク全体の平均値と比較した偏差',
    topPowerTable: {
      title: 'マイナーのランキング榜',
      homelabel: [''],
      label: [
        'マイナー',
        '有効な計算力 / 割合',
        'ローバイトパワー / 割合',
        'ブロックジェネレーション / 割合',
        '報酬'
      ],
      mbLabel: [
        'マイナー',
        'ローバイトパワー',
        'ブロックジェネレーション',
        '報酬'
      ]
    },
    topPowerChartLabel: [
      { label: 'ローバイトパワー', index: 'RawBytePower' },
      { label: '有効な計算力', index: 'QualityAdjPower' }
    ],
    rate: {
      title: 'マイナーの効率',
      table: {
        label: ['マイナー', '計算力の増量', 'ストレージ効率', '計算力の収益'],
        mbLabel: ['マイナー', '増量', 'ストレージ効率', '収益']
      },
      chart: {
        title: 'マイナーの効率'
      }
    },
    watch: 'チェーン式図',
    transfer: {
      plabels: ['送信元', ' ', '送信先', 'チップセット', '数量'],
      labels: ['送信元', ' ', '送信先', '数量']
    },
    poolTable: {
      tips:
        '7日内マイニングプールに累計したブロックジェネレーション報酬と有効な計算力の割合'
    }
  },
  tipset: {
    height: 'チップセット',
    block: {
      overview: [
        'Cid',
        'チップセット',
        'タイムスタンプ',
        ' メッセージ',
        'マイナー',
        '得票',
        '報酬',
        '親ブロックCid',
        '親ブロックの重量',
        '親基準率',
        '価値',
        'ルート'
      ],
      rewards:
        '{reward} FIL ( {block} FIL ブロック報酬 と {fee} FIL 手数料報酬 )'
    },
    blockType: ['ブロックなし', '最小価値ブロック', 'その他ブロック'],
    tips: '価値はランダム値',
    tooltip: [
      {
        label: 'マイナーID: ',
        key: 'miner'
      },
      {
        label: 'チップセット: ',
        key: 'height'
      },
      {
        label: 'ブロック年齢: ',
        key: 'utcTime'
      },
      {
        label: 'ブロックCid: ',
        key: 'hash'
      },
      {
        label: '得票: ',
        key: 'win_count'
      }
    ],
    item: {
      height: 'チップセット:',
      time: 'ブロック年齢:',
      labels: [
        'チップセット',
        'Cid',
        'マイナー',
        'ラベル',
        ' メッセージ',
        '報酬',
        '時間'
      ]
    }
  },
  mining: {
    heading: 'ランキング',
    efficiency: {
      title: 'マイナーの効率',
      placeholder:
        "マイナーIDを入力してください，複数のIDは英文字の','で分ける",
      label: [
        'ランキング',
        'マイナー',
        'ラベル',
        'ブロックジェネレーション報酬/割合',
        'ブロックジェネレーション数',
        '得票率',
        '有効な計算力',
        'ディスクセクターのサイズ'
      ],
      mblabel: [
        'ランキング',
        'ブロックジェネレーション報酬/割合',
        'ブロックジェネレーション数',
        '得票率',
        '有効な計算力',
        'ディスクセクターのサイズ'
      ],
      tips: [
        '',
        'Filecoinマイニング模型の中で，一つのチップセットは（tipset）複数のブロック（block）があり，各ブロックは複数の報酬（win count）を獲得することが可能である。',
        '選択された期間において、累積アウトプットブロック報酬に対するマイナーのブロックジェネレーション報酬の比率。'
      ],
      mbLabel: ['ランキング', 'マイナー', 'ラベル', 'ストレージ効率'],
      mbLabel2: ['ランキング', 'マイナー', 'ラベル', '計算力の収益']
    },
    poolranking: {
      label: [
        'ランキング',
        'マイナーの名称',
        '計算力の成長率',
        '計算力の増量',
        '有効な計算力',
        'ローバイトパワー',
        'ディスクセクターのサイズ'
      ],
      mblabel: [
        'ランキング',
        'Owner ID',
        '有効な計算力',
        'マイニング効率',
        '直近24h計算力の増量',
        'ラッキーナンバー',
        'ブロックジェネレーション数'
      ]
    },
    powerRate: {
      label: [
        'ランキング',
        'マイナー',
        '計算力の成長率',
        '計算力の増量',
        '有効な計算力',
        'ローバイトパワー',
        'ディスクセクターのサイズ'
      ]
    },
    poolRanking: {
      labels: [
        'ランキング',
        // 'マイニングプールの名称',
        'Owner ID',
        '有効な計算力',
        'ほぼ24時間の出力効率',
        '直近24h計算力の増量',
        // 'ラッキーナンバー',
        'ブロックジェネレーション数'
      ],
      mlabels: [
        'ランキング',
        'Owner ID',
        '有効な計算力',
        'マイニング効率',
        '直近24h計算力の増量',
        // 'ラッキーナンバー',
        'ブロックジェネレーション数'
      ]
    },
    minerRanking: {
      labels: [
        'ランキング',
        'マイナー',
        'ラベル',
        '有効な計算力 / 割合',
        '直近24h計算力の増量',
        '角が出る / 割合 ',
        // '得票',
        '報酬 / 割合',
        '残高'
      ],
      mblabels: [
        'ランキング',
        '有効な計算力 / 割合',
        '直近24h計算力の増量',
        'ブロックジェネレーション / 割合 ',
        // '得票',
        '報酬 / 割合',
        '残高'
      ]
    },
    powerRanking: {
      labels: [
        'ランキング',
        'マイナー',
        'ラベル',
        '計算力の成長率',
        '計算力の増量',
        '有効な計算力',
        'ローバイトパワー',
        'ディスクセクターのサイズ'
      ],
      mblabels: [
        'ランキング',
        '計算力の成長率',
        '計算力の増量',
        '有効な計算力',
        'ローバイトパワー',
        'ディスクセクターのサイズ'
      ],
      tips: [
        '選択された期間における、ディスクセクターの封止を完了するための有効な計算力の1日あたりの合計値',
        '選択された期間における、マイナーの有效な計算力の増量'
      ],
      sectorOption: [
        {
          index: '0',
          value: '',
          label: '全部ディスクセクター'
        },
        {
          index: '1',
          label: '32G ディスクセクター'
        },
        {
          index: '2',
          label: '64G ディスクセクター'
        }
      ]
    },
    topPowerTable: {
      title: 'マイナーのランキング榜',
      label: [
        'ランキング',
        'マイナーの名称',
        'ownerアドレス',
        '有効な計算力 / 割合',
        'マイニングプールの残高',
        '合計報酬'
      ],
      mbLabel: ['ランキング', 'マイニングプールの名称', '有効な計算力/割合'],
      mbLabel2: [
        'ランキング',
        'マイニングプールの名称',
        'Owner ID',
        '有効な計算力',
        'ほぼ24時間の出力効率'
      ],
      lowBalance: '残高は200以下'
    },
    switch: ['マイナーのランキング', 'マイナーの効率'],
    switch2: [
      'マイニングプールのランキング',
      'マイナーのランキング',
      '計算力の成長率',
      'マイニング収益'
    ]
    // switch2: ["マイナーのランキング", "計算力の成長", "計算力の収益"]
  },
  statistics: {
    fil: {
      filTips: '11',
      allocationTips: '22',
      allocationTitle: 'Filecoinトークンの割り当てルール',
      trend: 'FIL在庫商品の価格推移',
      trend2: 'Filecoinトークンの割り当てルール',
      tips: '価格データの由来：coingecko',
      continent: [
        {
          key: 'Filecoin Foundation',
          name: 'Filecoin財団',
          value: '5',
          color: '#477DE5'
        },
        {
          key: 'PL Team & Contributors',
          name: 'プロトコルラボチーム及び協力者',
          value: '4.5',
          color: '#4FD0A1'
        },
        {
          key: 'Protocol Labs',
          name: 'プロトコルラボ',
          value: '10.5',
          color: '#5D77A3'
        },
        {
          key: 'Fundraising-Remainder',
          name: '資金調達 – 残りのトークン',
          value: '2.5',
          color: '#E8B61B'
        },
        {
          key: 'Fundraising-SAFT 2017',
          name: '資金調達 – 将来のトークンのシンプルなプロトコル',
          value: '7.5',
          color: '#D75B42'
        },
        {
          key: 'Mining Reserve',
          name: 'オーダーしたトークンのマイニング',
          value: '15',
          color: '#59BAE3'
        },
        {
          key: 'Storage Mining allocation',
          name: 'ストレージマイナーのトークン割当',
          value: '55',
          color: '#876AC3'
        }
      ],
      sourceLabel: [
        {
          label: 'アイテムを割り当てる',
          value: '数量',
          Released: 'Released',
          description: '具体的な用途'
        },
        {
          label: 'FILの基本発行',
          value: '2,000,000,000',
          Released: '2,000,000',
          description: 'ネットワークFIL鋳造上限'
        },
        {
          label: 'オーダーしたトークンのマイニング',
          value: '300,000,000 ',
          Released: '300,000 ',
          description:
            '将来のFilecoinの経済成長のために確保されたトークンの予備であり、具体的な将来の使用方法は、Filecoinコミュニティによって決定される'
        },
        {
          label: 'ストレージマイナートークン割当',
          value: '1,100,000,000',
          Released: '1,100',
          description:
            'ブロック報酬、ネットワークの初期化などの方法を通して、ストレージマイナーのトークン報酬に与える'
        },
        {
          label: '資金調達の形式 – 将来のトークンのシンプルなプロトコル 2017',
          value: '150,000,000 ',
          Released: '50,000 ',
          description: '2017年に販売されたトークン'
        },
        {
          label: '資金調達の形式 – 残りの資金',
          value: '50,000,000',
          Released: '50,000 ',
          description: 'エコ開発と後続の融資に使用'
        },
        {
          label: 'プロトコルラボ',
          value: '210,000,000',
          Released: '20,000',
          description: 'プロトコルラボに関する仕事に使用'
        },
        {
          label: 'プロトコルラボチームと協力者',
          value: '90,000,000',
          Released: '9,000 ',
          description: '4.5%をプロトコルラボチームと協力者に与える'
        }
      ]
    },
    charts: {
      title: 'チャート',
      pledgeTitle: '単Tの抵当推移',
      rewardTitle: 'ブロック報酬',
      minerTitle: 'アクティブなマイナー数',
      messageTitle: 'メッセージ数推移グラフ',
      blockReward: {
        names: ['生産効率', '累計のブロック報酬']
      },
      MessageTrend: {
        names: ['個別ブロックのメッセージ推移', '総メッセージ数の推移']
      }
    }
  },
  calculator: {
    filUnit: '$',
    subtitle: 'マイニング開始時間：',
    switch: ['フルストレージ容量', 'マイニング機器包装'],
    labels1: ['サイクル', 'アウトプット', '（時間と空間の証明）消費を維持する'],
    columns1: ['毎日', '毎週', '毎月', '毎年'],
    labels2: [
      '静的な投資回収サイクル',
      'FILマイニングコスト（合計コストとGAS消費量/540日のアウトプット）',
      '540日アウトプット'
    ],
    output: '（合計コストとGAS消費量/540日のアウトプット）',
    input1: ['デイリー単Tアウトプット', 'コイン価格', '単Tの維持消耗'],
    input2: ['合計計算力', 'ハードウェアとメンテナンスコスト'],
    input3: [
      'ノードタイプ',
      '合計計算力規模',
      '包装速度',
      'ハードウェアとメンテナンスコスト'
    ],
    input4: [
      'デイリー単Tアウトプット',
      'コイン価格',
      '単Tの包装消耗',
      '単T維持消耗',
      '単T抵当'
    ],
    labels3: [
      'オーバーストックに必要な日数',
      'オーバーストックに必要な抵当',
      'オーバーストックの包装費用',
      'オーバーストック後毎日のブロックジェネレーション報酬',
      '静的な投資回収サイクル',
      'FILマイニングコスト（合計コストとGAS消費量/540日のアウトプット）',
      '540天アウトプット'
    ],
    buttonLabels: '計算開始',
    backLabels: '新に計算',
    tips:
      '免責事項：この計算は、静的なデータを使用して、実際の状況では、コイン価格、毎日単Tアウトプット、単Tの維持消耗は変化している値のため、この結果は参考のためのものであり、投資のアドバイスとしてではない。'
  },
  more: {
    gas: {
      title: '基本手数料トレンド',
      tb_title: '24h Gas データ',
      labels: [
        'メッセージタイプ',
        'Gas Premium',
        '平均Gas制限',
        '平均Gas消耗',
        '平均手数料',
        '手数料合計/割合',
        'メッセージ数合計/割合'
      ]
    },
    stats: {
      meta: [
        {
          label: '平均のチップセットごとのブロック数',
          tips: '直近24時間チップセットごとの平均ブロック数'
        },
        {
          label: '平均ブロックのメッセージパッケージ化数',
          tips: '直近24時間チップセットごとの平均メッセージ数'
        },
        {
          label: '平均燃料価格',
          tips: '直近24時間の平均燃料価格'
        },
        {
          label: '抵当トークン',
          tips: '全ネットワークの抵当トークン'
        },
        {
          label: '流通中',
          tips: ''
        },
        {
          label: '全ネットーワークに使用可能',
          tips: ''
        }
      ],
      top: {
        title: 'マイナーのランキング'
      },
      rate: {
        title: 'マイナーの効率'
      },
      activeMiner: {
        title: 'アクティブなマイナー',
        count: 'マイナー数: ',
        tips: 'データをパッケージ化する、または送信するストレージマイナー'
      },
      blockTime: {
        label: '平均ブロックジェネレーション時間',
        min: '最小',
        max: '最大',
        tips: '直近24時間平均ブロックジェネレーション時間'
      },
      filOutstanding: {
        filType: {
          floating: '流通中: ',
          pledge: '全ネットワークの抵当: ',
          outstanding: '全ネットーワークに使用可能: '
        }
      }
    }
  },
  stats: {
    metrics: {
      blockReward: {
        title: '累計のブロック報酬'
      },
      filecoin: {
        title: 'Filecoinブロック報酬曲線'
      },
      filVested: {
        title: 'FILリリース'
      },
      contact: '更なるデータを展示したいなら、メールでご連絡ください:'
    },
    peer: {
      title: 'ノートID:',
      label: ['ノートID', 'マイナーアドレス', 'IP', '位置']
    }
  },
  address: {
    list: {
      pcLabel: [
        'ブロックのチップセット',
        'メッセージID',
        '時間',
        '送信アドレス',
        '受信アドレス',
        'データ',
        '方法'
      ],
      label: [
        'ランキング',
        'アドレス',
        'ラベル',
        '残高/割合',
        'タイプ',
        '直近の取引時間'
      ],
      total: '合計{num}個アカウント',
      options: [
        { value: '', index: '0', label: 'すべてのタイプ' },
        { value: 'account', index: '1', label: '一般アカウント' },
        { value: 'owner', index: '2', label: '所有者アカウント' },
        { value: 'miner', index: '3', label: 'マイナーアカウント' },
        // { value:"system", index: "4", label:"システムアカウント" },
        // { value:"init", index: "5", label:"アカウントの初期化" },
        // { value:"cron", index: "6", label:"時限タスク" },
        // { value:"power", index: "7", label:"ストレージ計算力" },
        // { value:"market", index: "8", label:"マーケットアカウント" },
        { value: 'payment', index: '9', label: '支払方法' },
        {
          value: 'multisig',
          index: '10',
          label: 'マルチシグネチャーアカウント'
        }
        // { value:"reward", index: "11", label:"報酬アカウント" },
      ]
    },
    detail: {
      mtitle: "鉱夫概要",
      account: 'アカウント:',
      titleAcount: 'アカウント概要',
      title: 'アカウントの変更',
      pool: {
        title: 'マイニングプールの詳細',
        tips:
          'マイニングプールの詳細：マイニングプールは名の下にあるマイナーデータから集める',
        labels: ['アカウント', 'Ownerアドレス', '名の下のマイナー'],
      },
      dialog: {
        updateName: '署名を修正する>',
        updateNames: ['署名を修正する >', 'アカウントを申し込む >'],
        title: '署名認証',
        subtitle:
          '現在は 有効な計算力 ≥ 32 GiB のマイナーのみ自己認証をリリースする ',
        labels: [
          'Ownerアドレス',
          'アカウントのフルネーム（英語）',
          'アカウントのフルネーム（中国語）',
          '連絡先',
          'メッセージ',
          '署名コード',
          '署名'
        ],
        placeholders: [
          '',
          '18文字にこえない',
          '18文字にこえない',
          'メールボックス/携帯番号',
          '',
          '',
          '上記のコードをコピーし、filecoinウォレットで署名を行い、署名した内容をこちらに貼り付けてください'
        ],
        tips:
          '特記事項：アカウント名は敏感な言葉、禁止されている言葉、有名人の名前などを使用できない。違反があった場合、署名は削除され、無効にされることがある。ご協力ありがとうございます。',
        btnText: '提出'
      },
      overview: [
        'アカウントアドレス',
        'アカウントID',
        'アカウントタイプ',
        'アカウント残高',
        'メッセージ数',
        'Nonce',
        'コードCid',
        '作成時間',
        '直近の取引時間',
         'マルチシグネチャーアカウント',
      ],
      worker: 'マイナーリスト',
      ownerOverview: [
        '所有者アカウント',
        'ノートID',
        'ローバイトパワー',
        '有効な計算力',
        'ディスクセクターのサイズ',
        'ディスクセクター数量',
        '証明中のディスクセクター数量',
        '失敗数'
      ],
      owner: [
        'アカウントアドレス',
        'アカウントID',
        'アカウントタイプ',
        'アカウント残高',
        'メッセージ数',
        'Nonce',
        'コード Cid',
        '作成時間',
        '直近の取引時間',
        '名の下のマイナー',
        '実際に働いているマイナー'
      ],
      storageMiner: [
        'アドレス',
        'タイプ',
        '残高',
        '所有者',
        'ノートID',
        'ローバイトパワー',
        '有効な計算力',
        'ディスクセクターのサイズ',
        'ディスクセクター数量',
        '証明中のディスクセクター数量',
        '失敗数',
        'コード Cid',
        'ランダム値'
      ],
      multisig: [
        'アカウントアドレス',
        'アカウントタイプ',
        'Robust Address',
        'アカウント残高',
        'Available Balance',
        'Initial Balance',
        'Unlock Period',
        'Locking Balance',
        'Signers',
        'Approvals Threshold',
        'メッセージ数',
        'Nonce数',
        'コード Cid',
        '作成時間',
        '直近の取引時間'
      ],
      minerOverview: {
        balance: {
          title: 'アカウント残高',
          balance: 'アドレス残高: ',
          available: '利用可能な残高:',
          pledged: 'ディスクセクター抵当:',
          deposits: '事前入金:',
          reward: 'ロックアップ報酬:'
        },
        power: {
          title: '計算力リスト',
          rank: 'ランキング',
          subtitle: '有効な計算力',
          raw: 'ローバイトパワー: ',
          rate: '計算力の割合: ',
          block: '合計ブロックジェネレーション数: ',
          reward: '合計報酬: ',
          win: '合計得票数: ',
          size: 'ディスクセクターのサイズ: ',
          status: 'ディスクセクター状態: ',
          total: '全部',
          proving: '有効',
          fault: 'エラー',
          pre: '回復中'
        },
        growth: {
          labels: [
            { label: '計算力の増量: ' },
            { label: 'ディスクセクター抵当: ' },
            {
              label: 'ブロックジェネレーション数: ',
              tips:
                'ブロックジェネレーション数 = マイニングでブロックジェネレーション数（block）の合計'
            },
            {
              label: 'マイニング効率: ',
              tips:
                '選定された期間内に、マイナーが累計したブロックジェネレーション報酬と有効な計算力の割合'
            },
            { label: '計算力の成長率: ' },
            { label: 'Gas消耗: ' },
            { label: 'ブロックジェネレーション報酬: ' },
            {
              label: 'ラッキーナンバー: ',
              tips:
                '爆発ブロックの理論数に対する実際の爆発ブロック数の比率。マイナーの有効な計算力が1PiB未満の場合、この値には大きなランダム性がある。ご参照まで。'
            },
            { label: 'ディスクセクター増量: ' },
            { label: 'ディスクセクター増速: ' },
            {
              label: '得票数: ',
              tips:
                'Filecoinマイニング模型の中で，一つのチップセットは（tipset）複数のブロック（block）があり，各ブロックは複数の報酬（win count）を獲得することが可能である。 累計のブロック数＝毎回ブロックジェネレーションから取得する報酬数の合計'
            },
            {
              label: '単Tの消耗: ',
              tips:
                '選定された期間内に、単Tの密閉ディスクセクターのサイズGas消耗'
            }
          ],
          title: '統計指標',
          unit: ' 個ディスクセクター'
        }
      },
      accountOverview: {
        title: 'アカウントリスト',
        actor: 'マイナーアカウント:',
        owner: 'Owner:',
        time: '作成時間:',
        runningDays: '実行時間:',
        type: 'アカウントタイプ:',
        worker: 'Worker:',
        peer: 'ノード識別:',
        address: 'マイナーアドレス:',
        controller: 'Controller:',
        location: '地域:',
        // location: '地域(パブリックIP):',
        unknown: '未知'
      },
      mbaccountOverview: [
        'マイナーアカウント',
        'マイナータイプ',
        'マイナーアドレス',
        'Owner:',
        'Worker:',
        'Controller:',
        '作成時間:',
        '実行時間：',
        'ノード識別：',
        '地理的領域：'
      ],
      minerBalance: {
        title: 'アカウントの変更',
        chart: {
          title: '合計計算力',
          tooltip: '<div>{marker} {name}:{value} FIL</div>'
        },
        tooltip: [
          '使用可能な残高',
          'ディスクセクター抵当',
          '事前入金',
          'ロックアップ報酬'
        ],
        balance: '残高: '
      },
      minerPower: {
        title: '有効な計算力',
        names: ['有効な計算力', '計算力の成長'],
        chart: {
          title: '合計計算力',
          tooltip: '<div>{time}</div><div>{marker}有効な計算力:{power}</div>'
        }
      },
      minerBlock: {
        title: 'ブロックジェネレーション',
        chart: {
          title: [
            '合計ブロックジェネレーション',
            'ブロックジェネレーション増量'
          ]
        }
      },
      minerReward: {
        title: '報酬',
        chart: {
          title: ['合計報酬 / FIL', '報酬増量 / FIL']
        }
      },
      claim: {
        title: 'アカウントを申し込む',
        subTitle: '有効な計算力 ≥ 32 GiB のマイナーのみ自己認証をリリースする',
        owner: {
          label: '所有者アドレス',
          placeholder: ''
        },
        en: {
          label: 'アカウントの略称（英語）',
          placeholder: ' 18文字にこえない',
          error: 'アカウントの略称（英語）を入力ください'
        },
        nameEn: {
          label: 'アカウントのフルネーム（英語）',
          placeholder: 'オプション'
        },
        zh: {
          label: 'アカウントの略称（中国語）',
          placeholder: 'オプション'
        },
        nameZh: {
          label: 'アカウントのフルネーム（中国語）',
          placeholder: 'オプション'
        },
        contact: {
          label: '連絡先',
          placeholder: 'メールボックス、携帯番号',
          error: '連絡先を入力してください'
        },
        message: {
          label: 'メッセージ',
          placeholder: ''
        },
        signcode: {
          label: '署名コード',
          placeholder: ''
        },
        signature: {
          label: '署名',
          placeholder:
            '上記のコードをコピーし、filecoinウォレットで署名を行い、署名した内容をこちらに貼り付けてください',
          error: '署名を入力してください'
        },

        submit: '提出',
        tips:
          '特記事項：アカウント名は敏感な言葉、禁止されている言葉、有名人の名前などを使用できない。違反があった場合、署名は削除され、無効にされることがある。ご協力ありがとうございます。',
        copy: ['コピー済', 'コピー失敗']
      }
    },
    type: {
      account: '一般アカウント',
      owner: '所有者アカウント',
      miner: 'ストレージマイナー',
      system: 'システムアカウント',
      init: 'アカウントの初期化',
      cron: '時限タスク',
      power: 'ストレージ計算力',
      market: 'マーケットアカウント',
      payment: '支払方法',
      multisig: 'マルチシグネチャーアカウント',
      reward: '報酬アカウント'
    },
    trend: {
      switch: [
        'マイナーの計算力推移',
        'マイナーのブロックジェネレーション推移'
      ],
      chartSwitch: ['マイナー推移チャート', '片付け']
    },
    radio: ['メッセージリスト', 'ブロックジェネレーションリスト', '振込リスト'],
    radio1: ['メッセージリスト', '振込リスト']
  },
  message: {
    detail: {
      transactionLabels: ['送信元', ' ', '送信先', '金額', 'タイプ'],
      mbTransferLabels: ['送信元', '送信先', '金額', 'タイプ'],
      consumeTypeArr: ['','手数料を廃棄する','鉱夫手数料','振替', '罰', '告発する','重合費'],
      titles: [' メッセージ概要', '振込情報', 'その他情報'],
      overview: [
        'メッセージ ID',
        'チップセット',
        'ブロック',
        '時間',
        '送信アドレス',
        '受信アドレス',
        '数値',
        '領収書',
        'Gas Premium',
        'Gas数量',
        'Gas制限',
        'Gas Fee Cap',
        '方法',
        'ランダム値',
        'パラメータ'
      ],
      infoview: [
        'メッセージID',
        'チップセット',
        '時間',
        'ブロック',
        '金額',
        '発送者',
        '受信者',
        '実行結果',
        '方法'
      ],
      otherview: [
        'バージョンナンバー',
        'Nonce',
        '取扱手数料率の上限',
        'マイナーチップ率',
        'Gas用量の上限',
        'Gas実用量',
        '基本手数料率',
        '手数料',
        'パラメータ',
        '戻り値'
      ],
      transfer: {
        from: '送信元',
        to: '送信先',
        value: '金額',
        consume_type: 'タイプ'
      },
      paramTip: 'Base64式メタデータ',
      confirm: '確認'
    },
    pool: {
      infoview: [
        'メッセージID',
        'チップセット',
        '時間',
        '金額',
        '発送者',
        '受信者',
        '方法'
      ],
      otherview: [
        'バージョンナンバー',
        'Nonce',
        'Gas用量上限',
        'Gas実用量',
        'パラメータ'
      ]
    }
  },
  dsn: {
    list: {
      heading: 'オーダーリスト',
      total: '合計 {num} 件取引',
      labels: [
        '取引ID',
        'Piece CID',
        'ファイルサイズ',
        '顧客',
        'カストディアン',
        '開始時間',
        '終了時間',
        '保存費用',
        '認証済み'
      ],
      mLabels: [
        '取引ID',
        'Piece CID',
        'ファイルサイズ',
        '顧客',
        'カストディアン',
        '作成時間',
        '保存費用',
        '認証済み'
      ],
      tips:
        '公式に認定される顧客によって開始されたドキュメントオーダーを示す。当該オーダーの有効な計算力は、元の計算力の約10倍に等しいです ',
      placeholder: '顧客/カストディアン　を検索'
    },
    detail: {
      dsnTitle: 'オーダー詳細',
      title: 'ホスティング詳細',
      client: '顧客',
      provider: 'ホスティングマイナー',
      pledge: '抵当金額：',
      storageCost: 'ホスティング費用：',
      to: 'から',
      block: '(原力区)',
      overview: [
        '取引ID',
        '作成時間',
        '所属ブロック',
        '所属メッセージ',
        'Piece CID',
        '認証済み'
      ]
    }
  },
  noResult: {
    res: '検索結果なし',
    404: 'ページが見つかりません！{count}s後にホームページに戻します！',
    key: 'Oops! 入力した検索文字:',
    invalid: '申し訳ありません！この文字列は無効です',
    back: 'ホームページに戻します'
  },
  routeName: {
    blockDetail: 'ブロック詳細',
    messageDetail: 'メッセージ詳細',
    addressDetail: 'アドレス詳細',
    messageList: 'すべてのメッセージを確認',
    addressList: 'すべてのアカウントを確認',
    tipset: 'ブロックチェーン',
    mining: 'マイナー',
    metrics: '指標',
    map: 'ノードマップ',
    peer: 'ノード詳細',
    stats: 'データ',
    dsn: 'すべてのオーダーを確認',
    blocksWon: 'ブロックジェネレーション'
  },
  chart: {
    blockRatio: 'ブロックジェネレーションレート',
    minerBlockTrend:
      '<div>{time}</div><div>{totalMarker}合計ブロックジェネレーション数: {total} </div><div>{increaseMarker}{interval}ブロックジェネレーション数: {increase}</div>',
    minerRewardTrend:
      '<div>{time}</div><div>{totalMarker}合計報酬: {total}FIL </div><div>{increaseMarker}{interval}報酬: {increase}FIL</div><div>{interval}得票: {winCount}</div>',
    blockTime:
      "<div style='margin-bottom:5px'>平均ブロックジェネレーション時間: {value}s</div><div>時間: {name}</div>",
    mesHistory: '<div> メッセージ: {count}</div><div>{time}</div>',
    mesHistoryTitle: '直近14日のメッセージ履歴',
    pledge: '<div>抵当: {pledge} FIL</div><div>{time}</div>',
    tipset:
      '<div>マイナーID: {miner}</div><div>チップセット: {height}</div><div>ブロックジェネレーション時間: {block_time}</div><div>ブロックCid: {cid}</div>',
    filOutstanding: ['流通中', '抵当'],
    blockReward: [
      'ブロックジェネレーションのマイナー数',
      '累計のブロック報酬(FIL)'
    ],
    filecoin: 'ブロック報酬(FIL)',
    filVested: ['累計FILリリース', '每日リリースFIL'],
    coming: 'ぜひ楽しみにしていてください。',
    map:
      "<div style='margin-bottom:5px'><a href='/more/peer?peer_id={pid}'><span>ノートID : </span><span>{pid}</span></a></div><div style='margin-bottom:5px'><a href='/tipset/address-detail?address={miner}'><span>マイナー : </span><span>{miner}</span></a></div><div style='margin-bottom:5px'><span>位置 : </span><span>{name}</span></div><div><span>IP : </span><span>{ip}</span></div>"
  },

  blockHeaderChart: {
    op: 'ドラッグやドロップの操作をしてください',
    start: '開始チップセット',
    latest: '最新のチップセット'
  },
  pk: {
    title: 'マイナー比較',
    placeholder: '人気マイナーを入力、または選択してください',
    miner: {
      title: '',
      rows: [{ label: 'マイナー', key: 'miner' }]
    },
    overview: {
      title: 'マイナー概要',
      rows: [
        { label: '合計計算力', key: 'active_power' },
        { label: '合計ブロックジェネレーション数', key: 'active_block_count' },
        { label: '合計ブロック報酬', key: 'active_block_rewards' }
      ]
    },
    recent: {
      title: 'マイナー動向',
      rows: [
        { label: '直近24h計算力の増量', key: 'increased' },
        { label: '直近24hブロックジェネレーション数', key: 'active_win_count' },
        { label: '直近24hブロック報酬', key: 'fil' }
      ]
    },
    efficiency: {
      title: 'マイニング効率',
      rows: [
        {
          label: '単T収益',
          key: 'active_fil_per_t'
        },
        {
          label: '直近24h単T収益',
          key: 'fil_per_t'
        },
        {
          label: '直近24h証明成功率',
          key: 'success_rate'
        },
        {
          label: '直近24hブロックジェネレーションのラッキーナンバー',
          key: 'lucky_number'
        }
      ]
    },
    go: 'Go and choose miners for PK!',
    max: '最大6名のマイナーを支持する'
  },
  map: {
    label: 'アクティブなマイナー数',
    tips: '直近24時間メッセージを送信するマイナー'
  },
  chartIntervalMap: {
    '24h': '毎一時間',
    '1w': '毎日',
    '1m': '毎日',
    '6m': '毎日'
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
  forcePool: {
    forceNav: [
      { label: '口座情報', name: 'info' },
      { label: 'アカウント設定', name: 'set' }
    ],
    navTips: [
      { title: 'パーソナルセンター', content: 'このページには、Filscanアカウント情報がまとめられています。ここでアカウントのアドレスとパスワードを更新することもできます。' },
      { title: 'プールの監視', content: 'マイニングプールを個別に作成し、対応するマイニングプールにマイナーを追加して、統合された監視と管理を行うことができます。作成されたマイニングプールは、Filscanの現在のアカウントに対してのみ有効です。' }
    ],
    center: {
      tabs: ['パーソナルセンター', 'プールの監視'],
      menuList:[
        { label: "パーソナルセンター", icon: 'iconfont icon-center' },
        { label: "プールの監視", icon: 'iconfont icon-monitor'}
      ],
      accountInfo: {
        labels: [
          { label: 'ニックネーム', icon: 'edit' },
          { label: '電話番号', icon: 'edit' },
          { label: 'メールボックス', icon: 'edit' },
          { label: 'プール監視リスト', icon: 'add' },
          { label: '前回のログイン' },
        ]
      },
      errorTips: '存在しないノード：',
      successTips: 'プールの作成に成功しました',
      validateTips: '携帯の番号、メールの中に少なくとも一つは空きがあります',
      nodeCount: ' ノードプール',
      nodeTotal: ' ノード名',
      accountSet: {
        labels: [
          { label: 'ニックネーム', placeholder: 'ニックネームを入力してください', model: 'nick_name', tips: 'ニックネームは最大10文字' },
          { label: '電話番号', placeholder: '電話番号を入力してください', model: 'phone', tips: '変更するには、新しい電話番号を入力してください' },
          { label: 'メールボックス', placeholder: 'メールアドレスを入力してください', model: 'email', tips: 'メールアドレスを入力してください' },
          { label: '以前のパスワード', placeholder: '古いパスワードを入力してください', model: 'pwd', tips: '変更がない場合は、パスワードボックスを空白のままにしてください' },
          { label: '新しいパスワード', placeholder: '新しいパスワードを入力してください', model: 'newpwd', tips: '変更がない場合は、パスワードボックスを空白のままにしてください' },
          { label: 'パスワードを認証する', placeholder: '確認パスワードを入力してください', model: 'surepwd', tips: '上記のパスワードを変更した場合は、新しいパスワードを再入力して確認してください' }
        ],
        buttons: ['変更を確認する', 'キャンセル', 'アカウントを削除する'],
        dialog: {
          title: 'アカウントを完全に削除してもよろしいですか？',
          content: 'アカウントを削除すると、すべての監視リストとアドレス情報も削除されます。削除が確認された後は、上記のコンテンツを復元することはできません。',
          buttons: ['削除の確認', 'キャンセル']
        }
      }
    },
    monitor: {
      title: 'プールの監視',
      total: '合計{total}マイニングプールが作成されました（最大{count}つのマイニングプールを作成できます）',
      button: 'マイニングプールを作成する',
      labels: ['プール名', 'マイニングプールの有効な計算能力', '合計報酬', 'マイニングプールの名前で鉱夫'],
      emptyText: 'ノードプールを作成していません',
      dialog: {
        title: 'マイニングプールを作成する',
        labels: [
          { label: 'プール名', placeholder: '最大10文字まで入力できます', text: 'ノードプール名を入力してください', name: 'name' },
          { label: 'マイナー', placeholder: 'マイニングプールのマイナーを入力します。カンマまたはスペースで区切ります', text: 'マイニングプールのマイナーを入力します。カンマまたはスペースで区切ります',  name:'miners' },
        ],
        buttons: ['決定する', 'キャンセル'],
      }
    },
    admin: {
      title: 'プール管理',
      labels: [
        { label: 'プール名', placeholder: 'マイニングプールの名前を入力してください' },
        { label: 'マイナー管理', placeholder: '追加するマイナーを入力してください' },
      ],
      buttons: ['セーブ', 'キャンセル', 'マイニングプールを削除する'],
      dialog: {
        title: '現在のアカウントを削除してもよろしいですか？',
        content: 'マイニングプール内のすべてのデータは、削除後に削除されます',
        buttons: ['削除の確認', 'キャンセル']
      },
      limit: ['追加鉱夫は重複しています','追加鉱夫はすでに存在します','追加上限に達しました'],
      nullTips:'現在ノードのプールにノードがありません。少なくとも一つのノードを追加して保存してください。',
      chartTips: '英語のコンマを使ってください。'
    },
    notice: {
      title: '通知設定',
      tips: '通知方法：住所残高の推定利用可能時間が120分未満のときに通知を開始します',
      labels: ['住所', 'の種類', 'SMS通知', '電話通知', '電子メール通知'],
      phoneTips: '（注意：電話通知は中国のユーザーのみがサポートしています）',
      emailBtn: '通知アカウントを追加する',
      buttons: ['セーブ', 'キャンセル'],
      breadcrumbList: ['プールの監視', '通知'],
      msgDialog: {
        title: 'SMS',
        placeholder: ['電話番号を入力してください', '確認コードを入力してください'],
        buttons: ['決定する', 'キャンセル', '確認コードを取得する']
      },
      phoneDialog: {
        title:'電話で知らせる',
        placeholder: ['電話番号を入力してください','確認コードを入力してください'],
        buttons:['決定する', 'キャンセル', '確認コードを取得する']
      },
      emailDialog: {
        title:'メールの通知',
        placeholder: ['メールアドレスを入力してください','確認コードを入力してください'],
        buttons:['決定する', 'キャンセル', '確認コードを取得する']
      }
    },

    list: {
      button: 'プール管理',
      poolOverview: {
        title: 'マイニングプールの概要',
        labels: [
          { label:'有効な計算力 / 割合' },
          { label:'合計報酬' },
          { label:'ディスクセクター抵当' },
          { label:'事前入金', tips: '鉱山のパッケージセクターがPreComitsを行う時、いくつかの預金を担保として提供しなければなりません。この部分のセクタが直ちにProveComittedを完成できない場合、この部分の預金はペナルティされます。時間どおりにProveを完成したら釈放されます。' },
          { label:'ロックアップ報酬' }
        ]
      },
      nodeList: {
        title: '鉱夫のリスト',
        labels: ['マイナー', '标ラベル签', '有効な計算力', '合計報酬', '利用可能な残高', 'ディスクセクター抵当', '事前入金', 'ロックアップ報酬']
      }
    },
    detail: {
      nodeOverview: {
        title: '鉱山労働者の概要',
        nodePower: 'ノード計算力',
        panelLabels: [
          { label: '合計報酬' },
          { label: '利用可能な残高' },
          { label: 'ディスクセクター抵当' },
          { label: '事前入金', tips: '鉱夫がPreCommitsのセクターをカプセル化する場合、誓約として事前デポジットを提供する必要があります。セクターのこの部分がProveCommittedを時間内に完了できなかった場合、事前デポジットのこの部分は罰金が科せられ、Proveが時間どおりに完了した場合はリリースされます。' },
          { label: 'ロックアップ報酬' }
        ],
        tableLabels: [
          { label: 'の種類'},
          { label:'住所'},
          { label:'残高'},
          { label:'残りの推定利用可能時間', tips: '残りの利用時間は住所追加後30分以内に表示されます。対応するアドレスがGas消費されていない場合、残りの利用時間は予約できません'},
          { label:'通知設定'}
        ]
      },
      nodeData: {
        title: 'マイナーサイクルデータ',
        button: 'ダウンロード Excel',
        datePick: ['を','開始日','終了日'],
        panelLabels: [
            // '有効な計算力',
          { label:'パッケージコンピューティングパワーを追加' },
          { label:'ブロックジェネレーション報酬' },
          { label:'ディスクセクター抵当' },
          { label:'Gas消費する' }
        ],
        tableLabels: ['日期', 'マイナー', '有効な計算力', 'パッケージの計算能力', 'ブロックジェネレーション報酬', 'ディスクセクター抵当', 'Gas消費する']
      }
    }
  },
  apiStatus: [
    { code: 0 , message: 'ok'},
    { code: 1 , message: '検証コードエラー'},
    { code: 2 , message: 'パラメータエラー'},
    { code: 3 , message: 'サポートされていないキャリア番号セグメント'},
    { code: 4 , message: 'アカウントが登録されました'},
    { code: 5 , message: '未知の間違い'},
    { code: 6 , message: 'パスワードが間違っています，再入力してください'},
    { code: 7 , message: 'アカウント番号が間違っています，再入力してください'},
    { code: 8 , message: 'アカウントが異常で、ログインが禁止されています'},
    { code: 9 , message: 'ログインの有効期限が切れています，もう一度ログインしてください'},
    { code: 10 , message: 'パスワードが2回間違っています，再入力してください'},
    { code: 11 , message: '無効な操作'},
    { code: 12 , message: '確認コードの送信頻度が高すぎます，しばらくしてからもう一度お試しください'},
    { code: 13 , message: 'ストレージプール名はすでに存在します，再入力してください'},
    { code: 14 , message: 'ノードが存在しません，再確認してください"'},
    { code: 15 , message: 'ストレージプールの数が上限に達しました"'},
  ]
}
export default ja
