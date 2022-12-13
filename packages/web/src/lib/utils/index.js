import axios from 'axios';

export const secureRequest = async ({ url, method = 'get', body = undefined, headers: requestHeader }) => {
  //   get
  const token = localStorage.getItem('grittyusertoken');

  const grittyHeaders = {
    Authorization: `Bearer ${token}`,
  };

  const headers = { ...grittyHeaders, ...requestHeader };

  if (method.toLocaleLowerCase() === 'get' || method.toLocaleLowerCase() === 'delete') {
    //dont include body in GET request request will fail
    return axios[method](url, {
      params: {
        ...body,
      },
      headers,
    });
  }

  return axios[method](url, body, { headers });
};

export const convertSecToMin = (timer) => {
  return timer ? new Date(Math.floor(timer) * 1000).toISOString().substring(14, 19) : '00:00';
};
