import React from 'react';
const Menu: React.FC = () => {
    return (
        <div className="bg-white p-4 shadow-lg">
            <nav className="flex justify-around">
                <a href="/" className="text-blue-500 hover:text-blue-700 font-semibold"><span style={{ color: 'red' }}>3D</span><span style={{ color: 'black' }}>Pokedex</span></a>
                <a href="/equipe" className="text-blue-500 hover:text-blue-700 font-semibold">Compositeur d'équipe</a>
                <a href="/login" className="text-blue-500 hover:text-blue-700 font-semibold">Connexion</a>
            </nav>
        </div>
    );
};

export default Menu;