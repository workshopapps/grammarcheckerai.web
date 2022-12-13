import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';

const useAuthGoogle = (params) => {
  return useCustomMutation({
    method: 'post',
    endpoint: ENDPOINTS.API_AUTH_POST_GOOGLE(params),
    queryKey: [params],
    redirect: 'follow',
    showSuccessToast: false,
  });
};

export default useAuthGoogle;
