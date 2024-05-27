export interface IPostJob {
  id: number;
  enterprise_id: number;
  career_field_id: number;
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
  deadline: string;
  probationary_period: string;
  salary_type: string;
  salary_min: number;
  salary_max: number;
  overview: string;
  requirement: string;
  benefit: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  status_id: string;
  approve_status_id: string;
  reason_of_view: string;
  total_view: number;
  total_cv: number;
  created_date: number;
  updated_at: number;
  deleted_at: any;
  enterprise: Enterprise;
  career_field: CareerField;
  career: any;
}

export interface Enterprise {
  id: number;
  user_id: number;
  name: string;
  abbreviation_name: string;
  phone: string;
  phone_verified_at: string;
  career_field_id: any;
  website_url: any;
  introduce: any;
  scale_id: any;
  city: string;
  district: string;
  ward: any;
  address: string;
  map_url: any;
  job_post_count: any;
  business_license_key: any;
  authorization_letter_key: any;
  approve_status_id: string;
  reason_of_rejection: any;
  receive_news: number;
  pricing_plan_id: any;
  pricing_plan_start_at: any;
  pricing_plan_end_at: any;
  created_at: number;
  updated_at: number;
  deleted_at: any;
}

export interface CareerField {
  id: number;
  name: string;
  active: string;
  avatar: string;
  created_at: number;
  updated_at: number;
}
