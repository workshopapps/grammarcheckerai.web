import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';

const useInitiateSignup = () => {
  return useCustomMutation({
    method: 'post',
    endpoint: ENDPOINTS.API_INITIATE_SIGNUP,
    queryKey: 'NAMESPACE.INITIATE_SIGNUP',
    showSuccessToast: false,
  });
};

export default useInitiateSignup;
