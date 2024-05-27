import { IUser } from '@/interfaces';

export interface IUserDetail extends IUser {
  following_users_count?: number;
  p?: number;
}
export interface MOMORESPONSE_URL_OBJ {
  partnerCode: string;
  orderId: string;
  requestId: string;
  amount: string;
  orderInfo: string;
  orderType: string;
  transId: string;
  resultCode: string;
  message: string;
  payType: string;
  responseTime: string;
  extraData: string;
  signature: string;
}
