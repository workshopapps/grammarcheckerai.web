import React, { useState } from 'react';

const Legal = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModalTwo, setShowModalTwo] = useState(false);
    const [showModalThree, setShowModalThree] = useState(false);
    const [showModalFour, setShowModalFour] = useState(false);

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="text-center items-center py-5 mt-[10rem] space-y-5">
                <h1 className="md:text-5xl text-3xl font-bold text-[#0B303E] text-center">Legal Information and Resources</h1>
                <p className="text-[#5A5A5A] text-sm font-[400] md:text-xl">
                    Find all the information you need as regards your legal rights to use our product
                </p>
            </div>

            <div className="py-5 mt-[2rem] md:mt-[4rem] " >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-4"

                >
                    <div className="bg-[#E2F2F8] space-y-3 rounded-lg p-10"
                        onClick={() => setShowModal(true)}
                        role="presentation"
                        >
                        <h1 className="md:text-3xl text-xl font-bold text-[#0B303E]">Terms of Services</h1>
                        <p className="text-[#5A5A5A] md:text-[1.2rem] text-sm font-[500] md:leading-6">
                            Find terms and conditions for our services
                        </p>
                    </div>
                    {showModal ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50  outline-none focus:outline-none"
                            >
                                <div className="relative w-auto my-6 mx-auto max-w-3xl ">
                                    {/*content*/}
                                    <div className="border-0 rounded-[1rem] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-4">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 rounded-t">
                                            <h3 className="text-2xl font-bold text-[#0B303E]">
                                                TERMS OF SERVICE/USE
                                            </h3>
                                        </div>
                                        <div className="px-6">
                                            <p className='text-[#5A5A5A]'>What the “Terms of service” mean</p>

                                        </div>
                                        {/*body*/}
                                        <div className="relative px-6 flex-auto text-[#5A5A5A]">
                                            <p className="my-4 text-lg leading-relaxed">
                                                The &ldquo;Terms&rdquo; for Gritty Grammar are included in these Terms of Service. These Terms, which regulate your access to and use of the Services and outline your rights and obligations therein, are a binding contract between you and Gritty Grammar. You accept these Terms by using any of our Services (including viewing a Site). Please refrain from using or gaining access to the Services if you do not agree to these Terms. You agree to these Terms on behalf of any entity for which you will be using the Services (such as your employer) and its affiliates, and you represent that you have the capacity to do so.
                                            </p>

                                            <h3 className='text-2xl font-bold '>Accepting These Terms</h3>
                                            <p>What Gritty Grammar products, features and offerings are available?</p>
                                            <ul className='ml-10'>
                                                <li className='list-disc'>A web application that listens, recognizes, transcribes, and automatically fixes grammatical errors in user-provided audio.</li>
                                                <li className='list-disc'>A mobile application that listens to user-inputted audio, detects, transcribes, and automatically fixes grammatical errors.</li>
                                            </ul>
                                        </div>
                                        <div className="relative px-6 py-3 flex-auto text-[#5A5A5A]">
                                            <h3 className='text-2xl font-bold'>The Terms</h3>
                                            <li className='list-disc'>Creating a Gritty Grammar Account</li>
                                            <p>
                                                To utilize all of our features, you might need to register for an account on the Gritty Grammar app. Your login information (username and password) is private and should only be used by you. You are aware that you are accountable for any and all uses of your login and password, including any that are not allowed. If you feel there has been unauthorized access to your account or that your login or password has been lost or stolen, contact our Customer Service team right away.
                                            </p>
                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 rounded-b">
                                            <button
                                                className="text-[#C51717] border border-slate-200 rounded background-transparent px-6 py-2 text-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                CLOSE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}



                    <div className="bg-[#E2F2F8] space-y-3 rounded-lg p-10"
                        onClick={() => setShowModalTwo(true)}
                        role="presentation"
                    >
                        <h1 className="md:text-3xl text-xl font-bold text-[#0B303E]">Privacy and Policy</h1>
                        <p className="text-[#5A5A5A] md:text-[1.2rem] text-sm font-[500] md:leading-6">
                            Find terms and conditions for our services
                        </p>
                    </div>
                    {showModalTwo ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50  outline-none focus:outline-none"
                            >
                                <div className="relative w-auto my-6 mx-auto max-w-3xl ">
                                    {/*content*/}
                                    <div className="border-0 rounded-[1rem] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-4">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 rounded-t">
                                            <h3 className="text-2xl font-bold text-[#0B303E]">
                                                PRIVACY POLICY
                                            </h3>
                                        </div>

                                            {/* body */}

                                        <div className="px-6">

                                            <p className='py-3'>
                                                Gritty Grammar is committed to the security and privacy of our customers data. This privacy policy outlines our dedication to protecting the data of our clients and serves as a contract between us and them, as well as with other parties, regarding our data handling.procedures.

                                                This policy describes the different types of data we gather, how we use and safeguard it and the main privacy practices we follow.
                                            </p>

                                            <p className='py-3'>
                                                The privacy policy is binding agreement between you and Grittty Grammar. By accessing any of our company websiteand app, you signify that you agree with the terms of this privacy policy. We may change this policy privacy from time to time by posting a new version here, and the new version will become effective immediately.
                                            </p>
                                            <ul>
                                            </ul>
                                            <p>The privacy of our customers and affiliates is important to us. Therefore: </p>
                                            <li className="list-disc">We do not sell or rent personally identifiable information</li>
                                            <li className="list-disc">We do not spam, and our policies forbid use of our services for spam</li>

                                            <p>
                                                To learn more about our policy page, visit our privacy policy page:
                                            </p>
                                            <div className="py-3">
                                                <button className='text-white bg-[#2FB087] px-8 py-3 rounded-[1rem]'>
                                                    Learn more
                                                </button>
                                            </div>

                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 rounded-b">
                                            <button
                                                className="text-[#C51717] rounded border border-slate-200 background-transparent px-6 py-2 text-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModalTwo(false)}
                                            >
                                                CLOSE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}

                </div>




                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-5">
                    <div className="bg-[#E2F2F8] space-y-3 rounded-lg p-10"
                        onClick={() => setShowModalThree(true)}
                        role="presentation"
                    >
                        <h1 className="md:text-3xl text-xl font-bold text-[#0B303E]">Cookie Statement</h1>
                        <p className="text-[#5A5A5A] md:text-[1.2rem] text-sm font-[500] md:leading-6">
                            Find terms and conditions for our services
                        </p>
                    </div>

                    {showModalThree ? (
                        <>
                            <div
                                className="justify-center items-center flex z-50 overflow-y-auto inset-1 fixed outline-none focus:outline-none mb-3 "
                            >
                                <div className="relative w-auto my-6 mx-auto max-w-3xl md:h-[50rem]">
                                    {/*content*/}
                                    <div className="border-0 rounded-[1rem] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-4">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 rounded-t">
                                            <h3 className="text-2xl font-bold text-[#0B303E]">
                                                COOKIE STATEMENT
                                            </h3>
                                        </div>

                                        {/* body */}

                                        <div className="px-6 text-[#5A5A5A]">
                                            <div >
                                                <h3>What are cookies?</h3>

                                                <p className='py-3'>
                                                    Cookies are small data files that are placed on your computer or mobile device when you visit a website. The term &ldquo;cookie&rdquo; is used in this Cookie Statement in the broad sense to include cookies and all similar techniques and technologies, including web beacons. Web beacons (sometimes called &ldquo;tracking pixels&rdquo; or &ldquo;clear gifs&rdquo;) are tiny graphics files that contain a unique identifier that enable us to recognize when someone has visited our online properties or taken an action in relation to our Online Properties
                                                </p>
                                            </div>

                                            <p className="py-2">
                                                Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
                                            </p>

                                            <div className='text-[#5A5A5A] py-3'>
                                                <h3>Why do we use cookies?</h3>

                                                <p className='py-3'>
                                                    Gritty Grammar uses first- and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Online Properties to operate, and we refer to these as &ldquo;essential&rdquo; or &ldquo; strictly necessary &rdquo; cookies. Other cookies enable us to better understand your use of our Online Properties, to track and target the interests of our Users, and to enhance the experience of Users on our Online Properties. Third parties serve cookies through our Online Properties for advertising, analytics and other purposes.
                                                </p>


                                                <div className='text-[#5A5A5A] py-3'>
                                                    <h3>Types of first - and- third party cookies we use</h3>

                                                    <p className='py-3'>
                                                        The types of first- and third-party cookies we use on our Online Properties are detailed below. Please note that the specific cookies served to your browser may vary depending on the specific Gritty Grammar Property you visit. These cookies may use non-personal data (e.g., aggregate or de-identified information about your use of the Online Properties) or information that uniquely identifies the browser or device you are using to access the Online Properties.
                                                    </p>
                                                </div>

                                                <div className="py-3">
                                                    <li className="list-disc">Essential cookies: These cookies are strictly necessary to provide you with access to and the basic use of our Services or Online Properties, such as access to secure areas and setting your privacy preferences. These cookies cannot be turned off.</li>
                                                    <li>Performance and functionality cookies: These cookies are used to enhance the performance and functionality of our Online Properties, but are not required for their use. However, without these cookies, certain functionality of the Online Properties may become limited or unavailable.</li>
                                                    <li>Analytics and customization cookies: These cookies help us understand how our Online Properties are being used or how effective our marketing campaigns are, or to help us customize our Sites for you. Thanks to this information, we are able to improve the features offered on our Online Properties.</li>
                                                    <li>Targeting cookies: These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.</li>
                                                    <li>Social Media cookies: These cookies are used to enable you to share pages and content that you find interesting on our Online Properties through third-party social networking and other websites. These cookies may also be used for advertising purposes.</li>
                                                </div>


                                            </div>
                                        </div>

                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 rounded-b">
                                            <button
                                                className="text-[#C51717] rounded border border-slate-200 background-transparent px-6 py-2 text-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModalThree(false)}
                                            >
                                                CLOSE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}














                    <div className="bg-[#E2F2F8] space-y-3 rounded-lg p-10"
                        onClick={() => setShowModalFour(true)}
                        role="presentation"


                    >
                        <h1 className="md:text-3xl text-xl font-bold text-[#0B303E]">Trademark & Copyright Policy</h1>
                        <p className="text-[#5A5A5A] md:text-[1.2rem] text-sm font-[500] md:leading-6">
                            Find terms and conditions for our services
                        </p>
                    </div>

                    {showModalFour ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50  outline-none focus:outline-none"
                            >
                                <div className="relative w-auto my-6 mx-auto max-w-3xl ">
                                    {/*content*/}
                                    <div className="border-0 rounded-[1rem] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-4">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 rounded-t">
                                            <h3 className="text-2xl font-bold text-[#0B303E]">
                                                TRADEMARK AND COPYRIGHT POLICY
                                            </h3>
                                        </div>

                                        {/* body */}
                                        <div className="px-6 text-[#5A5A5A]">
                                            <div>
                                                <h3>Trademark</h3>

                                                <p className='py-3'>
                                                    All materials available through this website and other websites owned or provided by Gritty Grammar, including any products, services, and web content including but not limited to software, images, text, and various downloads (“Materials”) are owned by Gritty.
                                                </p>

                                            </div>

                                            <div className='text-[#5A5A5A]'>
                                                <h3>Copyright</h3>

                                                <p className='py-3'>
                                                    Materials are protected by copyright, trademark , and other intellectual property laws and all rights in the said materials are reserved by Gritty Grammar or their respective owners. You may view, copy and print pages from the website for personal use only. You may not otherwise use, reproduce, download, modify, store, post, broadcast, transmit, sell, or make available to any party any part of the content of the website without any prior written approval from Gritty Grammar.
                                                </p>

                                            </div>


                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 rounded-b">
                                            <button
                                                className="text-[#C51717] rounded border border-slate-200 background-transparent px-6 py-2 text-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModalFour(false)}
                                            >
                                                CLOSE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}

                </div>
            </div>
        </div>
    );
};

export default Legal;

