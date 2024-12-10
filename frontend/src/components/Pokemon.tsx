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
          if (material.map) {
            if (material.map.name.includes("Fire")) {
              material.color.set("orange");
              material.emissive.set("red");
              material.alphaMap = material.map;
              material.opacity = 0.5;
            }
            if (material.map.name.includes("Beto")) {
              material.color.set("#DDA0DD");
            }
          }
        }
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} scale={0.01} position={[0, -0.5, 0]} />;
};

const D3Graph: React.FC<{ stats: { [key: string]: number } }> = ({ stats }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const margin = 50;
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2 - margin;

    const statNames = [
      "HP",
      "Attack",
      "Defense",
      "Sp. Attack",
      "Sp. Defense",
      "Speed",
    ];
    const statValues = statNames.map((stat) => stats[stat]);

    const angleSlice = (Math.PI * 2) / statNames.length;
    const rScale = d3
      .scaleLinear()
      .domain([0, Math.max(...statValues)])
      .range([0, radius]);

    const svg = d3
      .select(svgRef.current)
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

      svg
        .append("path")
        .attr("d", d3.line()(hexagonPoints)! as string)
        .style("fill", "none")
        .style("stroke", "#ddd");
    }

    // Dessiner les axes
    svg
      .selectAll(".axis")
      .data(statNames)
      .enter()
      .append("line")
      .attr("class", "axis")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr(
        "x2",
        (_, i) => rScale(Math.max(...statValues)) * Math.cos(angleSlice * i)
      )
      .attr(
        "y2",
        (_, i) => rScale(Math.max(...statValues)) * Math.sin(angleSlice * i)
      )
      .style("stroke", "#ccc");

    // Dessiner les labels des axes
    svg
      .selectAll(".axis-label")
      .data(statNames)
      .enter()
      .append("text")
      .attr(
        
        "x",
       
        (_, i) =>
          (rScale(Math.max(...statValues)) + 10) * Math.cos(angleSlice * i)
      )
      .attr(
        "y",
        (_, i) =>
          (rScale(Math.max(...statValues)) + 10) * Math.sin(angleSlice * i)
      )
      .text((d) => d)
      .style("font-size", "10px")
      .style("text-anchor", "start");

    svg
      .selectAll(".axis-label")
      .data(statValues)
      .enter()
      .append("text")
      .attr(
        "x",
        (_, i) =>
         
          (rScale(Math.max(...statValues)) + 30) * Math.cos(angleSlice * i)
      
      )
      .attr(
        
        "y",
       
        (_, i) =>
         
          (rScale(Math.max(...statValues)) + 30) * Math.sin(angleSlice * i)
      
      )
      .text((d) => d)
      .style("font-size", "10px")
      .style("text-anchor", "start");

    // Dessiner la ligne du radar (points connectés)
    const radarPoints = statValues.map((value, i) => [
      rScale(value) * Math.cos(angleSlice * i),
      rScale(value) * Math.sin(angleSlice * i),
    ]);
    radarPoints.push(radarPoints[0]); // Fermer le radar

    svg
      .append("path")
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
  const [team, setTeam] = useState<string[]>(() => {
    const storedPokemon = sessionStorage.getItem("selectedPokemon");
    return storedPokemon ? JSON.parse(storedPokemon) : [];
  });

  const audio = useMemo(() => {
    const audio = new Audio(`/models/${pokemon}/${pokemon}.mp3`);
    audio.load();
    return audio;
  }, [pokemon]);

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
    if (team.includes(selectedPokemon.name.english)) {
      alert(`${selectedPokemon.name.french} est déjà dans votre équipe !`);
      return;
    }
    setTeam((prev) => [...prev, selectedPokemon.name.english]);
    alert(`${selectedPokemon.name.french} a été ajouté à votre équipe !`);
  };

  return (
    <div
      className="pokemon"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
    <div
      style={{
        height: "calc(100vh - 56px)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ flex: 1 }}>
        <Canvas camera={{ position: [0, 0.5, 2], fov: 50 }}>
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
              autoRotate
            />
          </Suspense>
        </Canvas>
      </div>
      <div
        className="absolute flex items-center"
        style={{ width: "100%" }}
      >
        <div className="absolute left-10">
          <D3Graph stats={stats} />
        </div>
        <div>
          <img
            src={`/sprites/${selectedPokemon.sprites.default}`}
            alt={selectedPokemon.name.french}
          />
        <div className="absolute right-10">
          <img
            src={`/sprites/${selectedPokemon.sprites.default}`}
            alt={selectedPokemon.name.french}
          />
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
          <button onClick={handleAddPokemon}>
            Ajouter à la team
          </button>
        </div>
      </div>
      <label
        onClick={() => {
          audio.play();
        }}
        className="group cursor-pointer absolute bottom-5 w-[48px] h-[48px] bg-gradient-to-b from-blue-600 to-blue-400 rounded-full left-1/2 -translate-x-1/2 shadow-[inset_0px_4px_2px_#60a5fa,inset_0px_-4px_0px_#1e3a8a,0px_0px_2px_rgba(0,0,0,10)] active:shadow-[inset_0px_4px_2px_rgba(96,165,250,0.5),inset_0px_-4px_2px_rgba(37,99,235,0.5),0px_0px_2px_rgba(0,0,0,10)] z-20 flex items-center justify-center"
      >
        <div className="w-5 group-active:w-[31px] fill-blue-100 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.5)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Filled"
            viewBox="0 0 24 24"
          >
            <path d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z"></path>
          </svg>
        </div>
      </label>
    </div>
  );
};

export default Pokemon;
