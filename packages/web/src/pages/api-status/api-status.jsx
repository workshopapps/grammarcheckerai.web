import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../modules/static/landing-page/Footer';
import style from './api-status.module.css';
import Detail from './Report/ReportDetail';

const ApiStatus = () => {
  return (
    <>
      <Navbar />
      <div className="statusPage">
        <div>
          <main className={style.mainContainer}>
            <div className={style.mainHeader}>
              <h1 className={style.title}>Speak better is Running </h1>
              <p className={style.text}>API Status for Speak Better is updating in realtime.</p>
            </div>

            <Detail />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ApiStatus;
