import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';

const useLogin = () => {
  return useCustomMutation({
    method: 'post',
    endpoint: ENDPOINTS.API_AUTH_LOGIN,
    queryKey: 'login',
    showSuccessToast: false,
    onSettled: (res, err) => {
      if (!err) {
        console.log(res);
      }
    },
  });
};

export default useLogin;
