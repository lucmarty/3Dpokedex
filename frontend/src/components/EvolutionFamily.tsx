import React from "react";
import { Link } from "react-router-dom";

interface EvolutionFamilyProps {
  evo: {
    evochain_0: string;
    evochain_2: string;
    evochain_4: string;
  };
  pokemonData: {
    id: number;
    name: {
      english: string;
      french: string;
    };
    sprites: {
      default: string;
    };
  }[];
}

const EvolutionFamily: React.FC<EvolutionFamilyProps> = ({ evo, pokemonData }) => {
  const getPokemonByName = (name: string) => {
    return pokemonData.find(
      (pokemon) => pokemon.name.english.toLowerCase() === name.toLowerCase()
    );
  };

  const evolutionChain = [
    evo.evochain_0,
    evo.evochain_2,
    evo.evochain_4,
  ].filter((evoName) => evoName); // On filtre les noms vides

  return (
    <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
      {evolutionChain.map((evoName, index) => {
        const pokemon = getPokemonByName(evoName);
        if (!pokemon) return null; // Si le Pokémon n'est pas trouvé, on saute cette entrée

        return (
          <div key={index} style={{ textAlign: "center" }}>
            <Link to={`/pokemon/${pokemon.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <img
                src={`/sprites/${pokemon.sprites.default}`}
                alt={pokemon.name.english}
                style={{ width: "100px", height: "100px" }}
              />
              <p> {pokemon.name.french} / {pokemon.name.english}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default EvolutionFamily;
