import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import pokedex from '../pokedex.json';
import SearchBar from './SearchBar';
import '../SpriteList.css'; // Pour les styles d'animation

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
      <div className="px-44 pb-8 h-full overflow-scroll bg-gray-100">
        <SearchBar onSearch={handleSearch} pokemonTypes={pokemonTypes} />
        <div className="grid grid-cols-9 gap-4 justify-start overflow-x-auto p-4 rounded-xl shadow-lg bg-white">
          <TransitionGroup component={null}>
            {filteredPokemon.map((pokemon) => (
                <CSSTransition
                    key={pokemon.id}
                    timeout={300}
                    classNames="pokemon"
                >
                  <a
                      href={`/pokemon/${pokemon.name.english.toLowerCase()}`}
                      className="flex flex-col items-center w-full bg-gray-100 rounded-2xl drop-shadow-md search hover:scale-110 transition-transform ease-in-out duration-100"
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
