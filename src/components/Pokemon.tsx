import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Pokemon3D from "./Pokemon3D";
import PokemonStatsGraph from "./PokemonStatsGraph";
import AddToTeamButton from "./AddToTeamButton";
import pokedex from "../pokedex.json";

const Pokemon: React.FC = () => {
  const { pokemon } = useParams<{ pokemon: string }>();
  const [team, setTeam] = useState<string[]>(() => {
    const storedPokemon = sessionStorage.getItem("selectedPokemon");
    return storedPokemon ? JSON.parse(storedPokemon) : [];
  });

  const modelPath = useMemo(() => `/models/${pokemon}/${pokemon}.glb`, [pokemon]);
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

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1 }}>
        <Pokemon3D modelPath={modelPath} />
      </div>
      <div className="flex justify-around items-center mt-9">
        <div>
          <PokemonStatsGraph stats={stats} />
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
          <AddToTeamButton
            selectedPokemon={selectedPokemon}
            team={team}
            setTeam={setTeam}
          />
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
