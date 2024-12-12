import React, { useState, useEffect } from "react";

interface PokemonDetailProps {
    pokemon: {
        id: number;
        name: {
            english: string;
            french: string;
        };
        type: string[];
        base: {
            HP: number;
            Attack: number;
            Defense: number;
            "Sp. Attack": number;
            "Sp. Defense": number;
            Speed: number;
        };
        sprites: {
            default: string;
        };
    };
    types: string[];
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon, types }) => {
    const [formData, setFormData] = useState({
        nameEnglish: pokemon.name.english,
        nameFrench: pokemon.name.french,
        hp: pokemon.base.HP,
        attack: pokemon.base.Attack,
        defense: pokemon.base.Defense,
        spAttack: pokemon.base["Sp. Attack"],
        spDefense: pokemon.base["Sp. Defense"],
        speed: pokemon.base.Speed,
        type1: pokemon.type[0],
        type2: pokemon.type[1] || "",  
    });

    const initializeFormData = () => ({
        nameEnglish: pokemon.name.english,
        nameFrench: pokemon.name.french,
        hp: pokemon.base.HP,
        attack: pokemon.base.Attack,
        defense: pokemon.base.Defense,
        spAttack: pokemon.base["Sp. Attack"],
        spDefense: pokemon.base["Sp. Defense"],
        speed: pokemon.base.Speed,
        type1: pokemon.type[0],
        type2: pokemon.type[1] || "",  
    });

    useEffect(() => {
        setFormData(initializeFormData());
    }, [pokemon]); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAnnuler = () => {
        setFormData(initializeFormData());
    };

    const handleValider = async () => {
        try {
            const response = await fetch(`http://localhost:5002/api/pokemons/${pokemon.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), 
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour');
            }

            const updatedPokemon = await response.json();
            console.log('Pokémon mis à jour:', updatedPokemon);
            alert(`${pokemon.name.french} a été modifié !`);
            window.location.reload();
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
        }
    };

    return (
        <>
            <h1 className="text-2xl font-semibold mb-4">Détails de {pokemon.name.french}</h1>
            <div className="bg-black text-white p-4 rounded shadow-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">{pokemon.name.french} ({pokemon.name.english})</h2>
                <div className="flex flex-col items-center">
                    <img
                        src={`/sprites/${pokemon.sprites?.default || "placeholder.png"}`}
                        alt={pokemon.name.french}
                        className="w-32 h-32 object-contain mb-4"
                    />
                    <div className="flex w-full flex-col items-start justify-start">
                        <p className="mb-2"><strong>ID:</strong> {pokemon.id}</p>
                        <div className="mb-2">
                            <label htmlFor="nameEnglish" className="block">Nom (Anglais):</label>
                            <p className="text-xs text-red-600">Attention changer ce nom change aussi la route pour les modèles 3D, ça peut tout casser</p>
                            <input
                                type="text"
                                id="nameEnglish"
                                name="nameEnglish"
                                value={formData.nameEnglish}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="nameFrench" className="block">Nom (Français):</label>
                            <input
                                type="text"
                                id="nameFrench"
                                name="nameFrench"
                                value={formData.nameFrench}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
                            />
                        </div>
                        <div className="mb-2">
                            <strong>Type 1:</strong>
                            <select
                                id="type1"
                                name="type1"
                                value={formData.type1}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
                            >
                                {types.map((type) => (
                                    <option key={type} value={type}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-2">
                            <strong>Type 2:</strong>
                            <select
                                id="type2"
                                name="type2"
                                value={formData.type2}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
                            >
                                <option value="">Aucun</option>
                                {types.map((type) => (
                                    <option key={type} value={type}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Statistiques</h3>
                    <ul className="grid grid-cols-2 gap-2">
                        <li>
                            <label htmlFor="hp" className="block"><strong>HP:</strong></label>
                            <input
                                type="number"
                                id="hp"
                                name="hp"
                                value={formData.hp}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
                            />
                        </li>
                        <li>
                            <label htmlFor="attack" className="block"><strong>Attack:</strong></label>
                            <input
                                type="number"
                                id="attack"
                                name="attack"
                                value={formData.attack}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
                            />
                        </li>
                        <li>
                            <label htmlFor="defense" className="block"><strong>Defense:</strong></label>
                            <input
                                type="number"
                                id="defense"
                                name="defense"
                                value={formData.defense}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
                            />
                        </li>
                        <li>
                            <label htmlFor="spAttack" className="block"><strong>Sp. Attack:</strong></label>
                            <input
                                type="number"
                                id="spAttack"
                                name="spAttack"
                                value={formData.spAttack}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
                            />
                        </li>
                        <li>
                            <label htmlFor="spDefense" className="block"><strong>Sp. Defense:</strong></label>
                            <input
                                type="number"
                                id="spDefense"
                                name="spDefense"
                                value={formData.spDefense}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
                            />
                        </li>
                        <li>
                            <label htmlFor="speed" className="block"><strong>Speed:</strong></label>
                            <input
                                type="number"
                                id="speed"
                                name="speed"
                                value={formData.speed}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
                            />
                        </li>
                    </ul>
                </div>
                <div className="mt-4 flex justify-end gap-4">
                    <button
                        onClick={handleValider}
                        className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded"
                    >
                        Valider
                    </button>
                    <button
                        onClick={handleAnnuler}
                        className="bg-gray-600 hover:bg-gray-800 text-white py-2 px-4 rounded"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </>
    );
};

export default PokemonDetail;
