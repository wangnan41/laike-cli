import Vue from "vue";
import App from "./app.vue";
import router from "./router.js";

new Vue({
    router,
    mounted() {},
    render: h => h(App)
}).$mount("#app");