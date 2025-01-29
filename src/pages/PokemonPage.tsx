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
                    <h1 className='text-red-600'> Model not found </h1>
                )}
            </div>
            <div className="flex flex-1 justify-center self-center"><PokemonInformations pokemon={pokemon} /></div>
            

        </div>
    );
};

export default PokemonPage;

