import { useMutation } from '@tanstack/react-query';
import { ENDPOINTS } from '../lib/constants';
import { secureRequest } from '../lib/utils/secureRequest';

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

    onError: (err) => {
      if (showFailureToast) {
        console.log({
          title: `Request Failed`,
          description: `${err.response?.data?.message}`,
          status: 'error',
        });
      }
      mutatationResult.reset();
    },
    onSettled: (res, err) => {
      if (err) mutatationResult.reset();
      if (!err && showSuccessToast) {
        console.log({
          title: `Request Successful`,
          description: `${res.data.message}`,
          status: 'success',
        });
      }
      return;
    },
    retry: false,
    refetchOnWindowFocus: false,
    ...others,
  });

  return { ...mutatationResult, value: mutatationResult?.data?.data };
}

export default useCustomMutation;
