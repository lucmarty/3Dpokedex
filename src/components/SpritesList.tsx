import React from 'react';
import pokedex from '../pokedex.json';

const SpriteList: React.FC = () => {
  return (
    <div id="conteneurPokemon" className="grid grid-cols-9 gap-4 justify-start overflow-x-auto p-4 bg-blue-300 rounded-xl">
      {pokedex.slice(0, 151).map((pokemon) => (
        <div key={pokemon.id} className="flex flex-col items-center w-full">
          <img
            src={`/sprites/${pokemon.sprites.default}`} 
            alt={pokemon.name.french}
            className="w-16 h-16 object-contain"
          />
          <a href={`/pokemon/${pokemon.name.english.toLowerCase()}`}><p className="text-sm text-gray-800 mt-2">{pokemon.name.french}</p> </a>
        </div>
      ))}
    </div>
  );
};

export default SpriteList;
