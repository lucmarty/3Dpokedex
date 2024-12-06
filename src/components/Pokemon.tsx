import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useParams } from "react-router-dom";
import * as d3 from "d3";
import pokedex from "../pokedex.json"; 

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

    // Dessiner les axes
    const axis = svg.selectAll(".axis")
      .data(statNames)
      .enter().append("line")
      .attr("class", "axis")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (d: any, i: number) => rScale(Math.max(...statValues)) * Math.cos(angleSlice * i))
      .attr("y2", (d: any, i: number) => rScale(Math.max(...statValues)) * Math.sin(angleSlice * i))
      .style("stroke", "#ccc");

    // Calculer les coordonnées des points pour la ligne radar
    const radarPoints = statValues.map((value, i) => {
      return [
        rScale(value) * Math.cos(angleSlice * i),
        rScale(value) * Math.sin(angleSlice * i)
      ];
    });



    // Dessiner les cercles pour les différentes valeurs
    for (let i = 0; i < 5; i++) {
      svg.append("circle")
        .attr("r", rScale(Math.max(...statValues)) * (i + 1) / 5)
        .attr("cx", 0)
        .attr("cy", 0)
        .style("fill", "none")
        .style("stroke", "#ddd");
    }

    // Ajouter les labels pour les axes
    svg.selectAll(".axis-label")
      .data(statNames)
      .enter().append("text")
      .attr("class", "axis-label")
      .attr("x", (d: any, i: number) => (rScale(Math.max(...statValues)) + 30) * Math.cos(angleSlice * i))
      .attr("y", (d: any, i: number) => (rScale(Math.max(...statValues)) + 30) * Math.sin(angleSlice * i))
      .text((d: any) => d)
      .style("font-size", "10px")
      .style("text-anchor", "middle");
    
    svg.selectAll(".axis-value")
  .data(statNames)
  .enter().append("text")
  .attr("class", "axis-value")
  .attr("x", (d: any, i: number) => (rScale(Math.max(...statValues)) + 10) * Math.cos(angleSlice * i))
  .attr("y", (d: any, i: number) => (rScale(Math.max(...statValues)) + 10) * Math.sin(angleSlice * i))
  .text((d: any, i: number) => stats[d])  // Afficher la valeur de la statistique
  .style("font-size", "10px")
  .style("text-anchor", "middle")
  .style("dominant-baseline", "middle");

     
    
    radarPoints.push(radarPoints[0]);

   svg.append("path")
  .data([radarPoints])
  .attr("class", "radar-chart-serie")
  .attr("d", d3.line().curve(d3.curveLinear)(radarPoints)) 
  .style("fill", "#00f") 
  .style("opacity", 0.3);

  }, [stats]);

  return <svg ref={svgRef}></svg>;
};




const Pokemon: React.FC = () => {
  const { pokemon } = useParams<{ pokemon: string }>();

  const modelPath = useMemo(() => `/models/${pokemon}/${pokemon}.glb`, [pokemon]);
 
  if (!pokemon) {
    return <div>Pokémon non spécifié</div>;
  }

  const selectedPokemon = pokedex.find((p) => p.name.english.toLowerCase() === pokemon.toLowerCase());

  if (!selectedPokemon) {
    return <div>Pokémon introuvable</div>;
  }

  const stats = selectedPokemon.base; 
  const type: string[] = selectedPokemon.type;

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
      <div className="flex justify-around items-center mt-9">
        <div>
          <D3Graph stats={stats} />
        </div>
        <div>
        <img src={`/sprites/${selectedPokemon.sprites.default}`} alt={selectedPokemon.name.french} />
        <h2>{selectedPokemon.name.french}</h2>
        <p>Numéro : {selectedPokemon.id}</p>
        <p>Type : </p>
  {type.map((t) => (
    <img
      key={t}
      src={`/types/${t.toLowerCase()}.png`} 
      alt={t}
      style={{ margin: "5px" }} 
    />
    
  ))}
</div>

      </div>
    </div>
  );
};

export default Pokemon;
