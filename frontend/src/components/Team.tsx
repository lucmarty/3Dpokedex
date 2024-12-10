import React, { useEffect, useState } from "react";
import TeamCoverage from "./TeamCoverage";
import TeamList from "./TeamList";

const Team: React.FC = () => {
  const [team, setTeam] = useState<number[]>([]);
  interface Pokemon {
    id: number;
    name: {
      french: string;
    };
    sprites: {
      default: string;
    };
  }

  const [pokemonDetails, setPokemonDetails] = useState<Pokemon[]>([]);

  // récupération des données de l'équipe stockées en session storage
  useEffect(() => {
    const data = sessionStorage.getItem("selectedPokemon");
    if (data) {
      setTeam(JSON.parse(data));
    }
  }, []);

  // récupération des détails des Pokémon de l'équipe depuis la DB
  useEffect(() => {
    if (team.length > 0) {
      const fetchPokemonDetails = async () => {
        const details = await Promise.all(
          team.map(async (id) => {
            try {
              const response = await fetch("http://localhost:5002/api/pokemons/" + id);
              const data = await response.json();
              return data;
            } catch (err) {
              console.error("Erreur lors de la récupération des Pokémon:", err);
              return null;
            }
          })
        );
        setPokemonDetails(details.filter(Boolean) as []);
      };
      fetchPokemonDetails();
    } else {
      setPokemonDetails([]);
    }
  }, [team]);

  // Suppression d'un Pokémon de l'équipe
  const handleRemovePokemon = (id: number) => {
    const updatedTeam = team.filter((pokemonId) => pokemonId !== id);
    setTeam(updatedTeam);
    sessionStorage.setItem("selectedPokemon", JSON.stringify(updatedTeam));
  };

  return (
    <div className="bg-gray-100">
      <h1 className="text-center">Organisation d'équipe</h1>

      {pokemonDetails.length === 0 ? (
        <p className="text-center">Aucun Pokémon dans l'équipe</p>
      ) : (
        <div className="flex flex-row items-center justify-evenly p-8">
          <TeamList pokemons={pokemonDetails} onRemovePokemon={handleRemovePokemon} />
          <TeamCoverage pokemons={pokemonDetails} />
        </div>
      )}
    </div>
  );
};

export default Team;
