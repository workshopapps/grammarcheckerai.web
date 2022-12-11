import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';

const useAuthLinkedIn = (params) => {
  return useCustomMutation({
    method: 'post',
    endpoint: ENDPOINTS.API_AUTH_POST_LINKEDIN(params),
    queryKey: [params],
    redirect: 'follow',
    showSuccessToast: false,
  });
};

export default useAuthLinkedIn;
