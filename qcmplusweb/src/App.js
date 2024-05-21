import React from 'react'
import './App.css'


import {Route, Routes} from "react-router-dom";
import Home from './pages/home/Home';
import Signin from './pages/authentication/signin/Signin';
import Signup from './pages/authentication/signup/Signup';
import Forgetpassword from './pages/authentication/forgetpassword/Forgetpassword';
import Dashboard from './pages/dashboard/Dashboard';
import Students from "./pages/Students/Students";
import About from "./pages/About/About";
import NavigationMenu from "./pages/NavigationMenu/NavigationMenu";
import Qcm from "./pages/Qcm/Qcm";


const App = () => {
    return (
        <div className="App">
            <NavigationMenu />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/forgetpassword" element={<Forgetpassword/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/qcm" element={<Qcm/>}/>
                <Route path="/students" element={<Students/>}/>
                <Route path="/about" element={<About/>}/>
            </Routes>
        </div>
    )
}

export default App
