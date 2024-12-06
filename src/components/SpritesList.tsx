import React, { useState } from 'react';
import pokedex from '../pokedex.json';
import SearchBar from './SearchBar';

const SpriteList: React.FC = () => {
  const [filteredPokemon, setFilteredPokemon] = useState(pokedex.slice(0, 151));
  const pokemonTypes = Array.from(new Set(pokedex.flatMap((pokemon) => pokemon.type)));
  const handleSearch = (searchText: string, selectedType: string, selectedType2: string) => {
    const filtered = pokedex.slice(0, 151).filter((pokemon) => {
      const matchesText =
        pokemon.name.french.toLowerCase().includes(searchText) ||
        pokemon.name.english.toLowerCase().includes(searchText);
      const matchesFirstType = selectedType === "" || pokemon.type.includes(selectedType);
      const matchesSecondType = selectedType2 === "" || pokemon.type.includes(selectedType2);
      const matchesType = matchesFirstType && matchesSecondType;
      return matchesText && matchesType;
    });
    setFilteredPokemon(filtered);
  };
  return (
    <div>
      <SearchBar onSearch={handleSearch} pokemonTypes={pokemonTypes} />
      <div className="grid grid-cols-9 gap-4 justify-start overflow-x-auto p-4 bg-blue-300 rounded-xl">
        {filteredPokemon.map((pokemon) => (
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
