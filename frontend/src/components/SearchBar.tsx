import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (searchText: string, selectedType: string, selectedType2: string, sortOption: string) => void;
    pokemonTypes: string[];
  }

  const SearchBar: React.FC<SearchBarProps> = ({ onSearch, pokemonTypes }) => {
    const [inputText, setInputText] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedType2, setSelectedType2] = useState("");
    const [sortOption, setSortOption] = useState("id");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
      onSearch(lowerCase, selectedType, selectedType2, sortOption);
    };

    const handleTypeChange = (e: React.ChangeEvent<{ value: unknown }>, typeIndex: number) => {
        const type = e.target.value as string;
        if (typeIndex === 1) {
          setSelectedType(type);
          onSearch(inputText, type, selectedType2, sortOption);
        } else {
          setSelectedType2(type);
          onSearch(inputText, selectedType, type, sortOption);
        }
    };

    const handleSortChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const value = e.target.value as string;
        setSortOption(value);
        onSearch(inputText, selectedType, selectedType2, value);
    };
  return (
    <div className="pb-4">
      <div className="search">
        <input
          type="text"
          placeholder="Chercher un pokemon"
          value={inputText}
          onChange={handleInputChange}
          className="placeholder-white text-center w-full rounded-full p-4 bg-red-500 shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="filter mt-4 flex gap-4">
        <select
          value={selectedType}
          onChange={(e) => handleTypeChange(e, 1)}
          className="w-full rounded-lg p-2 bg-white shadow-lg text-black focus:ouline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">Tout</option>
          {pokemonTypes.map((type, index) => (
            <option value={type} key={index}>
              {type}
            </option>
          ))}
        </select>
        <select
          value={selectedType2}
          onChange={(e) => handleTypeChange(e, 2)}
          className="w-full rounded-lg p-2 bg-white shadow-lg text-black focus:ouline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">Tout</option>
          {pokemonTypes.map((type, index) => (
            <option value={type} key={index}>
              {type}
            </option>
          ))}
        </select>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="w-full rounded-lg p-2 bg-white shadow-lg text-black focus:ouline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="id">Numéro</option>
          <option value="HP">HP</option>
          <option value="Attack">Attack</option>
          <option value="Defense">Defense</option>
          <option value="Sp. Attack">Sp. Attack</option>
          <option value="Sp. Defense">Sp. Defense</option>
          <option value="Speed">Speed</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;