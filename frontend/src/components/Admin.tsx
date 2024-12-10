import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";
import Menu from "./Menu.tsx";
import { useState, useEffect } from "react";
import ListPokemon from "./ListPokemon.tsx";
import PokemonDetail from "./PokemonDetail.tsx";

const Admin = () => {
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    useEffect(() => {
        if (user !== null) {
            setIsLoading(false);
        }
    }, [user]);

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (!user || !user.isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Menu />
            <div className="flex flex-col items-center justify-center">
                <h1>Admin Page</h1>
                <div className="flex w-full">
                    <div className="flex flex-col w-1/2 p-4">
                        <ListPokemon onSelectPokemon={setSelectedPokemon} />
                    </div>
                    <div className="flex flex-col w-1/2 p-4">
                        {selectedPokemon ? (
                            <PokemonDetail pokemon={selectedPokemon} />
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
