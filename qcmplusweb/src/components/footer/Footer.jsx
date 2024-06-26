import React from 'react'
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import l from "../../assets/logo/qcmplus_logo.png";

const Footer = () => {
    return (
        <div className="container-fluid pt-5 pb-5">
            <Container style={{ backgroundColor: "#f3f8fe" }}>
                <div className="row">
                    <div className="col-lg-6 col-md-12 d-flex justify-content-between">
                        <img src={l} alt="Phone" className="img-fluid" style={{ width: "30%" }} />
                    </div>
                    <div className="d-flex align-items-center justify-content-around col-lg-6 col-md-12">
                        <Nav.Link href="#about" className="mx-2">À propos</Nav.Link>
                        <Nav.Link href="#testimonial" className="mx-2">Témoignages</Nav.Link>
                        <Nav.Link href="#activity" className="mx-2">Activités</Nav.Link>
                    </div>
                    <div className='d-flex align-items-center justify-content-center'>
                        <p>© 2024 Tous droits réservés - QCMPlus</p>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Footer