import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

const SpriteList: React.FC = () => {
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [originalPokemon, setOriginalPokemon] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/pokemons');
        const data = await response.json();
        //console.log("pokemon data", data);
        setOriginalPokemon(data.slice(0, 151)); // Limiter aux 151 premiers Pokémon
        setFilteredPokemon(data.slice(0, 151));

        // Extraire les types uniques
        const types = Array.from(new Set(data.flatMap((pokemon: any) => pokemon.type)));
        setPokemonTypes(types);
      } catch (error) {
        console.error('Erreur lors de la récupération des Pokémon depuis l’API :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const handleSearch = (
      searchText: string,
      selectedType: string,
      selectedType2: string,
      sortOption: string
  ) => {
    const filtered = originalPokemon.filter((pokemon: any) => {
      const matchesText =
          pokemon.name.french.toLowerCase().includes(searchText) ||
          pokemon.name.english.toLowerCase().includes(searchText) ||
          '' + pokemon.id === searchText;
      const matchesFirstType = selectedType === '' || pokemon.type.includes(selectedType);
      const matchesSecondType = selectedType2 === '' || pokemon.type.includes(selectedType2);
      const matchesType = matchesFirstType && matchesSecondType;
      return matchesText && matchesType;
    });
    const sorted = filtered.sort((a: any, b: any) => {
      if (sortOption !== 'id') {
        return b.base[sortOption as keyof typeof b.base] - a.base[sortOption as keyof typeof a.base];
      } else {
        return a.id - b.id;
      }
    });
    setFilteredPokemon(sorted);
  };

  if (loading) {
    return <p>Chargement des Pokémon...</p>;
  }

  return (
      <div>
        <SearchBar onSearch={handleSearch} pokemonTypes={pokemonTypes} />
        <div className="grid grid-cols-9 gap-4 justify-start overflow-x-auto p-4 bg-blue-300 rounded-xl">
          {filteredPokemon.map((pokemon: any) => (
              <a href={`/pokemon/${pokemon.name.english.toLowerCase()}`} key={pokemon.id}>
                <div className="flex flex-col items-center w-full search">
                  <img
                      src={`/sprites/${pokemon.sprites.default}`}
                      alt={pokemon.name.french}
                      className="w-16 h-16 object-contain"
                  />
                  <p className="text-sm text-gray-800 mt-2">{pokemon.name.french}</p>
                </div>
              </a>
          ))}
        </div>
      </div>
  );
};

export default SpriteList;
