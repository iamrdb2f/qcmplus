import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Button, Container} from "react-bootstrap";
import ImgLogo from "../ImgLogo/ImgLogo";
import './NavigationMenu.css'


const NavigationMenu = () => {
    return (
        <Navbar bg="light" expand="lg" className="justify-content-between navBarMenu">
            <Container>
                <Navbar.Brand href="#home">
                    <ImgLogo/>
                </Navbar.Brand>
                <Nav className="align-items-start">
                    <Nav.Link href="#about" className="mx-2">À propos</Nav.Link>
                    <Nav.Link href="#interns" className="mx-2">Stagiaires</Nav.Link>
                    <Nav.Link href="#qcm" className="mx-2">QCM</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link className={"nav-link-update"} href="#new">
                        <small className={"me-1 px-3 new-badge  rounded-pill"}>NEW</small>
                        <small className={" p-1"}>Passer Vos QCMs En Ligne Et En Toute Securité!</small>
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Button variant="light" className="btn-sing-in mx-3 fw-bold">Se connecter</Button>
                    <Button variant="light" className="btn-sing-out mx-1">Inscription</Button>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavigationMenu;

