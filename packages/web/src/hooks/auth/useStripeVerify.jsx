import { ENDPOINTS } from '../../lib/constants';
import useCustomPlan from '../useCustomMutation';
const useStripeVerify = () => {
  return useCustomPlan({
    method: 'post',
    endpoint: ENDPOINTS.API_STRIPE_VERIFY,
    queryKey: 'stripe_verify',
    origin: 'https://localhost:5000',
    showSuccessToast: false,
    onSettled: (res, err) => {
      if (!err) {
        console.log(res);
      }
    },
  });
};

export default useStripeVerify;
