const mixin = {
    data() {
        return {
            fullWidth: process.client? document.body.clientWidth:''
        };
    },
    watch: {
        fullWidth() {
            if (this.fullWidth > 600) {
                window.location.href = "/";
            } else {
                window.location.href = "/mobile";
            }
        }
    },
    mounted() {
        console.log('aaa')
        window.onresize = () => {
            return (() => {
                window.fullWidth = document.body.clientWidth;
                this.fullWidth = window.fullWidth;
            })();
        };
        if (document.body.clientWidth > 600) {
            window.location.href = "/";
        } else {
            window.location.href = "/mobile";
        }
    }
};

export default mixin;