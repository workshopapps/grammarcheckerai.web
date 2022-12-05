import { useMutation } from '@tanstack/react-query';
import { ENDPOINTS } from '../lib/constants';
import { secureRequest } from '../lib/utils';
const getMutationAction = (mutationData) => {
  const { port, endpoint, method, headers, isCreathorsApi = true } = mutationData;
  const url = isCreathorsApi ? ENDPOINTS.API_BASE_PAYSTACK_URL + endpoint : endpoint;
  return {
    mutationFn: (body) =>
      secureRequest({
        url,
        method,
        body,
        port,
        headers,
      }),
    ...mutationData,
  };
};
function useCustomPlan(mutationData) {
  const {
    mutationFn,
    endpoint,
    showSuccessToast = true,
    showFailureToast = true,
    ...others
  } = getMutationAction({
    ...mutationData,
  });
  const mutatationResult = useMutation(mutationFn, {
    mutationKey: endpoint,
    onError: () => {
      if (showFailureToast) {
        // show failure
      }
      mutatationResult.reset();
    },
    onSettled: (res, err) => {
      if (err) mutatationResult.reset();
      if (!err && showSuccessToast) {
        // show success
      }
      return;
    },
    retry: false,
    refetchOnWindowFocus: false,
    ...others,
  });
  return { ...mutatationResult, value: mutatationResult?.data };
}
export default useCustomPlan;
