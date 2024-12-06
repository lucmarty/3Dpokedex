import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

interface SearchBarProps {
    onSearch: (searchText: string, selectedType: string, selectedType2: string) => void;
    pokemonTypes: string[];
  }
  
  const SearchBar: React.FC<SearchBarProps> = ({ onSearch, pokemonTypes }) => {
    const [inputText, setInputText] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedType2, setSelectedType2] = useState("");
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
      onSearch(lowerCase, selectedType, selectedType2);
    };
  
    const handleTypeChange = (e: React.ChangeEvent<{ value: unknown }>, typeIndex: number) => {
        const type = e.target.value as string;
        if (typeIndex === 1) {
          setSelectedType(type);
          onSearch(inputText, type, selectedType2);
        } else {
          setSelectedType2(type);
          onSearch(inputText, selectedType, type);
        }
    };
    
  

  return (
    <div className="main">
      <div className="search bg-white">
        <TextField
          id="outlined-basic"
          onChange={handleInputChange}
          value={inputText}
          variant="outlined"
          fullWidth
          label="Chercher un pokemon"
        />
      </div>
      <div className="filter mt-4 flex gap-4 bg-white">
        <TextField
          id="type-select-1"
          select
          value={selectedType}
          onChange={(e) => handleTypeChange(e, 1)}
          label="Type 1"
          variant="outlined"
          fullWidth
        >
          <MenuItem value="">All Types</MenuItem>
          {pokemonTypes.map((type, index) => (
            <MenuItem value={type} key={index}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="type-select-2"
          select
          value={selectedType2}
          onChange={(e) => handleTypeChange(e, 2)}
          label="Type 2"
          variant="outlined"
          fullWidth
        >
          <MenuItem value="">All Types</MenuItem>
          {pokemonTypes.map((type, index) => (
            <MenuItem value={type} key={index}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      </div>
      
    </div>
  );
};

export default SearchBar;
