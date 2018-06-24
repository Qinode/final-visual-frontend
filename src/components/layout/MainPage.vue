<template>
    <div>
        <div class="heading">
            <p>{{ Date.now() }}</p>
            <select v-model="selectedField" id="heatmapField">
                <option v-for="field in fields" :key="field">{{ field }}</option>
            </select>
        </div>
        <div>
            <label for="heatmapField"></label>
            <LeafMap class="map" id="heatmap" ref="heatmap" @openStats="openNav"
                     :selectedField="selectedField"></LeafMap>
            <div id="sidePanel" class="sidenav">
                <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
                <router-view :key="$route.path"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import { fields } from "@/temp/TempSensorsInfo";
    import LeafMap from "@/components/visual/LeafMap";

    export default {
        name: "MainPage",
        data() {
            return {
                fields,
                selectedField: fields[0],
                clickedSensorId: undefined
            };
        },
        components: {
            LeafMap
        },
        methods: {
            openNav(message) {
                this.clickedSensorId = message;
                document.getElementById("sidePanel").style.width = "50%";
                document.getElementById("heatmap").style.marginRight = "50%";
                this.$router.replace({ name: "sensorMeasurement", params: { sensorId: this.clickedSensorId } });
            },
            closeNav() {
                this.clickedSensorId = undefined;
                document.getElementById("sidePanel").style.width = "0";
                document.getElementById("heatmap").style.marginRight = "0";
                setTimeout(this.$refs.heatmap.resizeMap, 400);
            }
        }
    };
</script>

<style scoped>
    .heading {
        margin: 0;
        padding: 0;
        overflow: hidden;
        position: fixed;
        top: 0;
        width: 50%;
    }

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
