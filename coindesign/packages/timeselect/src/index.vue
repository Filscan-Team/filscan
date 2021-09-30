<template>
    <div class="co-time-select" :class="{ border: border }">
        <slot name="left" class="left"></slot>
        <co-select
                :options="options"
                :index.sync="time"
                v-if="isMobile && drop"
        />
        <div class="time-con" v-else>
          <div
                  v-for="(item, index) in times"
                  :key="item.key"
                  :class="{
              active: currentIndex === index,
            }"
                  @click="handleTabClick(item, index)"
          >{{ labels[item] }}</div
          >
        </div>
    </div>
</template>
<script>
    export default {
        name: "CoTimeSelect",
        data() {
            return {
                currentIndex: 0,
                time: "1d"
            }
        },
        props: {
            activeIndex: {
                type: Number,
                default: 0
            },
            border: {
                type: Boolean,
                default: false
            },
            times: {
                type: Array,
                default() {
                    return ["24h", "1m"]
                }
            },
            drop: {
                type: Boolean,
                default: true
            },
            labels: {
                type: Object,
                default() {
                    return this.$t("component.timeGrowth")
                }
            }
        },
        methods: {
            handleTabClick(v, index) {
                this.currentIndex = index
                this.$emit("update:activeIndex", index)
                this.$emit("time-select", this.getTimeFromSelector(v))
            }
        },
        mounted() {
            this.currentIndex = this.activeIndex
        },
        computed: {
            options() {
                return this.times.map(item => {
                    const timeLabelMap = this.$t("component.times")
                    return {
                        label: timeLabelMap[item],
                        index: item
                    }
                })
            }
        },
        watch: {
            time(v) {
                this.$emit("time-select", this.getTimeFromSelector(v))
            }
        }
    }
</script>
<style lang="scss" scoped>
    .co-time-select {
        display: flex;
        border-radius: 8px;
        padding-left: 30px;
        align-items: center;
        &.border {
            border-bottom: 1px dashed var(--border-color);
        }
        .time-con {
            display: flex;
            margin-left: auto;
            //height: 30px;
            align-items: center;
            font-size: var(--font-16);
            flex-direction: row;
            div {
                //height: 30px;
                white-space: nowrap;
                cursor: pointer;
                //line-height: 30px;
                text-align: center;
                color: var(--main-text-color);
                border: 1px solid var(--border-line);
                margin-left: 8px;
                padding: 6px 13px;
                border-radius: 3px;
                &.active {
                    background-color: var(--force-mark-color);
                    border: 1px solid var(--force-mark-color);
                    color: var(--white);
                    font-size: var(--font-16);
                    font-weight: 500;
                    &::after {
                        bottom: -12px;
                    }
                }
            }
        }
    }
</style>
