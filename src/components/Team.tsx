import React, { useEffect, useState } from "react";
import pokedex from "../pokedex.json";

interface Pokemon {
  id: number;
  name: {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
  };
  type: string[];
  base: {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number;
  };
  sprites: {
    default: string;
  };
}

const Team: React.FC = () => {
  const [storedPokemon, setStoredPokemon] = useState<string[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon[]>([]);

  useEffect(() => {
    const data = sessionStorage.getItem("selectedPokemon");
    if (data) {
      setStoredPokemon(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (storedPokemon.length > 0) {
      const details = storedPokemon.map((name) =>
        pokedex.find((pokemon: Pokemon) =>
          pokemon.name.english.toLowerCase() === name.toLowerCase()
        )
      );
      setPokemonDetails(details.filter(Boolean) as Pokemon[]);
    } else {
      setPokemonDetails([]);
    }
  }, [storedPokemon]);

  const handleRemovePokemon = (id: number) => {
    const updatedStoredPokemon = storedPokemon.filter((name) => {
      const pokemon = pokedex.find(
        (p: Pokemon) => p.name.english.toLowerCase() === name.toLowerCase()
      );
      return pokemon?.id !== id;
    });
    setStoredPokemon(updatedStoredPokemon);
    sessionStorage.setItem("selectedPokemon", JSON.stringify(updatedStoredPokemon));
  };

  return (
    <div>
      <h1>Organisation d'équipe</h1>
      <div className="flex gap-5">
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
            <p className="text-sm text-white mt-2">{pokemon.name.french}</p>
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
    </div>
  );
};

export default Team;
