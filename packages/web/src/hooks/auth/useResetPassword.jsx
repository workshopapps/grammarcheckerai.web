import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';

const useResetPassword = () => {
  return useCustomMutation({
    method: 'post',
    endpoint: ENDPOINTS.API_AUTH_FORGOT_PASSWORD,
    queryKey: 'forgot-password',
    showSuccessToast: false,
    onSettled: (res, err) => {
      if (!err) {
        console.log(res);
      }
    },
  });
};

export default useResetPassword;
