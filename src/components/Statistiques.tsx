import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface PokemonStatsProps {
  pokemon: {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number;
  };
}

const Statistiques: React.FC<PokemonStatsProps> = ({ pokemon }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || !pokemon) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", 400)
      .attr("height", 400)
      .append("g")
      .attr("transform", `translate(200, 200)`);

    const statNames = ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"];
    const angleSlice = (Math.PI * 2) / statNames.length;
    const rScale = d3.scaleLinear()
      .domain([0, d3.max(Object.values(pokemon)) || 1])
      .range([0, 150]);

    for (let level = 1; level <= 5; level++) {
      const gridRadius = (150 * level) / 5;
      const hexagonPoints = statNames.map((_, i) => {
        const angle = angleSlice * i;
        return [gridRadius * Math.cos(angle), gridRadius * Math.sin(angle)] as [number, number];
      });
      hexagonPoints.push(hexagonPoints[0]);

      svg.append("path")
        .attr("d", d3.line()(hexagonPoints)!)
        .style("fill", "none")
        .style("stroke", "#777");
    }

    const radarPointsCurrent = statNames.map((stat, i) => {
      const value = pokemon[stat as keyof typeof pokemon];
      const x = rScale(value) * Math.cos(angleSlice * i);
      const y = rScale(value) * Math.sin(angleSlice * i);
      return [x, y] as [number, number];
    });
    radarPointsCurrent.push(radarPointsCurrent[0]);

    svg.append("path")
      .data([radarPointsCurrent])
      .attr("d", d3.line()(radarPointsCurrent)!)
      .style("fill", "#f00")
      .style("opacity", 0.6);

  }, [pokemon]);

  if (!pokemon) {
    return <p>Chargement des statistiques...</p>;
  }

  return (
    <div className="absolute left-10 flex flex-col items-center rounded-xl bg-gray-100/80 p-3 shadow-2xl">
      <h1 className="text-6xl text-black">Statistiques</h1>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Statistiques;
