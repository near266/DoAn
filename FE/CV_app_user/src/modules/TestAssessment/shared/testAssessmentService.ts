import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { httpClientV2 } from './httpClientV2';
import { defaultPaginationSize } from './variables';

class TestService {
  private isProduction = process.env.NODE_ENV === 'production';
  private cancelTokenSource = axios.CancelToken.source();

  private instance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_V2,
    timeout: 10000,
    headers: {
      Accept: 'application/json, text/plain, */*',
    },
    cancelToken: this.cancelTokenSource.token,
  });

  // nomarl test
  private tokenMemLocal = process.env.NEXT_PUBLIC_MEMBERSHIP_TOKEN;
  // private tokenAdminLocal = process.env.NEXT_PUBLIC_ADMIN_TOKEN;
  // private tokenUserLocal = process.env.NEXT_PUBLIC_USER_TOKEN;
  private config = this.isProduction
    ? {}
    : {
        headers: {
          Authorization: `Bearer ${this.tokenMemLocal}`,
        },
      };

  /* Do not login */
  async getAssessmentFree(slug) {
    const res = await this.instance.get(`assessments-free/${slug}`);
    return res.data;
  }
  async getAllAssessments(type?: number, page?: number, size = defaultPaginationSize) {
    const res = await this.instance.get(
      type ? `assessments?type=${type}&page=${page}&size=${size}` : 'assessments'
    );
    return res.data;
  }

  /* Need login */
  async submitTest(id, params: any) {
    const res: AxiosResponse = await httpClientV2.post(
      `submit/${id}`,
      params,
      this.config
    );
    return res.data;
  }
  async getAssessmentInfo(slug) {
    const res = await httpClientV2.get(`assessments/${slug}`);
    return res.data;
  }

  async getPrivilege(slug) {
    const res = await httpClientV2.get(`access-assessment/${slug}`);
    return res.data;
  }

  async getAssessmentResult(slug) {
    const res = await httpClientV2.get(`get-assessment-test-result/${slug}`);
    return res.data;
  }
}

export const testService = new TestService();
