<template>
    <div class="coNameMap">
        <div class="name">{{isEn?name.tag_en:name.tag}}</div>
        <div class="miner-icon" v-if="name.validate===3"></div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "CoNameMap",
        data(){
            return {
                name : {
                    tag: "--",
                    tag_en: "--",
                    validate: 1,
                }
            }
        },
        props: {
            id: {
                type: String,
                default: ''
            },
        },
        watch:{
            id(){
                let map = this.minerNameMap[this.id]
                let initName = {
                    tag: "--",
                    tag_en: "--",
                    validate: 1,
                }
               this.name = map? map: initName
            }
        },
        computed:{
            ...mapGetters('app',['minerNameMap']),
        }
    }
</script>
<style lang="scss" scoped>
    .coNameMap{
        display: flex;
        flex-direction: row;
        height: 20px;
        margin-left: 10px;
        .name{
            height: 20px;
            font-size: 16px;
            color: #777777;
            line-height: 20px;
            font-weight: 400;
            min-width: 60px;
            text-align: center;
        }
        .miner-icon{
            height: 16px;
            width: 16px;
            background: url("../../../../assets/image/mobile/auth.png");
            background-size: 100% 100%;
            margin: 2px 5px;
        }
    }
</style>