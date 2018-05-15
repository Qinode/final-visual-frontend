<template>
    <div>
        <h3>{{ sensorData }}</h3>
        <div class="timeline">
            <ol>
                <li v-for="n in this.snapshot"
                    @click="setSnapshot(n.timestamp)">

                </li>
            </ol>
        </div>
        <div id="map"></div>
    </div>
</template>

<script>
    import L from "leaflet";
    import "@/assets/lib/leaflet/leaflet-idw";
    import heatmap from "heatmap.js";
    import HeatmapOverlay from "@/assets/lib/leaflet/leaf-heat";

    export default {
        name: "LeafMap",
        data() {
            return {
                leafMap: undefined,
                sensors: [],
                heatmap: undefined,
                snapshot: [],
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
                    center: [50.94171482, -0.10913786],
                    zoom: 18,
                    minZoom: 18,
                    maxZoom: 18,
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
                    L.marker(sensor.latlng, {id: sensor.id}).addTo(map).on("click", (e) => {
                        const url = this.$router.resolve({
                            name: "Stats",
                            params: {sensorId: e.sourceTarget.options.id}
                        });
                        window.open(url.href, "_blank");
                    });
                });
                return map;
            },
            heatMapLayer() {
                return L.idwLayer([
                    ],
                    { opacity: 0.1, cellSize: 10, maxZoom: 18, exp: 2, max: 10 });
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
                    { id: 1, latlng: [50.94099679, -0.10949393] },
                    { id: 2, latlng: [50.94131024, -0.10934176] },
                    { id: 3, latlng: [50.94171482, -0.10913786] },
                    { id: 4, latlng: [50.94219203, -0.10916078] },
                    { id: 5, latlng: [50.94236324, -0.10900667] },
                    { id: 6, latlng: [50.9410758, -0.11020363] },
                    { id: 7, latlng: [50.9413209, -0.11009397] },
                    { id: 8, latlng: [50.94182848, -0.10997704] },
                    { id: 9, latlng: [50.94208887, -0.10993387] },
                    { id: 10, latlng: [50.94250863, -0.10991221] },
                    { id: 11, latlng: [50.9424186, -0.10866688] },
                    { id: 12, latlng: [50.94199277, -0.10867638] },
                    { id: 13, latlng: [50.94164463, -0.10886622] },
                    { id: 14, latlng: [50.94126736, -0.10890052] },
                    { id: 15, latlng: [50.94096022, -0.10925082] },
                    { id: 16, latlng: [50.94089209, -0.10990126] },
                    { id: 17, latlng: [50.94133561, -0.10969257] },
                    { id: 18, latlng: [50.94209916, -0.10953461] },
                    { id: 19, latlng: [50.94172002, -0.10957757] },
                    { id: 20, latlng: [50.94244257, -0.10942202] },
                    { id: 21, latlng: [50.94104064, -0.11057843] },
                    { id: 22, latlng: [50.94148519, -0.11033065] },
                    { id: 23, latlng: [50.94177094, -0.11037551] },
                    { id: 24, latlng: [50.94216666, -0.11023289] },
                    { id: 25, latlng: [50.94232998, -0.1103066] },
                    { id: 26, latlng: [50.942387, -0.10990188] }
                ];
            },
            getSensorsData() {
                return [
                    [50.94099679, -0.10949393, Math.floor(Math.random() * 10) + 1],
                    [50.94131024, -0.10934176, Math.floor(Math.random() * 10) + 1],
                    [50.94171482, -0.10913786, Math.floor(Math.random() * 10) + 1],
                    [50.94219203, -0.10916078, Math.floor(Math.random() * 10) + 1],
                    [50.94236324, -0.10900667, Math.floor(Math.random() * 10) + 1],
                    [50.9410758, -0.11020363, Math.floor(Math.random() * 10) + 1],
                    [50.9413209, -0.11009397, Math.floor(Math.random() * 10) + 1],
                    [50.94182848, -0.10997704, Math.floor(Math.random() * 10) + 1],
                    [50.94208887, -0.10993387, Math.floor(Math.random() * 10) + 1],
                    [50.94250863, -0.10991221, Math.floor(Math.random() * 10) + 1],
                    [50.9424186, -0.10866688, Math.floor(Math.random() * 10) + 1],
                    [50.94199277, -0.10867638, Math.floor(Math.random() * 10) + 1],
                    [50.94164463, -0.10886622, Math.floor(Math.random() * 10) + 1],
                    [50.94126736, -0.10890052, Math.floor(Math.random() * 10) + 1],
                    [50.94096022, -0.10925082, Math.floor(Math.random() * 10) + 1],
                    [50.94089209, -0.10990126, Math.floor(Math.random() * 10) + 1],
                    [50.94133561, -0.10969257, Math.floor(Math.random() * 10) + 1],
                    [50.94209916, -0.10953461, Math.floor(Math.random() * 10) + 1],
                    [50.94172002, -0.10957757, Math.floor(Math.random() * 10) + 1],
                    [50.94244257, -0.10942202, Math.floor(Math.random() * 10) + 1],
                    [50.94104064, -0.11057843, Math.floor(Math.random() * 10) + 1],
                    [50.94148519, -0.11033065, Math.floor(Math.random() * 10) + 1],
                    [50.94177094, -0.11037551, Math.floor(Math.random() * 10) + 1],
                    [50.94216666, -0.11023289, Math.floor(Math.random() * 10) + 1],
                    [50.94232998, -0.1103066, Math.floor(Math.random() * 10) + 1],
                    [50.942387, -0.10990188, Math.floor(Math.random() * 10) + 1]
                ];
            },
            renderHeatLayer() {
                const sensorValues = this.getSensorsData();
                this.snapshot.push({ timestamp: this.sensorData, value: sensorValues });
                if (this.snapshot.length > 10) {
                    this.snapshot.shift();
                }
                this.heatmap.setLatLngs(sensorValues);
                setTimeout(this.renderHeatLayer, 5000);
            },
            setSnapshot(timestamp) {
                // todo: change setData into api in idw.layer
                this.heatmap.setData({
                    max: 10,
                    data: this.snapshot.find(item => item.timestamp === timestamp).value
                });
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

    .timeline {
        overflow-x: hidden;
        padding: 20px 0;
    }

    .timeline ol {
        width: 100%;
        transition: all 1s;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: space-between;
    }

    .timeline ol li {
        list-style: none;
        position: relative;
        text-align: center;
        flex-grow: 1;
        flex-basis: 0;
        padding: 0 5px;
    }

    .timeline ol li:before {
        content: "";
        width: 10px;
        height: 10px;
        display: block;
        border-radius: 50%;
        background: #ccc;
        margin: 0 auto 5px auto;
    }

    .timeline ol li:not(:last-child)::after {
        content: "";
        width: calc(100% - 14px);
        height: 2px;
        display: block;
        background: #ccc;
        margin: 0;
        position: absolute;
        top: 4px;
        left: calc(50% + 7px);
    }
</style>
