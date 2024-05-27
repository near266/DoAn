import { httpClient } from '@/core';

export const requestGetResultsCurrentUser = (params) => {
  return httpClient
    .get('me/assessment-results', {
      params: params,
    })
    .then((res) => res.data);
};
