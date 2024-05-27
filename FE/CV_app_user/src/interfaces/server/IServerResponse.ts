export type STATUS_CODE = 'SUCCESS' | 'ERROR';

export interface IServerResponse {
  code: STATUS_CODE;
  payload: any;
}
