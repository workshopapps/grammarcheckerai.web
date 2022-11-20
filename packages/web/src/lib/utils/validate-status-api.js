import { SUCCESS, FAILED, WARNING } from '../constants/StatusTypes';
import successLogo from '../../assets/success.svg';
import failedLogo from '../../assets/failed.svg';
import warningLogo from '../../assets/warning.svg';

export const ValidateStatus = (value) => {
  let status;
  if (value === SUCCESS) {
    status = { statusName: 'Operational', logo: successLogo };
  }
  if (value === WARNING) {
    status = { statusName: 'Warning', logo: warningLogo };
  }

  if (value === FAILED) {
    status = { statusName: 'Outage', logo: failedLogo };
  }

  return status;
};
