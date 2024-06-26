import React from 'react'
import p from '../../assets/morepictures/photo.png'
import { Container } from 'react-bootstrap';

const LeadMagnet = () => {
    return (
        <div className="container-fluid pt-5 pb-5" style={{ backgroundColor: "#EDF4FC" }}>
            <section id="activity">
                <Container>
                    <div className="row">
                        <div className="col-lg-6 col-md-12 d-flex justify-content-center">
                            <img src={p} alt="Phone" className="img-fluid" style={{ width: "50%" }} />
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <h2>Activités Enrichissantes</h2>
                            <p className="lead">
                                Participez à nos activités enrichissantes conçues pour renforcer vos compétences
                                et améliorer votre apprentissage. Ces exercices interactifs et pratiques vous
                                aideront à appliquer les stratégies et techniques abordées dans
                                "QCMPlus", vous permettant ainsi de
                                maximiser votre potentiel et d'atteindre vos objectifs académiques et professionnels
                                de manière ludique et engageante.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}

export default LeadMagnet