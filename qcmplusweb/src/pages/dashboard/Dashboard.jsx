import React from 'react'
import './style.css'
import l from '../../assets/logo/qcmplus_logo.png'
import { RiHomeLine } from "react-icons/ri";


const Dashboard = () => {
    return (
        <div className='content_dashboard'>
            <div className='content_aside'>
                <div className='content_top'>
                    <img src={l} alt="" className='logo' />
                </div>
                <div className='aside_bottom'>
                    <button>Dashboard</button>
                    <button>Teachers</button>
                    <button>Students</button>
                    <button>Settings and Profile</button>
                    <button>Exams</button>
                    <div className='space_btn'>
                        <button>Features</button>
                    </div>
                </div>
            </div>
            <div className='content_main'>
                <div className='main_top'>
                    <div className='text_description'>
                        <p>Learn  how to launch faster</p>
                        <p>watch our webinar for tips from our experts and get a limited time offer.</p>
                    </div>
                    <div className='btn_disconnect'>
                        <button>Log out</button>
                    </div>
                </div>
                <div className='text_welcome'>
                    <h2>Welcome to your school dashboard </h2>
                </div>
                <div className='container_items'>
                    <div className='content_items'>
                        <div className='add_adim'>
                            <div>
                                <RiHomeLine />
                            </div>
                            <div>
                                <h4>Add other admins </h4>
                                <p>
                                    Create rich course content and coaching products for your students.
                                    When you give them a pricing plan, they’ll appear on your site!
                                </p>
                            </div>
                        </div>
                        <div className='add_class'>
                            <div>
                                <RiHomeLine />
                            </div>
                            <div>
                                <h4>Add classes</h4>
                                <p>
                                    Create rich course content and coaching products for your students.
                                    When you give them a pricing plan, they’ll appear on your site!
                                </p>
                            </div>
                        </div>
                        <div className='manage_student'>
                            <div>
                                <RiHomeLine />
                            </div>
                            <div>
                                <h4>Manage students</h4>
                                <p>
                                    Create rich course content and coaching products for your students.
                                    When you give them a pricing plan, they’ll appear on your site!
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='btn_support'>
                        <button>Support</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard