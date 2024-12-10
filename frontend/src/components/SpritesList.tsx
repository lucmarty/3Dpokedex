import React, { useState } from 'react';
import pokedex from '../pokedex.json';
import SearchBar from './SearchBar';

const SpriteList: React.FC = () => {
  const [filteredPokemon, setFilteredPokemon] = useState(pokedex.slice(0, 151));
  const pokemonTypes = Array.from(new Set(pokedex.flatMap((pokemon) => pokemon.type)));
  const handleSearch = (searchText: string, selectedType: string, selectedType2: string, sortOption: string) => {
    const filtered = pokedex.slice(0, 151).filter((pokemon) => {
      const matchesText =
        pokemon.name.french.toLowerCase().includes(searchText) ||
        pokemon.name.english.toLowerCase().includes(searchText) ||
        "" + pokemon.id == searchText;
      const matchesFirstType = selectedType === "" || pokemon.type.includes(selectedType);
      const matchesSecondType = selectedType2 === "" || pokemon.type.includes(selectedType2);
      const matchesType = matchesFirstType && matchesSecondType;
      return matchesText && matchesType;
    });
    const sorted = filtered.sort((a, b) => {
      if (sortOption !== "id") {
        return b.base[sortOption as keyof typeof b.base] - a.base[sortOption as keyof typeof a.base];
      } else {
        return a.id - b.id;
      }
    });
    setFilteredPokemon(sorted);
  };
  return (
    <div className="pr-10 pl-10 pb-8 bg-gray-100">
      <SearchBar onSearch={handleSearch} pokemonTypes={pokemonTypes} />
      <div className="grid grid-cols-9 gap-4 justify-start overflow-x-auto p-4 rounded-xl shadow-lg bg-white">
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