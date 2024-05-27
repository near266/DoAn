import {
  ApproveStatusId,
  DiplomaId,
  ExperienceId,
  FormOfWorkId,
  IRecruitment,
  StatusId,
} from '@/components/models/IRecruitment';
import { IServerResponse } from '@/interfaces/server/IServerResponse';
import { apiEnterprise } from '@/shared/axios/apiv3';
export default interface ICareer {
  id: number;
  name: string;
}
export type UpdateApprovementParam = { status_id: number; reason_of_rejection: string };
export type UpdateStatusParam = { status_id: number };
export type CreateJobPost = {
  enterprise_id: string;
  career_field_id: 0;
  career_id: string;
  title: string;
  slug: string;
  city: string;
  district: string;
  address: string;
  map_url: string;
  image_url: string;
  form_of_work: string;
  diploma: string;
  experience: string;
  level: string;
  gender: string;
  deadline: any;
  probationary_period: string;
  salary_type: string;
  salary_min: 0;
  salary_max: 0;
  overview: string;
  requirement: string;
  benefit: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  status_id: string;
  // approve_status_id: string;
  // reason_of_view: string;
  // total_view: 0;
  // total_cv: 0;
  // deleted_at: '2024-05-12T13:06:05.613Z';
  // created_by: string;
  created_date: any;
  // update_by: string;
  // update_at: '2024-05-12T13:06:05.613Z';
};
export type PayloadContact = {
  name: string;
  email: string;
  phone: string;
  content: string;
};
export type ViewAllFields = {
  page: number;
  pageSize: number;
};
export type SearchCaree = {
  idField: any;
  page: number;
  pageSize: number;
};
export type CreatePost = {
  title: string;
  city_id: number;
  district_id: number;
  form_of_work_id: FormOfWorkId;
  diploma_id: DiplomaId;
  experience_id: ExperienceId;
  career_field_id: number;
  career_id: string;
  deadline: string;
  probationary_period_id: number;
  salary_type_id: number;
  salary_min: number;
  salary_max: number;
  overview: string;
  requirement: string;
  benefit: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  status_id: StatusId;
  active_status_id: StatusId;
  image_url?: string;
  view_count?: number;
  approve_status_id?: ApproveStatusId;
  slug?: string;
  enterprise_id?: string;
  reason_of_rejection?: string;
  updated_at?: string;
};

export type UpdatePost = {
  id: string;
  title: string;
  city_id: number;
  district_id: number;
  form_of_work_id: FormOfWorkId;
  diploma_id: DiplomaId;
  experience_id: ExperienceId;
  career_field_id: number;
  career_id: string;
  deadline: string;
  probationary_period_id: number;
  salary_type_id: number;
  salary_min: number;
  salary_max: number;
  overview: string;
  requirement: string;
  benefit: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  status_id: StatusId;
  active_status_id: StatusId;
  image_url?: string;
  view_count?: number;
  approve_status_id?: ApproveStatusId;
  slug?: string;
  enterprise_id?: string;
  reason_of_rejection?: string;
  updated_at?: string;
};
export type Detail = {
  id: string;
};
export type SearchPost = {
  enterprise_id: string;
  page: number;
  pageSize: number;
};
export type Create = {
  job_post_id: 0;
  user_id: 0;
  name: string;
  email: string;
  phone: string;
  cv_path: string;
  status_id: string;
  created_at: any;
};
class AllAPI {
  CreateCandidate = async (payload: any) => {
    const data = await apiEnterprise.post('/api/Cv/Candidate/create', payload);
    return data.data;
  };
  UploadCv = async (file: FormData) => {
    const data = await apiEnterprise.post('/api/Upload/uploadV2', file);
    return data.data;
  };
}

export const allAPI = new AllAPI();
