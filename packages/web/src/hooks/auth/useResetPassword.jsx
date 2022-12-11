// eslint-disable-next-line import/namespace
import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';

const useResetPassword = (token) => {
  return useCustomMutation({
    method: 'post',
    endpoint: ENDPOINTS.API_AUTH_RESET_PASSWORD(token),
    queryKey: [token],
    showSuccessToast: false,
  });
};

export default useResetPassword;
