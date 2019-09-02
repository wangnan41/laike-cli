<template>
    <div class="title">详情页</div>
</template>
<script>
// 引用外部css
import "./asset/css/common.scss";
export default {
    components: {},
    data() {
        return {
            spread: [1, 2, 3, 4],
            obj: {
                name: "wang",
                age: "30"
            }
        };
    },
    created() {},
    mounted() {
        let m = [3, 4];
        console.log([...this.spread, ...m]);
        let obj = Object.assign({}, this.obj);
        console.log("23232323:" + obj);
        for (let a of m) {
            console.log(a);
        }
    },
    destroyed() {},
    methods: {}
};
</script>

<style lang="scss">
    .title{
        color:#333;
        font-size:28rem;
        line-height:34rem; 
    }
</style>