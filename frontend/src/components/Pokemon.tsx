import React, { Suspense, useMemo, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useParams } from "react-router-dom";
import * as d3 from "d3";
import pokedex from "../pokedex.json";

import * as THREE from "three";

const PokemonModel: React.FC<{ modelPath: string }> = ({ modelPath }) => {
  const gltf = useGLTF(modelPath);

  useMemo(() => {
    gltf.scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        if (mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial;
          material.metalness = 0;
          material.alphaTest = 0.5;
          material.transparent = true;
        }
      }
    });
  }, [gltf]);

  return (
    <primitive object={gltf.scene} scale={0.01} position={[0, -0.5, 0]} />
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

    // Dessiner les grilles hexagonales
    const gridLevels = 5; // Nombre de niveaux dans la grille
    for (let level = 1; level <= gridLevels; level++) {
      const gridRadius = (radius * level) / gridLevels;
      const hexagonPoints = statNames.map((_, i) => {
        const angle = angleSlice * i;
        return [gridRadius * Math.cos(angle), gridRadius * Math.sin(angle)];
      });
      hexagonPoints.push(hexagonPoints[0]); // Fermer l'hexagone

      svg.append("path")
        .attr("d", d3.line()(hexagonPoints)! as string)
        .style("fill", "none")
        .style("stroke", "#ddd");
    }

    // Dessiner les axes
    svg.selectAll(".axis")
      .data(statNames)
      .enter()
      .append("line")
      .attr("class", "axis")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (_, i) => rScale(Math.max(...statValues)) * Math.cos(angleSlice * i))
      .attr("y2", (_, i) => rScale(Math.max(...statValues)) * Math.sin(angleSlice * i))
      .style("stroke", "#ccc");

    // Dessiner les labels des axes
    svg.selectAll(".axis-label")
      .data(statNames)
      .enter()
      .append("text")
      .attr("x", (_, i) => (rScale(Math.max(...statValues)) + 10) * Math.cos(angleSlice * i))
      .attr("y", (_, i) => (rScale(Math.max(...statValues)) + 10) * Math.sin(angleSlice * i))
      .text((d) => d)
      .style("font-size", "10px")
      .style("text-anchor", "start");
      
      svg.selectAll(".axis-label")
      .data(statValues  )
      .enter()
      .append("text")
      .attr("x", (_, i) => (rScale(Math.max(...statValues)) + 30) * Math.cos(angleSlice * i))
      .attr("y", (_, i) => (rScale(Math.max(...statValues)) + 30) * Math.sin(angleSlice * i))
      .text((d) => d)
      .style("font-size", "10px")
      .style("text-anchor", "start");

    // Dessiner la ligne du radar (points connectés)
    const radarPoints = statValues.map((value, i) => [
      rScale(value) * Math.cos(angleSlice * i),
      rScale(value) * Math.sin(angleSlice * i),
    ]);
    radarPoints.push(radarPoints[0]); // Fermer le radar

    svg.append("path")
      .data([radarPoints])
      .attr("class", "radar-chart-serie")
      .attr("d", d3.line()(radarPoints)! as string)
      .style("fill", "#00f")
      .style("opacity", 0.3);
  }, [stats]);

  return <svg ref={svgRef}></svg>;
};

const Pokemon: React.FC = () => {
  const { pokemon } = useParams<{ pokemon: string }>();
  const [team, setTeam] = useState<number[]>(() => {
    const storedPokemon = sessionStorage.getItem("selectedPokemon");
    return storedPokemon ? JSON.parse(storedPokemon) : [];
  });

  const modelPath = useMemo(
    () => `/models/${pokemon}/${pokemon}.glb`,
    [pokemon]
  );

  const selectedPokemon = pokedex.find(
    (p) => p.name.english.toLowerCase() === pokemon?.toLowerCase()
  );

  useEffect(() => {
    sessionStorage.setItem("selectedPokemon", JSON.stringify(team));
  }, [team]);

  if (!selectedPokemon) {
    return <div>Pokémon introuvable</div>;
  }

  const stats = selectedPokemon.base;
  const type: string[] = selectedPokemon.type;

  const handleAddPokemon = () => {
    if (team.length >= 6) {
      alert("Votre équipe est déjà au complet !");
      return;
    }
    if (team.includes(selectedPokemon.id)) {
      alert(`${selectedPokemon.name.french} est déjà dans votre équipe !`);
      return;
    }
    setTeam((prev) => [...prev, selectedPokemon.id]);
    alert(`${selectedPokemon.name.french} a été ajouté à votre équipe !`);
  };

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
          <p>Type :</p>
          {type.map((t) => (
            <img
              key={t}
              src={`/types/${t.toLowerCase()}.png`}
              alt={t}
              style={{ margin: "5px" }}
            />
          ))}
          <button onClick={handleAddPokemon}>Ajouter à la team</button>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
