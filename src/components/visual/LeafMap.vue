<template>
    <div>
        <h3>{{ now }}</h3>
        <Legend :gradients="{
            0: '#00E3E5',
            0.1: '#00E19F',
            0.2: '#00DD5A',
            0.3: '#00D917',
            0.4: '#29D500',
            0.5: '#67D200',
            0.6: '#A3CE00',
            0.7: '#CAB700',
            0.8: '#C67800',
            0.9: '#C23B00',
            1: '#BF0000'
        }"></Legend>
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
    import moment from "moment";
    import Legend from "../heatmap/Legend";

    export default {
        name: "LeafMap",
        components: {
            Legend
        },
        data() {
            return {
                leafMap: undefined,
                sensors: [],
                isSensorsLoaded: false,
                heatmap: undefined,
                snapshot: [],
                now: "Welcome to Your Vue.js App"
            };
        },
        mounted() {
            this.updateNow();
            this.renderMap();
            this.renderHeatLayer("field1");
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
                L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
                    attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                }).addTo(map);
                this.sensors.forEach((sensor) => {
                    L.marker(sensor.latlng, { id: sensor.sensor_id }).addTo(map).on("click", (e) => {
                        this.$emit("openStats", e.sourceTarget.options.id);
                        // const url = this.$router.resolve({
                        //     name: "Stats",
                        //     params: { sensorId: e.sourceTarget.options.id }
                        // });
                        // window.open(url.href, "_blank");
                    });
                });
                return map;
            },
            heatMapLayer() {
                return L.idwLayer([
                    ],
                    { opacity: 0.2, cellSize: 5, maxZoom: 18, exp: 2, max: 30 });
            }
        },
        methods: {
            updateNow() {
                this.now = moment.utc().format(this.$datetimeFormat);
                setTimeout(this.updateNow, 1000);
            },
            renderMap() {
                this.$http.post("metadata/sensors", { node_table: "node" }).then(
                    (response) => {
                        this.sensors = response.data.data;
                        this.leafMap = this.basicMapLayer;
                        this.heatmap = this.heatMapLayer;
                        this.leafMap.addLayer(this.heatmap);
                    },
                    (response) => {
                        console.log(response.data);
                    }
                );
            },
            renderHeatLayer(fieldName) {
                const body = { field: fieldName };
                this.$http.post("data/latest", body).then(
                    (response) => {
                        const resData = response.data.data;
                        const latestData = [];
                        resData.forEach((point) => {
                            const latlng = this.getLatlng(point.sensor_id);
                            latestData.push([latlng[0], latlng[1], point[fieldName]]);
                        });
                        this.setHeatLayerValue(latestData);
                    },
                    (response) => {
                        console.log(response);
                    }
                );
                setTimeout(this.renderHeatLayer, this.$pollInterval * 1000, fieldName);
            },
            setHeatLayerValue(latestData) {
                this.snapshot.push({ timestamp: this.now, value: latestData });
                while (this.snapshot.length > 10) {
                    this.snapshot.shift();
                }
                this.heatmap.setLatLngs(latestData);
            },
            getLatlng(sensorId) {
                return this.sensors.find(sensor => sensor.sensor_id === sensorId).latlng;
            },
            setSnapshot(timestamp) {
                this.heatmap.setLatLngs(
                    this.snapshot.find(item => item.timestamp === timestamp).value
                );
            },
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
