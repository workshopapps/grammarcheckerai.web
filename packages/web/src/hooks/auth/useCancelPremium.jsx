import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';
const usePay = () => {
  return useCustomMutation({
    method: 'post',
    endpoint: ENDPOINTS.API_PREMIUM_CANCEL,
    queryKey: 'pay',
    origin: 'https://localhost:5000',
    headers: {
      Authorization: 'Bearer pk_test_5180356679e878fa241701e8c9b8a8d27a6db5c0',
      'Content-Type': 'application/json',
    },
    showSuccessToast: false,
  });
};

export default usePay;
