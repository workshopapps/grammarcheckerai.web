import { ENDPOINTS } from '../../lib/constants';
import useCustomQuery from '../useCustomQuery';

const useUserProfile = (userId) => {
  return useCustomQuery({
    method: 'get',
    endpoint: ENDPOINTS.API_USER_PROFILE(userId),
    // isCreathorsApi: false,
    queryKey: [userId],
    showSuccessToast: false,
  });
};

export default useUserProfile;
