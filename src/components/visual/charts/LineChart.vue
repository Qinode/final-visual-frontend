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
    import base64ToReadable from "@/util/Decoder";
    import Chart from "chart.js";
    import moment from "moment";

    export default {
        name: "LineChart",
        props: ["sensorId", "measurement"],
        data() {
            return {
                lineChart: undefined,
                maxLength: 12 * 60,
                lastUpdate: moment.utc().subtract(2, "days").format(this.$datetimeFormat),
                pollingTimer: undefined,
            };
        },
        mounted() {
            const ctx = document.getElementById(this.measurement).getContext("2d");
            const cfg = {
                type: "line",
                data: {
                    datasets: [{
                        label: this.measurement,
                        data: [],
                        fill: false,
                        pointRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: `${this.sensorId}  ${this.measurement}`
                    },
                    scales: {
                        xAxes: [{
                            type: "time",
                            time: {
                                unit: "hour",
                                displayFormats: {
                                    hour: "DD MMM hh:mm"
                                }
                            },
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
            if (typeof this.sensorId !== "undefined") {
                this.getData();
            }
        },
        methods: {
            getData() {
                const params = {
                    sensor_id: this.sensorId,
                    start_from: this.lastUpdate,
                    id_column: "gateway_addr"
                };
                this.$http.get("data/AllApplicationData/payload", {params: params}).then(
                    (response) => {
                        if (response.data.data.length !== 0) {
                            this.lastUpdate = moment.utc().format(this.$datetimeFormat);
                            const newData = [];
                            response.data.data.forEach((point) => {
                                try {
                                    const reading = base64ToReadable(point.payload, this.measurement);
                                    newData.push({
                                        x: point.time,
                                        y: reading
                                    });
                                } catch (e) {
                                    console.log(`${e}, caused by ${this.sensorId} with payload ${point.payload}`);
                                }
                            });
                            this.updateChart(newData);
                        }
                    },
                    (response) => {
                        console.log(response.data);
                    }
                );
                this.pollingTimer = setTimeout(this.getData, this.$pollInterval * 1000);
            },
            updateChart(newData) {
                this.lineChart.config.data.datasets[0].data.push(...newData);
                while (this.lineChart.config.data.datasets[0].data.length > this.maxLength) {
                    this.lineChart.config.data.datasets[0].data.shift();
                }
                this.lineChart.update();
            },
            stopPolling() {
                clearTimeout(this.pollingTimer);
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
