import React from 'react';
import { useUser } from './UserContext';
import "../App.css";

const Menu: React.FC = () => {
    const { user, setUser } = useUser();

    const handleLogout = () => {
        // Déconnexion de l'utilisateur
        setUser(null);
        localStorage.removeItem('token'); // Supprime le token du stockage local
    };

    return (
        <div className="bg-white p-4 shadow-3lg sticky top-0 z-10">
            <nav className="flex justify-around">
                <a href="/" className="text-red-500 hover:text-red-700 fontPokemon">
                    <span style={{ color: 'red' }}>3D</span>
                    <span style={{ color: 'black' }}>Pokedex</span>
                </a>
                <a href="/team" className="text-gray-500 hover:text-gray-700 font-semibold">
                    Organisateur d'équipe
                </a>
                {user ? (
                    <button
                        onClick={handleLogout}
                        className="text-red-500 hover:text-red-700 font-semibold"
                    >
                        Déconnexion
                    </button>
                ) : (
                    <a href="/login" className="text-red-500 hover:text-red-700 font-semibold">
                        Connexion
                    </a>
                )}
                {user && user.isAdmin && (
                    <a href="/admin" className="text-red-500 hover:text-red-700 font-semibold">
                        Admin
                    </a>
                )}
            </nav>
        </div>
    );
};

export default Menu;
