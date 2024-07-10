import React, {useState} from 'react';
import './style.css';
import {NavLink, useNavigate} from 'react-router-dom';
import {useAuth} from '../../AuthContext';
import {loginAPICall, saveLoggedInUser, storeToken} from '../../services/AuthService';
import {LOGIN_MESSAGES} from '../../utils/LoginMessages';

const images = {
    logo: require('../../assets/logo/qcmplus_logo.png'),
    picture: require('../../assets/pictures/picture1.png')
};

const LoginForm = ({onSubmit, onInputChange, formData, error}) => (
    <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your Email here"
                required
                value={formData.email}
                onChange={onInputChange}
            />
            {error.email && <div className="error-message text-danger-emphasis">{error.email}</div>}
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password here"
                required
                value={formData.password}
                onChange={onInputChange}
            />
            {error.password && <div className="error-message text-danger-emphasis">{error.password}</div>}
        </div>
        {error.general && <div className="error-message text-danger-emphasis">{error.general}</div>}
        <button className="form-submit-btn" type="submit">Sign in</button>
    </form>
);

const Signin = () => {
    const navigate = useNavigate();
    const {login} = useAuth();
    const [formData, setFormData] = useState({email: '', password: ''});
    const [error, setError] = useState({email: '', password: '', general: ''});

    const validateInputs = (formData) => {
        let errors = {email: '', password: '', general: ''};

        if (!formData.email) {
            errors.email = LOGIN_MESSAGES.emailRequired;
        }

        if (!formData.password) {
            errors.password = LOGIN_MESSAGES.passwordRequired;
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

        if (!errors.email && !errors.password) {
            try {
                const response = await loginAPICall(formData.email, formData.password);

                console.log(response.data);
                const token = "Bearer " + response.data.accessToken;
                const role = response.data.role;

                storeToken(token);
                saveLoggedInUser(formData.email, role);

                navigate("/main");
                window.location.reload(false);
            } catch (error) {
                console.log(error);
                if (error.response) {
                    setError({email: "", password: "", general: LOGIN_MESSAGES.invalidCredentials});
                } else if (error.request) {
                    setError({email: "", password: "", general: LOGIN_MESSAGES.serverConnectionError});
                } else {
                    setError({email: "", password: "", general: LOGIN_MESSAGES.unexpectedError});
                }
            }
        }
    };

    return (
        <div className='container_signin'>
            <div className='content_signup'>
                <div className='content_left'>
                    <NavLink to="/">
                        <img src={images.logo} alt="Logo" className='logo'/>
                    </NavLink>
                    <img src={images.picture} alt="Illustration" className='picture1'/>
                </div>
                <div className='content_right'>
                    <div className="form-container">
                        <div className="logo-container">
                            <h3>Login</h3>
                        </div>
                        <LoginForm
                            onSubmit={handleSignin}
                            onInputChange={handleInputChange}
                            formData={formData}
                            error={error}
                        />
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
