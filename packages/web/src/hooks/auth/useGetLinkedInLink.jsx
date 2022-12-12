import { ENDPOINTS } from '../../lib/constants';
import useCustomQuery from '../useCustomQuery';

const useGetLinkedInLink = () => {
  return useCustomQuery({
    method: 'get',
    endpoint: ENDPOINTS.API_AUTH_LINKEDIN,
    queryKey: 'linkedin',
  });
};

export default useGetLinkedInLink;
