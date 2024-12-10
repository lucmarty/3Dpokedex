import React, { useEffect, useState } from "react";
import TeamCoverage from "./TeamCoverage";

const Team: React.FC = () => {
  const[team, setTeam] = useState<number[]>([]);
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
              const response = await fetch('http://localhost:5002/api/pokemons/' + id);
              const data = await response.json();
              console.log('Données Pokémon récupérées:', data);
              return data;
            } catch (err) {
              console.error('Erreur lors de la récupération des Pokémon:', err);
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
  }

  return (
    <div className="w-full h-full bg-gray-100">
      <h1>Organisation d'équipe</h1>
      <div className="w-fit grid grid-cols-6 gap-8 justify-start overflow-x-auto p-4 rounded-xl shadow-lg bg-white">
        {pokemonDetails.map((pokemon) => (
          <div
            key={pokemon.id}
            className="relative flex flex-col items-center w-fit cursor-pointer group"
          >
            <img
              src={`/sprites/${pokemon.sprites.default}`}
              alt={pokemon.name.french}
              className="w-16 h-16 object-contain"
            />
            <p className="text-sm mt-2">{pokemon.name.french}</p>
            {/* Croix rouge affichée au survol */}
            <div
              className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemovePokemon(pokemon.id)}
            >
              ×
            </div>
          </div>
        ))}
      </div>
        <TeamCoverage pokemons={pokemonDetails}/>
    </div>
  );
};

export default Team;
