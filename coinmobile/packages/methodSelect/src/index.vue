<template>
    <div class="base-select pointer">
        <div class="selected flex align-center" @click.stop="showList = !showList">
            {{ selectedOption.label }}
            <span
                    class="iconfont "
                    v-if="options.length > 1"
                    :class="[showList ? 'icon-shang' : 'icon-down']"
            ></span>
        </div>
        <div
                class="option-list bg-board"
                v-if="showList && options.length > 1"
        >
            <div
                    v-for="option in optionList"
                    :key="option.index"
                    @click.stop="handleClick(option.index)"
            >
                {{ option.label }}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "CmMethodSelect",
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
            }
        },
        computed: {
            optionList() {
                return this.options.filter(option => {
                    return option.index !== this.index
                })
            },
            selectedOption() {
                const option = this.options.filter(
                    option => option.index == this.index
                )[0]
                return option || {}
            }
        },
        methods: {
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
.base-select {
    position: relative;
    height: 44px;
    line-height: 44px;
    border-radius: 4px;
    .selected {
        min-width: 270px;
        font-size: 22px;
        padding: 4px 12px;
        border: 1px solid var(--border-line);
        margin-top: -10px;
        justify-content: space-between;
    }
    .selected span {
        margin-left: 18px;
        font-size: 24px;
    }
    .option-list {
        position: absolute;
        box-shadow: 0px 2px 4px 0px #0b1926;
        color: var(--main-text-color);
        top: 50px;
        max-height: 200px;
        overflow-y: scroll;
        padding-left: 10px;
        background-color: #ffffff;
        z-index: 10000;
        div {
            font-size: 20px;
            height: 65px;
            line-height: 65px;
            min-width: 240px;
            border-bottom: 1px solid var(--border-color);
            padding:0 20px;
            &:last-child {
                border-bottom: none;
            }
        }
    }
}
</style>
