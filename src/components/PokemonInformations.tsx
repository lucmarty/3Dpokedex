import React, { useEffect, useState } from 'react';
import { getPokemonFamily } from '../utils/PokemonUtils';
import Pokemon from '../utils/PokemonType';
import PokemonCard from './PokemonCard';
import { HeightIcon } from './icons/HeightIcon';
import { WeightIcon } from './icons/WeightIcon';

const PokemonInformations: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
    const [evolutionFamily, setEvolutionFamily] = useState<Pokemon[]>([]);

    useEffect(() => {
        setEvolutionFamily(getPokemonFamily(pokemon) || []);
    }, [pokemon]);

    return (
        <div className="size-fit rounded-xl bg-background p-4 shadow-2xl">
            {/* Types */}
            <div className="flex w-full justify-between">
                {pokemon.type.map((t: string, index: number) => (
                    <img
                        key={`${t}-${index}`}
                        src={`${import.meta.env.BASE_URL}types/${t.toLowerCase()}.png`}
                        alt={t}
                        className="m-1 mb-2"
                    />))}
            </div>

            {/* Sprites Nom Numéro */}
            <div className="flex flex-col items-center p-4">
                <img
                    className="flex size-16 align-middle"
                    src={`${import.meta.env.BASE_URL}sprites/${pokemon.sprites.default || "default.png"}`}
                    alt={pokemon.name?.french || "Pokémon"}
                />
                <h2 className="text-lg text-foreground">
                    N° {pokemon.id} -{" "} {pokemon.name.french || "Nom inconnu"}
                </h2>
            </div>

            {/* Taille Poids */}
            <div className="flex w-full justify-around p-4">
                <div className="flex flex-row items-center text-foreground">
                    <HeightIcon size={24} className="mx-2 text-foreground" />
                    {pokemon.info.height_m || 0} m
                </div>
                <div className="flex flex-row items-center text-foreground">
                    <WeightIcon size={24} className="mx-2 text-foreground" />
                    {pokemon.info.weight_kg || 0} Kg
                </div>
            </div>

            {/* Description */}
            <div className='flex flex-col items-center'>
                <p className="max-w-72 p-1 pt-0 text-foreground">
                    {pokemon.info.description || "Aucune description"}
                </p>
                {pokemon.info.is_sublegendary === 1 || pokemon.info.is_legendary === 1 ? (
                    <p className="text-center text-yellow-500">Ce Pokémon est légendaire</p>
                ) : pokemon.info.is_mythical === 1 ? (
                    <p className="text-center text-red-600">Ce Pokémon est mythique</p>
                ) : null}
            </div>

            {/* Famille d'évolution */}
            <div>
                {evolutionFamily.length > 1 ? (
                    <div className="flex flex-col">
                        <div className="flex max-w-80 flex-row flex-wrap justify-center gap-4">
                            {evolutionFamily.map((p: Pokemon) => (
                                <div key={p.id} className="flex flex-col items-center">
                                    <PokemonCard pokemon={p} size="sm" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default PokemonInformations; 