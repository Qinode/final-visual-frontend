<template>
    <div>
        <h3>{{ sensorData }}</h3>
        <div id="map"></div>
    </div>
</template>

<script>
    import L from "leaflet";
    import heatmap from "heatmap.js";
    import HeatmapOverlay from "@/assets/lib/leaflet/leaf-heat";

    export default {
        name: "LeafMap",
        data() {
            return {
                leafMap: undefined,
                sensors: [],
                heatmap: undefined,
                sensorData: "Welcome to Your Vue.js App"
            };
        },
        created() {
            this.updateData();
            this.sensors = this.getSensors();
        },
        mounted() {
            this.leafMap = this.basicMapLayer;
            this.heatmap = this.heatMapLayer;
            this.leafMap.addLayer(this.heatmap);
            this.renderHeatLayer();
        },
        computed: {
            basicMapLayer() {
                const map = L.map("map", {
                    center: [51.504331316, -0.123166],
                    zoom: 13,
                    // minZoom: 13,
                    // maxZoom: 13,
                    zoomControl: false,
                    dragging: false
                });
                L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoiemhlbmc0NDQwIiwiYSI6ImNqZ3oxY2lkazJqYnMzM3A2eHd5bjI1cTYifQ.Mr2cbu_0rCaDQ7CUZL0YEg", {
                    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
                    maxZoom: 18,
                    id: "mapbox.streets",
                    accessToken: "pk.eyJ1Ijoiemhlbmc0NDQwIiwiYSI6ImNqZ3oxY2lkazJqYnMzM3A2eHd5bjI1cTYifQ.Mr2cbu_0rCaDQ7CUZL0YEg"
                }).addTo(map);
                this.sensors.forEach((sensor) => {
                    L.marker(sensor.latlng, { id: sensor.id }).addTo(map).on("click", (e) => {
                        const url = this.$router.resolve({ name: "Stats", params: { sensorID: e.sourceTarget.options.id} });
                        window.open(url.href, "_blank");
                    });
                });
                return map;
            },
            heatMapLayer() {
                return new HeatmapOverlay({
                    "radius": 0.005,
                    "maxOpacity": 8,
                    "scaleRadius": true,
                    "useLocalExtrema": true,
                    latField: "lat",
                    lngField: "lng",
                    valueField: "value"
                });
            }
        },
        methods: {
            getData() {
                return Date.now() / 1000;
            },
            updateData() {
                this.sensorData = this.getData();
                setTimeout(this.updateData, 1000);
            },
            getSensors() {
                return [
                    { id: 1, latlng: [51.519502, -0.184536] },
                    { id: 2, latlng: [51.524629, -0.096474] },
                    { id: 3, latlng: [51.496317, -0.165482] },
                    { id: 4, latlng: [51.497172, -0.112438] },
                    { id: 5, latlng: [51.524949, -0.067978] }
                ];
            },
            getSensorsData() {
                return [
                    { lat: 51.519502, lng: -0.184536, value: Math.floor((Math.random() * 10) + 1) },
                    { lat: 51.524629, lng: -0.096474, value: Math.floor((Math.random() * 10) + 1) },
                    { lat: 51.496317, lng: -0.165482, value: Math.floor((Math.random() * 10) + 1) },
                    { lat: 51.497172, lng: -0.112438, value: Math.floor((Math.random() * 10) + 1) },
                    { lat: 51.524949, lng: -0.067978, value: Math.floor((Math.random() * 10) + 1) }
                ];
            },
            renderHeatLayer() {
                this.heatmap.setData({
                    max: 10,
                    data: this.getSensorsData()
                });
                setTimeout(this.renderHeatLayer, 1000);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        font-weight: normal;
    }

    #map {
        height: 600px;
    }
</style>
