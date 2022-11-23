import React from 'react';
import GrittyLogo from '../../assets/images/logo.webp';
import style from './api-status.module.css';
import Detail from './Report/ReportDetail';

const ApiStatus = () => {
  return (
    <div className="statusPage">
      <div className={style.header}>
        <a href="/home" className={style.headerLink}>
          <img
            src={GrittyLogo}
            alt="gritty grammar logo"
            className={style.grittyImg}
           // prevent image Jank
          />
        </a>
      </div>

      {/* <MainStatus /> */}
      <div>
        <main className={style.mainContainer}>
          <div className={style.mainHeader}>
            <h1 className={style.title}>Grittygrammar is Running </h1>
            <p className={style.text}>API Status for gritty grammar in realtime.</p>
          </div>

          <Detail />
        </main>
      </div>
    </div>
  );
};

export default ApiStatus;
