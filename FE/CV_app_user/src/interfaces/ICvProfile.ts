export interface ICvProfile {
  id?: number;
  template_id?: number;
  title?: string;
  fullname?: string;
  apply_position?: string;
  avatar?: string;
  phone_number?: string;
  email?: string;
  birthday?: string;
  website?: string;
  address?: string;
  objective_headline?: string;
  objective_content?: string;
  experience_headline?: string;
  education_headline?: string;
  activity_headline?: string;
  skill_headline?: string;
  other_headline?: string;
  other_content?: string;
  status?: number;
  created_at?: string;
  updated_at?: string;

  // realation
  educations?: ICvProfileEducation[];
  experiences?: ICvProfileExperience[];
  activities?: ICvProfileActivity[];
  skills?: ICvProfileSkill[];
}

export interface ICvProfileEducation {
  id?: number;
  profile_id?: number;
  school?: string;
  major?: string;
  detail?: string;
  period?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ICvProfileExperience {
  id?: number;
  profile_id?: number;
  company?: string;
  position?: string;
  detail?: string;
  period?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ICvProfileActivity {
  id?: number;
  profile_id?: number;
  name?: string;
  position?: string;
  detail?: string;
  period?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ICvProfileSkill {
  id?: number;
  profile_id?: number;
  name?: string;
  rate?: number;
  created_at?: string;
  updated_at?: string;
}
