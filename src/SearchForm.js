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
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Enter a term..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="search-input"
      />
      <Button variant="success" onClick={handleSearch}>
        Lookup
      </Button>
    </InputGroup>
  );
};

export default SearchForm;
