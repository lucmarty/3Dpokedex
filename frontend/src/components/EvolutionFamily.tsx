import React from "react";
import { Link } from "react-router-dom";

interface EvolutionFamilyProps {
  evolutionFamily: {
    id: number;
    name: {
      english: string;
      french: string;
    };
    sprite: string; 
  }[];
}

  const EvolutionFamily: React.FC<EvolutionFamilyProps> = ({ evolutionFamily }) => {
  return (
    <div className="flex justify-around mt-5">
      {evolutionFamily.map((pokemon, index) => (
      <div key={index} className="text-center">
        <a href={`/pokemon/${pokemon.id}`} className="no-underline text-inherit pointer-events-auto">
        <img
          src={`/sprites/${
          pokemon?.sprite || "default.png"
          }`}
          alt={pokemon.name.english}
          className="w-24 h-24"
        />
        <p>{pokemon.name.french} / {pokemon.name.english}</p>
        </a>
      </div>
      ))}
    </div>
  );
};

export default EvolutionFamily;
