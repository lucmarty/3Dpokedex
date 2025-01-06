import React from 'react';
import Pokemon from '../utils/PokemonType';

const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {

    return (
        <a
            href={`${import.meta.env.BASE_URL}#/` + pokemon.id}
            className='flex size-24 flex-col items-center duration-200
            hover:scale-110'
        >
            <img
                src={`${import.meta.env.BASE_URL}sprites/` + pokemon.sprites.default}
                alt={pokemon.name.english}
                className="size-16 object-contain"
            />
            <p className="mt-2 text-xl text-muted-foreground">
                {pokemon.name.french ? pokemon.name.french : pokemon.name.english}
            </p>
        </a>
    );
};

export default PokemonCard; 