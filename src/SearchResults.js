import React, { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";

const SearchResults = ({ searchTerm }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://dictionary-server-3.onrender.com/api/entries/${searchTerm}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const flattenedDefinitions = data.definitions.flatMap((entry) =>
          entry.definitions.map((def) => ({
            wordtype: def.wordtype,
            definition: def.definition,
          }))
        );
        setResults(flattenedDefinitions);
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm]);

  if (loading) return <Spinner animation="border" variant="success" />;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="mt-4">
      {searchTerm ? (
        results.length > 0 ? (
          <Card className="definition-card">
            <Card.Body>
              <Card.Title className="text-center">
                Definitions for: {searchTerm}
              </Card.Title>
              <ul className="definition-list">
                {results.map((def, index) => (
                  <li key={index}>
                    <strong>{def.wordtype}: </strong> {def.definition}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        ) : (
          <Card className="definition-card">
            <Card.Body>
              <Card.Title className="text-center text-warning">
                No definitions found for "{searchTerm}".
              </Card.Title>
              <p className="text-center">Try searching for a different term!</p>
            </Card.Body>
          </Card>
        )
      ) : (
        <Card className="definition-card">
          <Card.Body>
            <Card.Title className="text-center text-muted">
              Please enter a term to see its definitions.
            </Card.Title>
            <p className="text-center">
              Use the search bar above to get started!
            </p>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default SearchResults;
