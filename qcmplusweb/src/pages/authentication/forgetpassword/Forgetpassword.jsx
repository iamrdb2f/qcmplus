import React from 'react'
import {Link} from 'react-router-dom'
import logoImage from '../../../assets/logo/qcmplus_logo.png'
import picture1 from '../../../assets/pictures/picture1.png'
import '../style.css'

function EmailForm() {
    return (
        <form className="form">
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your Email here" required/>
            </div>
            <button className="form-submit-btn" type="submit">Sign up</button>
        </form>
    )
}

const Forgetpassword = () => {
    return (
        <div className='content_signup'>
            <div className='content_left'>
                <img src={logoImage} alt="" className='logo'/>
                <img src={picture1} alt="" className='picture1'/>
            </div>
            <div className='content_right'>
                <div className="form-container">
                    <div className="logo-container">
                        <h3>Forget Password</h3>
                    </div>
                    <EmailForm/>
                    <p className="signup-link">
                        <Link to={""} className="signup-link link">Forget password?</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Forgetpassword