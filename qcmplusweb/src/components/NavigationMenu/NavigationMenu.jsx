import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Container} from "react-bootstrap";
import ImgLogo from "../ImgLogo/ImgLogo";
import './NavigationMenu.css'
import {NavLink} from 'react-router-dom';

const NavigationMenu = () => {
    return (
        <Navbar className="justify-content-between navBarMenu container-fluid fixed-top m-0" style={{backgroundColor:"#f3f8fe"}}>
            <Container>
                <Navbar.Brand href="/">
                    <ImgLogo/>
                </Navbar.Brand>
                <Nav className="align-items-start">
                    <Nav.Link href="#about" className="mx-2">À propos</Nav.Link>
                    <Nav.Link href="#testimonial" className="mx-2">Témoignages</Nav.Link>
                    <Nav.Link href="#activity" className="mx-2">Activités</Nav.Link>
                </Nav>
                <Nav>
                    <NavLink to="/signin">
                        <button variant="light" className="btn-sing-in mx-3 px-5 py-2 bold">Se connecter</button>
                    </NavLink>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavigationMenu;
