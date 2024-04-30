import React from 'react'
import './App.css'


import { Route, Routes } from "react-router-dom";
import home from "./pages/home/Home";
import signin from './pages/authentication/signin/Signin';
import signup from './pages/authentication/signup/Signup';
import forgetpassword from './pages/authentication/forgetpassword/Forgetpassword';


const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<home />} />
                <Route path="/signin" element={<signin />} />
                <Route path="/signup" element={<signup />} />
                <Route path="/forgetpassword" element={<forgetpassword />} />
            </Routes>
        </div>
    )
}

export default App
