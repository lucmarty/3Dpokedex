import React, { useMemo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pokemon3D from "./Pokemon3D";
import PokemonStats from "./PokemonStats";
import AddToTeamButton from "./AddToTeamButton";

const Pokemon: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [team, setTeam] = useState<string[]>(() => {
    const storedPokemon = sessionStorage.getItem("selectedPokemon");
    return storedPokemon ? JSON.parse(storedPokemon) : [];
  });
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null); 
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  useEffect(() => {
   
    const fetchPokemon = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5002/api/pokemons/${id}`);
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des données du Pokémon");
        }
        const data = await response.json();
        setSelectedPokemon(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  useEffect(() => {
    sessionStorage.setItem("selectedPokemon", JSON.stringify(team));
  }, [team]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!selectedPokemon) {
    return <div>Pokémon introuvable</div>;
  }

  const modelPath = useMemo(
    () => `/models/${selectedPokemon.name.english.toLowerCase()}/${selectedPokemon.name.english.toLowerCase()}.glb`,
    [selectedPokemon]
  );

  const stats = selectedPokemon.base;
  const type: string[] = selectedPokemon.type;
  const abilities: string[] = selectedPokemon.abilities;
  const info = selectedPokemon.info;

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
          {abilities.map((a) => (
            <p>{a}</p>
          ))}
          <div>
          <p>{info.percent_male} % de male / {info.percent_female} % de femelle</p>
          <p>Taille : {info.height_m} m</p>
          <p>Poids : {info.weight_kg} Kg</p>
          <p>Description : {info.description}</p>
        {info.is_sublegendary === 1 || info.is_legendary === 1 ? (
          <p>Ce pokémon est légendaire</p>
        ) : info.is_mythical === 1 ? (
          <p>Ce pokémon est mythique</p>
        ) : null}
          </div>
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
