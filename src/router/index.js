import Vue from "vue";
import Router from "vue-router";
import Correlation from "@/components/layout/Correlation";
import LeafMap from "@/components/visual/LeafMap";
import Stats from "@/components/layout/Stats";

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
            path: "/correlation",
            name: "Correlation",
            component: Correlation
        },
        {
            path: "/charts/:sensorId",
            name: "Stats",
            component: Stats,
            props: true
        }
    ]
});
