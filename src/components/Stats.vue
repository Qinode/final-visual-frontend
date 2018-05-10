<template>
    <div>
        <p>stats {{ this.sensorID }}</p>
        <p v-for="measurement in measurements" :key="measurement">{{ measurement }}</p>
    </div>
</template>

<script>
    export default {
        name: "Stats",
        props: ["sensorID"],
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
