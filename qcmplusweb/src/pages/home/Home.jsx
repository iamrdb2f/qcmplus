import React from 'react'
import "./style.css";
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import QcmPlusContainer from "../../components/QcmPlusContainer/QcmPlusContainer";

const Home = () => {
    return (
        <div>
            <div className='container_header'>
                <Container fluid className="text-center">
                    <QcmPlusContainer />
                </Container>
            </div>
        </div>
    )
}

export default Home


