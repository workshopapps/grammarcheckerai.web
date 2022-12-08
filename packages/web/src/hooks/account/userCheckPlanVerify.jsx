import { ENDPOINTS } from '../../lib/constants';
import useCustomQuery from '../useCustomQuery';

const userCheckPlanVerify = (email, txref) => {
  return useCustomQuery({
    method: 'get',
    endpoint: ENDPOINTS.API_PREMIUM_VERIFY(email, txref),
    // isCreathorsApi: false,
    queryKey: [email, txref],
    headers: {
      authorization: 'Bearer sk_test_11cd20d24df0f472d32521e1bfb3c00608593c54',
      'content-type': 'application/json',
      'cache-control': 'no-cache',
    },
    showSuccessToast: false,
  });
};

export default userCheckPlanVerify;
