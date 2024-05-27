import { AxiosResponse } from 'axios';

import { httpClient } from '@/core';
import { PostForm } from '../models/postForm';

const baseUrl = 'posts';

class PostService {
  async getList(baseUri: string, page: number) {
    const res: AxiosResponse = await httpClient.get(baseUri, {
      params: { page },
    });

    return res.data;
  }

  async delete(slug) {
    const res: AxiosResponse = await httpClient.delete(`${baseUrl}/${slug}`);
    return res.data;
  }

  async create(params: PostForm) {
    const res: AxiosResponse = await httpClient.post(`${baseUrl}`, params);
    return res.data;
  }

  async update(id, params: PostForm) {
    const res: AxiosResponse = await httpClient.put(`${baseUrl}/${id}`, params);
    return res.data;
  }
}

export const postService = new PostService();
