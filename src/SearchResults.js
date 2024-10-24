import React, { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";

const SearchResults = ({ searchTerm }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchTerm) return;

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
        setResults(data.definitions);
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
      {results.length > 0 ? (
        <Card>
          <Card.Body>
            <Card.Title className="text-center">
              Definitions for: {searchTerm}
            </Card.Title>
            <ul className="definition-list">
              {results.map((definition, index) => (
                <li key={index}>{definition}</li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      ) : (
        <p>No definitions found for "{searchTerm}"</p>
      )}
    </div>
  );
};

export default SearchResults;
