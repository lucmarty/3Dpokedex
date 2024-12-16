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
    <div 
    className="flex flex-row justify-around w-full"
    >
      {evolutionFamily.map((pokemon, index) => (
        <div key={index} style={{ textAlign: "center" }}>
          <Link
            to={`/pokemon/${pokemon.id}`}
            className="pointer-events-auto text-black hover:text-black"
          >
            <img
              src={`/sprites/${pokemon?.sprite || "default.png"
                }`}
              alt={pokemon.name.english}
              className="flex w-16 h-16 align-middle"
            />
            <p>{pokemon.name.french}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EvolutionFamily;
