import { ENDPOINTS } from '../../lib/constants';
import useCustomQuery from '../useCustomQuery';

const userCheckPlanVerify = (email, txref) => {
  return useCustomQuery({
    method: 'get',
    endpoint: ENDPOINTS.API_PREMIUM_VERIFY(email, txref),
    // isCreathorsApi: false,
    queryKey: [email, txref],
    headers: {
      authorization: 'Bearer sk_test_30c6122a460a1b8e03c16a44f331ffdfab463c3e',
      'content-type': 'application/json',
      'cache-control': 'no-cache',
    },
    showSuccessToast: false,
  });
};

export default userCheckPlanVerify;
