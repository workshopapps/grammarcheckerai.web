import { ENDPOINTS } from '../../lib/constants';
import useCustomPlan from '../useCustomPlan';
const usePremium = () => {
  return useCustomPlan({
    method: 'post',
    endpoint: ENDPOINTS.API_PAYSTACK_URL,
    queryKey: 'plan',
    port: 443,
    headers: {
      Authorization: 'Bearer sk_test_30c6122a460a1b8e03c16a44f331ffdfab463c3e',
      'Content-Type': 'application/json',
    },
    showSuccessToast: false,
  });
};

export default usePremium;
