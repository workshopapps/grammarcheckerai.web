import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';
import toast from 'react-hot-toast';

const success = (msg) => toast.success(msg);
const error = (msg) => toast.error(msg);

const useDeleteSingleHistory = (messageId) => {
  return useCustomMutation({
    method: 'delete',
    endpoint: ENDPOINTS.API_SING_CHAT_HISTORY(messageId),
    queryKey: [messageId],
    showSuccessToast: false,
    onSettled: (res, err) => {
      console.log(res, 'res');
      console.log(err, 'err');
      if (!err) {
        success(res?.data?.message);
      } else {
        error(err?.response?.data?.message);
      }
    },
  });
};

export default useDeleteSingleHistory;
