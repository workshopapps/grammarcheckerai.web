import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';

const useAuthFacebook = (params) => {
  return useCustomMutation({
    method: 'post',
    endpoint: ENDPOINTS.API_AUTH_POST_FACEBOOK(params),
    queryKey: [params],
    redirect: 'follow',
    showSuccessToast: false,
    onSettled: (res, err) => {
      if (!err) {
        console.log(res);
      }
    },
  });
};

export default useAuthFacebook;
