const mixin = {
  methods: {
    goTarget(name, key) {
      this.goTo(name, {
        query: {
          [key]: this.key
        }
      })
    },
    goURL(path, key){
        this.$router.push({
            path: `${path}?${key}=${this.key}`
        })
    },
    async handleSearch(e) {
      /* eslint-disable */
            this.key = this.key.replace(/[^0-9a-zA-Z]/g, "");

            if (!this.isMobile && ((e.type === "keyup" && e.keyCode !== 13) || !this.key)) {
                return;
            }
            try {
                this.loading = true;
                let res = await this.$api.getSearchIndex([this.key,this.filter]);
                this.loading = false;
                if(!res){
                    this.goURL('../no-result', 'key');
                }
                const { model_flag, type } = res;
                let target = "";
                let key = "";
                switch (model_flag) {
                    case "block":
                        target = "/tipset/chain"
                        // target = "tipset";
                        key = "hash";
                        break;
                    case "height":
                        target = "/tipset/chain"
                        // target = "tipset";
                        key = "height";
                        break;
                    case "message":
                        target = ['0','6', '7'].includes(type)? "/tipset/message-detail": "/tipset/pool-message-detail"
                        // target = "messageDetail";
                        key = "cid";
                        break;
                    case "actor":
                        target = "/tipset/address-detail"
                        // target = "addressDetail";
                        key = "address";
                        break;
                    case "peer":
                        target = "/more/peer"
                        // target = "peer";
                        key = "peer_id";
                        break;
                    default:
                        target = "/no-result";
                        key = "key";
                }
                this.goURL(target, key);
                this.showSearch=false
                if (this.$route.path.indexOf('address-detail')) {
                    this.$bus.$emit('search')
                }
            } catch (e) {
                console.log(e)
                console.log(e.result)
                if(e.result===null){
                    this.goURL('../no-result', 'key');
                }
                this.loading = false;
            }
        }
    },
    watch: {
        "$route.path"() {
            // this.key = "";
        }
    }
}
export default mixin