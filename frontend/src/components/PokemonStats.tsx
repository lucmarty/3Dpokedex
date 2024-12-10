import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface PokemonStatsProps {
  maxStats: { [key: string]: number } | null;
  currentStats: { [key: string]: number } | null;
}

const PokemonStats: React.FC<PokemonStatsProps> = ({ maxStats, currentStats }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    console.log("maxStats:", maxStats);
    console.log("currentStats:", currentStats);

    if (!svgRef.current || !maxStats || !currentStats) return;

    const svg = d3.select(svgRef.current)
      .attr("width", 400)
      .attr("height", 400)
      .append("g")
      .attr("transform", `translate(200, 200)`);

    const statNames = ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"];

    const statPercentages = statNames.map((stat, index) => {
      const max = Object.values(maxStats)[index]; 
      const current = Object.values(currentStats)[index]; 

      if (max === 0 || current === undefined || max === undefined) {
        console.error(`Invalid stats for ${stat}: max = ${max}, current = ${current}`);
        return 0; 
      }
      return current / max; 
    });

    const angleSlice = (Math.PI * 2) / statNames.length;
    const rScale = d3.scaleLinear().domain([0, 1]).range([0, 150]); 

    for (let level = 1; level <= 5; level++) {
      const gridRadius = (150 * level) / 5;
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
      .attr("x2", (_: any, i: number) => rScale(1) * Math.cos(angleSlice * i))  
      .attr("y2", (_: any, i: number) => rScale(1) * Math.sin(angleSlice * i))
      .style("text-anchor", "start")
      .style("stroke", "#ccc");

    svg.selectAll(".axis-label")
      .data(statNames)
      .enter()
      .append("text")
      .attr("x", (_: any, i: number) => (rScale(1) + 20) * Math.cos(angleSlice * i))  
      .attr("y", (_: any, i: number) => (rScale(1) + 30) * Math.sin(angleSlice * i))
      .text((d: any) => d)
      .style("text-anchor", "middle")
      .style("font-size", "10px");
      

    svg.selectAll(".stat-value")
      .data(statNames)
      .enter()
      .append("text")
      .attr("x", (_: any, i: number) => (rScale(0.8) ) * Math.cos(angleSlice * i)) 
      .attr("y", (_: any, i: number) => (rScale(1) + 10) * Math.sin(angleSlice * i))
      .text((_: any, i: string | number) => `${Object.values(currentStats)[i]} / ${Object.values(maxStats)[i]}`) 
      .style("font-size", "10px")
      .style("text-anchor", "start")
      .style("fill", "#000");

    const radarPointsCurrent = statPercentages.map((percentage, i) => {
      const x = rScale(percentage) * Math.cos(angleSlice * i);
      const y = rScale(percentage) * Math.sin(angleSlice * i);
      if (isNaN(x) || isNaN(y)) {
        console.error(`Invalid point for current stats at index ${i}: x = ${x}, y = ${y}`);
        return [0, 0]; 
      }
      return [x, y];
    });
    radarPointsCurrent.push(radarPointsCurrent[0]);

    svg.append("path")
      .data([radarPointsCurrent])
      .attr("d", d3.line()(radarPointsCurrent)! as string)
      .style("fill", "#f00")  
      .style("opacity", 0.5); 

  }, [maxStats, currentStats]);

  if (!maxStats || !currentStats) {
    return <p>Chargement des statistiques...</p>;
  }

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default PokemonStats;
