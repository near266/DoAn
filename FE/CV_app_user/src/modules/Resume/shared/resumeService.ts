import { httpClient } from '@/core';
import { AxiosResponse, AxiosError } from 'axios';
import Router from 'next/router';

const baseUrl = 'cv-profiles';

class ResumeService {
  async show(id) {
    const res: AxiosResponse = await httpClient
      .get(`${baseUrl}/${id}`)
      .catch((xhr: AxiosError) => {
        if (xhr.response.status === 404) {
          Router.replace('/not-found');
        }
        return xhr.response;
      });
    return res.data;
  }

  async add(params: any) {
    const res: AxiosResponse = await httpClient
      .post(`${baseUrl}`, params)
      .catch(catchError);
    return res.data;
  }

  async update(id, params: any) {
    const res: AxiosResponse = await httpClient
      .put(`${baseUrl}/${id}`, params)
      .catch(catchError);
    return res.data;
  }

  async delete(id) {
    const res: AxiosResponse = await httpClient.delete(`${baseUrl}/${id}`);
    return res.data;
  }

  async download(id) {
    const res: AxiosResponse = await httpClient.get(`download-cv/${id}`, {
      responseType: 'blob',
    });
    return res;
  }
}

export const resumeService = new ResumeService();

function catchError(error: AxiosError): AxiosResponse {
  return error.response;
}
