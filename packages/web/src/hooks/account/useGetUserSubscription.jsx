import { ENDPOINTS } from '../../lib/constants';
import useCustomQuery from '../useCustomQuery';

const useGetUserSubscription = () => {
  return useCustomQuery({
    method: 'get',
    endpoint: ENDPOINTS.API_USER_SUBSCRIPTION,
    // isCreathorsApi: false,
    queryKey: 'getSubs',
    showSuccessToast: false,
  });
};

export default useGetUserSubscription;
