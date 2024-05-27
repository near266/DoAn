import { any } from 'prop-types';

export enum LICENSE_DATA_FIELD {
  birthday = 'birthday',
  fullname = 'fullname',
  email = 'email',
  phone_number = 'phone_number',
  address = 'address',
  period = 'period',
  field = 'field',
  province = 'province',
  district = 'district',
  wards = 'wards',
  cv_path = 'cv_path',
  gender = 'gender',
}

export enum FORM_CREATE_CANDIADTE {
  name = 'name',
  email = 'email',
  phone = 'phone',
  cv_path = 'cv_path',
}
// Sub fields of cv_edu
export enum CV_EDU_DATA_FIELD {
  school = 'school',
  major = 'major',
  start_day = 'start_day',
  end_day = 'end_day',
}

export enum CV_EXP_DATA_FIELD {
  company = 'company',
  major = 'major',
  position = 'position',
  start_day_exp = 'start_day_exp',
  end_day_exp = 'end_day_exp',
}

export const listGender = [
  {
    label: 'Nam',
    value: 0,
  },
  {
    label: 'Nữ',
    value: 1,
  },
  {
    label: 'Khác',
    value: 2,
  },
];

export const listFeild = [
  {
    label: 'Sale & Marketing',
    value: 0,
  },
  {
    label: 'Công nghệ thông tin',
    value: 1,
  },
  {
    label: 'Quản trị kinh doanh',
    value: 2,
  },
];
