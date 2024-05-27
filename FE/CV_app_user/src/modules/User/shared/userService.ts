import { httpClient } from '@/core';
import { AxiosResponse } from 'axios';

class UserService {
  async changeAvatar(formData: any) {
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    };

    const res: AxiosResponse = await httpClient.post(
      '/api/Upload/uploadV2',
      formData,
      config
    );
    return res.data;
  }
}

export const userService = new UserService();
