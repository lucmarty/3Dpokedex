import React, { useState } from 'react';
import TextField from "@mui/material/TextField";

interface SearchBarProps {
  onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputText, setInputText] = useState("");

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    onSearch(lowerCase);
  };

  return (
    <div className="main">
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          value={inputText}
          variant="outlined"
          fullWidth
          label="Chercher un pokemon"
        />
      </div>
    </div>
  );
};

export default SearchBar;
