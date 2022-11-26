import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';
const useSignup = () => {
  return useCustomMutation({
    method: 'post',
    endpoint: ENDPOINTS.API_INITIATE_SIGNUP,
    queryKey: 'signup',
    showSuccessToast: false,
    onSettled: (res, err) => {
      if (!err) {
        console.log(res);
      }
    },
  });
};

export default useSignup;
