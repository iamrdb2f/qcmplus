import React from 'react'
import './App.css'


import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Signin from './pages/authentication/Signin/Signin';
import Signup from './pages/authentication/signup/Signup';
import Forgetpassword from './pages/authentication/forgetpassword/Forgetpassword';
import Main from "./pages/Main/Main";
import ProtectedRoute from "./ProtectedRoute";
import {AuthProvider} from "./AuthContext";


const App = () => {
    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/main" element={<ProtectedRoute><Main /></ProtectedRoute>} />
                    <Route path="/signin" element={<Signin/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/forgetpassword" element={<Forgetpassword/>}/>
                </Routes>
            </AuthProvider>
        </div>
    )
}

export default App
