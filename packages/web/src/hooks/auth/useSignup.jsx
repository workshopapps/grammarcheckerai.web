import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';
const useSignup = () => {
  return useCustomMutation({
    method: 'post',
    endpoint: ENDPOINTS.API_INITIATE_SIGNUP,
    queryKey: 'signup',
    showSuccessToast: false,
  });
};

export default useSignup;
