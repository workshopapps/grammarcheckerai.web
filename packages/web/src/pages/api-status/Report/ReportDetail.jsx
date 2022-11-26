import style from './ReportDetail.module.css';
import { SUCCESS, FAILED, WARNING } from '../../../lib/constants/StatusTypes';
import { ValidateStatus } from '../../../lib/utils/validate-status-api';
import StatusReport from '../../../components/StatusReport/StatusReport';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
  const [status, setStatus] = useState([]); 
  const apiTest = async () => {
    const data = await axios.get('https://grittygrammar.hng.tech/api/v1/test')

    data.data.map((item, index) => {
    let statusImg = ''
      if(item[Object.keys(item)].status === 'ok'){
        statusImg = "SUCCESS"
      }else if( item[Object.keys(item)].status === 'down'){
        statusImg = "FAILED"
      }else{
        statusImg = "WARNING"
      }
    
      setStatus(status => [...status, {title: Object.keys(item), status: ValidateStatus(statusImg)}] );

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
