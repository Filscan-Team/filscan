const isTest = false
const ko = {
  mixin:{
    formatTime:{
      before: '이전',
      suffix: ['일', '시간', '분', '초']
    }
  },
  component: {
    empty: {
      label: '데이터 없음'
    },
    heightDetail: {
      titles: ['블록 높이', '블록 목록'],
      heightLabels: ['득표수', '보상', '시간'],
      blockLabels: ['블록Cid', '광부', '보상', '메시지 수']
    },
    filecoin: {
      labels: [
        '시가총액',
        '시장 점유율',
        '시가총액 순위',
        '24h최저가/24h최고가',
        '유통량',
        '완전 희석 후 시가'
      ]
    },
    overview: {
      btnText: '마이닝 풀 세부 사항'
    },
    mesList: {
      title: '메시지',
      heading: '메시지목록',
      poolheading: '메시지 풀 목록',
      label: [
        '메시지ID',
        '블록 높이',
        '시간',
        '발송 주소',
        '수신 주소',
        '액수',
        '상태',
        '방법'
      ],
      blockLabel: [
        '메시지ID',
        '높이',
        '발송 주소',
        '수신 주소',
        '방법',
        '액수'
      ],
      poolLabels: [
        '메시지ID',
        '시간',
        '발송 주소',
        '수신 주소',
        '액수',
        'Gas 한도',
        'Gas Premium',
        '방법'
      ],
      mbLabel: [
        '메시지ID',
        '시간',
        '발송 주소',
        '수신 주소',
        '액수',
        'Gas한도',
        'Gas Premium',
        '방법'
      ],
      total: '총 {total} 개 메시지',
      latest: '',
      // latest: "(지난 7 일)",
      range: '( {start} ~ {end} ) ',
      method: {
        ChangePeerID: '노드 번호 변경',
        ChangeWorkerAddress: '광부 주소 변경',
        ControlAddresses: '주소 관리',
        PreCommitSector: '데이터 사전 제출',
        ProveCommitSector: '데이터 제출 증명',
        SubmitWindowedPoSt: '제출 시간과 공간 증명',
        Transfer: '계좌이체'
      },
      placeholder: '방법',
      tips: '(지난 주 내 메시지만 표시)',
      receipt: ['성공', '실패', '알 수 없는 오류'],
      fail: '실패',
      selector: [
        { label: '입금', type: 'to' },
        { label: '송금', type: 'from' }
      ],
      type: ['전입', '전출']
    },
    blockList: {
      label: [
        '블록Cid',
        '블록 높이',
        '아웃블록 시간',
        '메시지 수',
        '광부 주소',
        '아웃블록 보상'
      ],
      mbLabel: ['블록Cid', '채굴꾼', '시간', '보상', '', '메시지'],
      total: '총계 {total} 블록',
      height: '블록 높이 # {height}',
      mb: {
        height: '높이:',
        time: '시간:',
        label: ['', '보상']
      },
      start: '날자',
      end: '날자',
      title: '블록 세부 사항'
    },
    transactionList: {
      total: '총계 {total} 메시지',
      label: ['전송시간', '메시지CID', '발송자', '수신자', '금액', '전송 유형'],
      typeOptions: ['발송', '수신', '블록 보상', '기타 처벌', '비용 을 모으다']
    },
    addressList:{
      heading: "부자순위"
    },
    transferList: {
      heading: '거액 계좌이체 기록',
      total: '총 {total} 개 메시지',
      labels: [
        '블록 높이',
        '메시지ID',
        '시간',
        '발송 주소',
        '수신 주소',
        '액수',
        '방법'
      ],
      addressLabels: [
        '시간',
        '메시지ID',
        '발송 주소',
        '수신 주소',
        '액수',
        '방법',
        ' 유형'
      ]
    },
    timeSelector: [
      { value: '24h', label: '24시간' },
      { value: '1w', label: '1주' },
      { value: '1m', label: '1월' },
      { value: '1y', label: '1년' },
      { value: 'all', label: '총' }
    ],
    times: {
      '6h': '6시간',
      '24h': '오늘',
      '1d': '어제',
      '1w': '1주',
      '1m': '30일',
      '6m': '6월',
      '0.5y': '반년',
      '1y': '1년',
      all: '총'
    },
    timeGrowth: {
      '24h': '24 시간',
      '1d': '어제',
      '1w': '7일',
      '1m': '30일',
      '6m': '6월',
      '0.5y': '반년',
      '1y': '1년'
    },
    timeGrowth1: {
      '24h': '오늘',
      '1d': '어제',
      '1w': '1주',
      '1m': '30일',
      '6m': '6월',
      '0.5y': '반년',
      '1y': '1년'
    },
    more: '더 많이'
  },
  account: {
    login: {
      welcome: '다시 오신 것을 환영합니다',
      account: '계정',
      phoneLogin: '전화로 로그인',
      emailLogin: '메일 로그인',
      phone: "이메일 로그인",
      enterPhone: "전화번호를 입력하세요",
      email: '이메일 주소',
      enterEmail: "이메일 주소를 입력하세요",
      pass: '비밀번호',
      enterPass: "비밀번호를 입력해주세요",
      code: "확인 코드",
      enterCode: "인증 코드를 입력하십시오",
      getCode: "인증 코드 받기",
      resetPass: "비밀번호 분실?",
      sure: "로그인",
      byPass: '비밀번호 로그인',
      byCode: '인증 코드 로그인',
      registerPrefix: "아직 계정이 없으신가요?",
      register: "지금 등록하세요",
      remember: '비밀번호를 기억하고 자동으로 로그인'
    },
    register: {
      welcome: '계정 등록',
      account: '계정',
      setPwd: '암호를 설정하세요',
      phoneRegister: "휴대전화 등록",
      emailRegister: "이메일 등록",
      phone: "전화 번호",
      enterPhone: "등록된 휴대폰 번호를 입력해주세요",
      email: "이메일 주소",
      enterEmail: "등록된 이메일 주소를 입력하세요",
      pass: '비밀번호',
      enterPass: "비밀번호를 입력해주세요",
      passAgain: "비밀번호 확인",
      enterPassAgain: "비밀번호를 확인해주세요",
      code: "확인 코드",
      enterCode: "인증 코드를 입력하십시오",
      getCode: "인증 코드 받기",
      private: "서비스 이용약관 및 개인정보취급방침에 동의해주세요",
      hasPrefix: "이미 계정이 있습니까?",
      has: "로그인",
      sure: "등록하다"
    },
    reset: {
      welcome: '비밀번호를 잊어버리다',
      phoneReset: '전화번호 검색',
      emailReset: '이메일 검색',
      phone: "전화 번호",
      enterPhone: "전화번호를 입력하세요",
      email: "이메일 주소",
      enterEmail: "이메일 주소를 입력하세요",
      pass: '새 비밀번호',
      enterPass: "새 비밀번호를 입력하세요",
      newPass: "새 비밀번호 확인",
      enterNewPass: "새로운 비밀번호를 확인해주세요",
      code: "확인 코드",
      enterCode: "인증 코드를 입력하십시오",
      getCode: "인증 코드 받기",
      hasPrefix: "이미 계정이 있습니까?",
      has: "로그인으로 돌아가기",
      sure: "결정",
      pre: '이전의',
      next: '다음 단계'
    },
    logout: {
      msg: '로그아웃하려고 합니다. 계속하시겠습니까?',
      tip: '힌트',
      confirm: '결정',
      cancel: '취소',
      success: '로그아웃 성공!',
      hasCancel: '취소 된',
    },
    error: {
      listLimit: '이 주소는 알림 목록에 추가되었습니다',
      emptyPhone: '전화번호를 입력하세요',
      errorPhone: '유효한 전화 번호를 입력하세요',
      emptyAccount: '계정은 비워둘 수 없습니다',
      errorAccount: '정확한 전화번호 또는 이메일 주소를 입력하세요',
      emptyCode: '인증 코드를 입력해야 합니다',
      emptyPass: '비밀번호를 입력해주세요',
      emptyNewPass: '새 비밀번호를 입력하세요',
      errorPass: '비밀번호는 최소 문자와 숫자(대소문자 구분)를 포함하여 8~20자여야 합니다',
      notRegister: '계정이 등록되지 않았습니다',
      hasRegister: "계정이 이미 등록되었습니다",
      sameWithPhone: "비밀번호는 전화번호와 정확히 같을 수 없습니다",
      emptyPassAgain: '비밀번호를 다시 입력해주세요',
      emptyNewPassAgain: '새 비밀번호를 다시 입력하세요',
      differentPass: "입력한 두 개의 비밀번호가 일치하지 않습니다",
      agreePrivate: "서비스 이용약관 및 개인정보취급방침에 동의해주세요",
      emptyTag: "메모를 입력하세요",
      emptyAddress: '패스 주소를 입력하세요',
      emptyMail: '정확한 이메일 주소를 입력해주세요',
      errorEmail: "이메일 주소 형식이 잘못되었습니다",
      registerMail: "이메일이 등록되었습니다",
      emptyNumber: '신분증 번호를 입력하세요. 여권이 지원됩니다',
      emptyName: '이름을 입력하세요',
      nameError: '이름은 64자를 초과할 수 없습니다',
      areaCodeError: '정확한 국제 지역 코드를 입력하세요',
      phoneError: '정확한 전화번호를 입력하세요',
      picTypeError: '업로드된 아바타 이미지는 JPG 또는 PNG 형식만 가능합니다',
      picSizeError: '업로드된 아바타 이미지 크기는 5MB를 초과할 수 없습니다',
      infoNotMatch: {
        title: '신원 정보가 일치하지 않습니다!',
        mes: "제출하신 본인 인증 정보가 휴대폰 번호의 본인 확인 정보와 일치하지 않습니다."
      },
      mustHaveOne: '하나 이상의 보안 확인 방법 유지',
      miners: '마이닝 풀의 광부를 입력하십시오. 영어 쉼표로 구분하십시오'
    },
  },
  header: {
    network: '현재 네트워크:',
    centerOption:[
      { index: 'center', label: '개인 센터' },
      { index: 'monitor', label: '풀 모니터링' },
      { index: 'LogOut', label: '탈퇴' },
    ],
    seo: {
      index: 'Filscan--Filecoin블록체인 브라우저',
      chain: '블록 조회 - Filscan 브라우저',
      message: '전부메시지 - Filscan 브라우저',
      pool: '포장 대기 메시지 - Filscan 브라우저',
      address: '전체 계정 - Filscan 브라우저',
      addressDetail: ' 주소 {address} - Filscan 브라우저',
      dsn: '전체 주문 - Filscan 브라우저',
      dsnDetail: '주문 세부 사항 {dealid} - Filscan 브라우저',
      messageDetail: '메시지 {message} - Filscan 브라우저',
      mining: '랭킹 - Filscan 브라우저',
      calculator: '계산기 - Filscan 브라우저',
      gas: 'Gas통계 - Filscan 브라우저',
      fil: 'FIL - Filscan 브라우저',
      stats: '차트&통계 - Filscan 브라우저',
      map: '노드 맵 - Filscan 브라우저'
    },
    title: 'Filscan',
    tab: ['홈페이지', 'Tipset', '통계 데이터'],
    placeholder: '주소/메시지ID/높이/블록Cid/노드ID를 입력하세요',
    filter: [
      {
        label: '전체 선별 유형',
        value: 0
      },
      {
        label: ' 주소',
        value: 1
      },
      {
        label: '메시지ID',
        value: 2
      },
      {
        label: '높이',
        value: 3
      },
      {
        label: '블록Cid',
        value: 4
      },
      {
        label: '노드ID',
        value: 5
      }
    ],
    nav: {
      home: {
        label: '홈페이지',
        index: 'home',
        path: '/'
      },
      tipset: {
        label: '블록체인',
        index: 'tipset',
        down: true,
        items: [
          {
            label: '블록',
            path: '/tipset/chain',
            index: 'chain'
          },
          {
            label: '메시지',
            path: '/tipset/message-list',
            index: 'message-list'
          },
          {
            label: '거액 계좌 이체',
            path: '/tipset/address-list',
            index: 'address-list'
          },
          {
            label: '거액 전송',
            path: '/tipset/transfer-list',
            index: 'transfer-list'
          },
          {
            label: '주문',
            path: '/tipset/dsn',
            index: 'dsn'
          },
          {
            label: '메시지 풀 ',
            path: '/tipset/pool-message-list',
            index: 'pool-message-list'
          }
        ]
      },
      mining: {
        label: '랭킹',
        path: '/mining',
        index: 'mining'
      },
      statistics: {
        label: '통계',
        index: 'statistics',
        down: true,
        items: [
          {
            label: 'Gas요금 추세',
            index: 'gas',
            path: '/statistics/gas'
          },
          {
            label: '기준선과 해시 레이트 동향',
            path: '/statistics/power',
            index: 'power'
          },
          {
            label: 'FIL',
            path: '/statistics/fil',
            index: 'fil'
          },
          {
            label: '차트 통계',
            index: 'charts',
            path: '/statistics/charts'
          }
        ]
      },
      resources: {
        label: '자원',
        index: 'resources',
        down: true,
        items: [
          {
            label: '계산기',
            path: '/resources/calculator',
            index: 'calculator',
          },
          {
            label: '상용 공구',
            path: '/resources/tools',
            index: 'tools',
          }
        ]
      },
      // filwallet: {
      //   label: '지갑',
      //   href: 'https://filecoinwallet.com/',
      //   index: 'filwallet',
      // },
      incubation: {
        label: '메모리 공급 자',
        path: '/forcepool/center?type=1',
        index: 'incubation',
        pro: true
      }
    },
    mbnav: {
      home: {
        label: '홈페이지',
        index: 'home',
        path: '/'
      },
      tipset: {
        label: '블록체인',
        index: 'tipset',
        isSubShow: false,
        close: 'icon-down',
        up: 'icon-up',
        items: [
          {
            label: '블록',
            path: '/mobile/tipset/chain',
            index: 'chain'
          },
          {
            label: '메시지',
            path: '/mobile/tipset/message-list',
            index: 'message-list'
          },
          {
            label: '거액 계좌 이체',
            path: '/mobile/tipset/address-list',
            index: 'address-list'
          },
          {
            label: '거액 전송',
            path: '/mobile/tipset/transfer-list',
            index: 'transfer-list'
          },
          {
            label: '주문',
            path: '/mobile/tipset/dsn',
            index: 'dsn'
          },
          {
            label: '메시지 풀 ',
            path: '/mobile/tipset/pool-message-list',
            index: 'pool-message-list'
          }
        ]
      },
      mining: {
        label: '랭킹',
        path: '/mobile/mining',
        index: 'mining'
      },
      statistics: {
        label: '통계',
        index: 'statistics',
        isSubShow: false,
        close: 'icon-down',
        up: 'icon-up',
        items: [
          {
            label: 'Gas요금 추세',
            index: 'gas',
            path: '/mobile/statistics/gas'
          },
          {
            label: '기준선과 해시 레이트 동향',
            path: '/mobile/statistics/power',
            index: 'power'
          },
          {
            label: 'FIL',
            path: '/mobile/statistics/fil',
            index: 'fil'
          },
          {
            label: '차트 통계',
            index: 'charts',
            path: '/mobile/statistics/charts'
          }
        ]
      },
      resources: {
        label: '자원',
        index: 'resources',
        isSubShow: false,
        close: 'icon-down',
        up: 'icon-up',
        items: [
          {
            label: '계산기',
            path: '/mobile/resources/calculator',
            index: 'calculator',
          },
          {
            label: '상용 공구',
            path: '/mobile/resources/tools',
            index: 'tools',
          }
        ]
      },
      filwallet: {
        label: '지갑',
        href: 'https://filwallet.ai/',
        index: 'filwallet',
      },
      incubation: {
        label: '저장 공급 자 부화 센터',
        href: 'https://venus.filecoin.io/incubation/Rules.html#storage-provider-incubation-program',
        index: 'incubation',
        hot: true
      }
    },
    mb: {
      title: 'Filecoin 검색',
      search: 'Search'
    },
    cancel: '취소'
  },
  footer: {
    peer: '유망 채굴꾼 {count}',
    mobile: [
      {
        label: 'Filecoin공식 웹 사이트',
        href: ' https://filecoin.io'
      },
      {
        label: '수도꼭지',
        href: isTest
          ? 'https://faucet.calibration.fildev.network/'
          : 'https://faucet.glif.io/'
      },
      {
        label: 'lotus서류',
        href: 'https://lotu.sh/'
      },
      {
        label: '테스트 넷 설명',
        href: ' https://testnet.filecoin.io/'
      }
    ],
    links: [
      {
        title: 'Filecoin프로젝트',
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
            label: '프로토콜 실험실',
            class: 'icon-slack',
            href: 'https://protocol.ai/'
          },
          {
            label: '프로토콜 아카데미',
            class: 'icon-slack',
            href: 'https://proto.school/'
          },
          {
            label: 'Filecoin Twitter',
            class: 'icon-slack',
            href: 'https://twitter.com/Filecoin'
          },
          {
            label: 'Filecoin위챗 공식 계정',
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
            label: 'Filecoin재단',
            class: 'icon-matrix',
            href: 'https://fil.org/'
          },
          {
            label: 'Filecoin DevGrants',
            class: 'icon-ttww',
            href: 'https://github.com/filecoin-project/devgrants'
          },
          // {
          //   label: '포스 존 위챗 공식 계정',
          //   class: 'icon-wechat',
          //   qrClass: 'qr-ipfs',
          //   popover: true
          // },
          {
            label: '온라인 피드백',
            href: 'http://ipfsforce.mikecrm.com/E6kYnYI'
          }
        ]
      },
      {
        title: '네 가지 실현',
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
        title: '응용 정보',
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
        title: '개발자 도구',
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
    contact: '이메일: ',
    detail:
      'Filscan 브라우저는  Filecoin 블록체인 브라우저 및 데이터 서비스 플랫폼으로 Filecoin 을 기반으로 하는 각종 채굴 순위, 블록체인 데이터 조회, 시각화 차트 등 원스톱 데이터 서비스를 제공합니다',
    ipfs: '포스 존 ',
    copyright:
      '버전 소유 © Filecoin개발 보조금 프로그램 \n<a href="https://www.mit-license.org/" target="_blank"> MIT </a> 및<a href="https://www.apache.org/licenses/LICENSE-2.0.html" target="_blank"> Apache 2.0 </a>판권 계약. ',
    copyright1:
        '버전 소유 © Filecoin개발 보조금 프로그램 \n<a href="https://www.mit-license.org/" target="_blank"> MIT </a> 및<a href="https://www.apache.org/licenses/LICENSE-2.0.html" target="_blank"> Apache 2.0 </a>판권 계약. <a href="https://ipfser.org" target="_blank"> 포스 존  </a>기술 지원에 의합니다'
  },
  home: {
    tips:
      '버전 업그레이드로 인해  데이터 표시의 정확성을 보장할 수 없습니다. 프로그래머는 <span ">집중적으로 업그레이드 중입니다···</span> 부디 량해 부탁드립니다 !',
    subtitle: {
      index: '전체 네트워크  데이터 지표',
      charts: '차트통계',
      pool: '마이닝 풀 순위',
      poolTips: '이 랭킹은 해시 레이트가 1PiB보다 큰 마이닝 풀만을 통계합니다.',
      transfer: '거액 전송 기록',
      moreChart: '더 많이차트'
    },
    charts: {
      more: '더 기타 차트'
    },
    blocksWon: {
      title: '최신 높이',
      miner: '채굴꾼',
      block: {
        title: '아웃블록  / 점유율',
        tips: '30분 이내 아웃블록  수량/점유율'
      },
      blockRate: {
        title: '아웃블록 비율',
        tips: '근 30분내 매 높이의 아웃블록 효률'
      },
      win: {
        title: '득표 / 점유율',
        tips: '거의 30분 득표수의 양/점유율'
      },
      more: '더 많이',
      latest:
        '최신 블록시간：<i class="font-18 mark font-500">{time}</i> &nbsp;이전',
      chart: {
        title: '근 30분 내에 블록이 발견되지 않았습니다',
        tooltip:
          '<div>채굴꾼ID: {miner_id}</div><div>높이: {height}</div><div>아웃블록 시간: {block_time}</div><div>블록Cid: {cid}</div><div>득표수량: {win_count}</div>'
      }
    },
    metaList: {
      tabs: ['펼침', '접힘']
    },
    meta: [
      { label: '최신 블록 높이' },
      { label: '최신 블록시간' },
      {
        label: '전체 네트워크 유효 해시 레이트',
        tips: '현재 전체 네트워크 유효 해시 레이트（유효 저장 공간）의 총합'
      },
      { label: '최신 24h 증가 해시 레이트' },
      {
        label: '최신 24시간 채굴 효율',
        tips: '최근24시간의 총 아웃블록 보상과 유효 해시 레이트의 비율'
      },
      {
        label: '각 득표 보상',
        tips:
          '최신 높이의 단위 아웃블록 보상，높이 마다 다중 블록이 있으며，각 블록은 모두 해당 보상을 획득할 수 있습니다'
      },
      { label: '현재 기본 요금' },
      { label: '거의 24h아웃블록 보상' },
      { label: '전체 네트워크 아웃블록  수량' },
      { label: '전체 네트워크 아웃블록 보상' },
      {
        label: '32GiB섹터Gas소모',
        tips: '32G섹터 T마다 소모해야 하는 Gas값 밀봉'
      },
      {
        label: '32GiB섹터 신규 해시 레이트 원가',
        tips:
          '32G섹터 신규 해시 레이트에 소비해야 하는 원가，섹터 저당과 패키지 수수료 포함'
      },
      { label: '현재 섹터 저당량' },
      { label: '소모량' },
      {
        label: '평균 높이마다 메시지 수',
        tips: '최근 24h평균 높이마다 메시지 수량 '
      },
      {
        label: '64GiB섹터Gas소모',
        tips: '64G섹터 T마다 소모해야 하는 Gas값 밀봉'
      },
      {
        label: '64GiB섹터 신규 해시 레이트 원가',
        tips:
          '64G섹터 신규 해시 레이트가 필요한 비용은 섹터 저당 및 패키지 수수료를 포함합니다'
      },
      { label: '유망 채굴꾼 수' },
      { label: '유통률' },
      {
        label: '평균 높이마다 블록 수량',
        tips: '최근 24h평균 높이마다 블록 수량'
      }
    ],
    mbMeta: [
      {
        label: '해시 레이트수익'
      },
      { label: '득표당 보상' },
      {
        label: '저장 속도'
      },
      { label: '전체 네트워크 아웃블록 보상' },
      { label: '전체 네트워크 아웃블록  수량' },
      { label: '최신 블록 높이' },
      {
        label: '전체 네트워크 유효 해시 레이트'
      },
      {
        label: '유망 채굴꾼 수'
      }
    ],
    chart: {
      power: {
        title: '30일기준선과 해시 레이트 동향',
        yAxisName: [
          '전체 네트워크 해시 레이트',
          '기준선 추세',
          ' 해시 레이트 증가'
        ],
        tips:
          '기준선 표준은 Filecoin네트워크가 요구하는 네크워크 증가 규모이며, 메인 네트워크 온라인 시, 2.5EiB，매년100% 증가율입니다. '
      },
      blockReward: {
        title: '24h기초 수수료 추세',
        subTitle: '근 24시간',
        meta: ['아웃블록 수: ', '', '득표수: ', '', '보상: '],
        yAxisName: ['기초 수수료', '32GiB섹터Gas소모', '64GiB섹터Gas소모'],
        chart: {
          yAxisName: ['보상 / FIL', '아웃블록 '],
          tooltip:
            '<div>{lineMarker}매 시간보상: {lineCount} FIL</div><div>{barMarker}매 시간 아웃블록 수: {barCount}</div><div>매 시간 득표:{winCount}</div>'
        }
      },
      region: {
        title: 'FIL유통량 구성',
        total: "총 해시 레이트: <i class='mark'>{total}</i>",
        continent: [
          { key: 'circulating', name: '거래 유통 가능한FIL', color: '#5B8FF9' },
          { key: 'locked', name: '섹터 저당', color: '#5AD8A6' },
          { key: 'vested', name: '릴리스 보상 대기', color: '#5D7092' },
          { key: 'burnt', name: '소각된 FIL', color: '#F6BD16' },
          { key: 'mined', name: '채굴꾼 보상', color: '#E8684A' },
          { key: "other", name: "", color: "#999999" },
        ]
      }
    },
    blockSize: {
      label: '평균 블록 메타 데이터',
      size: '바이트',
      tips: '거의 24시간 평균 블록 메타 데이터 크기'
    },
    totalPower: {
      power: '원래 값 해시 레이트',
      capacity: '유효 해시 레이트'
    },
    latest: {
      block: {
        title: '최신의 블록',
        more: '더 많이',
        height: '블록 높이:',
        time: '시간:',
        hash: 'Cid:',
        miner: '채굴꾼:',
        reward: '보상:'
      },
      message: {
        title: '최신의 메시지',
        more: '더 많이',
        id: '최신 메시지:',
        from: '발송 주소:',
        to: '수신 주소:'
      }
    },
    tag:
      ' 채굴꾼 명칭 표지는 이메일로 보내주세요: filscan@ipfsforce.com또는 위챗:ipfsforce',
    lucky: '채굴꾼 실제 득표 확률에 비해 전체 네트워크 평균 값의 편차',
    topPowerTable: {
      title: '채굴꾼 랭킹',
      homelabel: [''],
      label: [
        '채굴꾼',
        '유효 해시 레이트 / 점유율',
        '원래 값 해시 레이트 / 점유율',
        '아웃블록  / 점유율',
        '보상'
      ],
      mbLabel: ['채굴꾼', '원래 값 해시 레이트', '아웃블록 ', '보상']
    },
    topPowerChartLabel: [
      { label: '원래 값 해시 레이트', index: 'RawBytePower' },
      { label: '유효 해시 레이트', index: 'QualityAdjPower' }
    ],
    rate: {
      title: '채굴꾼 효율',
      table: {
        label: ['채굴꾼', '해시 레이트 증량', '저장 효율', '해시 레이트 수익'],
        mbLabel: ['채굴꾼', ' 증량', '저장 효율', '수익']
      },
      chart: {
        title: '채굴꾼 효율'
      }
    },
    watch: '체인 그래프',
    transfer: {
      plabels: ['발송측', ' ', '수신측', '높이', '액수'],
      labels: ['발송측', ' ', '수신측', '액수']
    },
    poolTable: {
      tips: '마이닝 풀 누적 아웃블록 보상과 유효 해시 레이트의 비율'
    }
  },
  tipset: {
    height: '높이',
    block: {
      overview: [
        'Cid',
        '높이',
        '타임스탬프',
        '메시지',
        '채굴꾼',
        '득표',
        '보상',
        '부모 블록Cid',
        '부모 블록 중량',
        '부모 기본 요율',
        '표값',
        '근'
      ],
      rewards: '{reward} FIL ( {block} FIL 블록 보상 및 {fee} FIL 수수료 보상 )'
    },
    blockType: ['블록 없음', '최소 표값 블록', '기타 블록'],
    tips: '표값은 난수입니다',
    tooltip: [
      {
        label: '채굴꾼ID: ',
        key: 'miner'
      },
      {
        label: '높이: ',
        key: 'height'
      },
      {
        label: '블록 연령: ',
        key: 'utcTime'
      },
      {
        label: '블록Cid: ',
        key: 'hash'
      },
      {
        label: '득표: ',
        key: 'win_count'
      }
    ],
    item: {
      height: '높이:',
      time: '블록 연령:',
      labels: ['높이', 'Cid', '채굴꾼', '라벨', '메시지', '보상', '시간']
    }
  },
  mining: {
    heading: '랭킹',
    efficiency: {
      title: '채굴꾼 효율',
      placeholder: "채굴꾼ID를 입력해주세요，여러 ID는 영문으로','구분해주세요",
      label: [
        ' 순위',
        '채굴꾼',
        '라벨',
        '아웃블록 보상/점유율',
        '아웃블록 수',
        '득표률',
        '유효 해시 레이트',
        '섹터 크기'
      ],
      mblabel: [
        ' 순위',
        '아웃블록 보상/점유율',
        '아웃블록 수',
        '득표률',
        '유효 해시 레이트',
        '섹터 크기'
      ],
      tips: [
        '',
        'Filecoin채굴 모델에서 같은 높이（tipset）에서 여러 개 블록（block）이 있을 수 있으며，각 블록은 여러 보상（win count）을 획득할 수 있습니다.',
        '선택 주기 내에서 채굴꾼은 아웃블록 보상과 누적 산출 블록 보상의 비율을 얻습니다.'
      ],
      mbLabel: [' 순위', '채굴꾼', '라벨', '저장 효율'],
      mbLabel2: [' 순위', '채굴꾼', '라벨', '해시 레이트 수익']
    },
    poolranking: {
      label: [
        ' 순위',
        '채굴꾼 명칭',
        '해시 레이트 가속',
        '해시 레이트 증량',
        '유효 해시 레이트',
        '원래 값 해시 레이트',
        '섹터 크기'
      ],
      mblabel: [
        ' 순위',
        'Owner ID',
        '유효 해시 레이트',
        '채굴 효율',
        '근 24h해시 레이트 증량',
        '행운지수',
        '아웃블록 수'
      ]
    },
    powerRate: {
      label: [
        ' 순위',
        '마이닝 풀  명칭',
        '해시 레이트 가속',
        '해시 레이트 증량',
        '유효 해시 레이트',
        '원래 값 해시 레이트',
        '섹터 크기'
      ]
    },
    poolRanking: {
      labels: [
        ' 순위',
        // '채굴 풀 명칭',
        'Owner ID',
        '유효 해시 레이트',
        '거의 24시간 출력 효율',
        '근 24h 해시 레이트 증량',
        // '행운값',
        '아웃블록 수'
      ],
      mlabels: [
        ' 순위',
        'Owner ID',
        '유효 해시 레이트',
        '채굴 효율',
        '거의 24h해시 레이트 증량',
        // '행운값',
        '아웃블록 수'
      ]
    },
    minerRanking: {
      labels: [
        ' 순위',
        '채굴꾼',
        '라벨',
        '유효 해시 레이트 / 점유율',
        '거의 24h해시 레이트 증량',
        '아웃블록  / 점유율 ',
        // '득표',
        '보상 / 점유율',
        ' 잔액'
      ],
      mblabels: [
        ' 순위',
        '유효 해시 레이트 / 점유율',
        '거의 24h해시 레이트 증량',
        '아웃블록  / 점유율 ',
        // '득표',
        '보상 / 점유율',
        ' 잔액'
      ]
    },
    powerRanking: {
      labels: [
        ' 순위',
        '채굴꾼',
        '라벨',
        '해시 레이트 가속',
        '해시 레이트 증량',
        '유효 해시 레이트',
        '원래 값 해시 레이트',
        '섹터 크기'
      ],
      mblabels: [
        ' 순위',
        '해시 레이트 가속',
        '해시 레이트 증량',
        '유효 해시 레이트',
        '원래 값 해시 레이트',
        '섹터 크기'
      ],
      tips: [
        '선택 주기 내에 평균 매일 섹터를 밀봉한 유효 해시 레이트 총합',
        '선택 주기 내에 채굴꾼의 유효 해시 레이트 증량'
      ],
      sectorOption: [
        {
          index: '0',
          value: '',
          label: '전체 섹터'
        },
        {
          index: '1',
          label: '32G 섹터'
        },
        {
          index: '2',
          label: '64G 섹터'
        }
      ]
    },
    topPowerTable: {
      title: '채굴꾼랭킹',
      label: [
        ' 순위',
        '채굴꾼 명칭',
        'owner 주소',
        '유효 해시 레이트 / 점유율',
        '채굴 풀 잔액',
        '총 보상'
      ],
      mbLabel: [' 순위', '채굴 풀 명칭', '유효 해시 레이트/점유율'],
      mbLabel2: [
        ' 순위',
        '채굴 풀 명칭',
        'Owner ID',
        '유효 해시 레이트',
        ' 거의 24시간 출력 효율'
      ],
      lowBalance: ' 잔액200 이상'
    },
    switch: ['채굴꾼 순위', '채굴꾼 효율'],
    switch2: ['채굴 풀 순위', '채굴꾼 순위', '해시 레이트 가속', '채굴꾼 수익']
    // switch2: ["채굴꾼 순위", "해시 레이트 증가", "해시 레이트 수익"]
  },
  statistics: {
    fil: {
      filTips: '11',
      allocationTips: '22',
      allocationTitle: 'Filecoin토큰 분배 세칙',
      trend: 'FIL스포트 가격 추세',
      trend2: 'Filecoin토큰 분배 세칙',
      tips: '가격 데이터 출처：coingecko',
      continent: [
        {
          key: 'Filecoin Foundation',
          name: 'Filecoin재단',
          value: '5',
          color: '#477DE5'
        },
        {
          key: 'PL Team & Contributors',
          name: '프로토콜 실험실 팀 및 기여자',
          value: '4.5',
          color: '#4FD0A1'
        },
        {
          key: 'Protocol Labs',
          name: '프로토콜 실험실',
          value: '10.5',
          color: '#5D77A3'
        },
        {
          key: 'Fundraising-Remainder',
          name: '기금 – 잔존 토큰',
          value: '2.5',
          color: '#E8B61B'
        },
        {
          key: 'Fundraising-SAFT 2017',
          name: '기금 – 미래 토큰에 대한 간단한 프로토콜',
          value: '7.5',
          color: '#D75B42'
        },
        {
          key: 'Mining Reserve',
          name: '채굴 예약 토큰',
          value: '15',
          color: '#59BAE3'
        },
        {
          key: 'Storage Mining allocation',
          name: '저장 채굴꾼 토큰 분배',
          value: '55',
          color: '#876AC3'
        }
      ],
      sourceLabel: [
        {
          label: '분배 프로젝트',
          value: '액수',
          Released: 'Released',
          description: '구체적인 용도'
        },
        {
          label: 'FIL의 기본 분포',
          value: '2,000,000,000',
          Released: '2,000,000',
          description: '네트워크FIL주조 상한'
        },
        {
          label: '채굴 예약 토큰',
          value: '300,000,000 ',
          Released: '300,000 ',
          description:
            '미래Filecoin경제 증가로 예약된 토큰 비축을 위해 구체적인 향후 사용 계획은 Filecoin커뮤니티에서 결정합니다'
        },
        {
          label: '저장 채굴꾼 토큰 분배',
          value: '1,100,000,000',
          Released: '1,100',
          description:
            '블록 보상, 네트워크 초기화 등 방식을 통해 저장 채굴꾼에게 분배된 토큰 보상'
        },
        {
          label: '기금 형식 – 미래 토큰에 대한 간단한 프로토콜 2017',
          value: '150,000,000 ',
          Released: '50,000 ',
          description: '2017년 판매 토큰'
        },
        {
          label: '기금 형식 – 잉여 자금',
          value: '50,000,000',
          Released: '50,000 ',
          description: '생태 개발 및 후속 융자에 활용됩니다'
        },
        {
          label: '프로토콜 실험실',
          value: '210,000,000',
          Released: '20,000',
          description: '프로토콜 실험실의 관련 작업으로 사용됩니다'
        },
        {
          label: '프로토콜 실험실 팀과 기여자',
          value: '90,000,000',
          Released: '9,000 ',
          description: '4.5%프로토콜 실험실 팀과 기여자에게 제공'
        }
      ]
    },
    charts: {
      title: '차트 통계',
      pledgeTitle: '단일 T저당 추세',
      rewardTitle: '블록 보상',
      minerTitle: '유망 채굴꾼 수',
      messageTitle: '메시지 수 추세도',
      blockReward: {
        names: ['산출 효율', '누적 블록 보상']
      },
      MessageTrend: {
        names: ['단일 블록 메시지 추세', '총 메시지 수추세']
      }
    }
  },
  calculator: {
    filUnit: '$',
    subtitle: '채굴시간 가동：',
    switch: ['만재 ', '채굴기 패키지'],
    labels1: ['주기', '산출', '유지（시간과 공간 증명）소모'],
    columns1: ['매일', '매주', '매월', '매년'],
    labels2: [
      '정적 발본 주기',
      'FIL채굴 원가（총원가 및GAS소모/540일 산출 수량）',
      '540일 산출'
    ],
    output: '（총원가 및 GAS소모/540일 산출 수량）',
    input1: ['매일 단일T산출', '토큰 가격', '단일T유지 소모'],
    input2: ['총 해시 레이트', '하드웨어 및 운영 유지보수'],
    input3: [
      '노드 유형',
      '총 해시 레이트 규모',
      '패키지 속도',
      '하드웨어 및 운영 유지보수'
    ],
    input4: [
      '매일 단일 T산출',
      '토큰 가격',
      ' 단일 T패키지소모',
      ' 단일 T유지보수 소모',
      ' 단일 T저당'
    ],
    labels3: [
      '만재에 필요한 일수',
      '만재에 필요한 저당',
      '만재 패키지 비용',
      '만재한 후, 매일 아웃블록 보상',
      '정적 발본 주기',
      'FIL채굴원가（총 원가와 GAS소모/540일 산출 수량）',
      '540일 산출'
    ],
    buttonLabels: '계산 시작',
    backLabels: '최신 계산',
    tips:
      '면책 성명：본 계산은 정적 데이터 계산을 사용합니다. 실제 상황에서 토큰 가격, 매일 단일 T산출, 단일 T유지 소모는 모두 변화의 값이기 때문에 본 결과는 참고로만 제공되며, 투자를 권장하지 않습니다.  '
  },
  more: {
    gas: {
      title: '기초 수수료 추세',
      tb_title: '24h Gas  데이터',
      labels: [
        '메시지 유형',
        'Gas Premium',
        '평균Gas한도',
        '평균Gas소모',
        '평균 수수료',
        '수수료 합계/점유율',
        '메시지 수 합계/점유율'
      ]
    },
    stats: {
      meta: [
        {
          label: '평균 높이마다 블록 수량',
          tips: '근 24시간 높이마다 평균 블록 수량'
        },
        {
          label: '평균 블록 포장 메시지 수량',
          tips: '근 24시간 높이마다 평균 메시지 수량'
        },
        {
          label: '평균 연료 가격',
          tips: '근  24시간의 평균 연료 가격'
        },
        {
          label: '저당 토큰',
          tips: '전체 네트워크 저당 담보 토큰'
        },
        {
          label: '유통 중',
          tips: ''
        },
        {
          label: '전체 네트워크 사용가능',
          tips: ''
        }
      ],
      top: {
        title: '채굴꾼 순위'
      },
      rate: {
        title: '채굴꾼 효율'
      },
      activeMiner: {
        title: '유망 채굴꾼',
        count: '채굴꾼 수량: ',
        tips: '데이터 압축 또는 메시지 발송 채굴꾼 저장'
      },
      blockTime: {
        label: '평균 아웃블록 시간',
        min: '최소',
        max: '최대',
        tips: '근 24 시간 평균 아웃 블록 시간 '
      },
      filOutstanding: {
        filType: {
          floating: '유통 중: ',
          pledge: '전체 네트워크 저당: ',
          outstanding: '전체 네트워크 사용가능: '
        }
      }
    }
  },
  stats: {
    metrics: {
      blockReward: {
        title: '누적 블록 보상'
      },
      filecoin: {
        title: 'Filecoin블록 보상 곡선'
      },
      filVested: {
        title: 'FIL릴리스'
      },
      contact: '더 많은 데이터를 보여주고 싶으면, 이메일로 연락주세요:'
    },
    peer: {
      title: '노드ID:',
      label: ['노드ID', '채굴꾼 주소', 'IP', '위치']
    }
  },
  address: {
    list: {
      pcLabel: [
        '블록 높이',
        '메시지ID',
        '시간',
        '발송 주소',
        '수신 주소',
        ' 데이터',
        '방법'
      ],
      label: [
        ' 순위',
        ' 주소',
        '라벨',
        ' 잔액/점유율',
        ' 유형',
        '최근 거래 시간'
      ],
      total: '총{num}개 계정',
      options: [
        { value: '', index: '0', label: '전부 유형' },
        { value: 'account', index: '1', label: '일반 정' },
        { value: 'owner', index: '2', label: '소유자 계정' },
        { value: 'miner', index: '3', label: '채굴꾼계정' },
        // { value:"system", index: "4", label:"시스템 계정" },
        // { value:"init", index: "5", label:"계정 초기화" },
        // { value:"cron", index: "6", label:"타이밍 작업" },
        // { value:"power", index: "7", label:"해시 레이트 저장" },
        // { value:"market", index: "8", label:"마켓 계정" },
        { value: 'payment', index: '9', label: '결제 채널' },
        { value: 'multisig', index: '10', label: '다중 서명 계정' }
        // { value:"reward", index: "11", label:"보상계정" },
      ]
    },
    detail: {
      mtitle: "광부 개요",
      account: '계정:',
      titleAcount: '계정 개요',
      title: '계정 변화',
      pool: {
        title: '채굴 풀 세부 사항',
        tips:
          '채굴 풀 세부 사항：채굴 풀 데이터는 채굴꾼 데이터라는 이름으로 집계됩니다 ',
        labels: ['계정', 'Owner 주소', '채굴꾼 명의'],
      },
      dialog: {
        updateName: '서명 수정>',
        updateNames: ['서명 수정 >', '청구 계정 >'],
        title: '서명 인증',
        subtitle:
          '현재 유효 해시 레이트 ≥ 32 GiB 에 대해서만 채굴꾼 공개 독립 인증 ',
        labels: [
          'Owner 주소',
          '계정 영어 정식명칭',
          '계정 중국어 정식명칭',
          '연락처',
          '메시지',
          '서명 코드',
          '서명'
        ],
        placeholders: [
          '',
          '18자 이하',
          '18자 이하',
          '우편함/휴대폰 번호',
          '',
          '',
          '위 코드를 복사하고，filecoin지갑에서 서명하며，서명 내용을 여기에 붙여 넣으세요'
        ],
        tips:
          '특별 알림：계정 명칭은 민감한 단어, 금지어, 유명인 이름 등을사용하지 않아야 합니다. 위반 사항이 있을 경우, 서명 삭제 및 금지 처리됩니다. 협조해 주셔서 감사합니다. ',
        btnText: '제출'
      },
      overview: [
        '계정 주소',
        '계정ID',
        '계정 유형',
        '계정 잔액',
        '메시지 수',
        'Nonce',
        '코드Cid',
        '생성 시간',
        '최근 거래 시간',
        '다중 서명 계정'
      ],
      worker: '채굴꾼 목록',
      ownerOverview: [
        '소유자 계정',
        '노드ID',
        '원래 값 해시 레이트',
        '유효 해시 레이트',
        '섹터 크기',
        '섹터 수량',
        '증명 중인 섹터 수량',
        '실패 수량'
      ],
      owner: [
        '계정 주소',
        '계정ID',
        '계정 유형',
        '계정 잔액',
        '메시지 수',
        'Nonce',
        '코드 Cid',
        '생성 시간',
        '최근 거래 시간',
        '채굴꾼 명의',
        '실제 작업 채굴꾼'
      ],
      storageMiner: [
        '주소',
        '유형',
        '잔액',
        '소유자 ',
        '노드ID',
        '원래 값 해시 레이트',
        '유효 해시 레이트',
        '섹터 크기',
        '섹터 수량',
        '증명 중인 섹터 수량',
        '실패 수량',
        '코드 Cid',
        '난수'
      ],
      multisig: [
        '계정 주소',
        '계정 유형',
        'Robust Address',
        '계정 잔액',
        'Available Balance',
        'Initial Balance',
        'Unlock Period',
        'Locking Balance',
        'Signers',
        'Approvals Threshold',
        '메시지 수',
        'Nonce 수',
        '코드 Cid',
        '생성 시간',
        '최근 거래 시간'
      ],
      minerOverview: {
        balance: {
          title: '계정 잔액',
          balance: '주소 잔액: ',
          available: '사용가능한 잔액:',
          pledged: '섹터 저당:',
          deposits: '사전 입금:',
          reward: '고정 포지션 보상:'
        },
        power: {
          title: '해시 레이트 일람',
          rank: ' 순위',
          subtitle: '유효 해시 레이트',
          raw: '원래 값 해시 레이트: ',
          rate: '해시 레이트점유율: ',
          block: '총 아웃블록 수: ',
          reward: '총 보상: ',
          win: '총 득표: ',
          size: '섹터 크기: ',
          status: '섹터상태: ',
          total: '전부 ',
          proving: '유효',
          fault: '오류',
          pre: '복구 중'
        },
        growth: {
          labels: [
            { label: '해시 레이트 증량: ' },
            { label: '섹터저당: ' },
            {
              label: '아웃블록  수량: ',
              tips: '아웃블록 수 = 채굴 아웃블록  수량（block）의 총합'
            },
            {
              label: '채굴 효율: ',
              tips:
                '선택 주기 내에서 채굴꾼 누적 아웃블록 보상과 유효 해시레이트의 비율'
            },
            { label: '해시 레이트 가속: ' },
            { label: 'Gas소모: ' },
            { label: '아웃블록 보상: ' },
            {
              label: '행운지수: ',
              tips:
                '실제 블록 분해 수량과 이론적 블록 분해 수량의 비율입니다. 채굴 유효 해시 레이트가 1PiB미만인 경우, 해당 값은 비교적 큰 임의성이 존재하며, 참조용으로만 제공됩니다. '
            },
            { label: '섹터 증량: ' },
            { label: '섹터 가속: ' },
            {
              label: '득표수의 양: ',
              tips:
                'Filecoin채굴 모델에서 하나의 높이 （tipset）에 여러 개의 블록（block）이 있을 수 있으며，각 블록은 여러 개의 보상（win count）을 받을 수 있습니다. 누적 아웃블록 부수=매회 아웃블록은 보상 부수의 총합을 획득합니다'
            },
            {
              label: ' 단일 T소모: ',
              tips: '선택 주기 내에서 단일 T패키지 섹터 크기Gas소모'
            }
          ],
          title: '통계 지표',
          unit: ' 개 섹터'
        }
      },
      accountOverview: {
        title: '계정 총람',
        actor: '채굴꾼 계좌 번호:',
        owner: 'Owner:',
        time: '생성 시간:',
        runningDays: '운행 시간:',
        type: '계정 유형:',
        worker: 'Worker:',
        peer: '노드 마크:',
        address: '채굴꾼 주소:',
        controller: 'Controller:',
        location: '지역',
        // location: '지역 (공공IP):',
        unknown: '알 수 없음'
      },
      mbaccountOverview: [
        '채굴꾼 계정',
        '채굴꾼 유형',
        '채굴꾼 주소',
        'Owner:',
        'Worker:',
        'Controller:',
        '생성 시간:',
        '운행 시간：',
        '노드 마크：',
        '지리 영역：'
      ],
      minerBalance: {
        title: '계정 변화',
        chart: {
          title: '총 해시 레이트',
          tooltip: '<div>{marker} {name}:{value} FIL</div>'
        },
        tooltip: ['가용 잔액', '섹터 저당', '사전 입금', '고정 포지션 보상'],
        balance: ' 잔액: '
      },
      minerPower: {
        title: '유효 해시 레이트',
        names: ['유효 해시 레이트', '해시 레이트 증가'],
        chart: {
          title: '총 해시 레이트',
          tooltip:
            '<div>{time}</div><div>{marker}유효 해시 레이트:{power}</div>'
        }
      },
      minerBlock: {
        title: '아웃블록 ',
        chart: {
          title: ['총 아웃블록 ', '아웃블록 증량']
        }
      },
      minerReward: {
        title: '보상',
        chart: {
          title: ['총 보상 / FIL', '보상 증량 / FIL']
        }
      },
      claim: {
        title: '청구 계정',
        subTitle: '유효 해시 레이트 ≥ 32.00 GiB에 대한 채굴꾼 공개 독립 인증',
        owner: {
          label: '소유자  주소',
          placeholder: ''
        },
        en: {
          label: '계정 영어 약칭',
          placeholder: '18자 이내',
          error: '계정 영어 약칭을 입력하세요'
        },
        nameEn: {
          label: '계정 영어 전칭',
          placeholder: '선택 기입'
        },
        zh: {
          label: '계정 중국어 약칭',
          placeholder: '선택 기입'
        },
        nameZh: {
          label: '계정 중국어 정식명칭',
          placeholder: '선택 기입'
        },
        contact: {
          label: '연락처',
          placeholder: '이메일 주소, 휴대폰 번호',
          error: '연락처를 입력하세요'
        },
        message: {
          label: '메시지',
          placeholder: ''
        },
        signcode: {
          label: '서명 코드',
          placeholder: ''
        },
        signature: {
          label: '서명',
          placeholder:
            '위의 코드를 복사하여 filecoin지갑에서 서명한 후,여기에 서명 내용을 붙여 넣으세요',
          error: '서명을 입력하세요'
        },

        submit: '제출',
        tips:
          '특별 알림：계정 명칭은 민감한 단어, 금지어, 유명인 이름 등을사용할 수 없습니다. 위반 사항이 있을 경우, 서명 삭제 및 금지 처리됩니다. 협조해 주셔서 감사합니다. ',
        copy: ['복사 성공', '복사 실패']
      }
    },
    type: {
      account: '일반 계정',
      owner: '소유자 계정',
      miner: '저장 채굴꾼',
      system: '시스템 계정',
      init: '계정 초기화',
      cron: '타이밍 작업',
      power: '해시 레이트 저장',
      market: '마켓 계정',
      payment: '결제 채널',
      multisig: '다중 서명 계정',
      reward: '보상계정'
    },
    trend: {
      switch: ['채굴꾼 해시 레이트 추세', '채굴꾼 아웃블록 추세'],
      chartSwitch: ['채굴꾼 추세도', '접기']
    },
    radio: ['메시지 목록', '아웃블록 목록', '전송 목록'],
    radio1: ['메시지 목록', '전송 목록']
  },
  message: {
    detail: {
      transactionLabels: ['발송측', ' ', '수신측', '금액', ' 유형'],
      mbTransferLabels: ['발송측', '수신측', '금액', ' 유형'],
      consumeTypeArr: ['','수수 료 를 소각 하 다','광부 수수료','대체 하 다','징벌 하 다','고발 하 다','비용 을 모으다'],
      titles: ['메시지 개요', '전송 메시지', '기타 메시지'],
      overview: [
        '메시지 ID',
        '높이',
        '블록',
        '시간',
        '발송 주소',
        '수신 주소',
        '수치',
        '영수증',
        'Gas Premium',
        'Gas 수량',
        'Gas한도',
        'Gas Fee Cap',
        '방법',
        '랜덤 값',
        '파라미터'
      ],
      infoview: [
        '메시지ID',
        '높이',
        '시간',
        '블록',
        '금액',
        '발송자',
        '수신자',
        '실행 결과',
        '방법'
      ],
      otherview: [
        '버전 번호',
        'Nonce',
        '수수료률 상한',
        '채굴꾼 팁 요율',
        'Gas용량 상한',
        'Gas실제 용량',
        '기본 수수료율',
        '수수료',
        '파라미터',
        '반환 값'
      ],
      transfer: {
        from: '발송측',
        to: '수신측',
        value: '금액',
        consume_type: ' 유형'
      },
      paramTip: 'Base64형식 요소 데이터',
      confirm: '확인'
    },
    pool: {
      infoview: [
        '메시지ID',
        '높이',
        '시간',
        '금액',
        '발송자',
        '수신자',
        '방법'
      ],
      otherview: [
        '버전 번호',
        'Nonce',
        'Gas용량 상한',
        'Gas실제 용량',
        '파라미터'
      ]
    }
  },
  dsn: {
    list: {
      heading: '주문 목록',
      total: '총 {num} 개 거래',
      labels: [
        '거래ID',
        'Piece CID',
        '파일 크기',
        '고객',
        '위임 관리자',
        '시작시간',
        '종료시간',
        '저장 비용',
        '검증 완료'
      ],
      mLabels: [
        '거래ID',
        'Piece CID',
        '파일 크기',
        '고객',
        '위임 관리자',
        '생성 시간',
        '저장 비용',
        '검증 완료'
      ],
      tips:
        '공식 인증 고객이 발기한 문서 주문을 표시하며，해당 주문 유효 해시 레이트는 원래 해시 레이트의 약 10배에 해당됩니다 ',
      placeholder: '검색 고객/위임 관리자'
    },
    detail: {
      dsnTitle: '주문 세부 사항',
      title: '위임 관리 세부 사항',
      client: '고객',
      provider: '위임 관리채굴꾼',
      pledge: ' 저당금액：',
      storageCost: '위임 관리 비용：',
      to: '까지',
      block: '(포스 존 )',
      overview: [
        '거래ID',
        '생성 시간',
        '소속 블록',
        '소속 메시지',
        'Piece CID',
        '검증 완료'
      ]
    }
  },
  noResult: {
    res: '검색 결과가 없습니다',
    404: '홈페이지를 찾을 수 없습니다！{count}s이후에 홈페이지로 돌아갑니다！',
    key: 'Oops! 입력된 검색 문자 부호를 입력하세요:',
    invalid: '죄송합니다！이것은 무효의 문자열입니다',
    back: '홈페이지로 돌아가기'
  },
  routeName: {
    blockDetail: '블록 세부 사항',
    messageDetail: '메시지 세부 사항',
    addressDetail: ' 주소 세부 사항',
    messageList: '전체 메시지 조회',
    addressList: '전체 계정 조회',
    tipset: '블록 체인',
    mining: '채굴꾼',
    metrics: '지표',
    map: '노드 맵',
    peer: '노드 세부 사항',
    stats: ' 데이터',
    dsn: '전체 주문 조회',
    blocksWon: '아웃블록 '
  },
  chart: {
    blockRatio: '아웃블록 비율',
    minerBlockTrend:
      '<div>{time}</div><div>{totalMarker}총 아웃블록 수: {total} </div><div>{increaseMarker}{interval}아웃블록 수: {increase}</div>',
    minerRewardTrend:
      '<div>{time}</div><div>{totalMarker}총 보상: {total}FIL </div><div>{increaseMarker}{interval}보상: {increase}FIL</div><div>{interval}득표: {winCount}</div>',
    blockTime:
      "<div style='margin-bottom:5px'>평균 아웃블록 시간: {value}s</div><div>시간: {name}</div>",
    mesHistory: '<div>메시지: {count}</div><div>{time}</div>',
    mesHistoryTitle: '지난 14 일 동안의 메시지',
    pledge: '<div>저당: {pledge} FIL</div><div>{time}</div>',
    tipset:
      '<div>채굴꾼ID: {miner}</div><div>높이: {height}</div><div>아웃블록 시간: {block_time}</div><div>블록Cid: {cid}</div>',
    filOutstanding: ['유통 중', '저당'],
    blockReward: ['아웃블록 채굴꾼 수량', '누적 블록 보상(FIL)'],
    filecoin: '블록보상(FIL)',
    filVested: ['누적 FIL 릴리스', '매일 릴리스FIL'],
    coming: '기대해주세요',
    map:
      "<div style='margin-bottom:5px'><a href='/more/peer?peer_id={pid}'><span>노드ID : </span><span>{pid}</span></a></div><div style='margin-bottom:5px'><a href='/tipset/address-detail?address={miner}'><span>채굴꾼 : </span><span>{miner}</span></a></div><div style='margin-bottom:5px'><span>위치 : </span><span>{name}</span></div><div><span>IP : </span><span>{ip}</span></div>"
  },

  blockHeaderChart: {
    op: '끌어서 조작해야 합니다',
    start: '시작 높이',
    latest: '최신 높이'
  },
  pk: {
    title: '채굴꾼 대비',
    placeholder: '인기있는 채굴꾼을 입력하거나 선택하세요',
    miner: {
      title: '',
      rows: [{ label: '채굴꾼', key: 'miner' }]
    },
    overview: {
      title: '채굴꾼 개요',
      rows: [
        { label: '총 해시 레이트', key: 'active_power' },
        { label: '총 아웃블록 수량', key: 'active_block_count' },
        { label: '총 블록 보상', key: 'active_block_rewards' }
      ]
    },
    recent: {
      title: '채굴꾼 근황',
      rows: [
        { label: '거의 24h해시 레이트 증량', key: 'increased' },
        { label: '거의 24h아웃블록 수량', key: 'active_win_count' },
        { label: '거의 24h블록 보상', key: 'fil' }
      ]
    },
    efficiency: {
      title: '채굴 효율',
      rows: [
        {
          label: '총 단일 T 소득',
          key: 'active_fil_per_t'
        },
        {
          label: '거의 24h 단일 T 소득',
          key: 'fil_per_t'
        },
        {
          label: '거의 24 시간 증명 성공률',
          key: 'success_rate'
        },
        {
          label: '거의 24h아웃블록 행운값',
          key: 'lucky_number'
        }
      ]
    },
    go: 'Go and choose miners for PK!',
    max: '최대 6명 채굴꾼 지원'
  },
  map: {
    label: '유망 채굴꾼 수',
    tips: '거의 24시간 메시지를 발송한 채굴꾼'
  },
  chartIntervalMap: {
    '24h': '매 시간',
    '1w': '매일',
    '1m': '매일',
    '6m': '매일'
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
      { label: '계정 정보', name: 'info' },
      { label: '계정 설정', name: 'set' }
    ],
    navTips: [
      { title: '개인 센터', content: '이 페이지는 귀하의 Filscan 계정 정보를 요약합니다. 여기에서 계정 주소와 비밀번호를 업데이트할 수도 있습니다.' },
      { title: '풀 모니터링', content: '마이닝 풀을 독립적으로 생성하고 통합 모니터링 및 관리를 위해 해당 마이닝 풀에 마이너를 추가할 수 있습니다. 생성된 마이닝 풀은 현재 Filscan 계정에 대해서만 유효합니다.' }
    ],
    center: {
      tabs: ['개인 센터', '풀 모니터링'],
      menuList:[
        { label: "개인 센터", icon: 'iconfont icon-center' },
        { label: "풀 모니터링", icon: 'iconfont icon-monitor'}
      ],
      accountInfo: {
        labels: [
          { label: '별명', icon: 'edit' },
          { label: '전화 번호', icon: 'edit' },
          { label: '사서함', icon: 'edit' },
          { label: '풀 모니터링列表', icon: 'add' },
          { label: '마지막 로그인' },
        ]
      },
      errorTips: '존재 하지 않 는 노드：',
      successTips: '저장 소 생 성 성공',
      validateTips: '핸드폰 번호,메 일 은 적어도 하 나 는 비어 있 으 면 안 됩 니 다',
      nodeCount: ' 개 노드 풀',
      nodeTotal: ' Node',
      accountSet: {
        labels: [
          { label: '별명', placeholder: '이름을 입력하세요', model: 'nick_name', tips: '최대 10자' },
          { label: '전화 번호', placeholder: '전화번호를 입력하세요', model: 'phone', tips: '변경하려면 새 전화번호를 입력하세요' },
          { label: '사서함', placeholder: '이메일을 입력해주세요', model: 'email', tips: '변경해야 하는 경우 새 이메일 주소를 입력하세요' },
          { label: '기존 비밀번호', placeholder: '이전 비밀번호를 입력하세요', model: 'pwd', tips: '변경 사항이 없으면 비밀번호 상자를 비워 두십시오' },
          { label: '새 비밀번호', placeholder: '새 비밀번호를 입력하세요', model: 'newpwd', tips: '변경 사항이 없으면 비밀번호 상자를 비워 두십시오' },
          { label: '비밀번호 확인', placeholder: '확인 비밀번호를 입력하세요', model: 'surepwd', tips: '위의 비밀번호를 변경하셨다면 새로운 비밀번호를 재입력하여 확인해주세요' }
        ],
        buttons: ['변경 확인', '취소', '계정 삭제'],
        dialog: {
          title: '계정을 영구적으로 삭제하시겠습니까?',
          content: '계정을 삭제하면 모든 모니터링 목록과 주소 정보도 삭제되며, 삭제가 확인된 후에는 위의 내용을 복원할 수 없습니다.',
          buttons: ['삭제 확인', '취소']
        }
      }
    },
    monitor: {
      title: '풀 모니터링',
      total: '{total}개의 마이닝 풀이 생성되었습니다(최대 {count} 개의 마이닝 풀 생성 가능)',
      button: '마이닝 풀 생성',
      labels: ['풀 이름', '마이닝 풀의 효과적인 컴퓨팅 파워', '총 보상', '마이닝 풀 이름의 마이너'],
      emptyText: '노드 풀 생 성 없 음',
      dialog: {
        title: '마이닝 풀 생성',
        labels: [
          { label: '풀 이름', placeholder: '최대 10자까지 입력할 수 있습니다', text: '노드 풀 이름 을 입력 하 십시오',  name:'name'},
          { label: '갱부', placeholder: '마이닝 풀의 광부를 입력하십시오. 쉼표 또는 공백으로 구분하십시오' , text: '마이닝 풀의 광부를 입력하십시오. 쉼표 또는 공백으로 구분하십시오',  name:'miners'},
        ],
        buttons: ['삭제 확인', '취소']
      }
    },
    admin: {
      title: '수영장 관리',
      labels: [
        { label: '풀 이름', placeholder: '마이닝 풀 이름을 입력하세요' },
        { label: '광부 관리', placeholder: '추가하려는 광부를 입력하십시오' },
      ],
      buttons: ['저장', '취소', '마이닝 풀 삭제'],
      dialog: {
        title: '현재 계정을 삭제하시겠습니까?',
        content: '마이닝 풀의 모든 데이터는 삭제 후 삭제됩니다',
        buttons: ['결정', '취소']
      },
      limit: ['추 가 된 광부 중복','추 가 된 광부 가 이미 존재 합 니 다','추가 상한 선 에 도 달 했 습 니 다'],
      nullTips:'현재 노드 풀 에 노드 가 없습니다.최소한 노드 를 추가 해서 저장 하 십시오.',
      chartTips: '영문 쉼표 를 사용 하 세 요'
    },
    notice: {
      title: '알림 설정',
      tips: '알림 방법: 주소 잔고 예상 시간이 120분 미만일 때 알림 시작',
      labels: ['주소', '유형', 'SMS 알림', '전화 알림', '이메일 알림'],
      phoneTips: '（팁: 전화 알림은 중국 사용자에게만 지원됩니다）',
      emailBtn: '알림 계정 추가',
      buttons: ['저장', '취소'],
      breadcrumbList: ['풀 모니터링', '통지 하 다'],
      msgDialog: {
        title: 'SMS 알림',
        placeholder: ['전화번호를 입력하세요', '인증번호를 입력하세요'],
        buttons: ['결정', '취소', '인증 코드 받기']
      },
      phoneDialog: {
        title:'전화 통지',
        placeholder: ['전화번호를 입력하세요','인증번호 입력'],
        buttons:['결정', '취소', '인증 코드 받기']
      },
      emailDialog: {
        title:'메 일 알림',
        placeholder: ['이메일을 입력해주세요','인증번호 입력'],
        buttons:['결정', '취소', '인증 코드 받기']
      }
    },

    list: {
      button: '풀 모니터링',
      poolOverview: {
        title: '마이닝 풀 개요',
        labels: [
          { label:'유효 해시 레이트 / 점유율' },
          { label:'총 보상' },
          { label:'섹터 저당' },
          { label: '사전 입금' , tips: '광부 가 부채 구역 을 밀봉 하여 PreCommittes 를 진행 할 때 반드시 일부 예치 금 을 담보 로 제공 해 야 한다.만약 에 이 부분 부채 구역 이 Prove Committed 를 제때에 완성 하지 못 하면 이 부분 예치 금 은 벌금 이 부 과 되 고 제시간에 Prove 를 완성 하면 풀 려 날 것 이다.'},
          { label: '고정 포지션 보상' }
        ]
      },
      nodeList: {
        title: '광부 목록',
        labels: ['갱부', '라벨', '유효 해시 레이트', '총 보상', '가용 잔액', '섹터 저당', '사전 입금', '고정 포지션 보상']
      }
    },
    detail: {
      nodeOverview: {
        title: '광부 개요',
        nodePower: '노드 컴 퓨 팅',
        panelLabels: [
          { label: '총 보상' },
          { label: '가용 잔액' },
          { label: '섹터 저당' },
          { label: '사전 입금', tips: '채굴자들이 PreCommits를 위해 섹터를 캡슐화할 때 일부 사전 적금을 담보로 제공해야 하며, 이 부분이 ProveCommitted를 제때 완료하지 못하면 사전 적금의 이 부분에 벌금이 부과되고, Prove가 제 시간에 완료되면 사전 적금이 부과됩니다. 풀려났다.' },
          { label: '고정 포지션 보상' }
        ],
        tableLabels: [
          { label: '유형' },
          { label:'주소' },
          { label:'밸런스' },
          { label:'남은 공지 가능 시간', tips: '예상 남 은 사용 가능 시간 은 주소 추가 후 30 분 이내 에 표 시 됩 니 다.해당 주소 가 가스 소모 되 지 않 으 면 이 주 소 는 남 은 사용 가능 시간 을 예상 하여 가 져 올 수 없습니다' },
          { label:'알림 설정'}
        ]
      },
      nodeData: {
        title: '마이너 사이클 데이터',
        button: '다운로드 하 다 Excel',
        datePick: ['까지','종료 날짜','시작 날짜'],
        panelLabels: [
            // '유효 해시 레이트',
          { label:'패키지 컴퓨팅 성능 추가' },
          { label:'아웃블록 보상' },
          { label:'섹터 저당' },
          { label:'Gas소모' }
        ],
        tableLabels: ['시간', '갱부', '유효 해시 레이트', '패키지 컴퓨팅 파워', '아웃블록 보상', '섹터 저당', 'Gas소모']
      }
    }
  },
  apiStatus: [
    { code: 0 , message: 'ok'},
    { code: 1 , message: '인증 코드 오류'},
    { code: 2 , message: '매개변수 오류'},
    { code: 3 , message: '지원되지 않는 이동통신사 번호 세그먼트'},
    { code: 4 , message: '계정이 등록되었습니다'},
    { code: 5 , message: '알 수 없는 실수'},
    { code: 6 , message: '잘못된 비밀번호, 다시 입력하세요'},
    { code: 7 , message: '잘못된 계좌번호, 재입력해주세요'},
    { code: 8 , message: '계정이 비정상적이며 로그인이 금지되어 있습니다'},
    { code: 9 , message: '로그인이 만료되었습니다. 다시 로그인하십시오'},
    { code: 10 , message: '두 번째로 비밀번호가 잘못되었습니다. 다시 입력하세요'},
    { code: 11 , message: '잘못된 작업'},
    { code: 12 , message: '인증 코드가 너무 자주 전송됩니다. 나중에 다시 시도해 주세요'},
    { code: 13 , message: '스토리지 풀 이름이 이미 있습니다. 다시 입력하십시오'},
    { code: 14 , message: '노드가 존재하지 않습니다. 다시 확인하십시오'},
    { code: 15 , message: '스토리지 풀 수가 상한에 도달했습니다'},
  ]
}
export default ko
