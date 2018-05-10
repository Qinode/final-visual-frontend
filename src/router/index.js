import Vue from "vue";
import Router from "vue-router";
import LeafMap from "@/components/LeafMap";
import Stats from "@/components/Stats";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            redirect: "/map"
        },
        {
            path: "/map",
            name: "LeafMap",
            component: LeafMap
        },
        {
            path: "/stats/:sensorID",
            name: "Stats",
            component: Stats,
            props: true
        }
    ],
});
