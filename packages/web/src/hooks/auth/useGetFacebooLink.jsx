import { ENDPOINTS } from '../../lib/constants';
import useCustomQuery from '../useCustomQuery';

const useGetFacebookLink = () => {
  return useCustomQuery({
    method: 'get',
    endpoint: ENDPOINTS.API_AUTH_FACEBOOK,
    queryKey: 'facebook',
  });
};

export default useGetFacebookLink;
