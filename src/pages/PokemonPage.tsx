import React from 'react';
import { useParams } from "react-router-dom";
import { getPokemonById, getPokemonGLTFPath } from '../utils/PokemonUtils';
import PokemonInformations from '../components/PokemonInformations';
import Pokemon3D from '../components/Pokemon3D';
import Statistiques from '../components/Statistiques';

const PokemonPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    if (!id) {
        return <div>Invalid Pokemon ID</div>;
    }

    const pokemon = getPokemonById(parseInt(id));
    if (!pokemon) {
        return <div>Pokemon not found</div>;
    }

    return (
        <div
            className="min-h-[calc(100vh-56px)] bg-cover bg-center"
            style={{
                backgroundImage: `url('${import.meta.env.BASE_URL}backgrounds/${pokemon.type[0]}.png')`,
            }}
        >
            <div className='size-96'>
                {pokemon.glft ? (
                    <Pokemon3D modelPath={getPokemonGLTFPath(pokemon)} />
                ) : (
                    <h1 className='text-red-600'> Model not found </h1>
                )}
            </div>
            <Statistiques pokemon={pokemon.base} />
            <PokemonInformations pokemon={pokemon} />

        </div>
    );
};

export default PokemonPage;

