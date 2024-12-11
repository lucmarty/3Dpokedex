import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SearchBar from './SearchBar';
import '../SpriteList.css'; // Pour les styles d'animation

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
        console.log("pokemon data", data);
        setOriginalPokemon(data.slice(0, 151)); // Limiter aux 151 premiers Pokémon
        setFilteredPokemon(data.slice(0, 151));

        // Extraire les types uniques
        const types: string[] = Array.from(new Set(data.flatMap((pokemon: any) => pokemon.type)));
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
      <div className="relative px-44 pb-8 h-full">
        <SearchBar onSearch={handleSearch} pokemonTypes={pokemonTypes} />
        <div className="grid grid-cols-9 gap-4 justify-start overflow-x-auto p-4 rounded-xl shadow-lg bg-white">
          <TransitionGroup component={null}>
            {filteredPokemon.map((pokemon: any) => (
                <CSSTransition
                    key={pokemon.id}
                    timeout={300}
                    classNames="pokemon"
                >
                  <a
                      href={`/pokemon/${pokemon.id}`}
                      className="flex flex-col items-center w-full bg-white rounded-2xl  search hover:scale-110 transition-transform ease-in-out duration-100"
                  >
                    <img
                        src={`/sprites/${pokemon.sprites.default}`}
                        alt={pokemon.name.french}
                        className="w-16 h-16 object-contain"
                    />
                    <p className="text-sm text-gray-800 mt-2">{pokemon.name.french}</p>
                  </a>
                </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
  );
};

export default SpriteList;
