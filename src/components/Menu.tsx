import React from 'react';
const Menu: React.FC = () => {
    return (
        <div className="bg-white p-4 shadow-lg">
            <nav className="flex justify-around">
                <a href="/" className="text-red-500 hover:text-red-700 font-semibold"><span style={{ color: 'red' }}>3D</span><span style={{ color: 'black' }}>Pokedex</span></a>
                <a href="/equipe" className="text-gray-500 hover:text-gray-700 font-semibold">Organisateur d'équipe</a>
                <a href="/login" className="text-red-500 hover:text-red-700 font-semibold">Connexion</a>
            </nav>
        </div>
    );
};

export default Menu;