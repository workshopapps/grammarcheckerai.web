import { ENDPOINTS } from '../../lib/constants';
import useCustomQuery from '../useCustomQuery';

const useGetChatHistory = () => {
  return useCustomQuery({
    method: 'get',
    endpoint: ENDPOINTS.API_CHAT_HISTORY,
    // isCreathorsApi: false,
    queryKey: 'getSubs',
    showSuccessToast: false,
  });
};

export default useGetChatHistory;
