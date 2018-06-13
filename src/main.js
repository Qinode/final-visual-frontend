// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueResource from "vue-resource";
import App from "./App";
import router from "./router";

Vue.use(VueResource);
Vue.config.productionTip = false;

const rootUrl = "http://146.169.47.32:4000";
Vue.http.options.root = rootUrl;
Vue.prototype.$pollInterval = 60 * 3;
Vue.prototype.$datetimeFormat = "YYYY-MM-DD[T]HH:mm:ss[Z]";

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    components: { App },
    template: "<App/>"
});
