import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PropTypes from "prop-types";

const Header = ({ title }) => {
    return (
        <Container className="d-flex flex-column justify-content-center" fluid="lg">
            <Row className="justify-content-center">
                <Col>
                    <h1>{title}</h1>
                    <p>C'est une nouvelle plate forme de gestion & d'évaluation des compétences</p>
                    <Button variant="primary" size="lg" href="https://www.ecole-pmn.fr/" target="_target" className="text-light">
                        La PMN
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};
Header.defaultProps = {
    title:'QCM Plus',
}


Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header