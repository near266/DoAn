import { IUser } from '@/interfaces';

export interface IAuthState {
  isAuthenticated: boolean;
  isFetched: boolean;
  user: IUser;
}
