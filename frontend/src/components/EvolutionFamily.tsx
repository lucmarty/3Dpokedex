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
    <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
      {evolutionFamily.map((pokemon, index) => (
        <div key={index} style={{ textAlign: "center" }}>
          <Link to={`/pokemon/${pokemon.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <img
              src={`/sprites/${
                pokemon?.sprite || "default.png"
              }`}
              alt={pokemon.name.english}
              style={{ width: "100px", height: "100px" }}
            />
            <p>{pokemon.name.french} / {pokemon.name.english}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EvolutionFamily;
