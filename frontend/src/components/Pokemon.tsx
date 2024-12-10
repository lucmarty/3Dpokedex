import React, { useMemo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pokedex from "../pokedex.json";
import Pokemon3D from "./Pokemon3D";
import PokemonStats from "./PokemonStats";
import AddToTeamButton from "./AddToTeamButton";

const Pokemon: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [team, setTeam] = useState<string[]>(() => {
    const storedPokemon = sessionStorage.getItem("selectedPokemon");
    return storedPokemon ? JSON.parse(storedPokemon) : [];
  });

  const selectedPokemon = pokedex.find((p) => p.id === Number(id));
  if (!selectedPokemon) {
    return <div>Pokémon introuvable</div>;
  }

  const modelPath = useMemo(
    () => `/models/${selectedPokemon.name.english.toLowerCase()}/${selectedPokemon.name.english.toLowerCase()}.glb`,
    [selectedPokemon]
  );

  useEffect(() => {
    sessionStorage.setItem("selectedPokemon", JSON.stringify(team));
  }, [team]);

  const stats = selectedPokemon.base;
  const type: string[] = selectedPokemon.type;

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1 }}>
        <Pokemon3D modelPath={modelPath} />
      </div>
      <div className="flex justify-around items-center mt-9">
        <div>
          <PokemonStats stats={stats} />
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
            team={team}
            setTeam={setTeam}
            pokemon={selectedPokemon}
          />
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
