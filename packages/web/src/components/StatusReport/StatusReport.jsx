import style from './StatusReport.module.css';
import PropTypes from 'prop-types';

const StatusReport = ({ title, status }) => {
  console.log(status.statusName);
  const { statusName, logo } = status;
  return (
    <div className={style.systemReport}>
      <p className={style.systemTitle}>{title}</p>
      <p className={`${style.systemStatus} ${style[statusName]}`}>{statusName}</p>
      <span className={style.systemReportLogo}>
        <img src={logo} alt="" className={style.statusLogo} />
      </span>
    </div>
  );
};

export default StatusReport;

StatusReport.propTypes = {
  title: PropTypes.string,
  status: PropTypes.object,
};
