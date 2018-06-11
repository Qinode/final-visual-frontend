<template>
    <div>
        <p>correlation</p>
        <div v-for="sensor in sensors" :key="sensor.sensorId">
            <div v-for="measurement in sensor.measurements" :key="sensor + '_' + measurement">
                <input type="checkbox" :id="sensor.sensorId + '_' + measurement" :value="sensor.sensorId + '_' + measurement"
                       v-model="selectedMeasurements"/>
                <label :for="sensor.sensorId + '_' + measurement">{{ sensor.sensorId + "-" + measurement }}</label>
            </div>
        </div>
        <span>Checked names: {{ selectedMeasurements }}</span>
        <button @click="createCorrelation()">Create Correlation</button>
        <div id="correlation-container" v-for="corr in corrlations">
            <CorrelationScatter :correlation="corr" :plotId="'1'"></CorrelationScatter>
        </div>
    </div>
</template>

<script>
    import CorrelationScatter from "@/components/visual/charts/CorrelationScatter";

    export default {
        name: "Correlation",
        components: { CorrelationScatter },
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
