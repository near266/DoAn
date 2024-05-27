import { IUser } from '@/interfaces';

export class SettingForm {
  constructor(item: IUser = null) {
    if (item) {
      this.name = item.name;
      this.address = item.address;
      this.email = item.email;
      this.phone = item.phone;
      this.information = item.information;
      this.avatar = item.avatar;
    }
  }

  name: string = '';
  address: string = '';
  email: any;
  phone: any;
  information: any = '';
  avatar: string = null;
}
