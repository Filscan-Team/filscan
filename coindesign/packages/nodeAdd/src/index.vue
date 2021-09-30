<template>
    <div class="nodeAdd">
        <div class="node-content">
            <div v-for="(item,index) in list" :key="index" class="list-item" @click="deleteItem(index)">
                <div class="list-label">{{item}}</div>
                <div class="del-icon"></div>
            </div>
        </div>
        <div class="node-footer">{{total}}/{{totalcount}}</div>
    </div>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: 'NodeAdd',
        data() {
            return {
               totalcount: 0,
            }
        },
        props: {
            list:{
                type: Array,
                default() {
                    return []
                }
            }
        },
        mounted() {
            const { ore_pool_auth } =this.loginInfo
            const { ore_pool_miner_count_limit } =  ore_pool_auth
            this.totalcount = ore_pool_miner_count_limit
        },
        computed: {
            ...mapGetters('notice',['nodesList']),
            ...mapGetters('token',['loginInfo']),
            total(){
                return this.totalcount - this.list.length
            }
        },
        methods: {
            ...mapActions('notice',['setNodesList']),
            deleteItem(idx){
               let node = this.nodesList.concat()
               node.splice(idx, 1)
               this.setNodesList(node)

            }
        }
    }
</script>
<style lang="scss">
    .nodeAdd {
        border: 1px solid var(--border-line);
        width: 100%;
        padding: 20px;
        border-radius: 4px;
        .node-content {
            display: inline-flex;
            flex-wrap: wrap;
            .list-item {
                display: flex;
                flex-direction: row;
                border: 1px solid var(--border-line);
                margin-right: 20px;
                padding: 6px 18px;
                border-radius: 15px;
                margin-top: 10px;
                .list-label {
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                }
                .del-icon {
                    margin: 3px 0 3px 10px;
                    width: 14px;
                    height: 14px;
                    background: var(--minitor-notice-delete-icon);
                    background-size: 100% 100%;
                }
            }
        }
        .node-footer{
            display: flex;
            justify-content: flex-end;
        }
    }
</style>