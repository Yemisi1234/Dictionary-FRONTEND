import React, { useState } from "react";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import PopularSearches from "./PopularSearches";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    console.log("Searching for:", term);
    setSearchTerm(term);
  };

  return (
    <>
      <Navbar bg="info" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">WAP Online Dictionary</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#popular">Popular Searches</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 className="text-center mb-4">Search for Definitions</h2>
            <SearchForm onSearch={handleSearch} />
            <SearchResults searchTerm={searchTerm} />
            <PopularSearches />
          </Col>
        </Row>
      </Container>

      <footer className="text-center mt-5 py-3 bg-dark text-light">
        <p className="mb-0">
          © 2024 WAP Online Dictionary. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default App;
