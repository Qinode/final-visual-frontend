<template>
    <div>
        <p>sensor{{ this.sensorId }}</p>
        <div>
            <LineChart v-for="measurement in measurements" :key="measurement"
                       :sensor-id="sensorId"
                       :measurement="measurement"></LineChart>
        </div>
        <!--<p v-for="measurement in measurements" :legendSVG="measurement">{{ measurement }}</p>-->
    </div>
</template>

<script>
    import { fields } from "@/temp/TempSensorsInfo";
    import LineChart from "../visual/charts/LineChart";

    export default {
        name: "Stats",
        components: { LineChart },
        data() {
            return {
                measurements: []
            };
        },
        props: ["sensorId"],
        created() {
            this.measurements = fields;
        }

    };
</script>

<style scoped>

</style>
