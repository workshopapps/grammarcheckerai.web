import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../modules/static/landing-page/Footer';

export default function TermsOfService() {
    let navigate = useNavigate();
    const handlePrev = () => {
        navigate('/legal');
    };
    return (
        <div>
            <div className='py-14 text-center bg-[#E8DDF2] text-BLACK'>
                <div className="goback pb-30">
                    <button onClick={handlePrev} className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-2 ml-10 flex items-center mt-0 lg:absolute w-36 h-12 sm: relative sm:float-top">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='h-10' >
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
                <h1 className='md:text-3xl text-2xl font-bold'>Speak Better Terms of Services</h1>
                <p>Last updated: 12 November, 2022.</p>
            </div>

            <div className='px-5 w-[95%] m-auto md:px-10 py-10'>
                <h3 className='font-bold text-lg'>What the “Terms of service” mean</h3>
                <p>
                    The Terms for Speak Better are included in these Terms of Service. These Terms, which regulate your access to and use of the Services and outline your rights and obligations therein, are a binding contract between you and Speak Better. You accept these Terms by using any of our Services (including viewing a Site). Please refrain from using or gaining access to the Services if you do not agree to these Terms. You agree to these Terms on behalf of any entity for which you will be using the Services (such as your employer) and its affiliates, and you represent that you have the capacity to do so.
                </p>

                <h3 className='mt-5 font-bold text-lg'>Accepting These Terms</h3>
                <h6>What Speak Better products, features and offerings are available?</h6>
                <div>
                    <div className='flex gap-4 items-center'>
                        <span className='bg-[#5d387f] w-4 h-4'></span>
                        <p> A web application that listens, recognizes, transcribes, and automatically fixes grammatical errors in user-provided audio.</p>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <span className='bg-[#5d387f] w-4 h-4'></span>
                        <p>A mobile application that listens to user-inputted audio, detects, transcribes, and automatically fixes grammatical errors.</p>
                    </div>
                </div>

                <h3 className='text-lg font-bold mt-5'>The terms</h3>
                <ol className="list-decimal flex flex-col gap-4">
                    <li>
                        <span className='font-medium'>Creating a Speak Better Account</span>
                        <p>
                            To utilize all of our features, you might need to register for an account on the Speak Better app. Your login information (username and password) is private and should only be used by you. You are aware that you are accountable for any and all uses of your login and password, including any that are not allowed. If you feel there has been unauthorized access to your account or that your login or password has been lost or stolen, contact our Customer Service team right away.
                            Speak Better may reclaim, or require you to change, your username for any reason.
                        </p>
                    </li>
                    <li>
                        <span className='font-medium'>Privacy and Consumer Information</span>
                        <p>
                            We know that your personal information is important to you, and to Speak Better. Information provided to Speak Better by users or collected by Speak Better is subject to our Privacy Policy.
                        </p>
                    </li>
                    <li>
                        <span className='font-medium'>Content and Intellectual Property Rights</span>
                        <p>
                            Users of Speak Better can post, upload, or otherwise participate in our service by contributing material (User Content). To be clear, User Content refers to any data, materials, or other content that users add, produce, upload, publish, distribute, or post to the Speak Better Service.
                        </p>
                    </li>
                    <li>
                        <span className='font-medium'>Feedback</span>
                        <p>
                            If you offer ideas, recommendations, or other feedback regarding how you use our service or any content (collectively, Feedback), Speak Better may use the Feedback without limitation and without charging you anything. Under these Terms, feedback is a kind of User Content.
                        </p>
                    </li>
                    <li>
                        <span className='font-medium'>Your device</span>
                        <p>
                            You also give us permission to: (1) use your device`s processor, bandwidth, and storage hardware for Speak Better Service purposes, such as storing your conversation; (2) deliver advertising and other information to you; and (3) permit our business partners to do the same, as permitted by the Speak Better Privacy Policy.
                        </p>
                    </li>
                    <li>
                        <span className='font-medium'>Termination</span>
                        <p>
                            As soon as you use any method to access the Services, you are subject to these Terms, which remain in effect until they are canceled. There could be a point where Speak Better or you decide it`s better to split ways. These Terms will often no longer be applicable at that point.
                        </p>
                        <span className='font-medium'>Speak Better may terminate your right to use the Services at any time</span>
                        <ol className='list-disc'>
                            <li>If you violate or breach these Terms;</li>
                            <li>If you misuse or abuse the Services, or use the Services in a way not intended or permitted by Speak Better; orif allowing you to access and use the Services would violate any applicable local, state, provincial, national and other laws, rules and regulations or would expose Speak Better to legal liability.</li>
                            <li>Release and Indemnification</li>
                        </ol>
                    </li>
                    <li>
                        <span className='font-medium'>Release and Indemnification</span>
                        <p>
                            This is where you undertake, to the fullest extent permissible by law, to indemnify Speak Better in the event that your use of the Service gives rise to a claim against Speak Better, or causes Speak Better to incur any costs or claims. Release: You hereby agree to release Speak Better from all damages (whether direct, indirect, incidental, consequential or otherwise), losses, liabilities, costs and expenses of every kind and nature, known and unknown, arising out of a dispute between you and a third party (including other Users) in connection with the Services or any event listed on the Services. Indemnification. You agree to defend, indemnify and hold Speak Better and each of its and their respective officers, directors, agents, co-branders, licensors, payment processing partners, other partners and employees, harmless from any and all damage (whether direct, indirect, incidental, consequential or otherwise), loss, liability, cost and expense (including, without limitation, reasonable attorneys` and accounting fees) resulting from any claim, demand, suit, proceeding (whether before an arbitrator, court, mediator or otherwise) or investigation made by any third party (each a `Claim``) relating to or arising out of:
                            your breach of these Terms (including any terms or agreements or policies incorporated into these Terms); your use of the Services in violation of these Terms or other policies we post or make available; your breach of any applicable local, state, provincial, national or other law, rule or regulation or the rights of any third party.
                        </p>
                    </li>

                </ol>







            </div>
            <Footer />

        </div>
    )
}
