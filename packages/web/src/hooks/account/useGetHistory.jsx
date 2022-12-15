import { ENDPOINTS } from '../../lib/constants';
import useCustomQuery from '../useCustomQuery';
import toast from 'react-hot-toast';
const error = (msg) => toast.error(msg);

const useGetChatHistory = () => {
  return useCustomQuery({
    method: 'get',
    endpoint: ENDPOINTS.API_CHAT_HISTORY,
    queryKey: ['history'],
    onSettled: (res, err) => {
      if (!err) {
        //
      } else {
        error('Something went wrong');
      }
    },
  });
};

export default useGetChatHistory;
