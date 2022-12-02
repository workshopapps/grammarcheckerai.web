import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';

const useForgotPassword = () => {
  return useCustomMutation({
    method: 'post',
    endpoint: ENDPOINTS.API_AUTH_FORGOT_PASSWORD,
    queryKey: 'forgot-password',
    showSuccessToast: false,
  });
};

export default useForgotPassword;
