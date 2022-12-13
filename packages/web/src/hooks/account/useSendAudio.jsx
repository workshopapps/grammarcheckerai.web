import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';

const useSendAudioFile = () => {
  return useCustomMutation({
    method: 'post',
    // endpoint: ENDPOINTS.API_SEND_AUDIO,
    endpoint: 'https://6c9a-197-211-32-243.ngrok.io',
    isCreathorsApi: false,
    queryKey: 'send-audio',
    showSuccessToast: false,
  });
};

export default useSendAudioFile;
