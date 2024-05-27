import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { useSnackbar } from '@/shared/snackbar';
import { httpClient } from '@/core';
import styles from './styles.module.scss';

const LikeButton = (props) => {
  const snackbar = useSnackbar();

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLiked(props.liked);
    return () => {};
  }, [props.liked]);

  useEffect(() => {
    setLikeCount(parseInt(props.likeCount, 0));
    return () => {};
  }, [props.likeCount]);

  const likeOrNot = () => {
    if (loading === true) {
      return false;
    }

    setLoading(true);
    httpClient
      .post(`post/${props.postId}/like`)
      .then(
        (rs) => {
          if (rs.data.code === 'SUCCESS') {
            if (rs.data.message === 'like') {
              setLiked(true);
              setLikeCount(likeCount + 1);
            } else {
              setLiked(false);
              setLikeCount(likeCount - 1);
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
    <div className={styles.likeButton} onClick={likeOrNot}>
      {liked ? (
        <i
          className={cx('bi bi-heart-fill', styles.liked)}
          aria-hidden="true"
          title="Bỏ thích"
        />
      ) : (
        <i
          className={cx('bi bi-heart', styles.notLiked)}
          aria-hidden="true"
          title="Thích"
        />
      )}
      <div
        className="content-like"
        style={{ marginLeft: '5px', fontSize: props.textSize || '16px' }}
      >
        {likeCount}
      </div>
    </div>
  );
};

LikeButton.propTypes = {
  likeCount: PropTypes.any.isRequired,
  postId: PropTypes.any.isRequired,
  liked: PropTypes.any,
  textSize: PropTypes.string,
};

export default LikeButton;
