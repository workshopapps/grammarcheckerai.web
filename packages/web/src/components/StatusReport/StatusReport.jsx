import style from './StatusReport.module.css';
import PropTypes from 'prop-types';
import successLogo from '../../assets/success.svg';
import failedLogo from '../../assets/failed.svg';
// import warningLogo from '../../assets/warning.svg';
import React from 'react';

const StatusReport = ({ title, value }) => {
  const statusName = {
    ok: 'Operational',
    down: 'Outage',
  };
  const logo = {
    ok: successLogo,
    down: failedLogo,
  };

  return (
    <div className={style.statusReport}>
      <p className={style.statusTitle}>{title}</p>
      <p className={`${style.statusStatus} ${style[statusName[value]]}`}>{statusName[value]}</p>
      <span className={style.statusReportLogo}>
        <img src={logo[value]} alt="" className={style.statusLogo} />
      </span>
    </div>
  );
};

export default StatusReport;

StatusReport.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
};
