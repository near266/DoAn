import { httpClient } from '@/core';
import { AxiosResponse } from 'axios';

class HomeService {
  async getHomePosts() {
    const res: AxiosResponse = await httpClient.get('get-home-posts');
    return res.data;
  }

  async getHomeMentors() {
    const res: AxiosResponse = await httpClient.get('mentors', {
      params: {
        page: 1,
        per_page: 8,
        in_homepage: true,
      },
    });
    return res.data;
  }
}

export const homeService = new HomeService();
