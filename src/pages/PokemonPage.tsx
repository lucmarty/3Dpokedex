import React from 'react';
import { useParams } from "react-router-dom";
import { getPokemonById, getPokemonGLTFPath } from '../utils/PokemonUtils';
import PokemonInformations from '../components/PokemonInformations';
import Pokemon3D from '../components/Pokemon3D';
import Statistiques from '../components/Statistiques';
import PokemonCard from '../components/PokemonCard';

const PokemonPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    if (!id) {
        return <div>Invalid Pokemon ID</div>;
    }

    const pokemon = getPokemonById(parseInt(id));
    if (!pokemon) {
        return <div>Pokemon not found</div>;
    }

    const pokemonSlider = [];
    for (let i = -1; i < 2; i++) {
        const nextPokemon = getPokemonById(parseInt(id) + i);
        if (nextPokemon) {
            pokemonSlider.push(nextPokemon);
        }
    }

    return (
        <div
            className="flex min-h-[calc(100vh-56px)] bg-cover bg-center"
            style={{
                backgroundImage: `url('${import.meta.env.BASE_URL}backgrounds/${pokemon.type[0]}.png')`,
            }}
        >
            <div className="flex flex-1 justify-center self-center"><Statistiques pokemon={pokemon.base} /></div>

            <div className="flex flex-1">
                {pokemon.glft ? (
                    <Pokemon3D modelPath={getPokemonGLTFPath(pokemon)} />
                ) : (
                    <h1 className='flex w-full justify-center self-center text-5xl font-bold text-red-600'> Model not found </h1>
                )}
            </div>
            <div className="flex flex-1 justify-center self-center"><PokemonInformations pokemon={pokemon} /></div>
            <div className="absolute bottom-1 left-1/2 size-fit -translate-x-1/2">
                <div className="flex gap-12 rounded-xl bg-background p-2 shadow-2xl">
                    {pokemonSlider?.map((pokemon) => (
                        <div key={pokemon.id} className='flex flex-col items-center'>
                            <PokemonCard pokemon={pokemon} size={"54em"} />
                        </div>

                    ))}
                </div>
            </div>

        </div>
    );
};

export default PokemonPage;

