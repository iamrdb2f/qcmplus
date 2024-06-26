import React from 'react'
import h from '../../assets/morepictures/hand.png'
import g from '../../assets/morepictures/gg_profile.png'
import { Container } from 'react-bootstrap';

const Banner = () => {
    return (
        <div className="container-fluid pt-5">
            <section id="testimonial">
                <Container>
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <h2>Témoignages Inspirants</h2>
                            <p className="lead">
                                Découvrez les expériences de ceux qui ont transformé leur apprentissage grâce à nos conseils et
                                stratégies. Nos témoignages inspirants mettent en lumière les parcours de réussite de divers étudiants
                                et professionnels, illustrant comment "QCMPlus" a aidé à maximiser
                                leur potentiel et à atteindre leurs objectifs éducatifs et professionnels. Laissez-vous motiver par leurs
                                histoires et voyez comment vous aussi pouvez bénéficier de ces approches éprouvées.
                            </p>
                            <div className="d-flex align-items-center">
                                <img src={g} alt="Counter Icon" className="mr-5" style={{ width: "5%", marginRight: "10px" }} />
                                <span className="h4">plus 80,000 personnes nous suives</span>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 d-flex justify-content-center">
                            <img src={h} alt="Phone" className="img-fluid" style={{ width: "55%" }} />
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}

export default Banner