import style from './ReportDetail.module.css';
import { ValidateStatus } from '../../../lib/utils/validate-status-api';
import StatusReport from '../../../components/StatusReport/StatusReport';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Detail = () => {
  const [status, setStatus] = useState([]);
  const apiTest = async () => {
    const data = await axios.get('https://api.speakbetter.hng.tech/v1/test')
    console.log(data);
    data.data.map((item, index) => {

      let statusImg = ''
      if (item[Object.keys(item)].status === 'ok') {
        statusImg = "SUCCESS"
      } else if (item[Object.keys(item)].status === 'down') {
        statusImg = "FAILED"
      } else {
        statusImg = "WARNING"
      }
      setStatus(status => [...status, { title: Object.keys(item), status: ValidateStatus(statusImg) }]);
    }
    )
  }
  useEffect(() => {
    apiTest()
  }, [])

  return (
    <section className={style.detail}>
      <h1 className={style.detailHeader}>All System Operation report</h1>
      <div className={style.mainDetail}>
        {status?.map((el, i) => (
          <StatusReport title={el.title} status={el.status} key={i} />
        ))}
      </div>
    </section>
  );
};

export default Detail;
