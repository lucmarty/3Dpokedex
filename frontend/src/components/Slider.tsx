import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Slider: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [nextPokemon, setNextPokemon] = useState<any>(null);
  const [prevPokemon, setPrevPokemon] = useState<any>(null);
  const currentId = parseInt(id || "1", 10);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`http://localhost:5002/api/pokemons/${currentId + 1}`);
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des données du Pokémon");
        }
        const data = await response.json();
        setNextPokemon(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemon();
  }, [id]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`http://localhost:5002/api/pokemons/${currentId - 1}`);
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des données du Pokémon");
        }
        const data = await response.json();
        setPrevPokemon(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemon();
  }, [id]);


  const handleNavigate = (direction: "left" | "right") => {
    const newId = direction === "left" ? Math.max(1, currentId - 1) : Math.min(151, currentId + 1);
    navigate(`/pokemon/${newId}`);
  };

  return (
    <div className="relative flex flex-row items-center justify-center">
      {/* Bouton gauche avec sprite */}
      {prevPokemon && prevPokemon.id >= 1 && (
      <button
        onClick={() => handleNavigate("left")}
        className="fixed rounded-xl left-10 bottom-3 transform -translate-y-1/2 bg-gray-100 px-4 py-3 shadow-lg focus:outline-none ring-0 hover:ring-2 hover:ring-red-600 flex flex-col items-center"
      >
            <img
              src={`/sprites/${prevPokemon.sprites.default}`}
              alt={prevPokemon.name.french}
              className="w-12 h-12 object-contain mb-2"
            />
            <p className="text-sm text-gray-800 mt-2">◀ {prevPokemon.name.french}</p>
      </button>
      )}

      {/* Bouton droit avec sprite */}
      {nextPokemon && nextPokemon.id <= 151 && (
      <button
        onClick={() => handleNavigate("right")}
        className="fixed rounded-xl right-10 bottom-3 transform -translate-y-1/2 bg-gray-100 px-4 py-3 shadow-lg focus:ouline-none ring-0 hover:ring-2 hover:ring-red-600 flex flex-col items-center"
      >
            <img
              src={`/sprites/${nextPokemon.sprites.default}`}
              alt={nextPokemon.name.french}
              className="w-12 h-12 object-contain mb-2"
            />
            <p className="text-sm text-gray-800 mt-2">{nextPokemon.name.french} ▶</p>
        </button>
      )}

    </div>
  );
};

export default Slider;