import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
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

    onError: (err) => {
      if (showFailureToast) {
        toast.error(`${err.response?.data?.message} || Error`);
      }
      mutatationResult.reset();
    },
    onSettled: (res, err) => {
      if (err) mutatationResult.reset();
      if (!err && showSuccessToast) {
        toast.error(`${res.data.message} || Error`);
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
