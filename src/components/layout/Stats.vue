<template>
    <div>
        <p>sensor{{ this.sensorId }}</p>
        <div>
            <LineChart v-for="measurement in measurements" :key="measurement"
                       :sensor-id="sensorId"
                       :measurement="measurement"></LineChart>
        </div>
        <!--<p v-for="measurement in measurements" :key="measurement">{{ measurement }}</p>-->
    </div>
</template>

<script>
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
            console.log("on create");
            this.$http.post("metadata/fields", { sensor_id: this.sensorId }).then(
                (response) => {
                    this.measurements = response.data.data;
                },
                (response) => {
                    console.log(response.data);
                }
            );
        }

    };
</script>

<style scoped>

</style>
