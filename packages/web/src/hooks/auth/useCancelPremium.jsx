import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';
const usePay = () => {
  return useCustomMutation({
    method: 'post',
    endpoint: ENDPOINTS.API_PREMIUM_CANCEL,
    queryKey: 'pay',
    origin: 'https://localhost:5000',
    headers: {
      Authorization: 'Bearer pk_test_79b1560168d893e4e503c39acdc3b49f02db69c3',
      'Content-Type': 'application/json',
    },
    showSuccessToast: false,
  });
};

export default usePay;
