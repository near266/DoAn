import { FC } from 'react';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import { Paper } from '@mui/material';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { formatServerDateToDurationString } from '@/helpers/date-helper';
import { IPost } from '@/interfaces';
import { BookmarkButton, UserNamed } from '../../index';
import styles from './styles.module.scss';

interface IProps {
  post: IPost;
  isAuthenticated?: boolean;
}

const BriefPost: FC<IProps> = ({ post, isAuthenticated }) => {
  return (
    <Paper className={styles.postArticle}>
      <div className={styles.uiHeader}>
        <div>
          <Link href={`/profile/${post.creator.username}`}>
            <a>
              <img
                className="avatar-user-general"
                src={post.creator.avatar}
                alt={post.creator.username}
              />
            </a>
          </Link>
        </div>
        <div className={styles.uiUser}>
          <Link href={`/profile/${post.creator.username}`}>
            <a className={styles.uiUser__name}>
              <UserNamed user={post.creator} iconSize={12} />
            </a>
          </Link>
          {post.category ? (
            <span className={styles.uiUser__categoryName}>
              &nbsp; • &nbsp;
              <Link href={`/topic/${post.category.slug}`}>
                <a>{post.category.name}</a>
              </Link>
            </span>
          ) : (
            ''
          )}
          <figcaption className={cx('figure-caption figure-time', styles.uiUser__time)}>
            {formatServerDateToDurationString(post.created_at)}
          </figcaption>
        </div>
        <div className="clearfix" />
      </div>
      <div className={styles.uiImg}>
        <Link href={`/posts/${post.slug}`}>
          <a>
            {post.avatar && (
              <LazyLoad height={240} offset={500} once unmountIfInvisible>
                <img src={post.avatar} alt={post.name} />
              </LazyLoad>
            )}
          </a>
        </Link>
      </div>
      <div className={styles.uiContent}>
        <Link href={`/posts/${post.slug}`}>
          <a>
            <h4 className="figure-title">{post.name}</h4>
          </a>
        </Link>
        <p className={styles.uiContent__description}>{`${post.description} ...`}</p>
      </div>
      <div className={styles.uiAction}>
        <div className={styles.uiAction__wapper}>
          <div className={styles.uiAction__view}>
            <i className="bi bi-eye" />
            <span className={styles.uiAction__iconLabel}>
              {post.view_number.toLocaleString()}
            </span>
          </div>
        </div>
        <div className={styles.uiAction__wapper}>
          <Link href={`/posts/${post.slug}#comment-box`}>
            <a className={styles.uiAction__comment}>
              <i className="bi bi-chat" />
              <span className={styles.uiAction__iconLabel}>{post.comments_count}</span>
            </a>
          </Link>
          {isAuthenticated && (
            <div className={styles.uiAction__bookmark}>
              <BookmarkButton bookmarked={post.bookmarked} postId={post.id} />
            </div>
          )}
        </div>
      </div>
    </Paper>
  );
};

BriefPost.propTypes = {
  post: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default BriefPost;
