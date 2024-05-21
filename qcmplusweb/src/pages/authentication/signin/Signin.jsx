import React from 'react';
import {Link} from 'react-router-dom';

import '../style.css';

import logoImage from '../../../assets/logo/qcmplus_logo.png';
import picture1Image from '../../../assets/pictures/picture1.png';

const Signin = () => {
    const EMAIL_PLACEHOLDER = "Enter your Email here";
    const PASSWORD_PLACEHOLDER = "Enter your password here";

    return (
        <div className='container_signin'>
            <div className='content_signup'>
                <div className='content_left'>
                    <img src={logoImage} alt="Logo" className='logo'/>
                    <img src={picture1Image} alt="Picture 1" className='picture1'/>
                </div>
                <div className='content_right'>
                    <div className="form-container">
                        <div className="logo-container">
                            <h3>Login</h3>
                        </div>
                        <form className="form">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder={EMAIL_PLACEHOLDER} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" placeholder={PASSWORD_PLACEHOLDER}
                                       required/>
                            </div>
                            <button className="form-submit-btn" type="submit">Sign up</button>
                        </form>
                        <p className="signup-link">
                            <Link to="" className="signup-link link">Forget password?</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin;