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

    export default {
        name: "LineChart",
        props: ["sensorId", "measurement"],
        data() {
            return {
                lineChart: undefined,
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
            this.updateChart();
        },
        methods: {
            getData() {
                return { x: Date.now(), y: Math.floor((Math.random() * 10) + 1) };
            },
            updateChart() {
                this.lineChart.config.data.datasets[0].data.push(this.getData());
                if (this.lineChart.config.data.datasets[0].data.length > 10) {
                    this.lineChart.config.data.datasets[0].data.shift();
                }
                this.lineChart.update();
                setTimeout(this.updateChart, 1000);
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
