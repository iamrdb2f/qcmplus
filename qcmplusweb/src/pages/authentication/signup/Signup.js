import React from 'react'
import '../style.css'
import l from '../../../assets/logo/qcmplus_logo.png'
import p1 from '../../../assets/pictures/picture1.png'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <div className='content_signup'>
            <div className='content_left'>
                <img src={l} alt="" className='logo' />
                <img src={p1} alt="" className='picture1' />
            </div>
            <div className='content_right'>
                <div className="form-container">
                    <div className="logo-container">
                        <h3>Create an Account</h3>
                    </div>
                    <form className="form">
                        <div className="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" id="name" name="name" placeholder="Enter your Full Name here" required />
                        </div>
                        <div className="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter your Email here" required />
                        </div>
                        <div className="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" name="password" placeholder="Enter your password here" required />
                        </div>

                        <button className="form-submit-btn" type="submit">Sign up</button>
                    </form>

                    <p className="signup-link">
                        Don't have an account?
                        <Link to={""} className="signup-link link"> Sign in now</Link>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Signup