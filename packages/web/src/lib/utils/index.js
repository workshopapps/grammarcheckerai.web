import axios from 'axios';

export const secureRequest = async ({ url, method = 'get', body = undefined, headers: requestHeader }) => {
  //   get
  const token = '';

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
