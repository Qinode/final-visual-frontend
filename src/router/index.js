import Vue from "vue";
import Router from "vue-router";
import LeafMap from "@/components/visual/LeafMap";
import Stats from "@/components/visual/stats/Stats";

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
            path: "/stats/:sensorId",
            name: "Stats",
            component: Stats,
            props: true
        }
    ]
});
