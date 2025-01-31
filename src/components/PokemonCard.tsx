import React from 'react';
import Pokemon from '../utils/PokemonType';

const PokemonCard: React.FC<{ pokemon: Pokemon, size: string }> = ({ pokemon, size }) => {
    return (
        <a
            href={`${import.meta.env.BASE_URL}#/` + pokemon.id}
            className="flex size-24 flex-col items-center justify-center duration-200 hover:scale-110"
        >
            {/* Conteneur relatif pour positionner l'ID */}
            <div className="relative">
                <img
                    src={`${import.meta.env.BASE_URL}sprites/` + pokemon.sprites?.default}
                    alt={pokemon.name.english}
                    height={size}
                    width={size}
                />
                {/* ID du Pokémon en haut à gauche */}
                <p className="absolute left-0 top-0 rounded px-1 text-xs font-bold text-muted-foreground">
                    #{pokemon.id}
                </p>
            </div>

            <p className="text-xl text-muted-foreground">
                {pokemon.name.french ? pokemon.name.french : pokemon.name.english}
            </p>
        </a>
    );
};

export default PokemonCard;
