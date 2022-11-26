import { ENDPOINTS } from '../../lib/constants';
import useCustomMutation from '../useCustomMutation';

const useSendAudioFile = () => {
  return useCustomMutation({
    method: 'post',
    endpoint: ENDPOINTS.API_SEND_AUDIO,
    // isCreathorsApi: false,
    queryKey: 'send-audio',
    showSuccessToast: false,
  });
};

export default useSendAudioFile;
