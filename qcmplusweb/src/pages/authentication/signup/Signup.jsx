import React from 'react'
import '../style.css'
import LOGO from '../../../assets/logo/qcmplus_logo.png'
import PICTURE1 from '../../../assets/pictures/picture1.png'
import {Link} from 'react-router-dom'

const PLACEHOLDER_NAME = "Enter your Full Name here";
const PLACEHOLDER_EMAIL = "Enter your Email here";
const PLACEHOLDER_PASSWORD = "Enter your password here";
const SIGN_IN_PATH = "";

const SignupFormComponent = () => (
    <form className="form">
        <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" placeholder={PLACEHOLDER_NAME} required/>
        </div>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder={PLACEHOLDER_EMAIL} required/>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder={PLACEHOLDER_PASSWORD} required/>
        </div>
        <button className="form-submit-btn" type="submit">Sign up</button>
    </form>
);

const Signup = () => {
    return (
        <div className='content_signup'>
            <div className='content_left'>
                <img src={LOGO} alt="" className='logo'/>
                <img src={PICTURE1} alt="" className='picture1'/>
            </div>
            <div className='content_right'>
                <div className="form-container">
                    <div className="logo-container">
                        <h3>Create an Account</h3>
                    </div>
                    <SignupFormComponent/>

                    <p className="signup-link">
                        Don't have an account?
                        <Link to={SIGN_IN_PATH} className="signup-link link"> Sign in now</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup;