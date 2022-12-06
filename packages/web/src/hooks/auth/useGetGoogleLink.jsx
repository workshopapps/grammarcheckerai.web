import { ENDPOINTS } from '../../lib/constants';
import useCustomQuery from '../useCustomQuery';


const useGetGoogleLink = () => {
  return useCustomQuery({
    method: 'get',
    endpoint: ENDPOINTS.API_AUTH_GOOGLE,
    queryKey: 'google',
    onSettled: (res, err) => {
      if (!err) {
        console.log(res);
      }
    },
  }); 
};

export default useGetGoogleLink;
