import { useMutation } from '@tanstack/react-query';
import { useToasts } from 'react-toast-notifications';
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
  const { addToast } = useToasts();
  const mutatationResult = useMutation(mutationFn, {
    mutationKey: endpoint,

    onError: (err) => {
      if (showFailureToast) {
        addToast(`${err.response?.data?.message} || Error`, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
      mutatationResult.reset();
    },
    onSettled: (res, err) => {
      if (err) mutatationResult.reset();
      if (!err && showSuccessToast) {
        addToast(`${res.data.message} || Error`, {
          appearance: 'success',
          autoDismiss: true,
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
