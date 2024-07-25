import React from 'react'
import './App.css'


import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Signin from './pages/authentication/Signin/Signin';
import Signup from './pages/authentication/Signup/Signup';
import ForgetPassword from './pages/authentication/ForgetPassword/ForgetPassword';
import Main from "./pages/Main/Main";


const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/main" element={<Main />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgetpassword" element={<ForgetPassword />} />
            </Routes>
        </div>
    )
}

export default App
