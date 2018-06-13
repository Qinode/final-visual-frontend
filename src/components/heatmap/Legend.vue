<template>
    <div ref="legend" id="legend">
    </div>
</template>

<script>
    import * as d3 from "d3";

    export default {
        name: "Legend",
        props: ["gradients"],
        mounted() {
            const width = this.$refs.legend.clientWidth;
            const h = 50;

            const key = d3.select("#legend")
                .append("svg")
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", `0, 0, ${width}, 50`);

            const legend = key.append("defs")
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

            key.append("rect")
                .attr("width", width)
                .attr("height", h - 30)
                .style("fill", "url(#gradient)")
                .attr("transform", "translate(0,10)");

            const y = d3.scaleLinear()
                .range([width, 0])
                .domain([38, 12]);

            const yAxis = d3.axisBottom()
                .scale(y)
                .ticks(5);

            key.append("g")
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
