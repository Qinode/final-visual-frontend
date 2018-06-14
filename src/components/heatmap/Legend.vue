<template>
    <div ref="legend" id="legend">
    </div>
</template>

<script>
    import * as d3 from "d3";

    export default {
        name: "Legend",
        props: ["gradients"],
        data() {
            return {
                legendSVG: undefined,
                width: undefined,
                height: 50
            };
        },
        mounted() {
            this.width = this.$refs.legend.clientWidth;
            this.legendSVG = d3.select("#legend")
                .append("svg")
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", `0, 0, ${this.width}, 50`);

            const legend = this.legendSVG.append("defs")
                .append("svg:linearGradient")
                .attr("id", "gradient")
                .attr("x1", "0%")
                .attr("y1", "100%")
                .attr("x2", "100%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad");

            for(const stop in this.gradients) {
                legend.append("stop").attr("offset", `${stop * 100}%`).attr("stop-color", this.gradients[stop]).attr("stop-opacity", 1);
            }

            this.legendSVG.append("rect")
                .attr("width", this.width)
                .attr("height", this.height - 30)
                .style("fill", "url(#gradient)")
                .attr("transform", "translate(0,10)");

            // this.drawAxis()
            const y = d3.scaleLinear()
                .range([this.width, 0])
                .domain([38, 12]);

            const yAxis = d3.axisBottom()
                .scale(y)
                .ticks(5);

            this.legendSVG.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(0,30)")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("axis title");
        },
        methods: {
            drawAxis(min, max) {
                this.legendSVG.select(".axis").remove();
                const y = d3.scaleLinear()
                    .range([this.width, 0])
                    .domain([max, min]);

                const yAxis = d3.axisBottom()
                    .scale(y);
                    // .ticks(5);

                this.legendSVG.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(0,30)")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 0)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("axis title");
            }
        }
    };
</script>

<style scoped>
    .axis text {
        font: 10px sans-serif;
    }

    .axis line, .axis path {
        fill: none;
        stroke: #000;
        shape-rendering: crispEdges;
    }
    svg{
        padding-left: 50px;
    }
</style>
