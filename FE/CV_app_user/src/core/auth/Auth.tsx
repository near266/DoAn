import { IRootState } from '@/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Common } from '@/shared';
const Auth = ({ children }) => {
  const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);
  const isFetched = useSelector((state: IRootState) => state.auth.isFetched);
  const { loading, data, succeeded } = useSelector((state: any) => state.login);

  useEffect(() => {
    if (!succeeded) {
      Common.redirectToAuthenticate();
    }

    return () => {};
  }, [succeeded]);

  const View = succeeded ? children : <span aria-label="Loading ..."></span>;

  return succeeded ? View : null;
};

export default Auth;
