<template>
    <div class="pc-select pointer">
        <div class="selected flex align-center" @click.stop="navClick">
            <div class="user-icon"></div>
            <span>{{ userName }}</span>
            <span
                    class="iconfont "
                    v-if="options.length > 1"
                    :class="[showList ? 'icon-shang' : 'icon-down']"
            ></span>
        </div>
        <div class="option-list bg-board" v-if="showList && options.length > 1">
            <div
                    v-for="option in options"
                    :key="option.index"
                    @click.stop="handleClick(option.index)"
            >
                {{ option.label }}
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "CenterList",
        data() {
            return {
                showList: false
            }
        },
        props: {
            options: {
                type: Array,
                default() {
                    return []
                }
            },
            index: {
                type: String,
                default: ""
            },
            userInfo: {
                type: String,
                default: ""
            }
        },
        created() {
            this.$bus.$on('langFlag', (v)=>{
                this.showList = v
            })
            this.$bus.$on('netFlag', (v)=>{
                this.showList = v
            })
        },
        computed: {
            ...mapGetters('token', ['loginInfo']),
            userName(){
                const  { nick_name, phone, email }  = this.loginInfo
                return nick_name!==''? nick_name: phone!==''? phone: email
            }
        },
        methods: {
            navClick(){
                this.$bus.$emit('centerFlag', false)
                this.showList = !this.showList
            },
            handleClick(index) {
                this.showList = false
                this.$emit("update:index", index)
                this.$emit("change", index)
            }
        },
        mounted() {
            document.addEventListener("click", () => {
                this.showList = false
            })
        }
    }
</script>
<style lang="scss" scoped>
    .pc-select {
        position: relative;
        height: 36px;
        line-height: 36px;
        margin-right: 10px;
        color: var(--main-text-color);
        .selected {
            font-size: var(--font-16);
            font-weight: 400;
            display: flex;
            justify-content: space-between;
            .user-icon{
                display: inline-flex;
                width: 18px;
                height: 18px;
                background: url('../../../../../assets/image/forcepool/login/user-org@2x.png');
                background-size: 100% 100%;
            }
            span {
                font-size: var(--font-16);
                color: var(--main-text-color);
                padding-left: 10px;
            }
        }
        .option-list {
            z-index: 8;
            position: absolute;
            padding: 0 20px;
            text-align: left;
            top: 38px;
            left: -1px;
            max-height: 160px;
            overflow-y: auto;
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.03);
            & > div {
                &:hover {
                    color: var(--force-mark-color);
                }
            }
        }
    }
</style>
