import { ENDPOINTS } from '../lib/constants';
import { secureRequest } from '../lib/utils';
import { useQuery } from '@tanstack/react-query';

export const getQueryAction = (payload) => {
  const { endpoint, method, body, headers, isGrittyApi = true } = payload;

  const url = isGrittyApi ? ENDPOINTS.API_BASE_URL + endpoint : endpoint;

  return {
    queryFn: () => {
      return secureRequest({
        url,
        method,
        body,
        headers,
      });
    },
    ...payload,
  };
};

function useQueryActionHook(data) {
  const { queryFn, queryKey, endpoint, ...others } = getQueryAction({
    ...data,
  });

  const queryResult = useQuery({
    queryFn,
    queryKey: queryKey || endpoint,

    onError: (err) => {
      if (err) {
        // Push the error
      } else {
        //  push the error
      }
    },
    onSettled: () => {
      return;
    },
    retry: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    ...others,
  });

  return {
    ...queryResult,
    value: queryResult.data?.data?.data,
  };
}

export default useQueryActionHook;
