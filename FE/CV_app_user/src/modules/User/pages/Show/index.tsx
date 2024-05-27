import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

import { IRootState } from '@/store';
import { FullContentLayout } from '@/shared';
import UserContext from './contexts/userContext';
import Infor from './components/Infor';
const TabSwitch = dynamic(() => import('./components/TabSwitch'), {
  ssr: false,
});
import styles from './styles.module.scss';

const Show = ({ personal }) => {
  const auth = useSelector((state: any) => state.login);

  const [showForAnotherUser, setShowForAnotherUser] = useState(true);
  const [showForCurrentUser, setShowForCurrentUser] = useState(true);

  useEffect(() => {
    console.log(personal);
    // const checkShowForAnotherUser = auth.isAuthenticated
    //   ? auth.me.username !== personal.username
    //   : true;

    // const checkShowForCurrentUser = auth.isAuthenticated
    //   ? auth.me.username === personal.username
    //   : false;

    // setShowForAnotherUser(checkShowForAnotherUser);
    // setShowForCurrentUser(checkShowForCurrentUser);
  }, [auth, personal]);

  return (
    <FullContentLayout className={styles.page}>
      <div className="container">
        <div className="row">
          <UserContext.Provider value={{ showForAnotherUser, showForCurrentUser }}>
            <Infor user={personal} />
            <TabSwitch />
          </UserContext.Provider>
        </div>
      </div>
    </FullContentLayout>
  );
};

export default Show;
