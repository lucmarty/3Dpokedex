import React, {useEffect, useState} from 'react';
//import pokedex from '../pokedex.json';

const SpriteList: React.FC = () => {
  const [pokemons, setPokemons] = useState([]); // État pour stocker les Pokémon
  const [loading, setLoading] = useState(true); // État pour gérer le chargement

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const rep = await fetch('http://localhost:5001/');
        const data = await rep.json();
        console.log('Données récupérées (test connexion) :', data.message);
        } catch (error) {
        console.error('Erreur lors du test de la connexion :', error);


      }
      try {
        const response = await fetch('http://localhost:5001/api/pokemons'); // URL de ton API
        const data = await response.json();
        console.log('Données récupérées:', data);
        setPokemons(data.slice(0, 151)); // On limite aux 151 premiers Pokémon
      } catch (error) {
        console.error('Erreur lors de la récupération des Pokémon :', error);
      } finally {
        setLoading(false); // Désactiver l'indicateur de chargement
      }
    };

    fetchPokemons().then(() => console.log('Pokemons fetched'));
  }, []); // [] signifie que cette fonction est exécutée une seule fois, au montage du composant

  if (loading) {
    return <p>Chargement des Pokémon...</p>;
  }
  return (
    <div id="conteneurPokemon" className="grid grid-cols-9 gap-4 justify-start overflow-x-auto p-4 bg-blue-300 rounded-xl">
      {pokemons.slice(0, 151).map((pokemon) => (
        <a href={`/pokemon/${pokemon.name.english.toLowerCase()}`}>
        <div key={pokemon.id} className="flex flex-col items-center w-full">
          <img
            src={`/sprites/${pokemon.sprites.default}`}
            alt={pokemon.name.french}
            className="w-16 h-16 object-contain"
          />
          <p className="text-sm text-gray-800 mt-2">{pokemon.name.french}</p>
        </div></a>
      ))}
    </div>
  );
};

export default SpriteList;
