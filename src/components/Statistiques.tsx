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

    d3.select(svgRef.current).selectAll("*").remove(); // Reset SVG

    const width = 400;
    const height = 400;
    const radius = 150;
    const centerX = width / 2;
    const centerY = height / 2;
    
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${centerX}, ${centerY})`);

    const statNames = ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"];
    const angleSlice = (Math.PI * 2) / statNames.length;

    const maxStat = d3.max(Object.values(pokemon)) || 100;
    const rScale = d3.scaleLinear().domain([0, maxStat]).range([0, radius]);

    // 🟢 **Dessiner la grille hexagonale**
    for (let level = 1; level <= 5; level++) {
      const gridRadius = (radius * level) / 5;
      const gridPoints: [number, number][] = statNames.map((_, i) => {
        const angle = angleSlice * i;
        return [gridRadius * Math.cos(angle), gridRadius * Math.sin(angle)];
      });
      gridPoints.push(gridPoints[0]); // Fermer la grille

      svg.append("path")
        .attr("d", d3.line<[number, number]>()
          .curve(d3.curveLinear) 
          (gridPoints) || ""
        )
        .style("fill", "none")
        .style("stroke", "#aaa")
        .style("stroke-width", "1px");
    }

    // 🟥 **Tracer le polygone du Pokémon**
    const radarPoints: [number, number][] = statNames.map((stat, i) => {
      const value = pokemon[stat as keyof typeof pokemon];
      return [rScale(value) * Math.cos(angleSlice * i), rScale(value) * Math.sin(angleSlice * i)];
    });
    radarPoints.push(radarPoints[0]); // Fermer le polygone

    svg.append("path")
      .attr("d", d3.line<[number, number]>()
        .curve(d3.curveLinear) 
        (radarPoints) || ""
      )
      .style("fill", "rgba(255, 0, 0, 0.4)")
      .style("stroke", "#f00")
      .style("stroke-width", "2px");

    // 🔢 **Ajouter les valeurs des statistiques autour du polygone**
    svg.selectAll(".stat-label")
      .data(statNames)
      .enter()
      .append("text")
      .attr("x", (_, i) => radarPoints[i][0] * 1.2)
      .attr("y", (_, i) => radarPoints[i][1] * 1.2)
      .text((d) => pokemon[d as keyof typeof pokemon]) 
      .attr("fill", "black")
      .attr("font-size", "14px")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .style("font-weight", "bold");

    // 🏷 **Ajouter les noms des statistiques autour du graphique**
    svg.selectAll(".stat-name")
      .data(statNames)
      .enter()
      .append("text")
      .attr("x", (_, i) => (radius + 20) * Math.cos(angleSlice * i)) 
      .attr("y", (_, i) => (radius + 20) * Math.sin(angleSlice * i))
      .text(d => d)
      .attr("fill", "black")
      .attr("font-size", "14px")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .style("font-weight", "bold");

  }, [pokemon]);

  return (
    <div className="flex size-fit flex-col items-center rounded-xl bg-background p-3 shadow-2xl">
      <h1 className="text-3xl text-black">Statistiques</h1>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Statistiques;
