import { IServerResponse } from '@/interfaces';
import { httpClientV2 } from '@/modules/TestAssessment/shared/httpClientV2';

export type BankTransferPayload = { items: string[] };
class PurchaseAPI {
  requestBankTransfer = async (params: BankTransferPayload): Promise<IServerResponse> => {
    const res = await httpClientV2.post('/checkout/bank-transfer', params);
    return res.data;
  };
}
export const purchaseAPI = new PurchaseAPI();
