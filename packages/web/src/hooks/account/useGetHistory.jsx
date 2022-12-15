import { ENDPOINTS } from '../../lib/constants';
import useCustomQuery from '../useCustomQuery';

const useGetChatHistory = () => {
  return useCustomQuery({
    method: 'get',
    endpoint: ENDPOINTS.API_CHAT_HISTORY,
    queryKey: ['history'],
    showSuccessToast: false,
  });
};

export default useGetChatHistory;
