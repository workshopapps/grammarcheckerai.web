import style from './ReportDetail.module.css';
import { SUCCESS, FAILED, WARNING } from '../../../lib/constants/StatusTypes';
import { ValidateStatus } from '../../../lib/utils/validate-status-api';
import StatusReport from '../../../components/StatusReport/StatusReport';

const report = [
  {
    title: 'Testing/swagger GUI',
    status: ValidateStatus(SUCCESS),
  },
  {
    title: 'Login/SSO',
    status: ValidateStatus(SUCCESS),
  },
  {
    title: 'Audio to whisper script',
    status: ValidateStatus(FAILED),
  },
  {
    title: 'Audio Transcribing',
    status: ValidateStatus(SUCCESS),
  },
  {
    title: 'Reset & forgotten password',
    status: ValidateStatus(WARNING),
  },
  {
    title: 'Notifications',
    status: ValidateStatus(FAILED),
  },
];

const Detail = () => {
  return (
    <section className={style.detail}>
      <h1 className={style.detailHeader}>All System Operation report</h1>
      <div className={style.mainDetail}>
        {report.map((el, i) => (
          <StatusReport title={el.title} status={el.status} key={i} />
        ))}
      </div>
    </section>
  );
};

export default Detail;
