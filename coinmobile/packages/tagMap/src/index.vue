<template>
    <div class="CmTagMap">
        <div class="name">{{isEn?name.tag_en:name.tag_cn}}</div>
        <div class="miner-icon" v-if="name.is_valid===3"></div>
    </div>
</template>

<script>
    export default {
        name: "CmTagMap",
        props: {
            name: {
                type: Object,
                default: {
                    tag_cn: "--",
                    tag_en: "--",
                    is_valid: 1,
                }
            }
        },
    }
</script>
<style lang="scss" scoped>
    .CmTagMap{
        display: flex;
        flex-direction: row;
        height: 31px;
        margin-left: 10px;
        border-radius: 16px;
        background: rgba(243,146,27,0.1);
        padding: 0 15px;
        .name{
            height: 31px;
            font-size: 18px;
            color: #777777;
            line-height: 31px;
            font-weight: 400;
            min-width: 60px;
            text-align: center;
        }
        .miner-icon{
            height: 19px;
            width: 19px;
            background: url("../../../../assets/image/mobile/auth.png");
            background-size: 100% 100%;
            margin: 6px 0 6px 5px;
        }
    }
</style>