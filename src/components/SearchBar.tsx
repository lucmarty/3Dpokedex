import React, { useState } from 'react';
import { getGamesName, getTypes } from '../utils/PokemonUtils';

interface SearchBarProps {
    onSearch: (searchText: string, selectedType: string, selectedType2: string, sortOption: string, selectGame: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [inputText, setInputText] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedType2, setSelectedType2] = useState("");
    const [sortOption, setSortOption] = useState("id");
    const [selectGame, setSelectedGame] = useState("");

    const types = getTypes();
    const games = getGamesName();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
        onSearch(lowerCase, selectedType, selectedType2, sortOption, selectGame);
    };

    const handleTypeChange = (e: React.ChangeEvent<{ value: unknown }>, typeIndex: number) => {
        const type = e.target.value as string;
        if (typeIndex === 1) {
            setSelectedType(type);
            onSearch(inputText, type, selectedType2, sortOption, selectGame);
        } else {
            setSelectedType2(type);
            onSearch(inputText, selectedType, type, sortOption, selectGame);
        }
    };

    const handleSortChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const value = e.target.value as string;
        setSortOption(value);
        onSearch(inputText, selectedType, selectedType2, value, selectGame);
    };

    const handmeGameChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const game = e.target.value as string;
        setSelectedGame(game);
        onSearch(inputText, selectedType, selectedType2, sortOption, game);
    }

    return (
        <div className="sticky top-16 z-10 my-12 scale-105 rounded-2xl border-2 border-gray-200 bg-gray-100 p-6 shadow-2xl">
            <div>
                <input
                    type="text"
                    placeholder="Chercher un pokemon"
                    value={inputText}
                    onChange={handleInputChange}
                    className="w-full rounded-full bg-white p-4 text-center text-black shadow-lg transition-transform duration-300 placeholder:text-gray-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
            </div>
            <div className="mt-4 flex gap-4">
                <select
                    value={selectedType}
                    onChange={(e) => handleTypeChange(e, 1)}
                    className="w-full rounded-lg bg-white p-2 text-black shadow-lg focus:ring-2 focus:ring-red-500"
                >
                    <option value="">Type 1</option>
                    {Object.entries(types).map(([key, value], index) => (
                        <option value={key} key={index}>
                            {value.french}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedType2}
                    onChange={(e) => handleTypeChange(e, 2)}
                    className="w-full rounded-lg bg-white p-2 text-black shadow-lg focus:ring-2 focus:ring-red-500"
                >
                    <option value="">Type 2</option>
                    {Object.entries(types).map(([key, value], index) => (
                        <option value={key} key={index}>
                            {value.french}
                        </option>
                    ))}
                </select>
                <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="w-full rounded-lg bg-white p-2 text-black shadow-lg focus:ring-2 focus:ring-red-500"
                >
                    <option value="id">Numéro</option>
                    <option value="HP">HP</option>
                    <option value="Attack">Attack</option>
                    <option value="Defense">Defense</option>
                    <option value="Sp. Attack">Sp. Attack</option>
                    <option value="Sp. Defense">Sp. Defense</option>
                    <option value="Speed">Speed</option>
                </select>


                <select
                    value={selectGame}
                    onChange={handmeGameChange}
                    className="w-full rounded-lg bg-white p-2 text-black shadow-lg focus:ring-2 focus:ring-red-500"
                >
                    <option value="">Game</option>
                    {games.map((game, index) =>
                        <option value={game} key={index}>{game}</option>
                    )}

                </select>
            </div>
        </div>
    );
};

export default SearchBar;