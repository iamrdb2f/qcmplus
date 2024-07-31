import React from 'react'
import {Card, Col, Container, Row} from 'react-bootstrap';
import r from '../../assets/profil/roland.jpeg'
import t from '../../assets/profil/teklit.jpeg'
import o from '../../assets/profil/outhmane.jpeg'
import b from '../../assets/profil/benjamin.jpeg'

const Apropos = () => {
  return (
    <div className="pt-5 pb-5">
       <section id="about">
      <Container>
        <Row>
          <Col>
            <h2>A propos de la team</h2>
          </Col>
        </Row>
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Col>
            <p className="lead">
              Nous sommes des Lead Développeurs Java au sein de l'École PMN et avons l'honneur de vous présenter notre équipe.
              Notre équipe est composée de professionnels passionnés et expérimentés, dédiés à l'excellence et à l'innovation 
              dans le domaine du développement web et logiciel. Voici un aperçu de nos profils ci-dessous.
            </p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={3}>
            <Card>
              <Card.Img variant="top" src={r} />
              <Card.Body>
                <Card.Title>
                  <span style={{ color: "#2DB7FF" }}>GUISSONY </span>
                  Roland Ulrich
                </Card.Title>
                <Card.Text className="lead">
                  Développeur Java pour la création en utilisant les meilleures pratiques de développement. Mon approche inclut une analyse approfondie des besoins, une conception agile et une assistance continue pour garantir des performances optimales.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Img variant="top" src={t} />
              <Card.Body>
                <Card.Title>
                  <span style={{ color: "#2DB7FF" }}>TOWOLDE </span>
                  Teklit
                </Card.Title>
                <Card.Text className="lead">
               Développeur Java pour la création en utilisant les meilleures pratiques de développement. Mon approche inclut une analyse approfondie des besoins, une conception agile et une assistance continue pour garantir des performances optimales.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Img variant="top" src={o} />
              <Card.Body>
                <Card.Title>
                  <span style={{ color: "#2DB7FF" }}>DAHMOUNE </span>
                  Outhmane
                </Card.Title>
                <Card.Text className="lead">
                  Développeur Java pour la création en utilisant les meilleures pratiques de développement. Mon approche inclut une analyse approfondie des besoins, une conception agile et une assistance continue pour garantir des performances optimales.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Img variant="top" src={b} />
              <Card.Body>
                <Card.Title>
                  <span style={{ color: "#2DB7FF" }}>EKIA MOUANGA </span>
                  Benjamin
                </Card.Title>
                <Card.Text className="lead">
                  Lead Dévloppeur Fullstack. <br />
                  Animé par une passion pour le développement web et la création
                  d'applications mobiles, j'ai démontré une capacité remarquable à m'organiser
                  et à m'adapter dans mes projets.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </section>
    </div>
  )
}

export default Apropos