import React from 'react'
import './App.css'


import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Signin from './pages/authentication/signin/Signin';
import Signup from './pages/authentication/signup/Signup';
import Forgetpassword from './pages/authentication/forgetpassword/Forgetpassword';


const App = () => {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgetpassword" element={<Forgetpassword />} />
    </Routes>
  </div>
  )
}

export default App