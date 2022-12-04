import { ENDPOINTS } from '../../lib/constants';
import useCustomPlan from '../useCustomPlan';
const usePremium = () => {
  return useCustomPlan({
    method: 'post',
    endpoint: ENDPOINTS.API_PAYSTACK_URL,
    queryKey: 'plan',
    port: 443,
    headers: {
      Authorization: 'Bearer sk_test_7c8d4865357e9ee081faf517549b011044a8cd12',
      'Content-Type': 'application/json',
    },
    showSuccessToast: false,
    onSettled: (res, err) => {
      if (!err) {
        console.log(res);
      }
    },
  });
};

export default usePremium;
