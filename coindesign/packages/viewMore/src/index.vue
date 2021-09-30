<template>
    <div
            class="flex jus-center font-16 font-400 pointer align-center view-more"
            :class="[extraClass]"
            @click="ToUrl"
    >
        <span>{{ $t("component.more") }} <span class="el-icon-arrow-right"></span> </span>
    </div>
</template>
<script>
    export default {
        name: "CoViewMore",
        props: {
            switchType: {
                type: String,
                default() {
                  return '0';
                }
            },
            extraClass: {
                type: String,
                default: ""
            },
            name: {
                type: String,
                default: "mining"
            }
        },
        methods: {
            ToUrl() {
                let option = {}
                if (this.name === "mining") {
                    option = {
                        query: {
                            type: Number(this.switchType)
                        }
                    }
                }
                this.goTo(this.name, option)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .view-more {
        font-size: var(--font-16);
        span:hover{
            color: #5b8ff9;
        }
    }
</style>
