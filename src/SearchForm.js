import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

const SearchForm = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleSearch = () => {
    if (term.trim() === "") return;
    onSearch(term);
    setTerm("");
  };

  return (
    <InputGroup className="custom-search-bar mb-4">
      <FormControl
        placeholder="Search for a word..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="custom-search-input"
      />
      <Button
        variant="success"
        className="custom-search-button"
        onClick={handleSearch}
      >
        Lookup
      </Button>
    </InputGroup>
  );
};

export default SearchForm;
