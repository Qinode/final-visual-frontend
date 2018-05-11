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
    import LineChart from "./LineChart";

    export default {
        name: "Stats",
        components: { LineChart },
        props: ["sensorId"],
        computed: {
            measurements() {
                // Todo: use data resources api instead of mock static data
                return ["m1", "m2"];
            }
        }
    };
</script>

<style scoped>

</style>
