import React from 'react'
import Footer from '../../modules/static/landing-page/Footer'
import styles from '../../modules/auth/login/login.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PrivacyPolicy() {
    let navigate = useNavigate();
    const handlePrev = () => {
        navigate('/legal');
    };
    return (
        <div>
            <div className='py-10 text-center bg-[#E8DDF2] text-BLACK'>
                <div className="goback pb-30">
                    <button onClick={handlePrev} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 ml-10 flex items-center mt-0 absolute w-36 h-12">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='h-10'>
                            <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="48"
                                d="M328 112L184 256l144 144"
                            />
                        </svg>
                        <span>Go back</span>
                    </button>

                </div>

                <h1 className='md:text-3xl text-2xl font-bold'>Speak Better Privacy Policy</h1>
                <p>Last updated: 12 November, 2022.</p>
            </div>

            <div className='w-[95%] m-auto flex flex-col gap-5 px-5 md:px-10 py-10'>
                <p>
                    Speak better is committed to the security and privacy of our customers data.
                </p>
                <p>
                    This privacy policy outlines our dedication to protecting the data of our clients and serves as a contract between us and them, as well as with other parties, regarding our data handling.procedures.
                </p>
                <p>
                    This policy describes the different types of data we gather, how we use and safeguard it and the main privacy practices we follow. The privacy policy is binding agreement between you and Speak  better. By accessing any of our company websiteand app, you signify that you agree with the terms of this privacy policy.
                </p>
                <p>
                    We may change this policy privacy from time to time by posting a new version here, and the new version will become effective immediately.
                </p>

                <h3 className='font-bold text-xl mt-5'>The privacy of our customers and affiliates is important to us. Therefore:</h3>
                <div className='mt-4'>
                    <div className='flex gap-4 items-center'>
                        <span className='bg-[#5d387f] w-2 h-2'></span>
                        <p>We do not sell or rent personally identifiable information</p>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <span className='bg-[#5d387f] w-2 h-2'></span>
                        <p>We do not spam, and our policies forbid use of our services for spam</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
