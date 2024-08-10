import React from 'react';
import { Container } from 'react-bootstrap'
import o from '../../assets/morepictures/officer.jpeg'
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className="container-fluid header-title header-container">
            <Container>
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <h1>Brillantes <br /> Décisions pour <br /> Votre apprentissage</h1>
                        <p className="lead">
                            Découvrez notre platforme, votre guide incontournable
                            pour optimiser vos méthodes d'étude et exceller académiquement. Basé sur l'education,
                            cette platforme offre des stratégies pour améliorer la motivation, la gestion du temps et les techniques d'apprentissage,
                            aidant étudiants et professionnels à maximiser leur potentiel.
                        </p>
                        <div className="header-text">
                            <Link to="/signin">
                                <button className="py-2 px-4 header-button">Commencer maintenant</button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 d-flex justify-content-center">
                        <img src={o} alt="Phone" className="img-fluid header-image" />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Header;