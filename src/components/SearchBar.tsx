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
        <div className="sticky top-16 z-10 m-12 flex justify-center">
            <div className="w-fit rounded-2xl border-2 border-border bg-background p-6 shadow-xl">
                
                {/* Search bar */}
                <input
                    type="text"
                    placeholder="Chercher un pokemon"
                    value={inputText}
                    onChange={handleInputChange}
                    className="w-full rounded-full border-2 border-border bg-input p-4 text-center text-foreground shadow-lg transition-transform duration-300 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                
                {/* Filters */}
                <div className=" mx-24 mt-6 flex flex-wrap gap-5">
                    {/* Types */}
                    <select
                        value={selectedType}
                        onChange={(e) => handleTypeChange(e, 1)}
                        className="flex-1 rounded-lg border-2 border-border bg-input p-2 text-muted-foreground shadow-lg focus:ring-2 focus:ring-red-500"
                    >
                        <option value="">Type 1</option>
                        {Object.entries(types).map(([key, value], index) => (
                            <option className='text-foreground' value={key} key={index}>
                                {value.french}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedType2}
                        onChange={(e) => handleTypeChange(e, 2)}
                        className="flex-1 rounded-lg border-2 border-border bg-input p-2 text-muted-foreground shadow-lg focus:ring-2 focus:ring-red-500"
                    >
                        <option value="">Type 2</option>
                        {Object.entries(types).map(([key, value], index) => (
                            <option className='text-foreground' value={key} key={index}>
                                {value.french}
                            </option>
                        ))}
                    </select>
                    
                    {/* Sort */}
                    <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className="flex-1 rounded-lg border-2 border-border bg-input p-2 text-muted-foreground shadow-lg focus:ring-2 focus:ring-red-500"
                    >
                        <option className='text-foreground' value="id">Numéro</option>
                        <option className='text-foreground' value="HP">HP</option>
                        <option className='text-foreground' value="Attack">Attack</option>
                        <option className='text-foreground' value="Defense">Defense</option>
                        <option className='text-foreground' value="Sp. Attack">Sp. Attack</option>
                        <option className='text-foreground' value="Sp. Defense">Sp. Defense</option>
                        <option className='text-foreground' value="Speed">Speed</option>
                    </select>

                    {/* Games */}
                    <select
                        value={selectGame}
                        onChange={handmeGameChange}
                        className="flex-1 rounded-lg border-2 border-border bg-input p-2 text-muted-foreground shadow-lg focus:ring-2 focus:ring-red-500"
                    >
                        <option value="">Game</option>
                        {games.map((game, index) =>
                            <option className='text-foreground' value={game} key={index}>{game}</option>
                        )}

                    </select>
                </div>
            </div>

        </div>

    );
};

export default SearchBar;