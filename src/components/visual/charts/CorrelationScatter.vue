<template>
    <div class="center">
        <canvas :id = "this.plotId">
        </canvas>
    </div>
</template>

<script>
    import Chart from "chart.js";

    export default {
        name: "CorrelationScatter",
        props: {
            correlation: Array,
            plotId: String,
            maxPoints: {
                type: Number,
                default: 24 * 60
            }
        },
        data() {
            return {
                chart: undefined
            };
        },
        mounted() {
            const ctx = document.getElementById(this.plotId).getContext("2d");
            const chartTitle = [`${this.correlation[0].sensorId} - ${this.correlation[1].sensorId}`,
                `${this.correlation[0].measurement} - ${this.correlation[1].measurement}`];
            const cfg = {
                type: "scatter",
                data: {
                    datasets: [{
                        // label: chartLabel,
                        data: [],
                        pointBackgroundColor: []
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: chartTitle
                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            type: "linear",
                            position: "bottom"
                        }]
                    }
                }
            };
            this.chart = new Chart(ctx, cfg);
            this.getData();
        },
        methods: {
            getData() {
                const newData = { x: Math.random(), y: Math.random() };
                this.updateChart(newData);
                setTimeout(this.getData, 1 * 1000);
            },
            updateChart(newData) {
                this.chart.config.data.datasets[0].data.push(newData);
                this.chart.config.data.datasets[0].pointBackgroundColor.push(this.getRandomColor());
                if (this.chart.config.data.datasets[0].data.length > this.maxPoints){
                    this.chart.config.data.datasets[0].data.shift();
                    this.chart.config.data.datasets[0].pointBackgroundColor.shift();
                }
                this.chart.update();
            },
            getRandomColor() {
                var letters = "0123456789ABCDEF";
                var color = "#";
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
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
