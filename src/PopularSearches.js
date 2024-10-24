import React, { useState, useEffect } from "react";
import { Card, ListGroup, Badge } from "react-bootstrap";

const PopularSearches = () => {
  const [popularTerms, setPopularTerms] = useState([]);
  const [counter, setCounter] = useState(25); // Start the countdown from 25

  const fetchPopularSearches = async () => {
    try {
      const response = await fetch(
        "https://dictionary-server-3.onrender.com/api/entries/popularSearches"
      );
      const data = await response.json();
      console.log("Fetched data:", data); // Log fetched data
      setPopularTerms(data.slice(0, 10)); // Ensure only the top 10 terms are displayed
    } catch (err) {
      console.error("Error fetching popular searches:", err);
    }
  };

  useEffect(() => {
    fetchPopularSearches();

    const intervalId = setInterval(() => {
      fetchPopularSearches();
      setCounter(25); // Reset the counter each time data is refreshed
    }, 25000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    console.log("Popular terms updated:", popularTerms); // Log updated terms
  }, [popularTerms]);

  return (
    <Card className="mt-5">
      <Card.Header>
        Popular Searches
        <Badge bg="secondary" className="float-end">
          Refreshing in: {counter} seconds
        </Badge>
      </Card.Header>
      <ListGroup variant="flush">
        {popularTerms.map((term, index) => (
          <ListGroup.Item key={index}>
            {index + 1}. {term.term}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default PopularSearches;
