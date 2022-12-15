import style from './ReportDetail.module.css';
import StatusReport from '../../../components/StatusReport/StatusReport';
import useGetApiStatus from '../../../hooks/api-status/useGetApiStatus';

const Detail = () => {
  const apiStatus = useGetApiStatus();

  return (
    <section className={style.detail}>
      <h1 className={style.detailHeader}>All System Operation report</h1>
      <div className={style.mainDetail}>
        {apiStatus?.data?.data.map((item) => (
          <StatusReport
            title={Object.keys(item)[0]}
            value={item[Object.keys(item)[0]].status}
            key={Object.keys(item)[0]}
          />
        ))}
      </div>
    </section>
  );
};

export default Detail;
