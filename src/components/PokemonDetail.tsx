// src/components/PokemonDetail.tsx
import React, { useState, useEffect } from 'react';
import { getPokemonById } from '../utils/PokemonUtils';  
import Pokemon from '../utils/PokemonType';

const PokemonDetail: React.FC<{ id: number }> = ({ id }) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    useEffect(() => {
        // Utilisation de la fonction getPokemonById
        const fetchedPokemon = getPokemonById(id);
        setPokemon(fetchedPokemon);
    }, [id]);

    if (!pokemon) {
        return <div>Pokemon not found</div>;
    }

    return (
        <div>
            <h1>{pokemon.name.english}</h1>
            <p>Type: {pokemon.type.join(', ')}</p>
            <p>HP: {pokemon.base.HP}</p>
            {/* Affichez plus de détails ici */}
        </div>
    );
};

export default PokemonDetail;
