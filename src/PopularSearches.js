import React, { useState, useEffect } from "react";
import { Card, ListGroup, Badge } from "react-bootstrap";

const PopularSearches = () => {
  const [popularTerms, setPopularTerms] = useState([]);
  const [counter, setCounter] = useState(25);

  const fetchPopularSearches = async () => {
    try {
      const response = await fetch(
        "https://dictionary-server-3.onrender.com/api/entries/popularSearches"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPopularTerms(data);
    } catch (err) {
      console.error("Error fetching popular searches:", err);
    }
  };

  useEffect(() => {
    fetchPopularSearches();
    const intervalId = setInterval(() => {
      fetchPopularSearches();
      setCounter(25);
    }, 25000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 25));
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <Card className="mt-5 card-style">
      <Card.Header>
        Popular Searches
        <Badge bg="secondary" className="float-end">
          Refreshing in: {counter} seconds
        </Badge>
      </Card.Header>
      <ListGroup variant="flush">
        {popularTerms.length > 0 ? (
          popularTerms.map((term, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              <span>
                {index + 1}. {term.term}
              </span>
              <Badge
                bg="secondary"
                className="ms-2"
                style={{ fontSize: "0.8rem" }}
              >
                {term.searchCount} times
              </Badge>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No popular searches available</ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
};

export default PopularSearches;
