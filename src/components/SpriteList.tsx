import React from 'react';
import PokemonType from '../utils/PokemonType';
import PokemonCard from './PokemonCard';

const SpriteList: React.FC<{ pokemons: PokemonType[] }> = ({ pokemons }) => {

    return (
        <div className="grid grid-cols-9 items-center gap-4 overflow-x-auto rounded-xl bg-card p-4 shadow-lg">
            {pokemons.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
        </div>
    );
};

export default SpriteList; 