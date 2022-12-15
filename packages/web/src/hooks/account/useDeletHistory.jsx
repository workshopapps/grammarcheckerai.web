import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';
import toast from 'react-hot-toast';

const success = (msg) => toast.success(msg);
const error = (msg) => toast.error(msg);

const useDeleteHistory = () => {
  return useCustomMutation({
    method: 'delete',
    endpoint: ENDPOINTS.API_CHAT_HISTORY,
    queryKey: ['delete-history'],
    showSuccessToast: false,
    onSettled: (res, err) => {
      if (!err) {
        success(res?.data?.message);
      }
      if (!res) {
        error(err?.response?.data?.message);
      }
    },
  });
};

export default useDeleteHistory;
