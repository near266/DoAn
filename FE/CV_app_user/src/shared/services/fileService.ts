import { httpClient } from '@/core';
import { AxiosResponse } from 'axios';

import { UploadFolderType, IServerResponse } from '@/interfaces';

class FileService {
  async upload(uploadFolder: any, formData: FormData) {
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    };

    const res = await httpClient.post(
      `http://localhost:8080/api/Upload/uploadV2`,
      formData,
      config
    );

    return res.data;
  }
}

export const fileService = new FileService();
