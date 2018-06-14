<template>
    <div>
        <LeafMap class="map" id="heatmap" ref="heatmap" @openStats="openNav"></LeafMap>
        <div id="sidePanel" class="sidenav">
            <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
            <router-view :key="$route.path"></router-view>
        </div>
    </div>
</template>

<script>
    import LeafMap from "@/components/visual/LeafMap";
    import Stats from "@/components/layout/Stats";

    export default {
        name: "MainPage",
        data() {
            return {
                clickedSensorId: undefined
            };
        },
        components: {
            LeafMap,
            Stats
        },
        methods: {
            openNav(message) {
                this.clickedSensorId = message;
                document.getElementById("mySidenav").style.width = "50%";
                document.getElementById("heatmap").style.marginRight = "50%";
                this.$router.replace({ name: "sensorMeasurement", params: { sensorId: this.clickedSensorId } });
            },
            closeNav() {
                this.clickedSensorId = undefined;
                document.getElementById("mySidenav").style.width = "0";
                document.getElementById("heatmap").style.marginRight = "0";
                setTimeout(this.$refs.heatmap.resizeMap, 400);
            }
        }
    };
</script>

<style scoped>
    #heatmap {
        transition: margin-right .0s;
        padding: 16px;
    }
    .sidenav .closebtn {
        position: absolute;
        top: 0;
        right: 25px;
        font-size: 36px;
        margin-left: 50px;
    }
    .sidenav {
        height: 100%; /* 100% Full-height */
        width: 0; /* 0 width - change this with JavaScript */
        position: fixed; /* Stay in place */
        z-index: 1; /* Stay on top */
        top: 0; /* Stay at the top */
        right: 0;
        background-color: #FFFFFF; /* Black*/
        overflow-x: hidden; /* Disable horizontal scroll */
        padding-top: 60px; /* Place content 60px from the top */
        transition: 0.0s; /* 0.5 second transition effect to slide in the sidenav */
    }
</style>
