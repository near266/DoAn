import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';

import { IRootState } from '@/store';
import { useSnackbar } from '@/shared/snackbar';
import { httpClient } from '@/core';
import styles from './styles.module.scss';

interface IProps {
  isFollowed: boolean;
  followId: string;
  followType: 'category' | 'user';
}

const FollowButton: FC<IProps> = (props) => {
  const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);
  const snackbar = useSnackbar();

  const [isFollowed, setIsFollowed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsFollowed(props.isFollowed);
    return () => {};
  }, [props.isFollowed]);

  const followOrNot = () => {
    if (loading === true) {
      return false;
    }

    setLoading(true);
    httpClient
      .post(`follow/${props.followId}/${props.followType}`)
      .then(
        (rs) => {
          if (rs.data.code === 'SUCCESS') {
            if (rs.data.message === 'followed') {
              setIsFollowed(true);
            } else {
              setIsFollowed(false);
            }
          }
        },
        (xhr) => {
          if (xhr.response.status === 401) {
            snackbar.showMessage('Vui lòng đăng nhập để tiếp tục', 'error');
          }
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <button
      type="button"
      className={
        isFollowed
          ? cx('btn btn-common', styles.followButton)
          : cx('btn btn-outline-common', styles.followButton)
      }
      onClick={followOrNot}
      disabled={!isAuthenticated}
      title={isAuthenticated ? null : 'Vui lòng đăng nhập'}
    >
      {isFollowed ? 'Đang theo dõi' : 'Theo dõi'}
    </button>
  );
};

export default FollowButton;
