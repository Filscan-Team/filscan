import echarts from "../index"
const darkTheme = {
  blocksWon: {
    items: [
      {
        item: "#B372FF",
        area: "#42AFC4"
      },
      {
        item: "#FF5E71",
        area: "#5B337B"
      },
      {
        item: "#59D3FF",
        area: "#D3B921"
      },
      {
        item: "#6966FF",
        area: "#AE7420"
      },
      {
        item: "#10CCB4",
        area: "#0A7A50"
      },
      {
        item: "#7202D9",
        area: "#405D62"
      },
      {
        item: "#FFC83F",
        area: "#103F74"
      },
      {
        item: "#3F60FF",
        area: "#E39838"
      },
      {
        item: "#FE8036",
        area: "#A54A29"
      },
      {
        item: "#E12827",
        area: "#C64157"
      },

      {
        item: "#49FFC3",
        area: "#655F61"
      },

      {
        item: "#E7F05E",
        area: "#415A73"
      },

      {
        item: "#913BFF",
        area: "#75562A"
      },

      {
        item: "#FB739F",
        area: "#C7A04E"
      },

      {
        item: "#FF9D82",
        area: "#ABD128"
      },

      {
        item: "#B928C9",
        area: "#75664A"
      },

      {
        item: "#FF7A3F",
        area: "#A4884E"
      },

      {
        item: "#FFCA4E",
        area: "#CC6D28"
      },
      {
        item: "#FFA637",
        area: "#8A4A60"
      },
      {
        item: "#8000BB",
        area: "#C64333"
      }
    ]
  },
  blockTime: {
    axisLine: "#0091FF",
    seriesItem: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#00E5FF"
      },
      {
        offset: 1,
        color: "#008EE7"
      }
    ]),
    seriesMarkLine: "#0091FF"
  },
  blockSize: {
    axisLine: "#F7B500",
    seriesItem: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#FFD300"
      },
      {
        offset: 1,
        color: "#FFA800"
      }
    ]),
    seriesMarkLine: "#F7B500"
  },
  totalPower: {
    axisLine: "#F93C53",
    seriesItem: "#F93C53",
    seriesItem2: "#3BFFFF",
    area: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#F93C53"
      },
      {
        offset: 1,
        color: "#402A38"
      }
    ]),
    area2: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#3BFFFF"
      },
      {
        offset: 1,
        color: "#402A38"
      }
    ])
  },
  messageHis: {
    axisLabel: "#fff",
    seriesItem: "transparent",
    area: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#FF4B7A"
      },
      {
        offset: 1,
        color: "#2A2236"
      }
    ])
  },
  pledge: {
    splitLine: "#13314B",
    seriesItem: "#44D7B6",
    area: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#1C4CA0"
      },
      {
        offset: 1,
        color: "white"
      }
    ])
  },
  tipset: {
    ticketNode: "white",
    otherNode: "#F7B500",
    nullNode: "black",
    link: "#F7B500",
    seriesMarkLine: "transparent",
    seriesMarkLineLabel: "white",
    markArea: "transparent",
    markAreaBorder: "#F7B500",
    markAreaActiveBorder: "#F7B500"
  },
  filOutstanding: {
    splitLine: "#13314B",
    seriesItem: ["#0031F7", "#F7B500"],
    floatArea: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#4459D7"
      },
      {
        offset: 1,
        color: "white"
      }
    ]),
    pledgeArea: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#F7B500"
      },
      {
        offset: 1,
        color: "white"
      }
    ])
  },
  blockReward: {
    splitLine: "#13314B",
    line: "#2042F7",
    barItem: "#F7AC20",
    bar: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#FFD929"
      },
      {
        offset: 1,
        color: "#F3921B"
      }
    ])
  },
  filecoin: {
    seriesItem: "#44D7B6",
    area: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#2774FF"
      },
      {
        offset: 1,
        color: "white"
      }
    ])
  },
  filVested: {
    splitLine: "#13314B",
    seriesItem: ["#0062FF", "#F7B500"]
  },
  activeMiner: {
    splitLine: "#13314B",
    seriesItem: "#44D7B6",
    area: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#2774FF"
      },
      {
        offset: 1,
        color: "white"
      }
    ])
  },
  provenPower: {
    splitLine: "#13314B",
    items: [
      {
        item: "#B372FF",
        area: "#42AFC4"
      },
      {
        item: "#FF5E71",
        area: "#5B337B"
      },
      {
        item: "#59D3FF",
        area: "#D3B921"
      },
      {
        item: "#6966FF",
        area: "#AE7420"
      },
      {
        item: "#10CCB4",
        area: "#0A7A50"
      },
      {
        item: "#7202D9",
        area: "#405D62"
      },
      {
        item: "#FFC83F",
        area: "#103F74"
      },
      {
        item: "#3F60FF",
        area: "#E39838"
      },
      {
        item: "#FE8036",
        area: "#A54A29"
      },
      {
        item: "#E12827",
        area: "#C64157"
      },

      {
        item: "#49FFC3",
        area: "#655F61"
      },

      {
        item: "#E7F05E",
        area: "#415A73"
      },

      {
        item: "#913BFF",
        area: "#75562A"
      },

      {
        item: "#FB739F",
        area: "#C7A04E"
      },

      {
        item: "#FF9D82",
        area: "#ABD128"
      },

      {
        item: "#B928C9",
        area: "#75664A"
      },

      {
        item: "#FF7A3F",
        area: "#A4884E"
      },

      {
        item: "#FFCA4E",
        area: "#CC6D28"
      },
      {
        item: "#FFA637",
        area: "#8A4A60"
      },
      {
        item: "#8000BB",
        area: "#C64333"
      }
    ]
  },
  map: {
    bg: "#0B1926",
    tooltip: "rgba(0,0,0,.6)",
    scatter: "#0090FF",
    textColor: "white",
    geo: {
      item: "#AAABAB",
      border: "transparent",
      emphasis: "#AAABAB"
    }
  },
  splitLine: "#13314B"
}
export default darkTheme
