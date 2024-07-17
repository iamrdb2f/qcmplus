import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import Forgetpassword from './pages/Forgetpassword/Forgetpassword';
import {AuthProvider} from './AuthContext';

const App = () => {
    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgetpassword" element={<Forgetpassword />} />
                    <Route path="/main" element=<Main />/>
                </Routes>
            </AuthProvider>
        </div>
    );
};

export default App;
