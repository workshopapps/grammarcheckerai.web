import axios from 'axios';
import { diffWordsWithSpace } from 'diff';
import { Tooltip } from '@mui/material';

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

export function compareStrings(string1, string2) {
  let results = diffWordsWithSpace(string1, string2);

  let output = [];
  results.forEach((item) => {
    if (item.removed) {
      output.push(
        <Tooltip arrow title={item.value}>
          <span className="text-[#EC1B1B] underline underline-offset-2">{item.value}</span>
        </Tooltip>,
      );
    } else if (!item.added) {
      output.push(<span>{item.value}</span>);
    }
  });

  return output;
}

export function compareCorrection(string1, string2) {
  let results = diffWordsWithSpace(string1, string2);

  let output = [];
  results.forEach((item) => {
    if (item.removed) {
      output.push(
        <Tooltip arrow title={item.value}>
          <span className="text-[#279371]">{item.value}</span>
        </Tooltip>,
      );
    } else if (!item.added) {
      output.push(<span>{item.value}</span>);
    }
  });

  return output;
}
