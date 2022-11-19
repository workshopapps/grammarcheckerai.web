import style from './StatusReport.module.css';
import PropTypes from 'prop-types';

const StatusReport = ({ title, status }) => {
  const { statusName, logo } = status;
  return (
    <div className={style.statusReport}>
      <p className={style.statusTitle}>{title}</p>
      <p className={`${style.statusStatus} ${style[statusName]}`}>{statusName}</p>
      <span className={style.statusReportLogo}>
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
