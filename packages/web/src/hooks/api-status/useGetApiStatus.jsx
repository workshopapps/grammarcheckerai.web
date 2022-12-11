import { ENDPOINTS } from '../../lib/constants';
import useCustomQuery from '../useCustomQuery';

const useGetApiStatus = () => {
  return useCustomQuery({
    method: 'get',
    endpoint: ENDPOINTS.API_STATUS_URL,
    queryKey: ['api-status'],
  });
};

export default useGetApiStatus;
