import { ENDPOINTS } from '../../lib/constants';
import useCustomQuery from '../useCustomQuery';

const useGetUserSubscription = (email) => {
  return useCustomQuery({
    method: 'get',
    endpoint: ENDPOINTS.API_USER_SUBSCRIPTION(email),
    // isCreathorsApi: false,
    queryKey: [email],
    showSuccessToast: false,
  });
};

export default useGetUserSubscription;
