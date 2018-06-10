<template>
    <div>
        <p>correlation</p>
        <div v-for="sensor in sensors" :key="sensor.sensorId">
            <div v-for="measurement in sensor.measurements" :key="sensor + '_' + measurement">
                <input type="checkbox" :id="sensor.sensorId + '_' + measurement" :value="sensor.sensorId + '_' + measurement"
                       v-model="selectedMeasurements"/>
                <label :for="sensor.sensorId + '_' + measurement">{{ sensor.sensorId + "_" + measurement }}</label>
            </div>
        </div>
        <span>Checked names: {{ selectedMeasurements }}</span>
        <button @click="createCorrelation()">Create Correlation</button>
        <div id="correlation-container" v-for="corr in corrlations">
            <p>{{ corr[0].sensorId + " " + corr[0].measurement }}</p>
            <p>{{ corr[1].sensorId + " " + corr[0].measurement }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Correlation",
        data() {
            return {
                sensors: [{
                    sensorId: 1,
                    measurements: ["a"]
                }, {
                    sensorId: 2,
                    measurements: ["a", "b"]
                }],
                selectedMeasurements: [],
                corrlations: [[{ sensorId: 1, measurement: "a" }, { sensorId: 2, measurement: "b" }]]
            };
        },
        watch: {
            selectedMeasurements() {
                if (this.selectedMeasurements.length > 2) {
                    this.selectedMeasurements.pop();
                }
            }
        },
        methods: {
            createCorrelation() {
                this.selectedMeasurements.length = 0;
                this.$forceUpdate();
            }
        }
    };
</script>

<style scoped>

</style>
