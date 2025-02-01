import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface PokemonStatsProps {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number;
}

type BarplotProps = {
    width: number;
    height: number;
    data: PokemonStatsProps;
};

const colorMap: { [key: string]: string } = {
    HP: "#a0f0a0",
    Attack: "#F6E979",
    Defense: "#F8B277",
    "Sp. Attack": "#81DEE6",
    "Sp. Defense": "#86A5F7",
    Speed: "#CB81F2"
};

export const Barplot = ({ width, height, data }: BarplotProps) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!data) return;
        const stats = Object.entries(data);

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const margin = { top: 10, right: 15, bottom: 5, left: 35 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const x = d3.scaleLinear()
            .domain([0, d3.max(stats, d => d[1]) || 100])
            .range([0, innerWidth]);

        const y = d3.scaleBand()
            .domain(stats.map(d => d[0]))
            .range([0, innerHeight])
            .padding(0.3);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Animation des barres
        g.selectAll(".bar")
            .data(stats)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("y", d => y(d[0]) || 0)
            .attr("height", y.bandwidth())
            .attr("x", 0)  
            .attr("width", 0) 
            .attr("fill", d => colorMap[d[0]])
            .transition()  
            .duration(1000)  
            .attr("width", d => x(d[1]))  

        // Animation des labels
        g.selectAll(".label")
            .data(stats)
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("x", d => x(d[1]) > 50 ? 5 : x(d[1]) + 5) 
            .attr("y", d => (y(d[0]) || 0) + y.bandwidth() / 2)
            .attr("dy", "0.35em")
            .attr("fill", "black")
            .attr("text-anchor", "start")
            .text(d => d[0])
            .attr("opacity", 0) 
            .transition()
            .duration(1000)
            .attr("opacity", 1); 

        // Animation des valeurs
        g.selectAll(".value")
            .data(stats)
            .enter()
            .append("text")
            .attr("class", "value")
            .attr("x", -10)
            .attr("y", d => (y(d[0]) || 0) + y.bandwidth() / 2)
            .attr("dy", "0.35em")
            .attr("fill", "black")
            .attr("text-anchor", "end")
            .text(d => d[1])
            .attr("opacity", 0)  
            .transition()
            .duration(1000)
            .attr("opacity", 1);  

    }, [data, width, height]);

    return (
        <div className="flex size-fit flex-col items-center rounded-xl bg-background p-3 shadow-2xl">
            <h1 className="text-3xl text-black">Statistiques</h1>
            <svg ref={svgRef} width={width} height={height}></svg>
        </div>
    );
};

export default Barplot;
