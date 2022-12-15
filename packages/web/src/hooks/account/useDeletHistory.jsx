import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';

const useDeleteHistory = () => {
  return useCustomMutation({
    method: 'delete',
    endpoint: ENDPOINTS.API_CHAT_HISTORY,
    queryKey: ['delete-history'],
    showSuccessToast: false,
  });
};

export default useDeleteHistory;
