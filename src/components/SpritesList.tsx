import React from 'react';
import pokedex from '../pokedex.json';

const SpriteList: React.FC = () => {
  return (
    <div className="flex gap-4 justify-start overflow-x-auto p-4">
      {pokedex.slice(0, 151).map((pokemon) => (
        <div key={pokemon.id} className="flex flex-col items-center">
          <img
            src={`/sprites/${pokemon.sprites.default}`} 
            alt={pokemon.name.french}
            className="w-16 h-16 object-contain"
          />
          <a href="https://youtu.be/dQw4w9WgXcQ"><p className="text-sm text-gray-300 mt-2">{pokemon.name.french}</p> </a>
        </div>
      ))}
    </div>
  );
};

export default SpriteList;
