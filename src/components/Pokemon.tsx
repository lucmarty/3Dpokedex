import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useParams } from "react-router-dom";
import * as d3 from "d3";
import pokedex from "../pokedex.json"; 
import { normalizeName } from '../tools';

const PokemonModel: React.FC<{ modelPath: string }> = ({ modelPath }) => {
  const gltf = useGLTF(modelPath);
  return (
    <primitive
      object={gltf.scene}
      scale={0.01}
      position={[0, -0.5, 0]}
    />
  );
};

const D3Graph: React.FC<{ stats: { [key: string]: number } }> = ({ stats }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 50, left: 100 };

    svg.selectAll("*").remove(); 

    svg
      .attr("width", width)
      .attr("height", height)
      .style("background", "#f9f9f9");

    const data = Object.entries(stats); // Convertir les stats en tableau de paires [nom, valeur]

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.map(([, value]) => value))!])
      .nice()
      .range([0, innerWidth]);

    const yScale = d3
      .scaleBand()
      .domain(data.map(([key]) => key))
      .range([0, innerHeight])
      .padding(0.2);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10); 

    // Ajouter un groupe pour contenir le graphique
    const graph = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Ajouter les barres
    graph
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", 0) 
      .attr("y", ([key] : any) => yScale(key)!)
      .attr("width", ([, value] : any) => xScale(value)) // La largeur correspond à la valeur
      .attr("height", yScale.bandwidth()) // La hauteur est définie par `yScale`
      .attr("fill", ([,], i : number) => colorScale(i.toString())!);

    // Ajouter les valeurs des stats au bout des barres
    graph
      .selectAll("text.value")
      .data(data)
      .join("text")
      .attr("class", "value")
      .attr("x", ([, value] :any) => xScale(value) + 5) // Légèrement à droite du bout de la barre
      .attr("y", ([key] :any) => yScale(key)! + yScale.bandwidth() / 2) // Centré verticalement
      .attr("text-anchor", "start")
      .attr("alignment-baseline", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px")
      .text(([, value] :any) => value);

    // Ajouter l'axe X (valeurs des stats)
    graph
      .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale));

    // Ajouter l'axe Y (noms des stats)
    graph
      .append("g")
      .call(d3.axisLeft(yScale));
  }, [stats]);

  return <svg ref={svgRef}></svg>;
};


const Pokemon: React.FC = () => {
  const { pokemon } = useParams<{ pokemon: string }>();

  const modelPath = useMemo(() => `/models/${pokemon}/${pokemon}.glb`, [pokemon]);
 
  if (!pokemon) {
    return <div>Pokémon non spécifié</div>;
  }

const selectedPokemon = pokedex.find(
  (p) => normalizeName(p.name.english) === normalizeName(pokemon)
);

  if (!selectedPokemon) {
    return <div>Pokémon introuvable</div>;
  }

  const stats = selectedPokemon.base; // Statistiques de base

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1 }}>
        <Canvas camera={{ position: [0.5, 0.5, 2], fov: 25 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <directionalLight position={[-5, 5, 5]} intensity={2} />
            <directionalLight position={[5, -5, 5]} intensity={2} />
            <directionalLight position={[5, 5, -5]} intensity={2} />
            <PokemonModel modelPath={modelPath} />
            <OrbitControls
              enableDamping
              dampingFactor={0.25}
              minDistance={2}
              maxDistance={6}
              enablePan={false}
            />
          </Suspense>
        </Canvas>
      </div>
      <div style={{ height: "300px", marginTop: "100px", marginBottom: "100px" }}>
        <D3Graph stats={stats} />
      </div>
    </div>
  );
};

export default Pokemon;
