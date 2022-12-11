import { ENDPOINTS } from '../../lib/constants';
import useCustomPlan from '../useCustomPlan';
const useStripe = () => {
  return useCustomPlan({
    method: 'post',
    endpoint: ENDPOINTS.API_STRIPE_PAY,
    queryKey: 'stripe_pay',
    port: 443,
    headers: {
      Authorization:
        'Bearer sk_test_51LHctJCwY1P88UifjNhHz5DTsWpGnkzN0H2RPp543jIXq8KsQxp41mtZwZVrMBtQnm0L5GpsFvOGjPUDCl5cxW2900Bysdpxpj',
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

export default useStripe;
