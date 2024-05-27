import { FC, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { httpClient } from '@/core';
import styles from './styles.module.scss';

interface IProps {
  bookmarked?: any;
  postId: string;
}

const BookmarkButton: FC<IProps> = (props) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBookmarked(props.bookmarked);
    return () => {};
  }, [props.bookmarked]);

  const bookmarkeOrNot = () => {
    if (loading === true) {
      return false;
    }

    setLoading(true);
    httpClient
      .post('bookmark', {
        post_id: props.postId,
      })
      .then((rs) => {
        if (rs.data.code === 'SUCCESS') {
          if (rs.data.message === 'bookmark') {
            setBookmarked(true);
          } else {
            setBookmarked(false);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.bookmarkButton} onClick={bookmarkeOrNot}>
      {bookmarked ? (
        <i
          className="bi bi-bookmark-fill"
          title="Lưu"
          style={{ color: 'rgb(17.647059%,60.784314%,71.764706%)' }}
        />
      ) : (
        <i className="bi bi-bookmark" title="Bỏ lưu" />
      )}
    </div>
  );
};

BookmarkButton.propTypes = {
  postId: PropTypes.any.isRequired,
  bookmarked: PropTypes.any,
};

export default BookmarkButton;
