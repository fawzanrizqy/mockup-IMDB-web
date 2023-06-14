import React, { useRef, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import imdbLogo from "../assets/img/IMDB_Logo_2016.svg.png";
import "../assets/css/nav.css";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import { Link, useLocation } from "react-router-dom";
import { CoverMenu } from "./CoverMenu";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../actions/creator";

// const baseUrl = "http://localhost:3000";
const baseUrl = "https://movies-ch1-api.ojan.dev";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatcher = useDispatch();
  let searchbar = useRef();
  const { pathname } = useLocation();

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatcher(
      fetchMovies(`${baseUrl}/movies?title=${searchbar.current.value}`)
    );
  };

  return (
    <Container>
      <Navbar
        className="navbar navbar-expand-lg mb-3"
        expand="lg"
        style={{ background: "#201f1f" }}
      >
        <Container className="d-flex align-items-center">
          <Nav.Item>
            <Nav.Link className="navbar-brand">
              <Link to="/">
                <Image src={imdbLogo} style={{ height: 30 }}></Image>
              </Link>
            </Nav.Link>
          </Nav.Item>

          {pathname !== "/" ? (
            ""
          ) : (
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                ref={searchbar}
              />
              <Button type="submit" variant="outline-light">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Form>
          )}
        </Container>
        <Container className="d-flex justify-content-center align-items-center">
          <Nav.Item className="ms-auto">
            <Button
              variant="dark"
              style={{ background: "#201f1f", border: 0 }}
              onClick={handleMenuClick}
            >
              <FontAwesomeIcon icon={faBars} />
              &nbsp; Menu
            </Button>
          </Nav.Item>
        </Container>
      </Navbar>
      {showMenu && <CoverMenu handleCloseMenu={handleCloseMenu} />}
    </Container>
  );
};

export default NavBar;
