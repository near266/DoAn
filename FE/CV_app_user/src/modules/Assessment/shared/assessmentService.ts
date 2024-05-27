import { httpClient } from '@/core';
import { httpClientV2 } from '@/modules/TestAssessment/shared/httpClientV2';
import { AxiosResponse } from 'axios';

class AssessmentService {
  // nomarl test
  async submitAssessmentTest(id, params: any) {
    const res: AxiosResponse = await httpClient.post(
      `submit-assessment-test/${id}`,
      params
    );
    return res.data;
  }

  async getTestResult(slug, params: any = {}) {
    const res: AxiosResponse = await httpClient.get(
      `get-assessment-test-result/${slug}`,
      params
    );
    return res.data;
  }

  // event test
  async getTestSession(eventID) {
    const res: AxiosResponse = await httpClient.post(`start-sil-test/${eventID}`);
    return res.data;
  }
  async submitSilTest(eventID, params: any) {
    const res: AxiosResponse = await httpClient.post(
      `submit-sil-test/${eventID}`,
      params
    );
    return res.data;
  }
  // me/sil-test-results/{silEventId}

  async getSilResult(eventID) {
    const res: AxiosResponse = await httpClient.get(`me/sil-test-results/${eventID}`);
    return res.data;
  }

  // submit viral
  async submitViral(eventID, params: any) {
    const res: AxiosResponse = await httpClient.post(
      `submit-sil-user-info/${eventID}`,
      params
    );
    return res.data;
  }

  async getSubmitedViral(eventID) {
    const res: AxiosResponse = await httpClient.get(`/sil-test-info?event_id=${eventID}`);
    return res.data;
  }

  async getCart() {
    const res: AxiosResponse = await httpClientV2.get('/cart');
    return res.data;
  }

  async addToCart(id, name) {
    const res: AxiosResponse = await httpClientV2.post('/cart/add', {
      assessment_id: id,
      name: name,
    });
    return res.data;
  }

  async addCoupon(coupon) {
    const res: AxiosResponse = await httpClientV2.post('/cart/apply-coupon', {
      coupon: coupon,
    });
    return res.data;
  }

  async checkoutMomo(form) {
    const res: AxiosResponse = await httpClientV2.post('/checkout/momo', form);
    return res.data;
  }

  async checkoutAlepay(form) {
    const res: AxiosResponse = await httpClientV2.post('/checkout/alepay', form);
    return res.data;
  }
}

export const assessmentService = new AssessmentService();
