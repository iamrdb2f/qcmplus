import React from 'react'
import '../style.css'
import l from '../../../assets/logo/qcmplus_logo.png'
import p1 from '../../../assets/pictures/picture1.png'
import { Link } from 'react-router-dom'

const Forgetpassword = () => {
  return (
    <div className='content_signup'>
            <div className='content_left'>
                <img src={l} alt="" className='logo' />
                <img src={p1} alt="" className='picture1' />
            </div>
            <div className='content_right'>
                <div className="form-container">
                    <div className="logo-container">
                    <h3>Forget Password</h3>
                    </div>

                    <form className="form">
                        <div className="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter your Email here" required />
                        </div>
                        <button className="form-submit-btn" type="submit">Sign up</button>
                    </form>

                    <p className="signup-link">
                        <Link to={""} className="signup-link link">Forget password?</Link>
                    </p>
                </div>
            </div>

        </div>
  )
}

export default Forgetpassword