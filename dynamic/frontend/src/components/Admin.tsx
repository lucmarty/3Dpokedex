import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";
import Menu from "./Menu.tsx";
import React, { useState, useEffect, useMemo } from "react";
import ListPokemon from "./ListPokemon.tsx";
import PokemonDetail from "./PokemonDetail.tsx";


const Admin = () => {
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [pokemons, setPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await fetch('http://localhost:5002/api/pokemons');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des Pokémon.');
                }
                const data = await response.json();
                setPokemons(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    const types = useMemo(() => {
    return Array.from(
            new Set(
                pokemons.flatMap((pokemon: any) => 
                    pokemon.type.filter((type: string) => type !== "")
                )
            )
    );    }, [pokemons]);

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (!user || !user.isAdmin) {
        return <Navigate to="/" />;
    }

    if (error) {
        return <p className="text-red-500">Erreur : {error}</p>;
    }

    return (
        <>

            <Menu/>
            <div className="flex flex-col items-center overflow-hidden h-screen relative top-0 w-full z-5">
                <h1 className="fontBebasLavrai text-black bg-gray-100 rounded-lg shadow-lg px-8 py-2 mt-12">Admin
                    Page</h1>
                <div className="flex w-full">
                    <div className="flex flex-col w-1/2 p-4">
                        <ListPokemon pokemons={pokemons} onSelectPokemon={setSelectedPokemon}/>
                    </div>
                    <div className="flex flex-col h-full w-1/2 p-4">
                        {selectedPokemon ? (
                            <PokemonDetail pokemon={selectedPokemon} types={types}/>
                        ) : (
                            <p>Sélectionnez un Pokémon pour voir les détails</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;
