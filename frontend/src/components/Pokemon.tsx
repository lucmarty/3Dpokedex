import React, { useMemo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pokemon3D from "./Pokemon3D";
import PokemonStats from "./PokemonStats";
import PokemonInformations from "./PokemonInformations";

const Pokemon: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [team, setTeam] = useState<number[]>(() => {
    const storedPokemon = sessionStorage.getItem("selectedPokemon");
    return storedPokemon ? JSON.parse(storedPokemon) : [];
  });
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [maxStats, setMaxStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [evolutionFamily, setEvolutionFamily] = useState<any[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:5002/api/pokemons/${id}`
        );
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
    const fetchEvolutionFamily = async () => {
      try {
        const response = await fetch(
          `http://localhost:5002/api/pokemons/${id}/evolution`
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de la famille d'évolution");
        }
        const data = await response.json();
        setEvolutionFamily(data.evolutionFamily);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvolutionFamily();
  }, [id]);

  useEffect(() => {
    const fetchMaxStats = async () => {
      try {
        const response = await fetch(
          `http://localhost:5002/api/pokemons/max-stats`
        );
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des statistiques maximales");
        }
        const data = await response.json();
        setMaxStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMaxStats();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("selectedPokemon", JSON.stringify(team));
  }, [team]);

  const pokemonName = selectedPokemon
    ? selectedPokemon.name.english
        .toLowerCase()
        .replace(/[\s.,']/g, "")
        .replace("♀", "F")
        .replace("♂", "M")
    : "";

  const modelPath = useMemo(() => {
    if (!selectedPokemon?.name?.english) {
      return "";
    }
    return `/models/${pokemonName}/${pokemonName}.glb?v=${new Date().getTime()}`;
  }, [selectedPokemon]);

  const audio = useMemo(() => {
    const audio = new Audio(`/models/${pokemonName}/${pokemonName}.mp3?v=${new Date().getTime()}`);
    audio.load();
    return audio;
  }, [pokemonName]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!selectedPokemon || !selectedPokemon.name || !selectedPokemon.base) {
    return <div>Pokémon introuvable ou données incomplètes</div>;
  }

  const stats = selectedPokemon.base;
  const type: string[] = selectedPokemon.type;

  return (
    <div className="h-[calc(100vh-68px)] w-full flex flex-col justify-center overflow-hidden">
      <div
        className="flex-1 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url("/backgrounds/${type[0]}.png")`,
        }}
      >
        <div className="relative flex items-center justify-center h-full w-full">
          <Pokemon3D modelPath={modelPath} />
          <div className="absolute left-0 top-10 pointer-events-none">
            <PokemonStats maxStats={maxStats} currentStats={stats} />
          </div>
          <PokemonInformations
            selectedPokemon={selectedPokemon}
            team={team}
            setTeam={setTeam}
            evolutionFamily={evolutionFamily}
          />
        </div>
      </div>
      <label
        onClick={() => {
          audio.play();
        }}
        className="group cursor-pointer absolute bottom-5 w-12 h-12 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full left-1/2 transform -translate-x-1/2 shadow-inner active:shadow-inner z-20 flex items-center justify-center"
      >
        <div className="w-5 group-active:w-8 fill-blue-100 drop-shadow">
          <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24">
            <path d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z"></path>
          </svg>
        </div>
      </label>
    </div>
  );
};

export default Pokemon;
