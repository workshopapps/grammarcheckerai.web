import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';
const usePay = () => {
  return useCustomMutation({
    method: 'post',
    endpoint: ENDPOINTS.API_PREMIUM_PAY,
    queryKey: 'pay',
    origin: 'https://localhost:5000',
    showSuccessToast: false,
  });
};

export default usePay;
