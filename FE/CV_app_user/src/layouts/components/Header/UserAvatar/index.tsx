import cx from 'classnames';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { CustomDropdown } from '@/components';
import { asyncLogoutAuth, IRootState } from '@/store';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import axios from 'axios';

const UserAvatar = () => {
  const me = useSelector((state: IRootState) => state.auth.me);
  const { loading, data, succeeded } = useSelector((state: any) => state.login);
  const [UserDefault, SetUser] = useState('');
  const getUser = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/UserInfo/auth/me?id=${data.id}`
    );
    console.log(res.data);
    SetUser(res.data.avatar);
  };
  useEffect(() => {
    getUser();
  }, []);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(asyncLogoutAuth());
  };

  return (
    <CustomDropdown
      dropdownMenu={
        <div className={styles.menu}>
          <div className={styles.currentUser}>
            <div className={styles.currentUser__name}>{data.userName}</div>
            <div className="username">{`@${data.userName}`}</div>
          </div>
          <div className={styles.divider} />
          <ul className={styles.expandMenu}>
            <li>
              <Link href={`/profile/${data.id}`}>
                <a className={styles.expandMenu__item}>
                  <i className="fa-solid fa-user" />
                  Trang cá nhân
                </a>
              </Link>
            </li>
            <li>
              <Link href="/account/setting">
                <a className={styles.expandMenu__item}>
                  <i className="fa fa-cog" />
                  Cài đặt tài khoản
                </a>
              </Link>
            </li>

            <div className={styles.divider} />
            <li>
              {/* TODOKOGAP: Xem co che dang xuat khac hay hon k */}
              <span className={styles.expandMenu__item} onClick={logout}>
                <i className="fa fa-sign-out-alt" />
                Đăng xuất
              </span>
            </li>
          </ul>
        </div>
      }
    >
      <div className={cx(styles.userHeader, 'menu-styled')}>
        <img src={UserDefault || '/images/avatar/default.png'} alt={me.name} />
      </div>
    </CustomDropdown>
  );
};

export default UserAvatar;
