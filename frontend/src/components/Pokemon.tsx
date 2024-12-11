import React, { useMemo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pokemon3D from "./Pokemon3D";
import PokemonStats from "./PokemonStats";
import AddToTeamButton from "./AddToTeamButton";

const Pokemon: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [team, setTeam] = useState<number[]>(() => {
    const storedPokemon = sessionStorage.getItem("selectedPokemon");
    return storedPokemon ? JSON.parse(storedPokemon) : [];
  });
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [maxStats, setMaxStats] = useState<any>(null); // State pour les max stats
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  // Récupérer les maxStats
  useEffect(() => {
    const fetchMaxStats = async () => {
      try {
        const response = await fetch(
          `http://localhost:5002/api/pokemons/max-stats`
        );
        if (!response.ok) {
          throw new Error(
            "Erreur lors du chargement des statistiques maximales"
          );
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
    return `/models/${pokemonName}/${pokemonName}.glb`;
  }, [selectedPokemon]);

  const audio = useMemo(() => {
    const audio = new Audio(`/models/${pokemonName}/${pokemonName}.mp3`);
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
  const abilities: string[] = selectedPokemon.abilities;
  const info = selectedPokemon.info;

  return (
    <div className="h-[calc(100vh-56px)] w-full flex flex-col justify-center overflow-hidden">
      <div
        className="flex-1 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url("/backgrounds/${type[0]}.png")`,
        }}
      >
        <div className="absolute flex items-center justify-center h-full w-full">
          <Pokemon3D modelPath={modelPath} />
          <div className=" absolute left-10 top-16 pointer-events-none ">

            <PokemonStats maxStats={maxStats} currentStats={stats} />
          </div>
          <div className="max-w-[20vw] text-xl bg-gray-100/80 text-black rounded-xl p-4 shadow-2xl absolute right-10 top-16 pointer-events-none">

            <div className="flex flex-row w-full"><h2 className="fontBebasLavrai text-6xl mb-3">{selectedPokemon?.name?.french || "Nom inconnu"}</h2>
              <img
                    className="w-16 h-16"
                  src={`/sprites/${
                      selectedPokemon?.sprites?.default || "default.png"
                  }`}
                  alt={selectedPokemon?.name?.french || "Pokémon"}
              />
            </div>

            <p className="mb-2"><span className="underline">Numéro : </span> {selectedPokemon.id}</p>
            <p className="mb-2"><span className="underline">Type : </span></p>
            {type?.map((t, index) => (
              <img
                key={`${t}-${index}`}
                src={`/types/${t.toLowerCase()}.png`}
                alt={t}
                className="m-1 mb-2"
              />
            ))}
            <p><span className="underline">Talents : </span></p>

            {abilities?.map((a, index) => (
              <p key={`${a}-${index}`}>
                {index === 3 ? "(caché) " : ""}
                {a}
              </p>
            ))}
            <div>
              <p>
                <span className="underline">Sexe : </span>
                {info?.percent_male || 0} % de male /{" "}
                {info?.percent_female || 0} % de femelle
              </p>
              <p><span className="underline">Taille : </span>{info?.height_m || 0} m</p>
              <p><span className="underline">Poids : </span> {info?.weight_kg || 0} Kg</p>
              <p><span className="underline">Description : </span>{info?.description || "Aucune description"}</p>
              {info.is_sublegendary === 1 || info.is_legendary === 1 ? (
                <p className="text-yellow-500-">Ce pokémon est légendaire</p>
              ) : info.is_mythical === 1 ? (
                <p className="text-red-600">Ce pokémon est mythique</p>
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

      <label
        onClick={() => {
          audio.play();
        }}
        className="group cursor-pointer absolute bottom-5 w-12 h-12 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full left-1/2 transform -translate-x-1/2 shadow-inner active:shadow-inner z-20 flex items-center justify-center"
      >
        <div className="w-5 group-active:w-8 fill-blue-100 drop-shadow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Filled"
            viewBox="0 0 24 24"
          >
            <path d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z"></path>
          </svg>
        </div>
      </label>
    </div>
  );
};

export default Pokemon;
