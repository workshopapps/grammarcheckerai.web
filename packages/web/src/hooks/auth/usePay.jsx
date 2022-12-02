import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';
const usePay = () => {
  return useCustomMutation({
    method: 'post',
    endpoint: ENDPOINTS.API_PREMIUM_PAY,
    queryKey: 'pay',
    showSuccessToast: false,
    onSettled: (res, err) => {
      if (!err) {
        console.log(res);
      }
    },
  });
};

export default usePay;
