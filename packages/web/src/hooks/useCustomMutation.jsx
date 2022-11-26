import { useMutation } from '@tanstack/react-query';
import { ENDPOINTS } from '../lib/constants';
import { secureRequest } from '../lib/utils';
const getMutationAction = (mutationData) => {
  const { endpoint, method, headers, isCreathorsApi = true } = mutationData;
  const url = isCreathorsApi ? ENDPOINTS.API_BASE_URL + endpoint : endpoint;
  return {
    mutationFn: (body) =>
      secureRequest({
        url,
        method,
        body,
        headers,
      }),
    ...mutationData,
  };
};
function useCustomMutation(mutationData) {
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
export default useCustomMutation;
