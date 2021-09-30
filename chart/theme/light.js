import echarts from "../index"
const lightTheme = {
  blocksWon: {
    items: [
      {
        item: "#F7B500",
        area: "#F7B500"
      },
      {
        item: "#0099EA",
        area: "#0099EA"
      },
      {
        item: "#2DD8D3",
        area: "#2DD8D3"
      },
      {
        item: "#F93C53",
        area: "#F93C53"
      },
      {
        item: "#235CA8",
        area: "#235CA8"
      },
      {
        item: "#63499D",
        area: "#63499D"
      },
      {
        item: "#6DD0E0",
        area: "#6DD0E0"
      },
      {
        item: "#3C7500",
        area: "#3C7500"
      },
      {
        item: "#FF8D8D",
        area: "#FF8D8D"
      },
      {
        item: "#FF7C00",
        area: "#FF7C00"
      },

      {
        item: "#FF66CF",
        area: "#FF66CF"
      },

      {
        item: "#D28D14",
        area: "#D28D14"
      },

      {
        item: "#8901FF",
        area: "#8901FF"
      },

      {
        item: "#013EFF",
        area: "#FF66CF"
      },

      {
        item: "#00FF7E",
        area: "#00FF7E"
      },

      {
        item: "#F9BBD4",
        area: "#F9BBD4"
      },

      {
        item: "#FA887A",
        area: "#FA887A"
      },

      {
        item: "#FDCAB4",
        area: "#FDCAB4"
      },
      {
        item: "#0091FF",
        area: "#0091FF"
      },

      {
        item: "#6236FF",
        area: "#6236FF"
      }
    ]
  },
  blockTime: {
    axisLine: "#0091FF",
    seriesItem: "#0091FF",
    seriesMarkLine: "#0091FF"
  },
  blockSize: {
    axisLine: "#6A0CE0",
    seriesItem: "#6A0CE0",
    seriesMarkLine: "#6A0CE0"
  },
  totalPower: {
    axisLine: "#F7B500",
    seriesItem: "#F7B500",
    seriesItem2: "#06C7F4",
    area: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#F7B500"
      },
      {
        offset: 1,
        color: "white"
      }
    ]),
    area2: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#06C7F4"
      },
      {
        offset: 1,
        color: "white"
      }
    ])
  },
  messageHis: {
    axisLabel: "#F7B500",
    seriesItem: "#F7B500",
    area: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#FF4B7A"
      },
      {
        offset: 1,
        color: "white"
      }
    ])
  },
  pledge: {
    splitLine: "#F5F5F5",
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
    otherNode: "#0091FF",
    nullNode: "",
    link: "#0091FF",
    seriesMarkLine: "transparent",
    seriesMarkLineLabel: "#333",
    markArea: "white",
    markAreaBorder: "#0091FF",
    markAreaActiveBorder: "#F7B500"
  },
  filOutstanding: {
    splitLine: "#0A0D13",
    seriesItem: ["#0031F7", "#F7B500"],
    floatArea: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#0031F7"
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
    splitLine: "#F5F5F5",
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
    splitLine: "#F5F5F5",
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
    splitLine: "#F5F5F5",
    seriesItem: ["#0062FF", "#F7B500"]
  },
  activeMiner: {
    splitLine: "#F5F5F5",
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
    splitLine: "#F5F5F5",
    items: [
      {
        item: "#B373FF",
        area: "#B373FF"
      },
      {
        item: "#FF5E71",
        area: "#FF5E71"
      },
      {
        item: "#58D3FF",
        area: "#58D3FF"
      },
      {
        item: "#6966FF",
        area: "#6966FF"
      },
      {
        item: "#11CCB4",
        area: "#11CCB4"
      },
      {
        item: "#7204D9",
        area: "#7204D9"
      },
      {
        item: "#FFC93F",
        area: "#FFC93F"
      },
      {
        item: "#3E61FF",
        area: "#3E61FF"
      },
      {
        item: "#FF8037",
        area: "#FF8037"
      },
      {
        item: "#E12828",
        area: "#E12828"
      },
      {
        item: "#4AFFC3",
        area: "#4AFFC3"
      },

      {
        item: "#F8FF84",
        area: "#F8FF84"
      },

      {
        item: "#C758FF",
        area: "#C758FF"
      },

      {
        item: "#FC739F",
        area: "#FC739F"
      },

      {
        item: "#FF9D83",
        area: "#FF9D83"
      },

      {
        item: "#B927C9",
        area: "#B927C9"
      },

      {
        item: "#FF7B3F",
        area: "#FF7B3F"
      },

      {
        item: "#FFD981",
        area: "#FFD981"
      },

      {
        item: "#FFA637",
        area: "#FFA637"
      },
      {
        item: "#8800B7",
        area: "#8800B7"
      },

      {
        item: "#6236FF",
        area: "#6236FF"
      }
    ]
  },
  map: {
    bg: "white",
    tooltip: "white",
    scatter: "#00DBFF",
    textColor: "#000000",
    geo: {
      item: "#00417F",
      border: "#95AFC8",
      emphasis: "#C7DDFC"
    }
  }
}
export default lightTheme
