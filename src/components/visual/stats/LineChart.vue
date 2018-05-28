<template>
    <div class="center" style="width: 70%; height: 60%">
        <canvas :id="measurement">
        </canvas>
        <p>
            {{ this.sensorId }} {{ this.measurement }}
        </p>
    </div>

</template>

<script>
    import Chart from "chart.js";
    import moment from "moment";

    export default {
        name: "LineChart",
        props: ["sensorId", "measurement"],
        data() {
            return {
                lineChart: undefined,
                maxLength: 12 * 60,
                lastUpdate: moment.utc().format(this.$datetimeFormat),
                data: []
            };
        },
        mounted() {
            const ctx = document.getElementById(this.measurement).getContext("2d");
            const cfg = {
                type: "line",
                data: {
                    // labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    datasets: [{
                        label: this.measurement,
                        data: [],
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: this.sensorId + this.measurement
                    },
                    scales: {
                        xAxes: [{
                            type: "time",
                            distribution: "linear",
                            display: true
                        }],
                        yAxes: [{
                            display: true
                        }]
                    }
                }
            };
            this.lineChart = new Chart(ctx, cfg);
            this.getData();
        },
        methods: {
            getData() {
                const body = {
                    sensor_id: this.sensorId,
                    field: this.measurement,
                    timestamp: this.lastUpdate
                };
                this.$http.post("data", body).then(
                    (response) => {
                        if (response.data.data.length !== 0) {
                            this.lastUpdate = moment.utc().format(this.$datetimeFormat);
                            let newData = [];
                            response.data.data.forEach((point) => {
                                newData.push({
                                    x: point.time,
                                    y: point[this.measurement]
                                });
                            });
                            this.updateChart(newData);
                        }
                    },
                    (response) => {
                        console.log(response.data);
                    }
                );
                setTimeout(this.getData, 2 * 1000);
            },
            updateChart(newData) {
                this.lineChart.config.data.datasets[0].data.push(...newData);
                while (this.lineChart.config.data.datasets[0].data.length > this.maxLength) {
                    this.lineChart.config.data.datasets[0].data.shift();
                }
                this.lineChart.update();
            }
        }
    };
</script>

<style scoped>
    .center {
        margin: auto;
        width: 50%;
        padding: 10px;
    }
</style>
