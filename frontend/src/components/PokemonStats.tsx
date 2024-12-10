import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PokemonStats: React.FC<{ stats: { [key: string]: number } }> = ({ stats }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const margin = 50;
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2 - margin;

    const statNames = ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"];
    const statValues = statNames.map((stat) => stats[stat]);

    const angleSlice = (Math.PI * 2) / statNames.length;
    const rScale = d3.scaleLinear().domain([0, Math.max(...statValues)]).range([0, radius]);

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Grille hexagonale
    for (let level = 1; level <= 5; level++) {
      const gridRadius = (radius * level) / 5;
      const hexagonPoints = statNames.map((_, i) => {
        const angle = angleSlice * i;
        return [gridRadius * Math.cos(angle), gridRadius * Math.sin(angle)];
      });
      hexagonPoints.push(hexagonPoints[0]);

      svg.append("path")
        .attr("d", d3.line()(hexagonPoints)! as string)
        .style("fill", "none")
        .style("stroke", "#ddd");
    }

    svg.selectAll(".axis")
      .data(statNames)
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (_: any, i: number) => rScale(Math.max(...statValues)) * Math.cos(angleSlice * i))
      .attr("y2", (_: any, i: number) => rScale(Math.max(...statValues)) * Math.sin(angleSlice * i))
      .style("stroke", "#ccc");

    svg.selectAll(".axis-label")
      .data(statNames)
      .enter()
      .append("text")
      .attr("x", (_: any, i: number) => (rScale(Math.max(...statValues)) + 10) * Math.cos(angleSlice * i))
      .attr("y", (_: any, i: number) => (rScale(Math.max(...statValues)) + 10) * Math.sin(angleSlice * i))
      .text((d: any) => d)
      .style("font-size", "10px");


svg.selectAll(".axis-label")
      .data(statValues)
      .enter()
      .append("text")
      .attr("x", (_: any, i: number) => (rScale(Math.max(...statValues)) + 30) * Math.cos(angleSlice * i))
      .attr("y", (_: any, i: number) => (rScale(Math.max(...statValues)) + 30) * Math.sin(angleSlice * i))
      .text((d: any) => d)
      .style("font-size", "10px");

    const radarPoints = statValues.map((value, i) => [
      rScale(value) * Math.cos(angleSlice * i),
      rScale(value) * Math.sin(angleSlice * i),
    ]);
    radarPoints.push(radarPoints[0]);

    svg.append("path")
      .data([radarPoints])
      .attr("d", d3.line()(radarPoints)! as string)
      .style("fill", "#00f")
      .style("opacity", 0.3);
  }, [stats]);

  return <svg ref={svgRef}></svg>;
};

export default PokemonStats;
