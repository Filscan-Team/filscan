<template>
    <div class="CoTagMap" v-if="name.tag_cn!==''">
        <div class="name">{{isEn?name.tag_en:name.tag_cn}}</div>
        <div class="miner-icon" v-if="name.is_valid===3"></div>
    </div>
</template>

<script>
    export default {
        name: "CoTagMap",
        props: {
            name: {
                type: Object,
                default() {
                    return {
                        tag_cn: "",
                        tag_en: "",
                        is_valid: 1,
                    }
                }
            }
        },
    }
</script>
<style lang="scss" scoped>
    .CoTagMap{
        display: flex;
        flex-direction: row;
        height: 20px;
        margin-left: 10px;
        border-radius: 10px;
        border: 1px solid var(--border-line);
        padding: 0 8px;
        .name{
            height: 20px;
            font-size: 12px;
            color: var(--tag-name-color);
            line-height: 20px;
            font-weight: 400;
            min-width: 60px;
            text-align: center;
        }
        .miner-icon{
            height: 14px;
            width: 14px;
            background: url("../../../../assets/image/mobile/auth.png");
            background-size: 100% 100%;
            margin: 3px 5px;
        }
    }
</style>