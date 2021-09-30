<template>
    <div
            class="flex jus-center font-16 font-400 pointer align-center view-more"
            :class="[extraClass]"
            @click="ToUrl"
    >
        <span>{{ $t("component.more") }}</span>
        <span class="el-icon-arrow-right"></span>
    </div>
</template>
<script>
    export default {
        name: "ViewMore",
        props: {
            switchType: {
                type: Boolean,
                default: false
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
        font-size: 24px;
    }
</style>
