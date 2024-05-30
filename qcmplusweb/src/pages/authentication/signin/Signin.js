import React from 'react'
import '../style.css'
import l from '../../../assets/logo/qcmplus_logo.png'
import p1 from '../../../assets/pictures/picture1.png'
import { NavLink } from 'react-router-dom'

const Signin = () => {
    return (
        <div className='container_signin'>
            <div className='content_signup'>
                <div className='content_left'>
                    <NavLink to="/">
                        <img src={l} alt="" className='logo' />
                        <img src={p1} alt="" className='picture1' />
                    </NavLink>
                </div>
                <div className='content_right'>
                    <div className="form-container">
                        <div className="logo-container">
                            <h3>Login</h3>
                        </div>
                        <form className="form">
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
                            <NavLink to="/forgetpassword" className="signup-link link">Forget password?</NavLink>
                        </p>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Signin