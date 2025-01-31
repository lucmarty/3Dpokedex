import React, {  useEffect, useState }  from 'react';
import { getPokemonFamily } from '../utils/PokemonUtils';
import Pokemon from '../utils/PokemonType';
import PokemonCard from './PokemonCard';
import height from "../assets//icons8-height-32.png";
import weight from "../assets/icons8-weight-kg-64.png";

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
                <h2 className="text-lg">
                    N° {pokemon.id} -{" "} {pokemon.name.french || "Nom inconnu"}
                </h2>
            </div>

            {/* Taille Poids */}
            <div className="flex w-full justify-around p-4">
                <div className="flex flex-row items-center">
                    <img
                        src={height} alt="height"
                        className="inline size-8"
                    />
                    {pokemon.info.height_m || 0} m
                </div>
                <div className="flex flex-row items-center">
                    <img
                        src={weight} alt="weight"
                        className="inline size-9"
                    />
                    {pokemon.info.weight_kg || 0} Kg
                </div>
            </div>
            
            {/* Description */}
            <div>
                <p className="max-w-72 p-4 pt-0">
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
                {evolutionFamily.length > 0 ? (
                    <div className="flex flex-col items-center">
                        <div className="flex flex-row gap-4">
                            {evolutionFamily.map((p: Pokemon) => (
                                <div key={p.id} className="flex flex-col items-center">                                    
                                    <PokemonCard pokemon={p} size={"48em"} />
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