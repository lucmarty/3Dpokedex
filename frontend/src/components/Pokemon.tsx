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

  const audio = useMemo(() => {
    const audio = new Audio(`/models/${pokemon}/${pokemon}.mp3`);
    audio.load();
    return audio;
  }, [pokemon]);
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
    <div
      style={{
        height: "calc(100vh - 56px)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          backgroundImage: `url("/backgrounds/${selectedPokemon.type[0]}.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Canvas
          camera={{ position: [0, 0.5, 2], fov: 50 }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <directionalLight position={[-5, 5, 5]} intensity={2} />
            <directionalLight position={[5, -5, 5]} intensity={2} />
            <directionalLight position={[5, 5, -5]} intensity={2} />
            <PokemonModel modelPath={modelPath} />
            <OrbitControls
              enableDamping
              dampingFactor={0.25}
              minDistance={2}
              maxDistance={6}
              enablePan={false}
              autoRotate
            />
          </Suspense>
        </Canvas>
      </div>
      <div className="absolute flex items-center" style={{ width: "100%" }}>
        <div className="absolute left-10">
          <PokemonStats maxStats={maxStats}  currentStats={stats}/> 
        </div>
        <div className="absolute right-10">
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
      <label
        onClick={() => {
          audio.play();
        }}
        className="group cursor-pointer absolute bottom-5 w-[48px] h-[48px] bg-gradient-to-b from-blue-600 to-blue-400 rounded-full left-1/2 -translate-x-1/2 shadow-[inset_0px_4px_2px_#60a5fa,inset_0px_-4px_0px_#1e3a8a,0px_0px_2px_rgba(0,0,0,10)] active:shadow-[inset_0px_4px_2px_rgba(96,165,250,0.5),inset_0px_-4px_2px_rgba(37,99,235,0.5),0px_0px_2px_rgba(0,0,0,10)] z-20 flex items-center justify-center"
      >
        <div className="w-5 group-active:w-[31px] fill-blue-100 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.5)]">
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
