import { ENDPOINTS } from '../../lib/constants';
import useCustomPlan from '../useCustomMutation';
const useFlutter = () => {
  return useCustomPlan({
    method: 'post',
    endpoint: ENDPOINTS.API_FLUTTER_PAY,
    queryKey: 'flutterwave_pay',
    origin: 'https://localhost:5000',
    showSuccessToast: false,
    onSettled: (res, err) => {
      if (!err) {
        console.log(res);
      }
    },
  });
};

export default useFlutter;
