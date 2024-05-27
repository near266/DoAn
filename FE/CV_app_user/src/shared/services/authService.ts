import { AxiosResponse } from 'axios';

import { httpClient } from '@/core';

class AuthService {
  async currentUser() {
    const res = await httpClient.get('auth/me');
    return res.data;
  }

  async updateMeInfo(userInfo) {
    const res = await httpClient.put('/api/UserInfo/UserInfo/Update', { userInfo });
    return res.data;
  }

  async changePassword(params) {
    const res = await httpClient.post('/api/User/reset-password', params);
    return res.data;
  }

  async refreshToken() {
    const res = await httpClient.post('auth/refresh-token', null, {
      withCredentials: true,
    });
    return res.data;
  }

  async logout() {
    const res = await httpClient.post('auth/logout', null, { withCredentials: true });
    return res.data;
  }
}

export const authService = new AuthService();
