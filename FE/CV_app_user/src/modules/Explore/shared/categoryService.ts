import { httpClient } from '@/core';

export const requestGetAll = () => {
  return httpClient.get('categories?withFollow=1').then((res) => res.data);
};
