import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';

const useSendText = () => {
  return useCustomMutation({
    method: 'post',
    endpoint: ENDPOINTS.API_SEND_TEXT,
    queryKey: 'send-audio',
    showSuccessToast: false,
  });
};

export default useSendText;
