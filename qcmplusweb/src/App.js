import './App.css';
import './variables.css';
import React from 'react';
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationMenu from "./components/NavigationMenu/NavigationMenu";
import QcmPlusContainer from "./components/QcmPlusContainer/QcmPlusContainer";


const App = () => {
    return (
        <div className="App">
            <Container fluid className="text-center">
                <NavigationMenu/>
                <QcmPlusContainer/>
            </Container>
        </div>
    );
};

export default App;