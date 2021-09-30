<template>
    <div class="nameMap">
        <div class="name">{{name}}</div>
        <div class="miner-icon"></div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "CmNameMap",
        props: {
            id: {
                type: String,
                default: ''
            },
        },
        computed:{
            ...mapGetters('app',['minerNameMap']),
            name(){
                if(this.minerNameMap[this.id]){
                    return this.minerNameMap[this.id].tag
                }
                return '--'
            }
        }
    }
</script>
<style lang="scss">
    .nameMap{
        display: flex;
        flex-direction: row;
        height: 32px;
        background: #ffe4ce;
        margin-left: 10px;
        border-radius: 16px;
        .name{
            height: 28px;
            font-size: 20px;
            color: #777777;
            line-height: 28px;
            font-weight: 400;
            min-width: 60px;
            padding: 2px 10px 0 15px;
            text-align: center;
        }
        .miner-icon{
            height: 19px;
            width: 19px;
            background: url("../../../../assets/image/mobile/auth.png");
            background-size: 100% 100%;
            margin: 7px 15px 7px 10px;
        }
    }
</style>