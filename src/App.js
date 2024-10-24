import React, { useState } from "react";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import PopularSearches from "./PopularSearches";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    console.log("Searching for:", term);
    setSearchTerm(term);
  };

  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#" className="navbar-brand">
            Online Dictionary
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#popular" className="nav-link">
              Popular Searches
            </Nav.Link>
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
    </>
  );
}

export default App;
