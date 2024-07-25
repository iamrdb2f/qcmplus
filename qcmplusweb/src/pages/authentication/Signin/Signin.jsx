import React, {useState} from 'react';
import '../style.css';
import {NavLink} from 'react-router-dom';

const images = {
    logo: require('../../../assets/logo/qcmplus_logo.png'),
    picture: require('../../../assets/pictures/picture1.png')
};

const LoginForm = ({onSubmit, onInputChange, formData, error}) => (
    <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your Email here" required
                   value={formData.email} onChange={onInputChange}/>
            {error.email && <div className="error-message text-danger-emphasis">{error.email}</div>}
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password here" required
                   value={formData.password} onChange={onInputChange}/>
            {error.password && <div className="error-message text-danger-emphasis">{error.password}</div>}
        </div>
        <button className="form-submit-btn" type="submit">Sign in</button>
    </form>
);

const Signin = () => {
    const [formData, setFormData] = useState({email: '', password: ''});
    const [error, setError] = useState({email: '', password: ''});

    const validateInputs = (formData) => {
        let errors = {email: '', password: ''};

        if (!formData.email) {
            errors.email = 'Please enter an email';
        }

        if (!formData.password) {
            errors.password = 'Please enter a password';
        }

        return errors;
    };

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSignin = async (e) => {
        e.preventDefault();
        let errors = validateInputs(formData);
        setError(errors);
    };

    return (
        <div className='container_signin'>
            <div className='content_signup'>
                <div className='content_left'>
                    <NavLink to="/">
                        <img src={images.logo} alt="" className='logo'/>
                        <img src={images.picture} alt="" className='picture1'/>
                    </NavLink>
                </div>
                <div className='content_right'>
                    <div className="form-container">
                        <div className="logo-container">
                            <h3>Login</h3>
                        </div>
                        <LoginForm onSubmit={handleSignin} onInputChange={handleInputChange} formData={formData}
                                   error={error}/>
                        <p className="signup-link">
                            <NavLink to="/forgetpassword" className="signup-link link">Forget password?</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;