import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';
const useGoogle = () => {
  return useCustomMutation({
    method: 'get',
    endpoint: ENDPOINTS.API_AUTH_GOOGLE,
    queryKey: 'google',
    redirect: 'follow',
    showSuccessToast: false,
    onSettled: (res, err) => {
      if (!err) {
        console.log(res);
      }
    },
  });
};

export default useGoogle;
