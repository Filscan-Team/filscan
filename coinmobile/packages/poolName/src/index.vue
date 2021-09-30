<template>
    <div class="cmPoolName">
        <div class="name">
            <co-link
                    :target="columns.target"
                    :param="{
                           key: columns.key,
                           value: columns.id
                      }"
                    :label="isEn?names.tag_en:names.tag_cn"
            ></co-link>
        </div>
        <div class="miner-icon" v-if="names.is_valid===3"></div>
    </div>
</template>

<script>
    export default {
        name: "cmPoolName",
        props: {
            name: {
                type: Object,
                default(){
                    return {
                        tag: "--",
                        tag_en: "--",
                        validate: 1,
                    }
                }
            },
            columns: {
                type: Object,
                default() {
                    return {
                        target: "tipset/pool-detail",
                        key: "address",
                        id: "",
                    }
                }
            }
        },
        computed:{
            names(){
                const { tag_en, tag_cn, is_valid } = this.name
                let tag_cns = tag_cn === ""?"--": tag_cn
                let tag_ens = tag_en === ""?"--": tag_en
                return {
                    tag_en: tag_ens,
                    tag_cn: tag_cns,
                    is_valid
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .cmPoolName{
        display: flex;
        flex-direction: row;
        height: 20px;
        margin-left: 10px;
        .name{
            height:33px;
            font-size: 24px;
            color: #777777;
            line-height: 33px;
            font-weight: 400;
            text-align: center;
        }
        .miner-icon{
            height: 23px;
            width: 23px;
            background: url("../../../../assets/image/mobile/auth.png");
            background-size: 100% 100%;
            margin: 2px 5px;
        }
    }
</style>