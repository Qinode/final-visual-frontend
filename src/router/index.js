import Vue from "vue";
import Router from "vue-router";
import Correlation from "@/components/layout/Correlation";
import MainPage from "@/components/layout/MainPage";
import Stats from "@/components/layout/Stats";
import Login from "@/components/layout/Login";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            redirect: "/login"
        },
        {
            path: "/login",
            name: "Login",
            component: Login
        },
        {
            path: "/map",
            name: "MainPage",
            component: MainPage,
            children: [{
                name: "sensorMeasurement",
                path: ":sensorId",
                component: Stats,
                props: true
            }]
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
