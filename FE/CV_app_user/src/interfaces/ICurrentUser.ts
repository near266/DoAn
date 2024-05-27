import { IUser } from './IUser';

export interface ICurrentUser extends IUser {
  role_codes?: string[];
}
