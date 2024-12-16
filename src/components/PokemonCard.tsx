import React, { useState, useEffect } from 'react';
import { getPokemonById } from '../utils/PokemonUtils';
import Pokemon from '../utils/PokemonType';

const PokemonCard: React.FC<{ id: number }> = ({ id }) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    useEffect(() => {
        const fetchedPokemon = getPokemonById(id);
        setPokemon(fetchedPokemon);
    }, [id]);

    if (!pokemon) {
        return <div>Pokemon not found</div>;
    }

    return (
        <a
            href=""
            className='flex flex-col items-center 
            hover:scale-110 duration-200'
        >
            <img
                src={"/sprites/" + pokemon.sprites.default}
                alt={pokemon.name.english}
                className="w-16 h-16 object-contain"
            />
            <p className="text-xl text-foreground mt-2">
                {pokemon.name.french ? pokemon.name.french : pokemon.name.english}
            </p>
        </a>
    );
};

export default PokemonCard; 