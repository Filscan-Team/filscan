<template>
  <div class="quality-power font-14">
<!--    <div class="flex font-18 panel-title border-btm">-->
<!--      <div class="left">{{ tr("title") }}</div>-->
<!--    </div>-->
    <div class="subtitle">{{ tr("subtitle") }}</div>
    <div class="flex powerAdj">
      <div class="left font-20 font-400 text flex align-center">
        <span>{{ unitConversion(info.quality_adjust_power, 2) }}</span>
        <!-- <span class="font-12 gray rank left-20">Rank 1</span> -->
      </div>
      <div class="left">
        <div class="label">{{ tr("rank") }}</div>
        <div class="value">{{info.ranking}}</div>
      </div>
    </div>
    <div class="flex">
      <div class="left">
        <div class="label">{{ tr("rate") }}</div>
        <div class="value">{{ info.pow_ratio }}</div>
      </div>
      <div class="right">
        <div class="label">{{ tr("raw") }}</div>
        <div class="value">{{ unitConversion(info.power, 2) }}</div>
      </div>
    </div>
    <!--flex end-->
    <div class="flex">
      <div class="left">
        <div class="label">{{ tr("block") }}</div>
        <div class="value">{{ formatNumber(info.block_count) }}</div>
      </div>
      <div class="right">
        <div class="label">{{ tr("reward") }}</div>
        <div class="value">{{ formatNumber(info.rewards, 4) }} FIL</div>
      </div>
    </div>
    <!--flex end-->
    <div class="flex">
      <div class="left">
        <div class="label">{{ tr("win") }}</div>
        <div class="value">{{ formatNumber(info.sigma_win_count) }}</div>
      </div>
      <client-only>
      <div class="right" v-if="info.sector_size!==-1">
        <div class="label">{{ tr("size") }}</div>
        <div class="value" >{{ unitConversion(info.sector_size, 2) }}</div>
      </div>
      </client-only>
    </div>
    <div class="flex">
      <div class="left status">
        <div class="label">{{ tr("status") }}</div>
        <div class="total value">
          <span
            >{{ formatNumber(info.sector_count)
            }}<span class="nbsp">{{ tr("total") }}</span></span
          >
          <span class="proving"
            >{{ formatNumber(info.live_sector_count)
            }}<span class="nbsp">{{ tr("proving") }}</span></span
          >
          <span class="fault"
            >{{ formatNumber(info.fault_sector_count)
            }}<span class="nbsp">{{ tr("fault") }}</span></span
          >
          <span class="pre"
            >{{ formatNumber(info.recover_sector_count)
            }}<span class="nbsp">{{ tr("pre") }}</span></span
          >
        </div>
      </div>
      <!--right end-->
    </div>
    <!--flex end-->
  </div>
  <!--power end-->
</template>
<script>
import { mapState } from "vuex"
export default {
  name: "QualityPower",
  data() {
    return {
      prefix: "address.detail.minerOverview.power"
    }
  },
  computed: {
    ...mapState("address", ["powerInfo"]),
    info() {
      return this.powerInfo
    }
  }
}
</script>
<style lang="scss" scoped>
.quality-power {
  justify-content: flex-start;
  .panel-title {
    font-size: var(--font-16);
    padding: 14px 20px;
  }
  .subtitle {
    padding: 0 20px;
    font-size: var(--font-16);
    margin: 30px 0 5px 0;
  }
  .flex .left,
  .right {
    dispaly: flex;
    flex-direction: row;
  }
  & > div {
    display: flex;
    justify-content: space-between;
    & > div {
      display: flex;
      flex-direction: row;
      .label {
        font-size: var(--font-16);
        padding-right: 20px;
      }
      .value {
        font-size: var(--font-16);
        text-align: left;
      }
    }
    .left {
      width: 50%;
    }
    .status {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      div.total {
        span {
          padding-left: 12px;
        }
        span.proving {
          color: #5AD8A6;
        }
        span.fault {
          color: #ff000f;
        }
        span.pre {
          color: #ffc631;
        }
      }
    }
    &:nth-child(n+3){
      margin-bottom: 10px;
      box-sizing: border-box;
      padding: 0 20px;
    }
    &.powerAdj {
      height: 28px;
      line-height: 28px;
      padding-left: 20px;
      margin-bottom: 20px;
      .rank {
        display: inline-block;
        height: 28px;
        border-radius: 14px;
        background: rgba(12, 35, 55, 1);
        border: 1px solid rgba(20, 50, 76, 1);
        padding: 0 14px;
        line-height: 28px;
      }
    }
  }
}
</style>
