 import React from 'react'
import Footer from '../../modules/static/landing-page/Footer'

 
 export default function CookiesStatement() {
   return (
     <div>
         <div className='py-14 text-center bg-[#E8DDF2] text-BLACK'>
            <h1 className='md:text-3xl text-2xl font-bold'>Cookies statement</h1>
            <p>Last updated: 12 November, 2022.</p>
        </div>

        <div className='px-8 md:px-10 py-10'>
            <h3 className='font-bold text-xl py-4'>What are cookies?</h3>
            <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. The term “cookie” is used in this Cookie Statement in the broad sense to include cookies and all similar techniques and technologies, including web beacons. Web beacons (sometimes called “tracking pixels” or “clear gifs”) are tiny graphics files that contain a unique identifier that enable us to recognize when someone has visited our online properties or taken an action in relation to our Online Properties. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>

            <h3 className='font-bold text-xl py-4'>Why do we use cookies?</h3>
            <p>
            Speak better uses first- and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Online Properties to operate, and we refer to these as “essential” or “ strictly necessary ” cookies. Other cookies enable us to better understand your use of our Online Properties, to track and target the interests of our Users, and to enhance the experience of Users on our Online Properties. Third parties serve cookies through our Online Properties for advertising, analytics and other purposes.
            </p>

            <h3 className='font-bold text-xl py-3'>Types of first - and- third party cookies we use</h3>
            <p className='pt-5'>
            The types of first- and third-party cookies we use on our Online Properties are detailed below. Please note that the specific cookies served to your browser may vary depending on the specific Speak Better Property you visit. These cookies may use non-personal data (e.g., aggregate or de-identified information about your use of the Online Properties) or information that uniquely identifies the browser or device you are using to access the Online Properties.
            </p>

            <ol className='flex flex-col py-5 gap-4 list-disc'>
                <li>
                    <p className='font-bold'>Essential cookies:</p>These cookies are strictly necessary to provide you with access to and the basic use of our Services or Online Properties, such as access to secure areas and setting your privacy preferences. These cookies cannot be turned off.
                </li>
                <li>
                    <p className='font-bold'>Performance and functionality cookies:</p> These cookies are used to enhance the performance and functionality of our Online Properties, but are not required for their use. However, without these cookies, certain functionality of the Online Properties may become limited or unavailable.
                </li>
                <li>
                    <p className='font-bold'>Analytics and customization cookies: </p>These cookies help us understand how our Online Properties are being used or how effective our marketing campaigns are, or to help us customize our Sites for you. Thanks to this information, we are able to improve the features offered on our Online Properties.
                </li>
                <li>
                    <p className='font-bold'>Targeting cookies: </p>These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.
                </li>
                <li>
                   <p className='font-bold'>Social Media cookies:</p> These cookies are used to enable you to share pages and content that you find interesting on our Online Properties through third-party social networking and other websites. These cookies may also be used for advertising purposes.
                </li>
            </ol>
        </div>

        <Footer />
     </div>
   )
 }
 