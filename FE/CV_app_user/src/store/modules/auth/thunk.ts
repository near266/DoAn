import { checkAuth, setAuthUser } from './slice';
import { Cookies } from '@/shared';
import { authService } from '@/shared';

export function asyncProcessAuth(): any {
  return (dispatch) => {
    const accessToken = Cookies.get(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME);
    const isAuthenticated = !!accessToken;
    let isFetched = false;

    if (isAuthenticated) {
      authService.currentUser().then((res) => {
        if (res && res?.code === 'SUCCESS') {
          dispatch(setAuthUser(res.payload));
        }
      });
    } else {
      isFetched = true;
    }
    dispatch(checkAuth({ isFetched, isAuthenticated }));
  };
}

export function asyncLogoutAuth(): any {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setTimeout(() => {
      window.location.href = '/';
    }, 600);
  };
}
