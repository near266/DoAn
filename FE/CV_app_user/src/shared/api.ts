import { FORM_DATA_FIELD, GET_OTP_TYPE } from '@/shared/enums';
import { apiEnterprise } from '@/shared/axios/apiv3';
export type RegisterPayload = {
  name: string;
  userName: string;
  phone: string;
  gender_id: number;
  address: string;
  enterprise_name: string;
  city_id: string;
  district_id: string;
  account_id: string;
  email: string;
  password: string;
  confirmPassword: string;

  // last_name: string;
  // first_name: string;
  // phone: string;
  // gender_id: number;
  // address: string;
  // enterprise_name: string;
  // city_id: number;
  // district_id: number;
  // email: string;
  // password: string;
  // confirmed_password: string;
  // receive_news: true;
};

export type UserInfo = {
  id: string;
  address: string;
  avatar: string;
  gender_id: 0;
  birthday: string;
  account_id: string;
  phone: string;
  city_id: string;
  district_id: string;
  ward_id: string;
  created_by: string;
  created_date: any;
  update_by: string;
  update_atany;
};
class Register {
  async registerAccount(payload: RegisterPayload) {
    const res = await apiEnterprise.post('/api/UserInfo/UserInfo/Create', payload);
    return res.data;
  }
  async getuserInfo(payload: any) {
    const res = await apiEnterprise.get(`/api/UserInfo/auth/me?id=${payload}`);
    return res.data;
  }
  async getOtp(phone: FORM_DATA_FIELD.phone, type: GET_OTP_TYPE) {
    const res = await apiEnterprise.get(`/otp?phone=${phone}&type=${type}`);
    return res.data;
  }

  async verifyOtp(token: string, code: string, type: GET_OTP_TYPE) {
    const res = await apiEnterprise.get(
      `/otp/verify?token=${token}&code=${code}&type=${type}`
    );
    return res.data;
  }
}
export const registerInstance = new Register();
