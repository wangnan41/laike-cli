<template>
    <div class="wrapper">
        <p>我是首页</p>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            spread: [1, 2, 3, 4],
            obj: {
                name: "w",
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

<style lang="scss" scoped>
.wrapper {
    padding: 20px 10px;
    font-size: 12px;
    a {
        color: #333;
        font-size:16px;
    }
}

</style>