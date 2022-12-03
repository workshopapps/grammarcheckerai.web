/* eslint-disable react/no-unescaped-entities */
import useTheme from '../../hooks/useTheme';
import React from 'react';
import Footer from './landing-page/Footer';
import './terms_of_use.css';

const TermsOfUse = () => {
  const context = useTheme();
  return (
    <div className="overflow-hidden">
      <div className={`${context.theme === 'dark' ? 'text-[#211f21]' : 'text-[#ffff]'} lg:h-[430px] h-[296px] bg-[#5D387F] `}>
        <div className="lg:pt-[156px] pt-[112px]">
         <h1 className={`${context.theme === 'dark' ? 'text-[#ffff]' : 'text-[#ffff]'} lg:text-[48px] text-[28px] font-bold lg:leading-[62px] leading-[36px] text-center`}>Terms Of Use</h1>
         <p className={`${context.theme === 'dark' ? 'text-[#ffff]' : 'text-[#ffff]'} lg:text-[20px] text-[14px] lg:leading-[26px] leading-[18px] text-center`}>Get familiar with our terms and enjoy Speak Better to the fullest.</p>          
        </div>

      </div> 
      <div className="_termspage">
        <span className={`${context.theme === 'dark' ? 'text-[#ffff]' : 'text-[#989595]'} lg:text-[20px] lg:leading-[30px] text-[10px] leading:[20px]`}> EFFECTIVE AS OF NOVEMBER 18,2022</span>
        <br></br>
        </p>
        <h1 className={`${context.theme === 'dark' ? 'text-[#ffff]' : 'text-[#393939]'} lg:text-[40px] lg:leading-[52px] text-[24px] leading:[31px] font-bold lg:mt-[64px] mt-[46px]`}>Mobile Services</h1>
        <p className={`${context.theme === 'dark' ? 'text-[#ffff]' : 'text-[#393939]'} lg:text-[24px] lg:leading-[36px] text-[16px] leading:[24px] lg:mt-[24px] mt-[8px] lg:break-normal break-word`}>
         The Site, Software and Services may include products and services that are available via a mobile device, including <br></br>
         (i) the ability to upload content to the Services via a mobile device<br></br>
         (ii) the ability to browse the Services and the Site from a mobile device, and<br></br>
         (iii) the ability to access certain features through an application downloaded and installed on a mobile device (collectively, “Mobile Services”). To the extent you access the Service through a mobile device, your 
          wireless service carrier&apos;s standard charges, data rates and other fees may apply. <br></br>
          <br></br>
          In addition, downloading, installing or using certain Mobile Services may be prohibited or restricted by your carrier, 
          and not all Mobile Services may work with all carriers or devices. By using the Mobile Services, you agree that Speak Better 
          may communicate with you regarding Speak Better and other entities by electronic means to your mobile device and that certain 
          information about your usage of the Mobile Services may be communicated to us. In the event you change or deactivate your mobile 
          telephone number, you agree to promptly update your account information to ensure that your messages are not sent to the person that 
          acquires your mobile telephone number.

          </p>
        <h1 className={`${context.theme === 'dark' ? 'text-[#ffff]' : 'text-[#393939]'} lg:text-[40px] lg:leading-[52px] text-[24px] leading:[31px] font-bold lg:mt-[64px] mt-[46px]`}>Changes to terms or services</h1>
        <p className={`${context.theme === 'dark' ? 'text-[#ffff]' : 'text-[#393939]'} lg:text-[24px] lg:leading-[36px] text-[16px] leading:[24px] lg:mt-[24px] mt-[8px] lg:break-normal break-word`}>
        Speak Better reserves the right at any time to <br></br>
         (i) change any information, specifications, features or functions of the Site, Services or Software, including any Trial <br></br>
        (ii)suspend or discontinue, temporarily or permanently, any or all of the Services or any Trial, including the availability of any feature, database or content or <br></br>
        (iii) impose limits on certain features and Services or restrict access to parts or all of the Services, including any Trial, in each case with or without prior notice and without any liability to you or any third party. <br></br>
        <br></br>
          Speak Better will use its commercially reasonable efforts to notify you of changes to the Services and/or Software that,
          in Speak Better&apos;s reasonable opinion, have the effect of materially and adversely diminishing the functionality of the
          Services to which you have subscribed. Speak Better may from time to time update or revise this Agreement. If Speak Better updates or revises this Agreement, Speak Better will notify you either by email to your most recently provided email address, by posting the updated or revised Terms of Service and End User License Agreement
          on the Site or by any other manner chosen by Speak Better in its commercially reasonable discretion. <br></br>
         <br></br>
          Your use of the Site, Services or Software following any such update or revision constitutes your agreement
          to be bound by and comply with this Agreement as updated or revised. It is your responsibility to review the 
          Terms of Service and End User License Agreement periodically.
         </p>
        <br></br>
      </div> 
       <Footer />  
    </div>
  );
};

export default TermsOfUse;

export default TermsOfUse;
