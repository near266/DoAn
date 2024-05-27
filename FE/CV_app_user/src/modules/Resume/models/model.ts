import { IUser } from '@/interfaces';
import { BLOCKY_ARRAY_LIST } from '@/shared/enums';

export class ProfileModel {
  initDefault(currentUser: IUser) {
    this.avatar = currentUser.avatar;
    this.fullname = currentUser.name;
    this.phone_number = currentUser.telephone;
    this.email = currentUser.email;
    this.address = currentUser.address;
  }

  id: string = null;
  title: string = '';
  builders: any = {
    blocky_order: BLOCKY_ARRAY_LIST,
    common_color: '#e8660e',
  };
  avatar: string = '';
  fullname: string = null;
  apply_position: string = '';
  phone_number: string = null;
  email: string = null;
  website: string = null;
  address: string = '';
  objective_headline: string = 'profile';
  objective_content: string = '';
  experience_headline: string = 'experience';
  experiences: any[] = [
    {
      company: '',
      position: '',
      detail: '',
      period: '',
    },
  ];
  education_headline: string = 'academic qualification';
  educations: any[] = [
    {
      school: '',
      major: '',
      detail: '',
      period: '',
    },
  ];
  activity_headline: string = 'activities';
  activities: any[] = [
    {
      name: '',
      position: '',
      detail: '',
      period: '',
    },
  ];
  skill_headline: string = 'skills';
  skills: any[] = [
    {
      name: 'Adobe Photoshop',
      rate: 90,
    },
  ];
  other_headline: string = 'other';
  other_content: string = '';
}
