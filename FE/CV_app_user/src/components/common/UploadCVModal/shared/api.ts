import { axiosInstanceV4 } from '@/shared/axios';
import { IGetListLicenseReq } from './uploadCV';
import axios from 'axios';

class UploadCVServiceService {
  createFormCV = async (param) => {
    const response = await axiosInstanceV4.post('/enterprise/createForm', param);
    return response.data;
  };
  createUploadFile = async (param) => {
    const response = await axiosInstanceV4.post('/api/upload/UploadFile', param);
    return response.data;
  };
}

export const upLoadCVServiceService = new UploadCVServiceService();
