import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface GenderBarD3Props {
  percentMale: number;
  percentFemale: number;
}

const GenderBar: React.FC<GenderBarD3Props> = ({ percentMale, percentFemale }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current) return;

    const totalWidth = 300; // Largeur totale en pixels
    const height = 20;

    // Sélectionner le SVG
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Supprimer les anciens éléments pour éviter les doublons

    // Ajouter la section mâle
    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", (percentMale / 100) * totalWidth)
      .attr("height", height)
      .attr("fill", "lightblue");

    // Ajouter la section femelle
    svg
      .append("rect")
      .attr("x", (percentMale / 100) * totalWidth)
      .attr("y", 0)
      .attr("width", (percentFemale / 100) * totalWidth)
      .attr("height", height)
      .attr("fill", "pink");

    // Ajouter le texte conditionnel
    if (percentMale > percentFemale) {
      svg
        .append("text")
        .attr("x", (percentMale / 2 / 100) * totalWidth) // Centrer dans la zone mâle
        .attr("y", height / 1.5)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-size", "12px")
        .text(`${percentMale}% mâle`);
    } else if (percentFemale > percentMale) {
      svg
        .append("text")
        .attr("x", (percentMale + percentFemale / 2) / 100 * totalWidth) // Centrer dans la zone femelle
        .attr("y", height / 1.5)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-size", "12px")
        .text(`${percentFemale}% femelle`);
    } else {
      // Ajouter les deux textes pour égalité
      svg
        .append("text")
        .attr("x", (percentMale / 2 / 100) * totalWidth) // Centrer dans la zone mâle
        .attr("y", height / 1.5)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-size", "12px")
        .text(`${percentMale}% mâle`);

      svg
        .append("text")
        .attr("x", (percentMale + percentFemale / 2) / 100 * totalWidth) // Centrer dans la zone femelle
        .attr("y", height / 1.5)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-size", "12px")
        .text(`${percentFemale}% femelle`);
    }
  }, [percentMale, percentFemale]);

  return <svg ref={svgRef} width="300" height="20" className="border border-gray-300 rounded-lg shadow-xl"></svg>;
};

export default GenderBar;
