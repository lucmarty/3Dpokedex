import React, { useMemo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pokemon3D from "./Pokemon3D";
import PokemonStats from "./PokemonStats";
import AddToTeamButton from "./AddToTeamButton";

const Pokemon: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [team, setTeam] = useState<string[]>(() => {
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
        const response = await fetch(`http://localhost:5002/api/pokemons/${id}`);
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
        const response = await fetch(`http://localhost:5002/api/pokemons/max-stats`);
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

  const modelPath = useMemo(() => {
    if (!selectedPokemon?.name?.english) {
      return ''; 
    }
    return `/models/${selectedPokemon.name.english.toLowerCase()}/${selectedPokemon.name.english.toLowerCase()}.glb`;
  }, [selectedPokemon]);

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
    <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1 }}>
        <Pokemon3D modelPath={modelPath} />
      </div>
      <div className="flex justify-around items-center mt-9">
        <div>
          <PokemonStats maxStats={maxStats}  currentStats={stats}/> 
        </div>
        <div>
          <img
            src={`/sprites/${selectedPokemon?.sprites?.default || 'default.png'}`}
            alt={selectedPokemon?.name?.french || 'Pokémon'}
          />
          <h2>{selectedPokemon?.name?.french || 'Nom inconnu'}</h2>
          <p>Numéro : {selectedPokemon.id}</p>
          <p>Type :</p>
          {type?.map((t, index) => (
            <img
              key={`${t}-${index}`}
              src={`/types/${t.toLowerCase()}.png`}
              alt={t}
              style={{ margin: "5px" }}
            />
          ))}
          <p>Talents :</p>
            {abilities?.map((a, index) => (
            <p key={`${a}-${index}`}>{index === 3 ? '(caché) ' : ''}{a}</p>
            ))}
          <div>
            <p>
              {info?.percent_male || 0} % de male / {info?.percent_female || 0} % de femelle
            </p>
            <p>Taille : {info?.height_m || 0} m</p>
            <p>Poids : {info?.weight_kg || 0} Kg</p>
            <p>Description : {info?.description || 'Aucune description'}</p>
            {info.is_sublegendary === 1 || info.is_legendary === 1 ? (
              <p>Ce pokémon est légendaire</p>
            ) : info.is_mythical === 1 ? (
              <p>Ce pokémon est mythique</p>
            ) : null}
          </div>
          <AddToTeamButton team={team} setTeam={setTeam} pokemon={selectedPokemon} />
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
