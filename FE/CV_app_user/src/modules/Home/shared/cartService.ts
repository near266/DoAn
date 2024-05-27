import { httpClient } from '@/core';
import { httpClientV2 } from '@/modules/TestAssessment/shared/httpClientV2';
import { AxiosResponse } from 'axios';

class CartService {
  async getHomePosts() {
    const res: AxiosResponse = await httpClient.get('get-home-posts');
    return res.data;
  }
  async updateCart(params: {
    items?: [{ id: string; quantity: number }?];
    deleted?: string[];
  }) {
    const res: AxiosResponse = await httpClientV2.put('/cart/update', params);
    return res.data;
  }
}

export const cartServices = new CartService();
