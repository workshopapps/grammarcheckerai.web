import { ENDPOINTS } from '../../lib/constants';
import useCustomPlan from '../useCustomMutation';
const useStripe = () => {
  return useCustomPlan({
    method: 'post',
    endpoint: ENDPOINTS.API_STRIPE_PAY,
    queryKey: 'stripe_pay',
    origin: 'https://localhost:5000',
    showSuccessToast: false,
    onSettled: (res, err) => {
      if (!err) {
        console.log(res);
      }
    },
  });
};

export default useStripe;
