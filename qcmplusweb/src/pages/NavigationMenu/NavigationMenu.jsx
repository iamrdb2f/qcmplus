import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Button, Container} from "react-bootstrap";
import ImgLogo from "../ImgLogo/ImgLogo";
import './NavigationMenu.css'


import {Link, NavLink} from 'react-router-dom';

const NavigationMenu = () => {
    return (
        <Navbar bg="light" expand="lg" className="justify-content-between navBarMenu">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <ImgLogo/>
                </Navbar.Brand>
                <Nav className="align-items-start">
                    <Nav.Link as={NavLink} to="/about" className="mx-2">À propos</Nav.Link>
                    <Nav.Link as={NavLink} to="/students" className="mx-2">Stagiaires</Nav.Link>
                    <Nav.Link as={NavLink} to="/qcm" className="mx-2">QCM</Nav.Link>
                    <Nav.Link as={NavLink} to="/dashboard" className="mx-2">Dashboard</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={NavLink} className={"nav-link-update"} to="/new">
                        <small className={"me-1 px-3 new-badge  rounded-pill"}>NEW</small>
                        <small className={" p-1"}>Passer Vos QCMs En Ligne Et En Toute Securité!</small>
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Button as={NavLink} variant="light" className="btn-sing-in mx-3 fw-bold" to="/signin">Se connecter</Button>
                    <Button as={NavLink} variant="light" className="btn-sing-out mx-1" to="/signup">Inscription</Button>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavigationMenu;

