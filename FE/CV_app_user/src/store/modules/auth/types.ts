import { ICurrentUser } from '@/interfaces';

export interface IAuthState {
  isAuthenticated: boolean;
  isFetched: boolean;
  me: ICurrentUser;
}
