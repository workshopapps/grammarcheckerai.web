/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Footer from './landing-page/Footer';
import './terms_of_use.css';

const TermsOfUse = () => {
  return (
    <div>
      <div>{/*This is where the header goes*/}</div>
      <div className="_termspage">
        <span className="_effective"> EFFECTIVE AS OF NOVEMBER 18,2022</span>
        <br></br>
        <span className="_terms"> Terms of use</span>
        <p className="_txt">
          Welcome to Speak Better. Speak Better is owned by HNG.In this document,&quot;we&quot;, &quot;us&quot;,and
          &quot;our&quot ; refer to Speak Better.The terms &quot;you&quot; and &quot;your&quot; refer to your
          customers,users of our services ,or visitors of our website.<br></br>
          <br></br>
          We care about your privacy.For further clarity,visit our Speak Better Privacy Policy for information
          relating to our storage,collection,use and disclosure of your personal information.
        </p>
        <h1 className="_heading">Registration and security</h1>
        <p className="_txt">
          By clicking &quot;I Accept&quot;, or by downloading,installing,or in any other way accessing or using the
          service,you agree that you have read and understood, and, as a condition to your use of the service,you agree
          to be bound by,the following terms of service,including Speak Better&apos;s privacy policy,fair use policy,
          and any additional terms and policies Speak Better may provide from time to time.If you are not eligible, or
          do not agree to the terms, then you do not have our permission to use the service.Your use of the service,and
          Speak Better&apos;s provision of the service to you,constitutes an agreement by Speak Better and by you to
          be bound by these Terms
        </p>
        <h1 className="_heading">Access to services</h1>
        <p className="_txt">
          You are responsible for obtaining and maintaining any equipment and ancillary services needed to connect to or
          access the Site or otherwise use the Services, including, without limitation, modems, hardware, software,
          internet service and telecommunications capacity. You shall be solely responsible for ensuring that such
          equipment and ancillary services are compatible with the Services and Software.
        </p>
        <h1 className="_heading">Mobile Services</h1>
        <p className="_txt">
          The Site, Software and Services may include products and services that are available via a mobile device,
          including (i) the ability to upload content to the Services via a mobile device, (ii) the ability to browse
          the Services and the Site from a mobile device, and (iii) the ability to access certain features through an
          application downloaded and installed on a mobile device (collectively, “Mobile Services”). To the extent you
          access the Service through a mobile device, your wireless service carrier&apos;s standard charges, data rates
          and other fees may apply. In addition, downloading, installing or using certain Mobile Services may be
          prohibited or restricted by your carrier, and not all Mobile Services may work with all carriers or devices.
          By using the Mobile Services, you agree that Speak Better may communicate with you regarding Speak Better
          and other entities by electronic means to your mobile device and that certain information about your usage of
          the Mobile Services may be communicated to us. In the event you change or deactivate your mobile telephone
          number, you agree to promptly update your account information to ensure that your messages are not sent to the
          person that acquires your mobile telephone number.
        </p>
        <h1 className="_heading">Changes to terms or services</h1>
        <p className="_txt">
          Speak Better reserves the right at any time to (i) change any information, specifications, features or
          functions of the Site, Services or Software, including any Trial, (ii) suspend or discontinue, temporarily or
          permanently, any or all of the Services or any Trial, including the availability of any feature, database or
          content, or (iii) impose limits on certain features and Services or restrict access to parts or all of the
          Services, including any Trial, in each case with or without prior notice and without any liability to you or
          any third party. Speak Better will use its commercially reasonable efforts to notify you of changes to the
          Services and/or Software that, in Speak Better&apos;s reasonable opinion, have the effect of materially and
          adversely diminishing the functionality of the Services to which you have subscribed. Speak Better may from
          time to time update or revise this Agreement. If Speak Better updates or revises this Agreement, Speak Better will notify you either by email to your most recently provided email address, by posting the updated
          or revised Terms of Service and End User License Agreement on the Site or by any other manner chosen by Speak Better in its commercially reasonable discretion. Your use of the Site, Services or Software following any
          such update or revision constitutes your agreement to be bound by and comply with this Agreement as updated or
          revised. You can view the most current Terms of Service and End User License Agreement at speakbetter.com/terms. It is your responsibility to review the Terms of Service and End User License Agreement
          periodically.
        </p>
        <br></br>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
