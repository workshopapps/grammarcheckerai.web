import React from 'react'
import useTheme from '../../hooks/useTheme'
import ContactCSS from './Contact.module.css'
import login from "../../assets/login.svg"
import user from '../../assets/user.svg'
import stickynote from '../../assets/stickynote.svg'
import deviceMessage from '../../assets/device-message.svg'
import danger from "../../assets/danger.svg"
import archive from '../../assets/archive.svg'
import Footer from '../../modules/static/landing-page/Footer'



const index = () => {
    const context = useTheme();
    const dark = context.theme === 'dark';

    return (
        <div
            contact-theme={context.theme}
            className={ContactCSS.main_container}>
            <div className={ContactCSS.container}>
                <p
                    contact-theme={context.theme}
                    className={ContactCSS.p1}>Contact Us
                </p>
                <p
                    contact-theme={context.theme}
                    className={ContactCSS.p2}> We would love to hear from you</p>
                <p
                    contact-theme={context.theme}
                    className={ContactCSS.p3}>Any questions or remarks? Just write us a message!</p>
                <form>
                    <div className={ContactCSS.row1}>
                        <div className={ContactCSS.element1}>
                            <label contact-theme={context.theme}>First Name</label>
                            <input type="text" name='fname' placeholder='Enter first name here' />

                        </div>

                        <div className={ContactCSS.element2}>
                            <label contact-theme={context.theme}>Last Name</label>
                            <input type="text" name='lname' placeholder='Enter last name here' />

                        </div>

                    </div>

                    <div className={ContactCSS.row2}>
                        <div className={ContactCSS.element3}>
                            <label contact-theme={context.theme}>Email</label>
                            <input type="email" name='email' placeholder='Enter email here' />
                        </div>

                        <div className={ContactCSS.element4}>
                            <label contact-theme={context.theme}>Phone Number</label>
                            <input type='tel' name='fname' placeholder='800 000 0000' />

                        </div>

                    </div>

                    <p className={ContactCSS.subject}> Select Subject?</p>
                    <div
                        contact-theme={context.theme}
                        className={ContactCSS.boxes}>
                        <button className={ContactCSS.box}>
                            <img src={login} alt="" />
                            <p className='text'>Login issues</p>
                        </button>

                        <button className={ContactCSS.box}>
                            <img src={user} alt="" />
                            <p className='text'>Account issues</p>
                        </button>

                        <button className={ContactCSS.box}>
                            <img src={stickynote} alt="" />
                            <p className='text'>Usage issues</p>
                        </button>

                        <button className={ContactCSS.box}>
                            <img src={deviceMessage} alt="" />
                            <p className='text'>Chat issues</p>
                        </button>

                        <button className={ContactCSS.box}>
                            <img src={danger} alt="" />
                            <p className='text'>Error checking issues</p>
                        </button>

                        <button className={ContactCSS.lastbox}>
                            <img src={archive} alt="" />
                            <p className='text'>General Inquiry</p>
                        </button>
                    </div>

                    <div className={ContactCSS.row3}>
                        <label>Message</label>
                        <textarea name="textarea" placeholder='Write your message here'></textarea>

                    </div>
                    <div className={ContactCSS.send}>
                        <button className={ContactCSS.btn}>Send Message</button>
                    </div>

                </form>
            </div>
            <Footer />
        </div>
    );
}

export default index